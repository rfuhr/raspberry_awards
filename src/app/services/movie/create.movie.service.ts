import { MovieEntity } from '@/app/entities/movie.entity';
import { Movie } from "@/app/domain/movie.domain";
import { MovieMapper } from '@/app/mappers/movie.mapper';
import { getDataSource } from '@/infra/database/factory.datasource';

export const createMovie = async (movie: Movie): Promise<Movie> => {
    const movieRepository = getDataSource().getRepository(MovieEntity);

    const movieEntity = MovieMapper.toPersistence(movie);
    const movieCreated = await movieRepository.save(movieEntity);
    return MovieMapper.toDomain(movieCreated);
}