import { ProducerMapper } from "@/app/mappers/producer.mapper";
import { Producer } from "@/app/domain/producer.domain";
import { ProducerEntity } from "@/app/entities/producer.entity";
import { getDataSource } from "@/infra/database/factory.datasource";

export const udpateProducer = async (id:number, producer: Producer): Promise<Producer> => {
    const producerRepository = getDataSource().getRepository(ProducerEntity);
    const producerEntity = await producerRepository.findOne({
        where: { id },
    });
    
    if (producerEntity === null) 
        throw new Error('Producer not found');
    
    producerEntity.name = producer.name;
    const producerUpdated = await producerRepository.save(producerEntity);

    return ProducerMapper.toDomain(producerUpdated);
}