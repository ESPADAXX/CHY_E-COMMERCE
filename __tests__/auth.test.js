const Request = require('supertest')
const Account=require('../src/models/Account')
let server
describe('AUTHENTICAT TESTS', () => {
    beforeEach(() => {
        server=require('../src/index')
    })

    afterAll(() => {
        server.close();
        Account.collection.deleteMany();
    })
<<<<<<< HEAD
     it('should return error code 400 because the confirmation password not matches the password', async () => {
=======
     it.only('should return error code 400 because the confirmation password not matches the password', async () => {
>>>>>>> e9de816f6f73954f30115f2ef8a1e1783321cbab
            const response = await Request(server)
                .post('/auth/register')
                .send({
                    fullName: 'houssam',
                    email: 'daoudi.houssam.03@gmail.com',
                    password: '123456789',
                    confirmPassword: '12345678910'
                })
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.errors).toEqual([{ "field": "confirmPassword", "message": "Passwords do not match" } ]);
        })
    it('should register a new user by sending status code 201 and send a real email', async () => {
        const response = await Request(server)
            .post('/auth/register')
            .send({
                fullName: 'houssam',
                email: 'daoudi.houssam.03@gmail.com',
                password: '123456789',
                confirmPassword: '123456789'
            })
      expect(response.statusCode).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toContain('User registered successfully. Verification email sent.');
    })
    it('should return error code 409 because the user already exists', async () => {
            const response = await Request(server)
                .post('/auth/register')
                .send({
                    fullName: 'houssam',
                    email: 'daoudi.houssam.03@gmail.com',
                    password: '123456789',
                    confirmPassword: '123456789'
                })
        expect(response.statusCode).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toContain('User already exists.');
        })
})