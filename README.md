# README

Professional Manager is a simple web application built with Node.js, Express and PostgreSQL. The project allows users to register, list, and manage professionals through a web interface. 🚀

## Tecnologias Utilizadas
- Node.js
- Express
- PostgreSQL
- Bootstrap

## Como Executar
1. Clone o repositório:
   ```bash
   git clone https://github.com/PauloHR06/express-postgres-crud-app
   ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o banco de dados PostgreSQL, use o script inicial ```init.sql``` e atualize as credenciais no arquivo ```app.js```

4. Execute a aplicação:

    ```bash
    node app.js
    ```

5. Abra o arquivo ```index.html```

## Configuração do AWS RDS

1. Crie uma instância RDS PostgreSQL no AWS Console

2. Habilite o acesso público e configure regras de segurança para permitir conexões externas.

3. Anote as credenciais da instância, incluindo:
    * Endpoint (host)
    * User e Password 
    * Database name
    * Port (padrão: 5432)

4. Crie um arquivo ```.env``` na raiz do projeto e adicione as credenciais do RDS:

```
DB_USER=seu_usuario
DB_HOST=seu_endpoint_rds
DB_NAME=seu_banco
DB_PASSWORD=sua_senha
DB_PORT=5432
```

> Obs. Não compartilhe credenciais em repositórios públicos

