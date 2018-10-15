const expect = require("chai").expect;
const assert = require("chai").assert;


const readBook = require('../../../../../modules/books/endpoints/read');

describe("#test read book", () => {

    const event = {};

    readBook.read(JSON.stringify(event), {}, (err, obj) => {
        
    });

});