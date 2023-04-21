const { generateC } = require("./c");
const { generateCpp } = require("./cpp");
const { generateJS } = require("./javascript");
const { generatePython } = require("./python");
const { generateTS } = require("./typescript");

exports.languages = {
    cpp: {
        generate: generateCpp,
        ext: "cpp"
    },
    c:  {
        generate: generateC,
        ext: "c"
    },
    js:  {
        generate: generateJS,
        ext: "js"
    },
    ts:  {
        generate: generateTS,
        ext: "ts"
    },
    py: {
        generate: generatePython,
        ext: "py"
    }
}