import { MovieEntity } from '@/app/entities/movie.entity';
import { prodDataSource } from '../../../infra/database/prod.database';
import { Movie } from "@/app/domain/movie.domain";
import { MovieMapper } from '@/app/mappers/movie.mapper';

export const createMovie = async (movie: Movie): Promise<Movie> => {

    const movieRepository = prodDataSource.getRepository(MovieEntity);
    const movieEntity = MovieMapper.toPersistence(movie);
    const movieCreated = await movieRepository.save(movieEntity);

    return MovieMapper.toDomain(movieCreated);
}