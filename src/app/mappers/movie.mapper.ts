import { Movie } from "../domain/movie.domain";
import { MovieEntity } from "../entities/movie.entity";

export class MovieMapper {

    static toPersistence(data: Movie): MovieEntity {
        return {
            id: data.id,
            year: data.year,
            title: data.title,
            studios: data.studios,
            producers: data.producers,
            winner: data.winner
        };
    }

    static toDomain(data: MovieEntity): Movie {
        return {
            id: data.id,
            year: data.year,
            title: data.title,
            studios: data.studios,
            producers: data.producers,
            winner: data.winner || false
        };
    }

    static toDomains(data: MovieEntity[]): Movie[] {
        console.log(data);
        return data.map(movie => this.toDomain(movie));
    }
}