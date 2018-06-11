const expect = require("chai").expect;
const assert = require("chai").assert;

const sqs = require('../../../../shared/lib/sqs');

describe("#sqs library signature", () => {

    it("#Have save() method", () => {
        expect(sqs).to.be.an('object').and.include.all.keys('save');
        expect(sqs.save).to.be.an('function');
    });

    it("#Have sendToQueue() method", () => {
        expect(sqs).to.be.an('object').and.include.all.keys('sendToQueue');
        expect(sqs.sendToQueue).to.be.an('function');
    });

    it("#Have consumeQueue() method", () => {
        expect(sqs).to.be.an('object').and.include.all.keys('consumeQueue');
        expect(sqs.consumeQueue).to.be.an('function');
    });

    it("#Have removeFromQueue() method", () => {
        expect(sqs).to.be.an('object').and.include.all.keys('removeFromQueue');
        expect(sqs.removeFromQueue).to.be.an('function');
    });


});