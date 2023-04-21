const fs = require("fs")
const path = require("path")

const MAIN =
`const { {FUNCTION_NAME} } = require("./solution.js")
var argv = process.argv.slice(2);
{VERIABLES}
{FUNCTION_NAME}({FUNCTION_ARGS});
`

const SOLUTION =
`function {FUNCTION_NAME}({FUNCTION_ARGS}) {
    throw "Implementation this function";
};

module.exports = { {FUNCTION_NAME} };`

const types = {
    int: {
        name: "var",
        parser: (arg) => `parseInt(${arg})`
    },
    string: {
        name: "var",
        parser: (arg) => `${arg}`
    },
    char: {
        name: "var",
        parser: (arg) => `${arg}[0]`
    },
    double: {
        name: "var",
        parser: (arg) => `parseFloat(${arg})`
    }
}

const generate = (dir, functionName, inputs) => {
    const langPath = path.join(dir, "js")
    fs.mkdirSync(langPath, { recursive: true })

    const mainCode = MAIN
        .replace(/{FUNCTION_NAME}/g, functionName)
        .replace("{VERIABLES}", inputs.map((x, i) => `${types[x.type].name} ${x.name} = ${types[x.type].parser(`argv[${i}]`)};`).join("\n") ?? "")
        .replace("{FUNCTION_ARGS}", inputs.map(x => x.name).join(", "))

    const solutionFile = SOLUTION
        .replace(/{FUNCTION_NAME}/g, functionName)
        .replace("{FUNCTION_ARGS}", inputs.map(x => `${x.name}`).join(", "))

    fs.writeFileSync(path.join(langPath, "main.js"), mainCode)
    fs.writeFileSync(path.join(langPath, "solution.js"), solutionFile)
    console.log("Generated JavaScript 🎉")
}

exports.generateJS = generate;