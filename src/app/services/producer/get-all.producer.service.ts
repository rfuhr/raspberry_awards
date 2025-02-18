import { Producer } from "@/app/domain/producer.domain";

export const getAllProducers = async (): Promise<Producer []> => {
    return [
        {
            id: 1,
            name: 'Joel Silver'
        },
        {
            id: 2,
            name: 'Joel Silver'
        }
    ];
}