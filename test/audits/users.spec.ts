process.env.NODE_ENV = 'test';
import { BASE_URL, AUTH_ID } from '../../src/config';
// import mongoose from 'mongoose';
// import auditModel from '../../src/models/audits.model';

import chai from 'chai';
import chaiHttp from 'chai-http';
chai.should();
const expect = chai.expect;

chai.use(chaiHttp);

describe('/First test collections', () => {
  it('should test two values', () => {
    const a = 10;
    const b = 10;
    expect(a).to.be.equal(b);
  });
});

describe('/Login', () => {
  let token: string;
  before(done => {
    chai
      .request(BASE_URL)
      .post('/users/login')
      .send({ authId: AUTH_ID })
      .end((err, res) => {
        token = res.body.data;
        done();
      });
  });
  describe('Get Users', () => {
    it('It should get all the users', done => {
      chai
        .request(BASE_URL)
        .get('/users')
        .set('authorization', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.data.should.be.a('array');
          res.body.data.length.should.be.not.eql(0);
          done();
        });
    });
  });
});
