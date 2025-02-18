import { MovieEntity } from "@/app/entities/movie.entity";
import { prodDataSource } from "@/infra/database/prod.database";

export const deleteMovie = async (id: number) => { 

    const movieRepository = prodDataSource.getRepository(MovieEntity);
    const movie = await movieRepository.findOneBy({ id });
    if (movie === null) {
        throw new Error('Movie not found');
    }
    await movieRepository.remove(movie);

    return true;
}