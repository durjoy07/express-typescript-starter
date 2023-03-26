// eslint-disable-next-line no-undef
process.env.NODE_ENV = 'test';
import chai from 'chai';
const expect = chai.expect;

// eslint-disable-next-line no-undef
describe('/First test collections', () => {
  // eslint-disable-next-line no-undef
  it('should test two values', () => {
    const a = 10;
    const b = 10;
    expect(a).to.be.equal(b);
  });
});
