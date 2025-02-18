import { fetchAllProducers } from './producer/fetch-all.producer.service';
import { fetchProducerById } from './producer/fetch-id.producer.service';
import { createProducer } from './producer/create.producer.service';
import { udpateProducer } from './producer/update.producer.service';
import { deleteProducer } from './producer/delete.producer.service';
import { getWinningIntervals } from './producer/get-winning-intervals.producer.service';

export {
    fetchAllProducers,
    createProducer,
    getWinningIntervals,
    fetchProducerById,
    udpateProducer,
    deleteProducer
}