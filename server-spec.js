const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const should = require('chai').should();
const server = require('./server');

chai.use(chaiAsPromised);

describe("GET | / ROUTE", function() {
    it("should return OK", function() {
        return server.inject('/').should.eventually.have.property("statusCode", 200);
    });
});