import { Movie } from "@/app/domain/movie.domain";

export const getMovieById = async (id: number): Promise<Movie> => {
    return {
        id: 1,
        year: 2021,
        title: 'The Matrix',
        studios: 'Warner Bros',
        producers: [{
            id: 1,
            name: 'Joel Silver'
        }],
        winner: true
    };
};