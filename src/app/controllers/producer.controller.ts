import { Request, Response } from 'express';
import { getWinningIntervals } from '../services/producer.service';

export class ProducerController {
    
    static async listWinningIntervals(req: Request, res: Response): Promise<void> {
        const intervals = await getWinningIntervals();
        res.status(200).json(intervals);
    }

}