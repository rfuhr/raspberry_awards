import { Request, Response } from 'express';
import { getAll, getMovieById, createMovie, updateMovie, deleteMovie } from '../services/movie.service';

export class MovieController {

    static async listMovies(_req: Request, res: Response): Promise<void> {
        const movies = await getAll();
        res.status(200).json(movies);
    }

    static async getMovieById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const movie = await getMovieById(Number(id));
        if (movie === null) 
            res.status(404).send('Movie not found');
        
        res.status(200).send(movie);
    }

    static async createMovie(_req: Request, res: Response): Promise<void> {
        const movie = await createMovie(_req.body);
        res.status(201).json(movie);
    }

    static async updateMovie(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const movieUpdated = await updateMovie(Number(id), req.body);
        res.status(200).json(movieUpdated);
    }

    static async deleteMovie(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (await deleteMovie(Number(id))) 
            res.status(204).send(`Movie by id ${id} deleted`);
    }
}