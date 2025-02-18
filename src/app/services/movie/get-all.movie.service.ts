import { prodDataSource } from "@/infra/database/prod.database";
import { Movie } from "../../domain/movie.domain";
import { MovieEntity } from "@/app/entities/movie.entity";
import { MovieMapper } from "@/app/mappers/movie.mapper";

export const getAll = async (): Promise<Movie[]> => {

    const movieRepository = prodDataSource.getRepository(MovieEntity);
    const movies = await movieRepository.find({
        relations: ["producers"],
    });

    return MovieMapper.toDomains(movies);
}