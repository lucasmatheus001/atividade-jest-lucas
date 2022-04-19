const fs = require('fs');
const request = require('supertest');
const app = require('../src/app');
const animalsData = require('../src/data/animals.json');
describe('insertanimal', () => {

    it('should insert a animal', async () => {
        const res = await request(app).post('/animals?nome=spike&especie=cachorro&idade=3');
        expect(res.status).toBe(201);
    });

    it('should insert a invalid age animal cat', async () => {
        const res = await request(app).post('/animals?nome=mimi&especie=gato&idade=jovem');
        expect(res.status).toBe(400);
    });


    it('worng short name', async () => {
        const res = await request(app).post('/animals?nome=j&especie=hamster&idade=1');
        expect(res.status).toBe(400);
    });
    


});

describe('Exclusão de usuarios', () => {
    beforeEach(() => {
        animalsData.push({
            id: idteste(),
            nome: 'meme',
            especie: 'gato',
            idade: 5,
        });
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    afterAll(() => {
        while (animalsData.length > 0) {
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });
    
    it('deve excluir um usuario com sucesso', async() => {
        const res = await request(app).delete('/animals/idteste');
        expect(res.status).toBe(200);
    });

    it('deve falhar exclusao inexistente', async() => {
        const res = await request(app).delete('/animals/testid');
        expect(res.status).toBe(404);
    });;
});

describe('Retorno de usuários', () => {
    beforeAll(() => {
        animalsData.push({
            id: 'idteste',
            nome: 'john',
            especie: 'gato',
            idade: 5,
        });
        animalsData.push({
            id: 'idteste',
            nome: 'pietro',
            especie: 'gato',
            idade: 5,
        });
         animalsData.push({
            id: 'idteste',
            nome: 'mia',
            especie: 'gato',
            idade: 5,
        });
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    afterAll(() => {
        while (animalsData.length > 0) {
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('deve retornar uma lista com todos', async () => {
        const res = await request(app).get('/animals');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(3);
    });
});

