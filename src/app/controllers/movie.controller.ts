import { Request, Response } from 'express';
import { fetchAll, fetchMovieById, createMovie, updateMovie, deleteMovie } from '../services/movie.service';

export class MovieController {

    static async listMovies(_req: Request, res: Response): Promise<void> {
        const movies = await fetchAll();
        res.status(200).json(movies);
    }

    static async getMovieById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const movie = await fetchMovieById(Number(id));
        res.status(200).send(movie);
    }

    static async createMovie(_req: Request, res: Response): Promise<void> {
        await createMovie(_req.body);
        res.status(201).send('Movie created');
    }

    static async updateMovie(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await updateMovie(Number(id), req.body);
        res.status(200).send(`Movie com id ${id} updated`);
    }

    static async deleteMovie(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (await deleteMovie(Number(id))) 
            res.status(204).send(`Movie com id ${id} deleted`);
    }
}