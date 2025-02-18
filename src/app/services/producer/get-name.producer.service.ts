import { Producer } from "@/app/domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { ProducerMapper } from "@/app/mappers/producer.mapper";
import { prodDataSource } from "@/infra/database/prod.database";

export const getProducerByName = async (name: string): Promise<Producer | null> => {
    const producerRepository = prodDataSource.getRepository(ProducerEntity);
    const producer = await producerRepository.findOne({
        where: { name },
    });
    if (producer === null) 
        return null;
    return ProducerMapper.toDomain(producer);
}