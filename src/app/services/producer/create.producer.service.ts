import { ProducerMapper } from "../../mappers/producer.mapper";
import { Producer } from "../../domain/producer.domain";
import { ProducerEntity } from "../../entities/producer.entity";
import { getDataSource } from "@/infra/database/factory.datasource";

export const createProducer = async (producer: Producer): Promise<Producer> => {
    const producerRepository = getDataSource().getRepository(ProducerEntity);
    const producerEntity = ProducerMapper.toPersistence(producer);
    const producerCreated = await producerRepository.save(producerEntity);
    return ProducerMapper.toDomain(producerCreated);

}