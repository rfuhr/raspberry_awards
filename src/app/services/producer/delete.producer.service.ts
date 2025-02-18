import { ProducerEntity } from "@/app/entities/producer.entity";
import { getDataSource } from "@/infra/database/factory.datasource";

export const deleteProducer = async (id: number): Promise<boolean> => {
    const producerRepository = getDataSource().getRepository(ProducerEntity);
    const producerEntity = await producerRepository.findOne({
        where: { id },
    });
    if (producerEntity === null) 
        throw new Error('Producer not found');
    await producerRepository.remove(producerEntity);
    
    return true;
}