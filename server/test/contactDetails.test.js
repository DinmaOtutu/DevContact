import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
// import testData from './Data';

chai.use(chaiHttp);
const should = chai.should();

describe('Contact details of developers', () => {
  it('should not register a user with password mismatch', (done) => {
    // HTTP POST -> DONT REGISTER A NEW USER
    const userDetails = {
      fullname: 'raji Orajiaku',
      username: 'Seyih',
      password: 'olufayo',
      confirmPassword: 'oluf',
      email: 'olufayo@gmail.com',
      category: 'frontend developer'
    };
    chai.request(app)
      .post('/api/users')
      .send(userDetails)
      .end((err, res) => {
        expect(res.body.message).to.equal('password does not match');
        expect(res.status).to.equal(400);
        done();
      });
  });

  it('it should not register a user with incomplete details', (done) => {
    // HTTP POST -> DONT REGISTER A NEW USER
    const userDetails = {
      fullname: 'Jeremiah Fred',
      username: '',
      password: 'olufayo',
      confirmPassword: 'olufayo',
      email: 'olufayo@gmail.com',
      category: 'frontend developer'
    };
    chai.request(app)
      .post('/api/users')
      .send(userDetails)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('please fill in the field(s)');
        done();
      });
  });

  it('should register a new user', (done) => {
    // HTTP POST -> REGISTER A NEW USER
    const userDetails = {
      fullname: 'Fred Mgbeoma',
      username: 'dinma',
      password: 'olufayo',
      confirmPassword: 'olufayo',
      email: 'dinma@gmail.com',
      category: 'frontend developer'
    };
    chai.request(app)
      .post('/api/users')
      .send(userDetails)
      .end((err, res) => {
        console.log(res, 'here i am bitchhh')
        res.should.have.property('status',201);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('user')
        expect(res.body.message).to.equal('signed up successfully');
        if (err) return done(err);
      });
      done();
  });
  
  it('should not get a user that does not exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users/5')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.message).to.equal('contact not found');
     
      });
      done();
  });

  it('should get a user that exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('contact found successfully');
       
      });
      done();
  });

  it('should not get a users that does not exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('contacts not found');
      
      });
      done();
  });

  it('should get all users that exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('all contacts');
       
      });
      done();
  });

  
  
  it('it should not update user details if user doesnt exist', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/users/5')
      .send({
        fullname: 'Jeremiah Fredrick',
        username: 'kaka',
        password: 'olufayo',
        confirmPassword: 'olufayo',
        email: 'olufayo1@gmail.com',
        category: 'frontend developer'
       
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.status).to.equal(404);
      });
      done();
  });

  it('it should update user details', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/users/1')
      .send({
        fullname: 'Fred Mgbeoma 1',
        username: 'dinma',
        password: 'olufayo',
        confirmPassword: 'olufayo',
        email: 'dinma@gmail.com',
        category: 'frontend developer'
      })
      .end((err, res) => {
        expect(res.body).to.have.property('message')
          .eql('contact updated successfully');
          expect(res).to.have.status(200);
      });
      done();
  });

  it('should delete a user that exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .delete('/api/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('contact successfully deleted');
       
      });
      done();
  });

  it('should not delete a user that does not exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .delete('/api/users/5')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('contacts not found');
      
      });
      done();
  });

});


