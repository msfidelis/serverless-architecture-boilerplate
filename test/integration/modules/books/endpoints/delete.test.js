const expect = require("chai").expect;
const assert = require("chai").assert;


const deleteBook = require('../../../../../modules/books/endpoints/delete');

describe("#test delete book", () => {

    const event = {};

    deleteBook.delete(JSON.stringify(event), {}, (err, obj) => {
        
    });

});