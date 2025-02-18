import { getAll } from '../services/movie/get-all.movie.service';
import { getMovieById } from '../services/movie/get-id.movie.service';
import { createMovie } from './movie/create.movie.service';
import { updateMovie } from './movie/update.movie.service';
import { deleteMovie } from './movie/delete.movie.service';
import { importMovie } from './movie/import.movie.service';

export {
    getAll,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    importMovie
}