import { Producer } from "../../domain/producer.domain";

export const fetchProducerById = async (id: number): Promise<Producer> => {
    return {
        id: 1,
        name: 'Joel Silver',
    }
}