import "reflect-metadata";
import express from 'express';
import path from 'path';
import { prodDataSource } from './infra/database/prod.database';
import { testDataSource } from './infra/database/test.database';
import routes from './app/routes';
import { importMovie } from "./app/services/movie.service";

const app = express();

const inicializaDatabase = async () => {
    try {
        if (process.env.NODE_ENV === 'test') {
            await testDataSource.initialize();
            console.log('Conectado ao banco de dados de teste');
            execImportMovie();
        } else {
            await prodDataSource.initialize();
            console.log('Conectado ao banco de dados');
            execImportMovie();
        }


    } catch (error) {
        console.error('Erro ao conectar com o banco de dados', error);
    }
}

const execImportMovie = async () => {
    try {
        const filePath = path.join(__dirname, '..', 'Movielist.csv');

        await importMovie(filePath);
    }
    catch (error) {
        console.error(`Atenção: ${error}`);
        process.exit(0);
    }
}

app.use(express.json());
app.use('/api', routes);


inicializaDatabase();

export default app;