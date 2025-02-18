import { ProducerEntity } from "@/app/entities/producer.entity";
import { NotFoundError } from "@/app/exceptions/NotFoundError";
import { getDataSource } from "@/infra/database/factory.datasource";

export const deleteProducer = async (id: number): Promise<boolean> => {
    const producerRepository = getDataSource().getRepository(ProducerEntity);
    const producerEntity = await producerRepository.findOne({
        where: { id },
    });
    if (producerEntity === null) 
        throw new NotFoundError('Produtor não encontrado');
    await producerRepository.remove(producerEntity);
    
    return true;
}