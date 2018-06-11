const expect = require("chai").expect;
const assert = require("chai").assert;

const parser = require('../../../shared/lib/parsers');

describe("#parsers library", () => {

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