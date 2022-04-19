const fs = require('fs');
const request = require('supertest');
const app = require('../src/app');
const usersData = require('../src/data/users.json');
describe('insertUser', () => {

    // it('should insert a user', async () => {
    //     const res = await request(app).post('/users?nome=Maria&idade=25');
    //     expect(res.status).toBe(201);
    // });

    it('name invalid', async () => {
        const res = await request(app).post('/users?nome=M&idade=25');
        expect(res.status).toBe(400);
    });

    it('age invalid', async () => {
        const res = await request(app).post('/users?nome=Maria&idade=a');
        expect(res.status).toBe(400);
    });
    


});

describe('Exclusão de usuarios', () => {
    beforeEach(() => {
        usersData.push({
            id: idteste(),
            nome: 'Maria',
            idade: 25,
        });
        fs.writeFileSync('src/data/users.json', JSON.stringify(usersData));
    });

    afterAll(() => {
        while (usersData.length > 0) {
            usersData.pop();
        }
        fs.writeFileSync('src/data/users.json', JSON.stringify(usersData));
    });
    
    it('deve excluir um usuario com sucesso', async() => {
        const res = await request(app).delete('/users/idteste');
        expect(res.status).toBe(200);
    });

    it('deve falhar exclusao inexistente', async() => {
        const res = await request(app).delete('/users/testid');
        expect(res.status).toBe(404);
    });;
});

describe('Retorno de usuários', () => {
    beforeAll(() => {
        usersData.push({
            id: 'idteste',
            nome: 'Maria',
            idade: 25,
        });
        usersData.push({
            id: 'idteste',
            nome: 'Maria2',
            idade: 25,
        });
         usersData.push({
            id: 'idteste',
            nome: 'Maria3',
            idade: 25,
        });
        fs.writeFileSync('src/data/users.json', JSON.stringify(usersData));
    });

    afterAll(() => {
        while (usersData.length > 0) {
            usersData.pop();
        }
        fs.writeFileSync('src/data/users.json', JSON.stringify(usersData));
    });

    it('deve retornar uma lista com todos', async () => {
        const res = await request(app).get('/users');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });
});

