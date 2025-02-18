import { MovieEntity } from "@/app/entities/movie.entity";
import { getDataSource } from "@/infra/database/factory.datasource";

export const deleteMovie = async (id: number) => { 

    const movieRepository = getDataSource().getRepository(MovieEntity);
    const movie = await movieRepository.findOneBy({ id });
    if (movie === null) {
        throw new Error('Movie not found');
    }
    await movieRepository.remove(movie);

    return true;
}