import { NextFunction, Request, Response } from 'express';
import { getAllProducers, getProducerById, createProducer, udpateProducer, deleteProducer, getWinningIntervals } from '../services/producer.service';

export class ProducerController {
    
    static async listProducers(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const producers = await getAllProducers();
            res.status(200).json(producers);
        } catch (error) {
            next(error);
        }
    }
    
    static async getProducerById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const producer = await getProducerById(Number(id));
            res.status(200).json(producer);
        } catch (error) {
            next(error);
        }
    }
    
    static async createProducer(_req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const producer = await createProducer(_req.body);
            res.status(201).json(producer);
        } catch (error) {
            next(error);
        }
    }
    
    static async updateProducer(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const producer = await udpateProducer(Number(id), req.body);
            res.status(200).json(producer);
        } catch (error) {
            next(error);
        }
    }
    
    static async deleteProducer(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { id } = req.params;
            if (await deleteProducer(Number(id))) 
                res.status(204);
        } catch (error) {
            next(error);
        }
    }

    static async listWinningIntervals(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const intervals = await getWinningIntervals();
            res.status(200).json(intervals);
        } catch (error) {
            next(error);
        }
    }

}


