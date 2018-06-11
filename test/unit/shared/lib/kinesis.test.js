const expect = require("chai").expect;
const assert = require("chai").assert;

const kinesis = require('../../../../shared/lib/kinesis');

describe("#kinesis library signature", () => {

    it("#Have save() method", () => {
        expect(kinesis).to.be.an('object').and.include.all.keys('save');
        expect(kinesis.save).to.be.an('function');
    });

});