import "reflect-metadata";
import express from 'express';
import path from 'path';
import routes from './app/routes';
import { importMovie } from "./app/services/movie.service";
import { getDataSource } from "./infra/database/factory.datasource";

const app = express();

const inicializaDatabase = async () => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            await getDataSource().initialize();
            console.log('Conectado ao banco de dados de teste');
            execImportMovie();
        }
    } catch (error) {
        console.error('Erro ao conectar com o banco de dados', error);
    }
}

const execImportMovie = async () => {
    try {
        let filePath = path.join(__dirname, '..', 'Movielist.csv');
        if (process.env.NODE_ENV === 'test') {
            filePath = path.join(__dirname, 'tests', 'Movielist.csv');
        }

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