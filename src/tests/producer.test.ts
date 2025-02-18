import request from 'supertest';
import app from '../app';
import { testDataSource } from "../infra/database/test.database";
import e from 'express';

beforeAll(async () => {
    // await testDataSource.destroy();
    // await testDataSource.initialize();
});

afterAll(async () => {
    // await testDataSource.destroy();
});

describe('Producer', () => {

    it('deve criar um produtor com sucesso', async () => {
        const response = await request(app).post('/api/producers').send({name: 'Joel Silver'});
        expect(response.status).toBe(201);
    });

    it('deve retornar todos os produtores', async () => {
        await request(app).post('/api/producers').send({name: 'Joel Silver'});
        await request(app).post('/api/producers').send({name: 'Steven Spielberg'});

        const response = await request(app).get('/api/producers');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toBe('Joel Silver');
        expect(response.body[1].name).toBe('Steven Spielberg');
    });

    it('deve retornar um produtor por id', async () => {
        const producer = await request(app).post('/api/producers').send({name: 'Joel Silver'});

        const response = await request(app).get(`/api/producers/${producer.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Joel Silver');
    });

    it('deve atualizar um produtor com sucesso', async () => {
        const producer = await request(app).post('/api/producers').send({name: 'Joel Silver'});

        const response = await request(app).put(`/api/producers/${producer.body.id}`).send({name: 'Steven Spielberg'});

        expect(response.status).toBe(200);
        expect(response.text).toBe('Producer com id 1 updated');
        expect(response.body.name).toBe('Steven Spielberg');
    });

    it('deve deletar um produtor com sucesso', async () => {
        const producer = await request(app).post('/api/producers').send({name: 'Joel Silver'});

        const response = await request(app).delete(`/api/producers/${producer.body.id}`);

        expect(response.status).toBe(204);
    });

})