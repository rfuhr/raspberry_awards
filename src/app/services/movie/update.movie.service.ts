import { Movie } from "@/app/domain/movie.domain";
import { MovieEntity } from "@/app/entities/movie.entity";
import { MovieMapper } from "@/app/mappers/movie.mapper";
import { ProducerMapper } from "@/app/mappers/producer.mapper";
import { getDataSource } from "@/infra/database/factory.datasource";

export const updateMovie = async (id: number, movie: Movie): Promise<Movie> => {

    const movieRepository = getDataSource().getRepository(MovieEntity);
    const movieEntity = await movieRepository.findOneBy({ id });
    if (movieEntity === null) {
        throw new Error('Movie not found');
    }
    movieEntity.year = movie.year;
    movieEntity.title = movie.title;
    movieEntity.studios = movie.studios;
    movieEntity.producers = ProducerMapper.toListPersistence(movie.producers);
    movieEntity.winner = movie.winner;

    const movieUpdated = await movieRepository.save(movieEntity);

    return MovieMapper.toDomain(movieUpdated);
}