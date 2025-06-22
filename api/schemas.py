from pydantic import BaseModel
from typing import List, Dict, Optional

# --- Schemas de Usuário e Autenticação ---
class UserBase(BaseModel):
    email: str
    name: str
    school: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    score: int
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# --- Schemas de Questões ---
class QuestionBase(BaseModel):
    level: str
    text: str
    options: List[Dict[str, str]]
    correct_answer_key: str
    source: str

class QuestionCreate(QuestionBase):
    pass

class Question(QuestionBase):
    id: int
    class Config:
        from_attributes = True