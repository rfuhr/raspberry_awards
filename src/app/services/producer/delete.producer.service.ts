import { ProducerEntity } from "@/app/entities/producer.entity";
import { prodDataSource } from "@/infra/database/prod.database";

export const deleteProducer = async (id: number): Promise<boolean> => {
    const producerRepository = prodDataSource.getRepository(ProducerEntity);
    const producerEntity = await producerRepository.findOne({
        where: { id },
    });
    if (producerEntity === null) 
        throw new Error('Producer not found');
    await producerRepository.remove(producerEntity);
    
    return true;
}