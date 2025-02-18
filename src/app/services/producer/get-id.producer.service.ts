import { prodDataSource } from "@/infra/database/prod.database";
import { Producer } from "../../domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { ProducerMapper } from "@/app/mappers/producer.mapper";

export const getProducerById = async (id: number): Promise<Producer> => {
    const producerRepository = prodDataSource.getRepository(ProducerEntity);
    const producer = await producerRepository.findOne({
        where: { id },
    });
    if (producer === null) 
        throw new Error('Producer not found');
    return ProducerMapper.toDomain(producer);
}