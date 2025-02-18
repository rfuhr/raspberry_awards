import { Producer } from "@/app/domain/producer.domain";

export const fetchAllProducers = async (): Promise<Producer []> => {
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