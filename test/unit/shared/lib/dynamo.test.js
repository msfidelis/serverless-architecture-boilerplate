const expect = require("chai").expect;
const assert = require("chai").assert;

const dynamo = require('../../../../shared/lib/dynamo');

describe("#dynamodb library signature", () => {

    it("#Have save() method", () => {
        expect(dynamo).to.be.an('object').and.include.all.keys('save');
        expect(dynamo.save).to.be.an('function');
    });

    it("#Have find() method", () => {
        expect(dynamo).to.be.an('object').and.include.all.keys('find');
        expect(dynamo.find).to.be.an('function');
    });

    it("#Have query() method", () => {
        expect(dynamo).to.be.an('object').and.include.all.keys('query');
        expect(dynamo.query).to.be.an('function');
    });

    it("#Have scan() method", () => {
        expect(dynamo).to.be.an('object').and.include.all.keys('scan');
        expect(dynamo.scan).to.be.an('function');
    });

    it("#Have update() method", () => {
        expect(dynamo).to.be.an('object').and.include.all.keys('update');
        expect(dynamo.update).to.be.an('function');
    });

    it("#Have updateItem() method", () => {
        expect(dynamo).to.be.an('object').and.include.all.keys('updateItem');
        expect(dynamo.updateItem).to.be.an('function');
    });


});