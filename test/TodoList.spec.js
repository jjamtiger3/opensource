import request from 'supertest';
import apiServer from '../api';

describe('/api/todos', () => {
    it('get /api/todos', async () => {
        const res = await request(apiServer)
        .get('/api/todos');
        expect(res.status).toEqual(200);
    });
    it('get /api/todos/{id}', async () => {
        const res = await request(apiServer)
        .get('/api/todos/1')
        .send();
        expect(res.status).toEqual(200);
        expect(res.body).toEqual([{"no":1,"text":"테스트1_1","done":true,"deadline":"2022-07-28T00:00:00.000Z"}]);
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
        expect(res.status).toEqual(200);
    });
    it('put /api/todos/{id}', async () => {
        const res = await request(apiServer)
        .put('/api/todos/1')
        .send({
            text: 'jest test'
        });
        expect(res.status).toEqual(200);
    });
    it('delete /api/todos/{id}', async () => {
        const res = await request(apiServer)
        .delete('/delete/todos/999')
        .send();
        expect(res.status).toEqual(200);
    });
    it('delete multiple rows /api/todos', async () => {
        const res = await request(apiServer)
        .post('/api/todos/delete')
        .send([999]);
        expect(res.status).toEqual(200);
    });
});