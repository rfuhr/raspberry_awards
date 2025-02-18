import { MovieEntity } from "@/app/entities/movie.entity";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { DataSource } from "typeorm";

export const prodDataSource = new DataSource({
    type: 'sqlite',
    database: './banco.sqllite',
    synchronize: true,
    logging: false,
    entities: [MovieEntity, ProducerEntity]
});