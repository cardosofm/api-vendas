import { createConnection } from 'typeorm';

// quando esse método é chamado ele procura em toda a estrutura de pastas do projeto o arquivo .ormconfig.json
// para poder criar a conexão com o banco de dados.
createConnection();

// codigo para subir um container com postgres
// docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
// o -d é para não travar o terminal, o shell roda o processo em bg e libera o terminal
