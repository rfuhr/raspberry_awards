export interface WinningProducer {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}

export interface WinningIntervals {
    min: WinningProducer[];
    max: WinningProducer[];
}

export interface Producer {
    id?: number;
    name: string;
}