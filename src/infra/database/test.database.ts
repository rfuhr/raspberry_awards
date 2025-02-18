import { MovieEntity } from "@/app/entities/movie.entity";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { DataSource } from "typeorm";

export const testDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    synchronize: true,
    logging: false,
    entities: [MovieEntity, ProducerEntity]
});