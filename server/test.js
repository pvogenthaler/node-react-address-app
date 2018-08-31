const request = require('supertest');
const app = require('./app.js');

describe('GET /addresses', () => {
  it('respond with json', (done) => {
    request(app)
      .get('/addresses')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        console.error('Error getting /addresses: ', err);
        done();
      });
  });
});

describe('GET /', () => {
  it('respond with html', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'text/html')
      .expect('Content-Type', /html/)
      .expect(200)
      .end((err, res) => {
        console.error('Error getting /: ', err);
        done();
      });
  });
});
