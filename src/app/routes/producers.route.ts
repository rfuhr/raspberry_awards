import express, { Router } from 'express';
import { ProducerController } from '../controllers/producer.controller';

export const producerRouter: Router = express.Router();

producerRouter.get('/', ProducerController.listProducers);

producerRouter.get('/:id', ProducerController.getProducerById);

producerRouter.post('/', ProducerController.createProducer);

producerRouter.put('/:id', ProducerController.updateProducer);

producerRouter.delete('/:id', ProducerController.deleteProducer);

producerRouter.get('/winning-intervals', ProducerController.listWinningIntervals);



