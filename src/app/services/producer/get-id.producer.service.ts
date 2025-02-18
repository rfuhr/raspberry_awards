import { Producer } from "../../domain/producer.domain";

export const getProducerById = async (id: number): Promise<Producer> => {
    return {
        id: 1,
        name: 'Joel Silver',
    }
}