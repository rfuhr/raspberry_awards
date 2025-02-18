import { Producer } from "@/app/domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { ProducerMapper } from "@/app/mappers/producer.mapper";
import { prodDataSource } from "@/infra/database/prod.database";

export const getAllProducers = async (): Promise<Producer []> => {
    const producerRepository = prodDataSource.getRepository(ProducerEntity);
    const producers = await producerRepository.find();
    return ProducerMapper.toListDomain(producers);
}