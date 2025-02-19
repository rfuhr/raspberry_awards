import { NextFunction, Request, Response } from 'express';
import { getAll, getMovieById, createMovie, updateMovie, deleteMovie } from '../services/movie.service';

export class MovieController {

    static async listMovies(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const movies = await getAll();
            res.status(200).json(movies);
        } catch (error) {
            next(error);
        }
    }

    static async getMovieById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const movie = await getMovieById(Number(id));
            if (movie === null) 
                res.status(404).send('Filme não encontrado');
        
            res.status(200).send(movie);
        } catch (error) {
            next(error);
        }
    }

    static async createMovie(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const movie = await createMovie(_req.body);
            res.status(201).json(movie);
        } catch (error) {
            next(error);
        }
    }

    static async updateMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const movieUpdated = await updateMovie(Number(id), req.body);
            res.status(200).json(movieUpdated);
        } catch (error) {
            next(error);
        }
    }

    static async deleteMovie(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            if (await deleteMovie(Number(id))) 
                res.status(204).send();
            res.status(404).send('Filme não encontrado');
        } catch (error) {
            next(error);
        }
    }
}