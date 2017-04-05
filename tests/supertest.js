//Supertest for test an API

const request = require('supertest');
const expect = require('chai').expect;
const assert = require('chai').assert;
const express = require('express');
const mongoose = require('mongoose');
const should = require('should');
const sinon = require('sinon');
const User = require('../models/User.js');



describe('/', () => {
  describe('GET', () => {
    it('responds with 200 status and text/html content type', (done) => {
      request('http://localhost:3000')
        .get('/')
        .expect('Content-Type', /text\/html/)
        .expect(200)
        .end(() => done());
    });
  });
});

describe('Creating users', () => {

  it('POST request to "/user" route with correctly formatted body creates a user', (done) => {
    request('http://localhost:3000')
      .post('/user')
      .send({ "username": "test1", "password": "password1" })
      .end((err, res) => {
        User.findOne({ username: 'test1' }, (err, user) => {
          expect(err).to.be.null;
          expect(user).to.exist;
          done();
        });
      });
  });
});




