import { Request, Response } from 'express';
import { getAllProducers, getProducerById, createProducer, udpateProducer, deleteProducer, getWinningIntervals } from '../services/producer.service';

export class ProducerController {
    
    static async listProducers(_req: Request, res: Response): Promise<void> {
        const producers = await getAllProducers();
        res.status(200).json(producers);
    }
    
    static async getProducerById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const producer = await getProducerById(Number(id));
        res.status(200).send(producer);
    }
    
    static async createProducer(_req: Request, res: Response): Promise<void> {
        const producer = await createProducer(_req.body);
        res.status(201).json(producer);
    }
    
    static async updateProducer(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const producer = await udpateProducer(Number(id), req.body);
        res.status(200).json(producer);
    }
    
    static async deleteProducer(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        if (await deleteProducer(Number(id))) 
            res.status(204).send(`Producer com id ${id} deleted`);
    }

    static async listWinningIntervals(req: Request, res: Response): Promise<void> {
        const intervals = await getWinningIntervals();
        res.status(200).json(intervals);
    }

}