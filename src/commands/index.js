const { createProblem } = require("./createProblem");
const { generate } = require("./generate");
const { uploadProblem } = require("./uploadProblem");

exports.commands = {
    create: createProblem,
    g: generate,
    upload: uploadProblem
}