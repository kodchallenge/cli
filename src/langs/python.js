const fs = require("fs");
const path = require("path");

const MAIN = `
from solution import {FUNCTION_NAME}
import sys
argv = sys.argv[1:]

{VERIABLES}

{FUNCTION_NAME}({FUNCTION_ARGS})
`;

const SOLUTION = `
"""
{PARAMATER_DESCRIPTION}
"""
def {FUNCTION_NAME}({FUNCTION_ARGS}):
    raise NotImplementedError()

`;

const types = {
  int: {
    name: "",
    parser: (arg) => `int(${arg})`,
  },
  string: {
    name: "",
    parser: (arg) => `${arg}`,
  },
  char: {
    name: "",
    parser: (arg) => `${arg}[0]`,
  },
  double: {
    name: "",
    parser: (arg) => `float(${arg})`,
  },
};

const generate = (dir, functionName, inputs) => {
  const langPath = path.join(dir, "py")
  fs.mkdirSync(langPath, { recursive: true })

  const mainCode = MAIN
    .replace(/{FUNCTION_NAME}/g, functionName)
    .replace("{VERIABLES}", inputs.map((x, i) => `${x.name} = ${types[x.type].parser(`argv[${i}]`)}`).join("\n"))
    .replace("{FUNCTION_ARGS}", inputs.map((x) => `${x.name}`).join(", "));

  const solutionFile = SOLUTION.replace(/{FUNCTION_NAME}/g, functionName)
  .replace("{FUNCTION_ARGS}", inputs.map((x) => `${x.name}`).join(", "))
  .replace("{PARAMATER_DESCRIPTION}", inputs.map((x) => `${x.name}: ${x.type}`).join("\n"));

  fs.writeFileSync(path.join(langPath, "main.py"), mainCode);
  fs.writeFileSync(path.join(langPath, "solution.py"), solutionFile);
  console.log("Generated Python 🎉");
};

exports.generatePython = generate;