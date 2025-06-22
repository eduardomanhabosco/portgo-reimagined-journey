from sqlalchemy import Column, Integer, String, JSON
from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    school = Column(String, index=True)
    hashed_password = Column(String)
    score = Column(Integer, default=0)

class Question(Base):
    __tablename__ = "questions"
    id = Column(Integer, primary_key=True, index=True)
    level = Column(String, index=True)
    text = Column(String)
    options = Column(JSON)
    correct_answer_key = Column(String)
    source = Column(String)