const expect = require("chai").expect;
const assert = require("chai").assert;


const updateBook = require('../../../../../modules/books/endpoints/update');

describe("#test update book", () => {

    const event = {};

    updateBook.update(JSON.stringify(event), {}, (err, obj) => {
        
    });

});