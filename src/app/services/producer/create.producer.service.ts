import { Producer } from "../../domain/producer.domain";

export const createProducer = async (producer: Producer): Promise<Producer> => {
    return {
        id: 1,
        name: 'Joel Silver',
    }
}