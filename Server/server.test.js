const { app } = require('..server');
const supertest = require('supertest');
const request = supertest(app);

describe('APIServer', () => {
    it('handles roo path', async () => {
        const response = await req.get('/')

        expect(response.status).toBe(200),
            expect(response.text).toBeTruthy(),
            expect(response.text).toEqual('Hello World!')
    });
});
