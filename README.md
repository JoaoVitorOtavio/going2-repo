Este projeto é composto por backend e frontend.
O backend utiliza Node.js, TypeORM e PostgreSQL.
O frontend é feito com React utilizando o framework Next.js.

Pré-requisitos
PostgreSQL instalado e em funcionamento

Node.js e Yarn instalados

Configuração
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

DB_USERNAME='Nomedousuarionobanco'
DB_PASSWORD='Senhadobanco'
DB_PORT='PortaDoBancoGeralmente5432'
DB_HOST='HostDoBancoGeralmentelocalhost'
DB_NAME='NomeDoBanco'
JWT_KEY='UmaStringSuperSecretaQualquer'

Instale as dependências do projeto:
"yarn"

Execute as migrations para configurar o banco de dados:
"yarn typeorm migration:run -- -d data-source.ts"

Rodando o projeto:

- Backend (porta 3001)
"yarn start:dev"
O backend ficará disponível em: http://localhost:3001

Frontend (Next.js - porta 3000)
"yarn dev"
O frontend ficará disponível em: http://localhost:3000
