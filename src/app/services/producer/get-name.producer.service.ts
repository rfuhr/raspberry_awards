import { Producer } from "@/app/domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { ProducerMapper } from "@/app/mappers/producer.mapper";
import { getDataSource } from "@/infra/database/factory.datasource";

export const getProducerByName = async (name: string): Promise<Producer | null> => {
    const producerRepository = getDataSource().getRepository(ProducerEntity);
    const producer = await producerRepository.findOne({
        where: { name },
    });
    if (producer === null) 
        return null;
    return ProducerMapper.toDomain(producer);
}