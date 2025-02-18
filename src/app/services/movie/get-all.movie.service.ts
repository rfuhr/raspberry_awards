import { Movie } from "../../domain/movie.domain";

export const getAll = async (): Promise<Movie[]> => {

    return [{
        id: 1,
        year: 2021,
        title: 'The Matrix',
        studios: 'Warner Bros',
        producers: [{
            id: 1,
            name: 'Joel Silver'
        }],
        winner: true
    },
    {
        id: 2,
        year: 1980,
        title: 'The Matrix Reloaded',
        studios: 'Warner Bros',
        producers: [{
            id: 1,
            name: 'Joel Silver'
        }],
        winner: false
    }];
}