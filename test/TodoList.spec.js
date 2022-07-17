import { response } from 'express';
import request from 'supertest';
import apiServer from '../api/index';

describe('/api/todos', () => {
    it('get /api/todos', async () => {
        const res = await request(apiServer)
        .get('/api/todos');
    });
    it('post /api/todos', async () => {
        const res = await request(apiServer)
        .post('/api/todos')
        .send({
            no: '999',
            text: 'jest test',
            done: false,
            deadline: new Date().getTime()
        });
        expect(response.status).toEqual(200);
    })
});