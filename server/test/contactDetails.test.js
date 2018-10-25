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
      fullname: 'Amaka Mgbe',
      username: 'dinma1',
      password: 'olufayo1',
      confirmPassword: 'olufayo1',
      email: 'dinma1@gmail.com',
      category: 'frontend developer'
    };
   chai.request(app)
      .post('/api/users')
      .send(userDetails)
      .end((err, res) => {
        if(err) done(err);

      expect(res).to.have.status(201);
        expect(res.body).to.have.property('message')
        expect(res.body).to.have.property('user')
        expect(res.body.message).to.equal('signed up successfully');
        done();
      });
  }).timeout(50000);

  it('should register a new user', (done) => {
    // HTTP POST -> REGISTER A NEW USER
    const userDetails = {
      fullname: 'Amaka Mgbe',
      username: 'dinma1',
      password: 'olufayo1',
      confirmPassword: 'olufayo1',
      email: 'dinma1@gmail.com',
      category: 'frontend developer'
    };
    chai.request(app)
      .post('/api/users')
      .send(userDetails)
      .end((err, res) => {
        if(err) done(err);

      expect(res).to.have.status(400);
        expect(res.body).to.have.property('message')
        expect(res.body.message).to.equal('username already exist');
        done();
      });
  }).timeout(5000);


  it('should not get a user that does not exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users/66')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body.message).to.equal('contact not found');
        done();
      });
  });

  it('should get a user that exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('contact found successfully');
        done();
      });
  });

  it('should get all users that exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.message).to.eql('All contacts');
        done();
      });
  });



  it('it should not update user details if user doesnt exist', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/users/21')
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
        done();
      });
  });

  it('it should update user details', (done) => {
    // HTTP PUT -> DON'T UPDATE A BUSINESS
    chai.request(app)
      .put('/api/users/1')
      .send({
        fullname: 'Fred Mgbeoma1',
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
        done();
      });
  });

  it('should delete a user that exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .delete('/api/users/1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.eql('contact successfully deleted');
        done();
      });
  });

  it('should not delete a user that does not exist', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .delete('/api/users/34')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('contact not found');
        done();
      });
  });

  it('should not get any contact', (done) => {
    // HTTP POST -> DONT GET A USER
    chai.request(app)
      .get('/api/users')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body.message).to.equal('contacts not found');
        done();
      });
  }).timeout(5000);
});


