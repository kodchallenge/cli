const { createProblem } = require("./createProblem");
const { generate } = require("./generate");

exports.commands = {
    create: createProblem,
    g: generate,
}