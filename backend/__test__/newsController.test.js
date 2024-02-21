const request = require('supertest');
const app = require('../src/app.js');
const bcrypt = require('bcryptjs'); 
const { mongooseConnect, mongooseDisconnect } = require('../src/utils/database.js');

describe('Test CRUD operations for /api/news', () => {
    beforeAll(async () => {
        await mongooseConnect();
    });

    afterAll(async () => {
        await mongooseDisconnect();
    });



    const newsData = {
        id: '261',
        title: 'Teliakunder opplever problemer111w',
        image: 'https://images.unsplash.com/photo-1607124010809-e2d512ef5ea8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvbmUlMjB0ZWxlY29tbXVuaWNhdGlvbnN8ZW58MHx8MHx8fDA%3D',
        text: 'Informasjonssjef i Telia, Daniel Barhom, bekrefter overfor VG at enkelte av kundene deres opplever problemer med oppsett av telefonsamtaler. Enkelte av våre kunder kan oppleve problemer med å ringe ut, skriver Barhom i en SMS De jobber nå med å kartlegge omfanget og årsaken til problemetVi jobber for fullt med feilsøking, og beklager så mye overfor berørte kunder, skriver Barhom i en SMS.Informasjonssjefen forteller at de som er kunder av datterselskapet OneCall, også vil kunne oppleve de samme problemene',
        name: 'admin',
    }
    
    const newsDataWithOutData = {
        id: '2s2',
        title: 'Teliakunders opplever psroblemerww',
        image: 'https://images.unsplash.com/photo-1607124010809-e2d512ef5ea8?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGhvbmUlMjB0ZWxlY29tbXVuaWNhdGlvbnN8ZW58MHx8MHx8fDA%3D',
        text: 'Informasjonssjef i Telia, Daniel Barhom, bekrefter overfor VG at enkelte av kundene deres opplever problemer med oppsett av telefonsamtaler. Enkelte av våre kunder kan oppleve problemer med å ringe ut, skriver Barhom i en SMS De jobber nå med å kartlegge omfanget og årsaken til problemetVi jobber for fullt med feilsøking, og beklager så mye overfor berørte kunder, skriver Barhom i en SMS.Informasjonssjefen forteller at de som er kunder av datterselskapet OneCall, også vil kunne oppleve de samme problemene',
    };

    
   

    test('Create a new news article with incomplete data - POST /api/news', async () => {
        const response = await request(app)
            .post('/api/news')
            .send(newsDataWithOutData);

        expect(response.status).toBe(400);
    });

    test('Get all news articles - GET /api/news', async () => {
        const response = await request(app)
            .get('/api/news');

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Object); 
    });

    test('Attempt to create a new news article with incomplete data - POST /api/news', async () => {
        const response = await request(app)
            .post('/api/news')
            .send(newsDataWithOutData);

        expect(response.status).toBe(400);
    });

   
});
