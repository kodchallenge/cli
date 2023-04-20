const { generateC } = require("./c");
const { generateCpp } = require("./cpp");
const { generateJS } = require("./javascript");
const { generatePython } = require("./python");

exports.languages = {
    cpp: {
        generate: generateCpp
    },
    c:  {
        generate: generateC
    },
    js:  {
        generate: generateJS
    },
    py: {
        generate: generatePython
    }
}