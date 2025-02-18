import { Movie } from "@/app/domain/movie.domain";

export const createMovie = async (movie: any): Promise<Movie> => {
    return {
        year: 2021,
        title: 'The Matrix',
        studios: ['Warner Bros'],
        producers: [{
            id: 1,
            name: 'Joel Silver'
        }],
        winner: true
    };
}