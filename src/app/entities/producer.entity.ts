import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieEntity } from "./movie.entity";

@Entity()
export class ProducerEntity {
 
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: "varchar", length: 255 })
    name!: string;

    @ManyToMany(() => MovieEntity, movie => movie.producers)
    @JoinTable()
    movies!: MovieEntity[];
}