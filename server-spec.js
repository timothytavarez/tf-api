const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = require('chai').should();
const server = require('./server');

chai.use(chaiAsPromised);

describe("GET | / ROUTE", function() {
    it("it should return a 200 status code", function() {
        return server.inject('/').should.eventually.have.property("statusCode", 200);
    });
});

describe("GET | /states ROUTE", function() {
    it("it should return a 200 status code", function() {
        return server.inject('/states').should.eventually.have.property("statusCode", 200);
    });
});