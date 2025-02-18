import { Movie } from "@/app/domain/movie.domain";
import { MovieEntity } from "@/app/entities/movie.entity";
import { MovieMapper } from "@/app/mappers/movie.mapper";
import { getDataSource } from "@/infra/database/factory.datasource";

export const getMovieById = async (id: number): Promise<Movie | null> => {
    
    const movieRepository = getDataSource().getRepository(MovieEntity);
    const movie = await movieRepository.findOne({
        where: { id },
        relations: ["producers"],
    });
    if (movie === null) 
        return null;

    return MovieMapper.toDomain(movie);
};