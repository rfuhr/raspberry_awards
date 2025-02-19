import { WinningIntervals, WinningProducer } from "../../domain/producer.domain";
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
    let producersIntervals:WinningProducer[] = [];
    
    producersWithMoviesWinners.forEach(item => {
        const movies = item.movies?.sort((a, b) => a.year - b.year);
        

        movies!.forEach((movie, index) => {
            const prox: any = movies![index + 1] || null;
            if (prox !== null) {
                const interval = prox.year - movie.year;
                producersIntervals.push({
                    producer: item.name,
                    interval: interval,
                    previousWin: movie.year,
                    followingWin: prox.year
                });
            }
        })
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