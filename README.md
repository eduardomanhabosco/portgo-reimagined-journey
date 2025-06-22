PortGO - Guia de Execução Local
Este guia contém todas as instruções necessárias para configurar e executar o projeto PortGO (Frontend e Backend) em seu ambiente de desenvolvimento.

Pré-requisitos
Antes de começar, garanta que você tenha os seguintes softwares instalados em sua máquina:

Node.js: Essencial para rodar o frontend em React.
Python: Essencial para rodar o backend em FastAPI.
Passo a Passo para Execução
O projeto é dividido em duas partes que precisam ser executadas simultaneamente: o Backend (a API) e o Frontend (a interface visual). Você precisará de dois terminais abertos.

1. Configurando e Executando o Backend (API)
O backend é o cérebro da aplicação, responsável por gerenciar os dados.

a) Navegue até a pasta da API:
Abra seu primeiro terminal e navegue até a pasta api do projeto.

Bash

cd api
b) Crie o arquivo de configuração .env:
Dentro da pasta api, crie um arquivo chamado .env e cole o seguinte conteúdo. Este arquivo guarda as configurações da sua API.

Snippet de código

DATABASE_URL="sqlite:///./portgo.db"
SECRET_KEY="uma_chave_secreta_muito_forte_pode_ser_qualquer_coisa"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=30
c) Instale as dependências Python:
Execute o comando abaixo para instalar todas as bibliotecas que o backend precisa.

Bash

# Se o comando 'pip' não for reconhecido, use 'py -m pip'
pip install -r requirements.txt
d) Popule o Banco de Dados:
Este comando executa o script que adiciona os usuários e questões iniciais ao banco de dados.

Bash

# Se o comando 'python' não for reconhecido, use 'py'
python seed.py
e) Inicie o servidor da API:
Finalmente, inicie o servidor do backend.

Bash

# Se o comando 'uvicorn' não for reconhecido, use 'py -m uvicorn'
uvicorn main:app --reload --port 8001
✅ Sucesso! Seu backend agora está rodando e escutando na porta 8001. Mantenha este terminal aberto.

2. Configurando e Executando o Frontend (React App)
O frontend é a parte visual do projeto com a qual você interage no navegador.

a) Navegue até a pasta raiz do projeto:
Abra um novo terminal. Nele, navegue para a pasta raiz do projeto (a pasta que contém src, api, package.json, etc.).

b) Instale as dependências do Frontend:
Este comando irá baixar todas as bibliotecas necessárias para o React.

Bash

npm install
c) Inicie o servidor de desenvolvimento:
Este comando compila e executa a aplicação React.

Bash

npm run dev
✅ Sucesso! O terminal irá mostrar a URL onde sua aplicação está rodando, geralmente http://localhost:8080.

Resumo Final
Ao final de todos os passos, você terá:

Um terminal rodando o Backend na porta 8001.
Um segundo terminal rodando o Frontend na porta 8080 (ou a que for indicada).
Agora, basta acessar a URL do frontend (http://localhost:8080) no seu navegador para usar o PortGO!