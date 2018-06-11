const expect = require("chai").expect;
const assert = require("chai").assert;

const parser = require('../../../../shared/lib/parsers');

describe("#parsers library signature", () => {

    it("#Have parseStringToObject() method", () => {
        expect(parser).to.be.an('object').and.include.all.keys('parseStringToObject');
        expect(parser.parseStringToObject).to.be.an('function');
    });

    it("#Have parseObjectToString() method", () => {
        expect(parser).to.be.an('object').and.include.all.keys('parseObjectToString');
        expect(parser.parseObjectToString).to.be.an('function');
    });

    it("#Have parseEvent() method", () => {
        expect(parser).to.be.an('object').and.include.all.keys('parseEvent');
        expect(parser.parseEvent).to.be.an('function');
    });

});

describe("#parsers library functions", () => {

    it("#Parse string to object with success", () => {
        const original = {
            foo: "bar",
            acme: "lalala"
        };
        const originalString = JSON.stringify(original);
        expect(parser.parseStringToObject(originalString)).to.be.a('object');
    });

    it("#Parse string to object and fail", () => {
        const original = "foo:bar";
        expect(parser.parseStringToObject(original)).to.be.a('object').and.to.deep.equal({});
    });

    it("#Parse object to string with success", () => {
        const originalString = '{"foo":"bar","acme":"lalala"}';
        const original = {
            foo: "bar",
            acme: "lalala"
        };
        expect(parser.parseObjectToString(original)).to.be.equals(originalString);
    });

    it("#Parse object to string and fail", () => {
        const original = "foo:bar";
        expect(parser.parseObjectToString(original)).to.be.equals(original);
    });

    it("#Parse lambda event with body", () => {
        const body = {foo: "bar"};
        const event = {body:  JSON.stringify(body)};
        expect(parser.parseEvent(event)).to.be.a('object').and.to.deep.equal(body);
    });
});