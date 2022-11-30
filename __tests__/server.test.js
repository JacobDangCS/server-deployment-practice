const { app } = require('../src/server');
const supertest = require('supertest');
const request = supertest(app);

describe('APIServer', () => {
    it('handles root path', async () => {
        const response = await request.get('/')

        expect(response.status).toBe(200),
            expect(response.text).toBeTruthy(),
            expect(response.text).toEqual('Hello World!')
    });

    it('handles invalid requests', async () => {
        const response = await request.get('/foo')
        expect(response.status).toEqual(404);
    });

    it('handles errors', async () => {
        const response = await request.get('/bad')
        console.log('---', response.body);
        expect(response.status).toEqual(500);
        expect(response.body.route).toEqual('/bad');
    });

    //Change the bottom two /helloQuery & /helloPath to /person

    it('works with query params and the "/helloQuery" route', async () => {
        const response = await request.get('/helloQuery?name=Jacob');
        expect(response.text).toEqual('Hello Jacob');
    });

    it('works with path params and the "/helloPath" route', async () => {
        const response = await request.get('/helloPath/Lucky');
        expect(response.text).toEqual('Hello Lucky');
    });

});
