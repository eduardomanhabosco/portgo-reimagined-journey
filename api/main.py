# --- 1. IMPORTAÇÕES ---
from datetime import datetime, timedelta, timezone
from typing import List, Dict, Any, Optional
from fastapi import Depends, FastAPI, HTTPException, status, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from passlib.context import CryptContext
from pydantic import BaseModel
from pydantic_settings import BaseSettings
from sqlalchemy import create_engine, Column, Integer, String, JSON, distinct, func
from sqlalchemy.orm import sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base

# --- 2. CONFIGURAÇÃO ---
class Settings(BaseSettings):
    DATABASE_URL: str; SECRET_KEY: str; ALGORITHM: str; ACCESS_TOKEN_EXPIRE_MINUTES: int
    class Config: env_file = ".env"
settings = Settings()

# --- 3. BANCO DE DADOS ---
engine = create_engine(settings.DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# --- 4. MODELOS DAS TABELAS (SQLAlchemy) ---
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name, email, school, hashed_password = Column(String, index=True), Column(String, unique=True, index=True), Column(String, index=True), Column(String)
    score = Column(Integer, default=0)

class Question(Base):
    __tablename__ = "questions"
    id, level, text, options, correct_answer_key, source = Column(Integer, primary_key=True, index=True), Column(String, index=True), Column(String), Column(JSON), Column(String), Column(String)

# --- 5. SCHEMAS (PYDANTIC) ---
class UserBase(BaseModel): email: str; name: str; school: str
class UserCreate(UserBase): password: str
class UserSchema(UserBase):
    id: int; score: int
    class Config: from_attributes = True
class Token(BaseModel): access_token: str; token_type: str; user: UserSchema
class SchoolRankSchema(BaseModel): rank: int; school: str; total_score: int
class QuestionBase(BaseModel): level: str; text: str; options: List[Dict[str, str]]; correct_answer_key: str; source: str
class QuestionCreate(QuestionBase): pass
class QuestionSchema(QuestionBase):
    id: int
    class Config: from_attributes = True
class UserUpdateScore(BaseModel): score: int

# --- 6. SEGURANÇA E CRUD ---
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
def verify_password(p, h): return pwd_context.verify(p, h)
def get_password_hash(p): return pwd_context.hash(p)
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy(); expire = datetime.now(timezone.utc) + (expires_delta or timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)); to_encode.update({"exp": expire})
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
def get_user_by_email(db: Session, email: str): return db.query(User).filter(User.email == email).first()
def create_db_user(db: Session, user: UserCreate):
    db_user = User(email=user.email, name=user.name, school=user.school, hashed_password=get_password_hash(user.password))
    db.add(db_user); db.commit(); db.refresh(db_user)
    return db_user
def update_db_user_score(db: Session, user_id: int, new_score: int):
    db_user = db.query(User).filter(User.id == user_id).first()
    if db_user: db_user.score = new_score; db.commit(); db.refresh(db_user)
    return db_user
def get_db_ranking(db: Session): return db.query(User).order_by(User.score.desc()).all()
def get_db_ranking_by_school(db: Session, school: str): return db.query(User).filter(User.school.ilike(f"%{school}%")).order_by(User.score.desc()).all()
def get_db_questions_by_level(db: Session, level: str, limit: int = 10): return db.query(Question).filter(Question.level == level).limit(limit).all()
def get_schools_ranking(db: Session):
    school_ranking = db.query(User.school, func.sum(User.score).label("total_score")).group_by(User.school).order_by(func.sum(User.score).desc()).all()
    return [{"rank": i + 1, "school": s, "total_score": ts} for i, (s, ts) in enumerate(school_ranking)]
def get_all_schools(db: Session):
    results = db.query(distinct(User.school)).order_by(User.school).all()
    return [item[0] for item in results]

# --- 7. APLICAÇÃO FastAPI E ENDPOINTS ---
app = FastAPI(title="PortGO API")
Base.metadata.create_all(bind=engine)
origins = ["http://localhost:8080", "http://localhost:5173"]
app.add_middleware(CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
def get_db():
    db = SessionLocal();_ = (yield db);db.close()

@app.post("/token", response_model=Token, tags=["Auth"])
def login(db: Session=Depends(get_db), form_data:OAuth2PasswordRequestForm=Depends()):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="E-mail ou senha incorretos")
    
    access_token = create_access_token(data={"sub": user.email})
    
    # --- CORREÇÃO AQUI ---
    # Convertemos o 'user' do banco de dados para o schema 'UserSchema' antes de retornar.
    user_schema = UserSchema.from_orm(user)
    return {"access_token": access_token, "token_type": "bearer", "user": user_schema}

@app.post("/users/", response_model=UserSchema, tags=["Users"])
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email): raise HTTPException(status_code=400, detail="E-mail já cadastrado")
    return create_db_user(db, user)

@app.get("/ranking/", response_model=List[UserSchema], tags=["Ranking"])
def get_general_ranking(db: Session = Depends(get_db)): return get_db_ranking(db)

@app.get("/ranking/school/{school_name}", response_model=List[UserSchema], tags=["Ranking"])
def get_school_ranking(school_name: str, db: Session = Depends(get_db)): return get_db_ranking_by_school(db, school=school_name)
    
@app.get("/ranking/schools", response_model=List[SchoolRankSchema], tags=["Ranking"])
def get_schools_leaderboard(db: Session = Depends(get_db)): return get_schools_ranking(db)

@app.get("/schools/", response_model=List[str], tags=["Schools"])
def list_all_schools(db: Session = Depends(get_db)): return get_all_schools(db)

@app.put("/users/{user_id}/score", response_model=UserSchema, tags=["Users"])
def update_score(user_id: int, score_update: UserUpdateScore, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user: raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return update_db_user_score(db, user_id, score_update.score)

@app.get("/questions/{level}", response_model=List[QuestionSchema], tags=["Questions"])
def read_questions_by_level(level: str, limit: int=10, db: Session=Depends(get_db)): return get_db_questions_by_level(db, level, limit)