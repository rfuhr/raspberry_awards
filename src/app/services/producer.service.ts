import { getAllProducers } from './producer/get-all.producer.service';
import { getProducerById } from './producer/get-id.producer.service';
import { createProducer } from './producer/create.producer.service';
import { udpateProducer } from './producer/update.producer.service';
import { deleteProducer } from './producer/delete.producer.service';
import { getWinningIntervals } from './producer/get-winning-intervals.producer.service';

export {
    getAllProducers,
    createProducer,
    getWinningIntervals,
    getProducerById,
    udpateProducer,
    deleteProducer
}