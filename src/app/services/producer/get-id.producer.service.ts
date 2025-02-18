import { Producer } from "../../domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { ProducerMapper } from "@/app/mappers/producer.mapper";
import { getDataSource } from "@/infra/database/factory.datasource";

export const getProducerById = async (id: number): Promise<Producer> => {
    const producerRepository = getDataSource().getRepository(ProducerEntity);
    const producer = await producerRepository.findOne({
        where: { id },
    });
    if (producer === null) 
        throw new Error('Producer not found');
    return ProducerMapper.toDomain(producer);
}