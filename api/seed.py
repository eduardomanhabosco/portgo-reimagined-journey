import json
from sqlalchemy.orm import Session

# Importa as funções e modelos dos seus arquivos separados
import crud
import models
import schemas
from database import SessionLocal, engine, Base

# Cria as tabelas no banco de dados com base nos seus modelos
Base.metadata.create_all(bind=engine)

db: Session = SessionLocal()

def seed_database():
    print("Iniciando o povoamento do banco de dados...")

    # --- Adicionando Usuários ---
    try:
        with open("user.json", "r", encoding="utf-8") as f:
            users_data = json.load(f)
        
        print(f"Encontrados {len(users_data)} usuários em user.json.")

        for user_data in users_data:
            # Usa a função do arquivo crud.py
            user_exists = crud.get_user_by_email(db, email=user_data["email"])
            if user_exists:
                print(f"Usuário '{user_data['name']}' já existe. Pulando.")
                continue

            # Usa o schema do arquivo schemas.py
            user_to_create = schemas.UserCreate(
                email=user_data["email"],
                name=user_data["name"],
                school=user_data.get("school", "Escola Padrão"),
                password=user_data.get("password", "password123") 
            )
            
            created_user = crud.create_user(db, user=user_to_create)
            crud.update_user_score(db, user_id=created_user.id, new_score=user_data.get("score", 0))
            print(f"Usuário '{created_user.name}' da escola '{created_user.school}' adicionado.")

    except FileNotFoundError:
        print("Arquivo 'user.json' não encontrado. Pulando povoamento de usuários.")
    except Exception as e:
        print(f"Ocorreu um erro ao processar os usuários: {e}")

    # --- Adicionando Questões ---
    try:
        with open("questions.json", "r", encoding="utf-8") as f:
            questions_data = json.load(f)
        
        print("\nAdicionando questões ao banco de dados...")
        total_questoes = db.query(models.Question).count()
        if total_questoes > 0:
            print("O banco de dados de questões já está populado. Pulando.")
        else:
            for level, questions in questions_data.items():
                for q_data in questions:
                    question_to_create = schemas.QuestionCreate(
                        level=level,
                        text=q_data["text"],
                        options=q_data["options"],
                        correct_answer_key=q_data["correctAnswerKey"],
                        source=q_data["source"]
                    )
                    # Usa a função do arquivo crud.py
                    crud.create_question(db, question=question_to_create)
                print(f"Adicionadas {len(questions)} questões do nível '{level}'.")

    except FileNotFoundError:
        print("Arquivo 'questions.json' não encontrado. Pulando povoamento de questões.")
    except Exception as e:
        print(f"Ocorreu um erro ao processar as questões: {e}")

    print("\nPovoamento do banco de dados concluído!")

if __name__ == "__main__":
    seed_database()
    db.close()