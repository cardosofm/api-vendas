import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateProducts1634414449539 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // linha para evitar o erro de falta de extensão dentro do banco de dados
        // ao invés de criar pelo bando de dados, a extensão será criada pela migration
        // await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.query(
            'CREATE EXTENSION IF NOT EXISTS uuid-ossp SCHEMA "public" VERSION 1.1',
        );
        await queryRunner.createTable(
            new Table({
                name: 'products',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid', // tipo id unico universal
                        isPrimary: true, // chave primário
                        generationStrategy: 'uuid', // estrategia de gerecao, pode ser autoincremente
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
                        precision: 10,
                        scale: 2,
                    },
                    {
                        name: 'qtd',
                        type: 'int',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()', // funcao para pegar a data e hora no momento
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
    }
}

// para rodar a migration usa o yarn typeorm migration:run
