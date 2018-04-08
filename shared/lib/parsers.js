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

module.exports.parseEvent = event => {
    try {
        const body = event.body ? event.body : event;
        return JSON.parse(body);
    } catch (error) {
        return event;
    }
}
