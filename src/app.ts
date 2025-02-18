import "reflect-metadata";
import { prodDataSource } from './infra/database/prod.database';
import { testDataSource } from './infra/database/test.database';
import express from 'express';
import routes from './app/routes';

const app = express();

const inicializaDatabase = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            await testDataSource.initialize();
            console.log('Conectado ao banco de dados de teste');
            return;
        } else {
            await prodDataSource.initialize();
            console.log('Conectado ao banco de dados');
        }


    } catch (error) {
        console.error('Erro ao conectar com o banco de dados', error);
    }
}

app.use(express.json());
app.use('/api', routes);


inicializaDatabase();

export default app;