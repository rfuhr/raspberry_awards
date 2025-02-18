import { Producer } from './producer.domain';

export interface Movie {
    id?: number;
    year: number;
    title: string;
    studios: string;
    producers: Producer[];
    winner: boolean
}