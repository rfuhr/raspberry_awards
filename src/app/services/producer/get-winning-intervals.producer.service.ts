import { WinningIntervals } from "../../domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { getDataSource } from "@/infra/database/factory.datasource";

export const getWinningIntervals = async (): Promise<WinningIntervals> => {

    const producerRepository = getDataSource().getRepository(ProducerEntity);

    const producersWithMovieWinner = await producerRepository.find({
        relations: ["movies"],
        where: {
            movies: {
                winner: true
            }
        },
        order: {
            name: "ASC"
        }
    });

    const producersWithMoviesWinners = producersWithMovieWinner.filter(producer => producer.movies && producer.movies.length >= 2);
    let producersIntervals = producersWithMoviesWinners.map(item => {
        item.movies?.sort((a, b) => a.year - b.year);
        let firstYear = 0;
        let lastYear = 0;
        item.movies?.forEach((movie) => {
            firstYear = (firstYear === 0 || movie.year < firstYear) ? movie.year : firstYear;
            lastYear = (lastYear === 0 || movie.year > lastYear) ? movie.year : lastYear;
        })

        return {
            producer: item.name,
            interval: lastYear - firstYear,
            previousWin: firstYear,
            followingWin: lastYear
        }
    })

    producersIntervals = producersIntervals.sort((a, b) => a.interval - b.interval);
    const minInterval = producersIntervals[0].interval;
    const maxInterval = producersIntervals[producersIntervals.length - 1].interval;

    const producersWithMinInterval = producersIntervals.filter(item => item.interval === minInterval);
    const producersWithMaxInterval = producersIntervals.filter(item => item.interval === maxInterval);

    return {
        "min": producersWithMinInterval,
        "max": producersWithMaxInterval
    }
}