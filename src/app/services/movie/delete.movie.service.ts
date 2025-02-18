import { MovieEntity } from "@/app/entities/movie.entity";
import { NotFoundError } from "@/app/exceptions/NotFoundError";
import { getDataSource } from "@/infra/database/factory.datasource";

export const deleteMovie = async (id: number) => { 

    const movieRepository = getDataSource().getRepository(MovieEntity);
    const movie = await movieRepository.findOneBy({ id });
    if (movie === null) {
        throw new NotFoundError('Filme não encontrado');
    }
    await movieRepository.remove(movie);

    return true;
}