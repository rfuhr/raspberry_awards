import { Producer } from './producer.domain';

export interface Movie {
    year: number;
    title: string;
    studios: string[];
    producers: Producer[];
    winner: boolean
}