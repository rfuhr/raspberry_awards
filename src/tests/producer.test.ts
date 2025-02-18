import request from 'supertest';
import app from '../app';
import { getDataSource } from '../infra/database/factory.datasource';
import path from 'path';
import { importMovie } from '../app/services/movie.service';

const clearDatabase = async () => {
    const movieRepository = getDataSource().getRepository('MovieEntity');
    const producerRepository = getDataSource().getRepository('ProducerEntity');
    movieRepository.clear();
    producerRepository.clear();
}

describe('Producer', () => {
    it('deve criar um produtor com sucesso', async () => {
        clearDatabase();
        const response = await request(app).post('/api/producers').send({name: 'Joel Silver'});
        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Joel Silver');
    });

    it('deve retornar todos os produtores', async () => {
        clearDatabase();
        await request(app).post('/api/producers').send({name: 'Joel Silver'});
        await request(app).post('/api/producers').send({name: 'Steven Spielberg'});

        const response = await request(app).get('/api/producers');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].name).toBe('Joel Silver');
        expect(response.body[1].name).toBe('Steven Spielberg');
    });

    it('deve retornar um produtor por id', async () => {
        clearDatabase();
        let response = await request(app).post('/api/producers').send({name: 'Joel Silver'});

        response = await request(app).get(`/api/producers/${response.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Joel Silver');
    });

    it('deve atualizar um produtor com sucesso', async () => {
        clearDatabase();
        let response = await request(app).post('/api/producers').send({name: 'Joel Silver'});

        response = await request(app).put(`/api/producers/${response.body.id}`).send({name: 'Steven Spielberg'});

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('Steven Spielberg');
        expect(response.body.id).toBeDefined();
    });

    it('deve deletar um produtor com sucesso', async () => {
        clearDatabase();
        let response = await request(app).post('/api/producers').send({name: 'Joel Silver'});

        response = await request(app).delete(`/api/producers/${response.body.id}`);

        expect(response.status).toBe(204);
    });

    it('deve retornar a lista de intervalos de premiação', async () => {
        clearDatabase();

        const pathFile = path.resolve(__dirname, 'Movielist.csv');
        await importMovie(pathFile);

        const response = await request(app).get('/api/producers/winning-intervals');

        expect(response.status).toBe(200);
        expect(response.body.min.length).toBe(1);
        expect(response.body.min[0].producer).toBe('Joel Silver');
        expect(response.body.min[0].interval).toBe(1);
        expect(response.body.min[0].previousWin).toBe(1990);
        expect(response.body.min[0].followingWin).toBe(1991);
        expect(response.body.max[0].producer).toBe('Matthew Vaughn');
        expect(response.body.max[0].interval).toBe(13);
        expect(response.body.max[0].previousWin).toBe(2002);
        expect(response.body.max[0].followingWin).toBe(2015);        
    });
})