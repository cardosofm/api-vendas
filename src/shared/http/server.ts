import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import AppErrors from '../errors/AppErrors';
// fazendo a importação do typeorm para fazer a conexão com o banco de dados,
// assim que a aplicação iniciar a conexão com o banco será executada
import '../typeorm/index';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

// aqui é configurado um middleware para poder fazer uso dos erros personalizados da classe AppErrors
// para middleware de tratamento de erros o .use recebe request, response, next e error
app.use(
    (
        // Error é um tipo global do node.js
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        // vamos usar essa classe nos nossos serviços, quando for erro de página, erro de validação etc tc
        // quando não for um erro da instancia da classe AppErrors, provavelmente é erro do servidor e ele vai usar o erro 500
        if (error instanceof AppErrors) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: 'error.message',
            });
        }
        // quando for erro gerado pela instancia é algum erro de servidor, status 500 erro desconhecido
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(3333, () => {
    console.log('Server running on part 3333');
});
