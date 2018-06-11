const expect = require("chai").expect;
const assert = require("chai").assert;

const uuid = require('../../../../shared/lib/uuid');

describe("#uuid library", () => {

    it("#Test UUID", () => {
        expect(uuid).to.be.a('function');
    });

    it("#Generate a simple UUID", () => {
        const id = uuid();
        expect(id).to.be.a('string');
    });

    it("#Don't duplicate", () => {
        expect(uuid()).to.not.equal(uuid());
    });
});