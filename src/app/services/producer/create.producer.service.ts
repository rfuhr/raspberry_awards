import { ProducerMapper } from "../../mappers/producer.mapper";
import { Producer } from "../../domain/producer.domain";
import { prodDataSource } from "../../../infra/database/prod.database";
import { ProducerEntity } from "../../entities/producer.entity";

export const createProducer = async (producer: Producer): Promise<Producer> => {
    const producerRepository = prodDataSource.getRepository(ProducerEntity);
    const producerEntity = ProducerMapper.toPersistence(producer);
    const producerCreated = await producerRepository.save(producerEntity);
    return ProducerMapper.toDomain(producerCreated);

}