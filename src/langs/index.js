const { generateC } = require("./c");
const { generateCpp } = require("./cpp");
const { generateJS } = require("./javascript");

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
}