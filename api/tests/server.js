var chaiHttp = require('chai-http');
var chai = require("chai")
var app = require("../src/server");
const { assert } = require('chai');

chai.use(chaiHttp);
chai.should();


describe("App Endpoints", function() {
    describe("/prime/", function() {
        it("Checks a small prime number", function() {
        chai.request(app)
            .get('/prime/2')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(res.body.result, "prime")
            });
        });

        it("Checks a large prime number.", function() {
            chai.request(app)
                .get('/prime/59557')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert.equal(res.body.result, "prime")
                });
        });

        it("Checks a small non-prime number.", function() {
            chai.request(app)
                .get('/prime/4')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert.equal(res.body.result, "not prime")
                });
        });

        it("Checks a large non-prime number.", function() {
            chai.request(app)
                .get('/prime/57488')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    assert.equal(res.body.result, "not prime")
                });
        });

        it("Checks too big of a number.", function() {
            chai.request(app)
                .get('/prime/123879123871293873129812379')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    assert.equal(res.body.error, "too long of number")
                });
        });
    });
});