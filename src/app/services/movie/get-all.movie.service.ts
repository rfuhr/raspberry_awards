import { Movie } from "../../domain/movie.domain";
import { MovieEntity } from "@/app/entities/movie.entity";
import { MovieMapper } from "@/app/mappers/movie.mapper";
import { getDataSource } from "@/infra/database/factory.datasource";

export const getAll = async (): Promise<Movie[]> => {

    const movieRepository = getDataSource().getRepository(MovieEntity);
    const movies = await movieRepository.find({
        relations: ["producers"],
    });

    return MovieMapper.toDomains(movies);
}