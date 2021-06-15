const { assert } = require("chai");
var should = require('chai').should();
var chai = require("chai")
var {checkIfPrime} = require("../../src/routes/Prime")


describe("Prime Function", function() {
    describe("Checks if a number is prime", function() {
        it("Checks a small prime number", function(done) {
            checkIfPrime(2)
            .then(res => {
                assert.equal(res, true)
                done()
            })
        });
        
        it("Checks a large prime number", function(done) {
            checkIfPrime(59557)
            .then(res => {
                assert.equal(res, true)
                done()
            })
        });

        it("Checks a small non prime number", function(done) {
            checkIfPrime(4)
            .then(res => {
                assert.equal(res, false)
                done()
            })
        });

        it("Checks a large non prime number", function(done) {
            checkIfPrime(57488)
            .then(res => {
                assert.equal(res, false)
                done()
            })
        });
    });
});