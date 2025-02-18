import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProducerEntity } from "./producer.entity";

@Entity()
export class MovieEntity  {
    @PrimaryGeneratedColumn()
    id!: number;
    
    @Column({type: "int"})
    year!: number;
    @Column({ type: "varchar", length: 255 })
    title!: string;
    @Column({ type: "varchar", length: 500 })
    studios!: string;

    @ManyToMany(() => ProducerEntity, producer => producer.movies, { cascade: true })
    producers!: ProducerEntity[];

    @Column({type: "boolean", nullable: true})
    winner?: boolean | null;

    
}