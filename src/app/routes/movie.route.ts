import express, { Router } from 'express';
import { MovieController } from '../controllers/movie.controller';

export const movieRouter: Router = express.Router();

movieRouter.get('/', MovieController.listMovies);

movieRouter.get('/:id', MovieController.getMovieById);

movieRouter.post('/', MovieController.createMovie);

movieRouter.put('/:id', MovieController.updateMovie);

movieRouter.delete('/:id', MovieController.deleteMovie);

