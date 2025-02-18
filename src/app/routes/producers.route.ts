import express, { Router } from 'express';
import { ProducerController } from '../controllers/producer.controller';

export const producerRouter: Router = express.Router();

producerRouter.get('/winning-intervals', ProducerController.listWinningIntervals);



