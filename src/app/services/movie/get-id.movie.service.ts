import { Movie } from "@/app/domain/movie.domain";
import { MovieEntity } from "@/app/entities/movie.entity";
import { MovieMapper } from "@/app/mappers/movie.mapper";
import { prodDataSource } from "@/infra/database/prod.database";

export const getMovieById = async (id: number): Promise<Movie | null> => {
    
    const movieRepository = prodDataSource.getRepository(MovieEntity);
    const movie = await movieRepository.findOne({
        where: { id },
        relations: ["producers"],
    });
    if (movie === null) 
        return null;

    return MovieMapper.toDomain(movie);
};