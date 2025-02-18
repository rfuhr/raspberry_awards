import { Producer } from "@/app/domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { ProducerMapper } from "@/app/mappers/producer.mapper";
import { getDataSource } from "@/infra/database/factory.datasource";

export const getAllProducers = async (): Promise<Producer []> => {
    const producerRepository = getDataSource().getRepository(ProducerEntity);
    const producers = await producerRepository.find();
    return ProducerMapper.toListDomain(producers);
}