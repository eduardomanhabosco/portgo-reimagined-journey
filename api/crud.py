from sqlalchemy.orm import Session
from passlib.context import CryptContext
import models, schemas

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        name=user.name,
        school=user.school,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def create_question(db: Session, question: schemas.QuestionCreate):
    db_question = models.Question(**question.dict())
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

# --- INÍCIO DA CORREÇÃO ---
def get_ranking(db: Session):
    # Removemos .limit() para retornar todos os usuários
    return db.query(models.User).order_by(models.User.score.desc()).all()

def get_ranking_by_school(db: Session, school_name: str):
    # Removemos .limit() para retornar todos os usuários da escola
    return db.query(models.User).filter(models.User.school.ilike(f"%{school_name}%")).order_by(models.User.score.desc()).all()
# --- FIM DA CORREÇÃO ---

def update_user_score(db: Session, user_id: int, new_score: int):
    db_user = db.query(models.User).filter(models.User.id == user_id).first()
    if db_user:
        db_user.score = new_score
        db.commit()
        db.refresh(db_user)
    return db_user