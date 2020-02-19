const request = require('supertest');
const app = require('./app');

test('testing server for / rout ', (done) => {
  request(app)
    .get('/')
    .expect(200)
    .end((err, res) => {
      if (err) done(err);
      done();
    });
});

test('testing server for /home rout', (done) => {
  request(app)
    .get('/home')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) done(err);
      done();
    });
});

test('testing server for 404 not found', (done) => {
  request(app)
    .get('/nothome')
    .expect(404)
    .expect('Content-Type', /html/)
    .end((err, res) => {
      if (err) done(err);
      done();
    });
});

test('testing server for /search rout"', (done) => {
  request(app)
    .post('/search')
    .set({
      'Content-Type': 'application/json',
    })
    .send(JSON.stringify({ title: 'bitcoin' }))
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      expect(Array.isArray(res.body.articles)).toBeTruthy();
      expect('source' in res.body.articles[0]).toBeTruthy();

      done();
    });
});
