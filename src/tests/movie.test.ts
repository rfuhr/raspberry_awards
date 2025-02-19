import path from 'path';
import request from 'supertest';
import app from '../app';
import { getDataSource } from '../infra/database/factory.datasource';
import { importMovie } from '../app/services/movie.service';

describe('Movie', () => {

    it('deve criar um filme com sucesso', async () => {
        const response = await request(app).post('/api/movies').send({year: 2021, title: 'Filme 1', studios: 'Warner Bros', producers: [{name: 'Joel Silver'}], winner: true});

        expect(response.status).toBe(201);
        expect(response.body.title).toBe('Filme 1');
        expect(response.body.winner).toBe(true);
        expect(response.body.year).toBe(2021);
    });

    it('deve retornar todos os filmes', async () => {
        const movieRepository = getDataSource().getRepository('MovieEntity');
        const producerRepository = getDataSource().getRepository('ProducerEntity');
        movieRepository.clear();
        producerRepository.clear();

        await request(app).post('/api/movies').send({year: 2021, title: 'Filme 1', studios: 'Warner Bros', producers: [{name: 'Joel Silver'}], winner: false});
        await request(app).post('/api/movies').send({year: 2022, title: 'Filme 2', studios: 'Universal', producers: [{name: 'Steven Spielberg'}], winner: true});

        const response = await request(app).get('/api/movies');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(2);
        expect(response.body[0].title).toBe('Filme 1');
        expect(response.body[1].title).toBe('Filme 2');
        expect(response.body[0].producers[0].name).toBe('Joel Silver');
        expect(response.body[1].producers[0].name).toBe('Steven Spielberg');
    });

    it('deve retornar um filme por id', async () => {
        const movieRepository = getDataSource().getRepository('MovieEntity');
        const producerRepository = getDataSource().getRepository('ProducerEntity');
        movieRepository.clear();
        producerRepository.clear();

        let response = await request(app).post('/api/movies').send({year: 2021, title: 'Filme 1', studios: 'Warner Bros', producers: [{name: 'Joel Silver'}], winner: false});

        response = await request(app).get(`/api/movies/${response.body.id}`);

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Filme 1');
        expect(response.body.producers[0].name).toBe('Joel Silver');
        expect(response.body.winner).toBe(false);
        expect(response.body.year).toBe(2021);
        expect(response.body.studios).toBe('Warner Bros');
        expect(response.body.producers).toHaveLength(1);
        expect(response.body.producers[0].name).toBe('Joel Silver');
    });

    it('deve atualizar um filme com sucesso', async () => {
        const movieRepository = getDataSource().getRepository('MovieEntity');
        const producerRepository = getDataSource().getRepository('ProducerEntity');
        movieRepository.clear();
        producerRepository.clear();

        let response = await request(app).post('/api/movies').send({year: 2021, title: 'Filme 1', studios: 'Warner Bros', producers: [{name: 'Joel Silver'}], winner: false});

        response = await request(app).put(`/api/movies/${response.body.id}`).send({year: 2022, title: 'Filme 2', studios: 'Universal', producers: [{name: 'Steven Spielberg'}], winner: true});

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('Filme 2');
        expect(response.body.winner).toBe(true);
        expect(response.body.year).toBe(2022);
        expect(response.body.studios).toBe('Universal');
        expect(response.body.producers).toHaveLength(1);
        expect(response.body.producers[0].name).toBe('Steven Spielberg');
    });

    it('deve deletar um filme com sucesso', async () => {
        const movieRepository = getDataSource().getRepository('MovieEntity');
        const producerRepository = getDataSource().getRepository('ProducerEntity');
        movieRepository.clear();
        producerRepository.clear();

        let response = await request(app).post('/api/movies').send({year: 2021, title: 'Filme 1', studios: 'Warner Bros', producers: [{name: 'Joel Silver'}], winner: false});

        response = await request(app).delete(`/api/movies/${response.body.id}`);

        expect(response.status).toBe(204);
    });

    it ('deve importar uma lista de filmes com sucesso', async () => {
        const movieRepository = getDataSource().getRepository('MovieEntity');
        const producerRepository = getDataSource().getRepository('ProducerEntity');
        movieRepository.clear();
        producerRepository.clear();

        const rootPath = process.cwd();
        const pathFile = path.resolve(rootPath, 'Movielist.csv');
        await importMovie(pathFile);

        const response = await request(app).get('/api/movies');

        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(206);
    });
})