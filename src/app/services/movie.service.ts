import { fetchAll } from '../services/movie/fetch-all.movie.service';
import { fetchMovieById } from '../services/movie/fetch-id.movie.service';
import { createMovie } from './movie/create.movie.service';
import { updateMovie } from './movie/update.movie.service';
import { deleteMovie } from './movie/delete.movie.service';

export {
    fetchAll,
    fetchMovieById,
    createMovie,
    updateMovie,
    deleteMovie
}