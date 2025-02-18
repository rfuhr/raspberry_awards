import { Movie } from "../../domain/movie.domain";

export const fetchAll = async (): Promise<Movie[]> => {

    return [{
        year: 2021,
        title: 'The Matrix',
        studios: ['Warner Bros'],
        producers: [{
            id: 1,
            name: 'Joel Silver'
        }],
        winner: true
    },
    {
        year: 1980,
        title: 'The Matrix Reloaded',
        studios: ['Warner Bros'],
        producers: [{
            id: 1,
            name: 'Joel Silver'
        }],
        winner: false
    }];
}