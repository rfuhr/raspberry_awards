import "reflect-metadata";
import express from 'express';
import path, { dirname } from 'path';
import routes from './app/routes';
import { importMovie } from "./app/services/movie.service";
import { getDataSource } from "./infra/database/factory.datasource";
import { fileURLToPath } from "url";
import { errorHandler } from "./app/exceptions/errorHandler";

const app = express();

const inicializaDatabase = async () => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            await getDataSource().initialize();
            console.log('Conectado ao banco de dados');
        }
    } catch (error) {
        throw new Error(`Erro ao conectar com o banco de dados: ${error}`);
    }
}

const execImportMovie = async () => {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
                
        let filePath = path.join(__dirname, '..', 'Movielist.csv');
        if (process.env.NODE_ENV === 'test') {
            filePath = path.join(__dirname, 'tests', 'Movielist.csv');
        }

        await importMovie(filePath);
    }
    catch (error) {
        throw new Error(`Erro ao importar filmes: ${error}`);
    }
}

const startServer = async () => {
    
    try {
        await inicializaDatabase(); 
        await execImportMovie();

        app.use(express.json());
        app.use('/api', routes);
        app.use(errorHandler as unknown as express.RequestHandler);

        const PORT = process.env.PORT || 3000;

        app.listen(PORT, () => {
            console.log(`Servidor iniciado na porta ${PORT}`);
        });
    } catch (error) {
        console.error(`Erro ao iniciar o servidor: ${error}`);
        process.exit(1);
    }
};

export { app, startServer };