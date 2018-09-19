const expect = require("chai").expect;
const assert = require("chai").assert;


const create = require('../../../../../modules/books/endpoints/create');

describe("#[C]RUD - Books", () => {


    it("#Creating a Book", () => {

        const event = {
            headers: {},
            pathParameters: {},
            body: {}
        };
    
        create.create(JSON.stringify(event), {}, (err, obj) => {});

    });


});