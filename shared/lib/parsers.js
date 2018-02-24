'use strict';

module.exports.parseObjectToString = obj => {
    if (typeof obj == "object") {
        return JSON.stringify(obj);
    } else {
        return obj;
    } 
}

module.exports.parseStringToObject = str => {

    try {
        return JSON.parse(str);
    } catch (error) {
        return {};
    }

};
