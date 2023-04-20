const { generateC } = require("./c");
const { generateCpp } = require("./cpp");
const { generateJS } = require("./javascript");
const { generatePython } = require("./python");
const { generateTS } = require("./typescript");

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
    ts:  {
        generate: generateTS
    },
    py: {
        generate: generatePython
    }
}