import { Producer } from "../domain/producer.domain";
import { ProducerEntity } from "../entities/producer.entity";

export class ProducerMapper {
    static toPersistence(data: Producer): ProducerEntity {
        return {
            id: data.id,
            name: data.name
        };
    }

    static toListPersistence(data: Producer[]): ProducerEntity[] {
        return data.map(producer => this.toPersistence(producer));
    }

    static toDomain(data: ProducerEntity): Producer {
        return {
            id: data.id,
            name: data.name
        };
    }

    static toListDomain(data: ProducerEntity[]): Producer[] {
        return data.map(producer => this.toDomain(producer));
    }
}