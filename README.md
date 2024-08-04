# EncontroMobile

## Configuração do Ambiente de Desenvolvimento

1. Clone o repositório:
   ```bash
   git clone https://github.com/andrieria/BackMobileEncontro.git
   cd BackMobileEncontro
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Crie um arquivo .env baseado no .env.example:
    ```bash
    cp .env.example .env
    ```

4. Edite o arquivo .env com suas configurações:
    ```bash
    DB_HOST=localhost
    DB_USER=root
    DB_PASS=sua_senha
    DB_NAME=nome_do_banco
    PORT=3000
    ```
5. Execute as migrações do banco de dados:
    ```bash
    npx sequelize-cli db:migrate
    ```

6. Inicie o servidor:
    ```bash
    node src/app.js
    ```


## Scripts Disponíveis

- `start`: Inicia o servidor Node.js.
- `dev`: Inicia o servidor Node.js em modo de desenvolvimento (use nodemon para reiniciar automaticamente).

## Estrutura do Projeto

- `src/`: Diretório principal do código fonte.
    - `config/`: Configurações do projeto.
        - `config.json`: Configurações do banco de dados.
    - `controllers/`: Controladores da aplicação.
    - `middlewares/`: Middlewares da aplicação.
    - `migrations/`: Migrações do banco de dados.
    - `models/`: Modelos do banco de dados.
    - `seeders/`: Seeders do banco de dados.
    - `routes/`: Definições das rotas da aplicação.
    - `app.js`: Arquivo principal da aplicação.
