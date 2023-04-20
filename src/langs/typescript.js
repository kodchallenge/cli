const fs = require("fs")
const path = require("path")

const MAIN =
`const { {FUNCTION_NAME} } = require("./solution.ts")
const argv: string[] = process.argv.slice(2);
{VERIABLES}
{FUNCTION_NAME}({FUNCTION_ARGS});
`

const SOLUTION =
`export function {FUNCTION_NAME}({FUNCTION_ARGS}) {
    throw "Implementation this function";
};`

const types = {
    int: {
        name: "const",
        parser: (arg) => `parseInt(${arg})`,
        type: "number"
    },
    string: {
        name: "const",
        parser: (arg) => `${arg}`,
        type: "string"
    },
    char: {
        name: "const",
        parser: (arg) => `${arg}[0]`,
        type: "string"
    },
    double: {
        name: "const",
        parser: (arg) => `parseFloat(${arg})`,
        type: "number"
    }
}

const generate = (dir, langPath, inputs) => {
    const functionName = path.basename(dir).replace(/-./g, x => x[1].toUpperCase());

    const mainCode = MAIN
        .replace(/{FUNCTION_NAME}/g, functionName)
        .replace("{VERIABLES}", inputs.map((x, i) => `${types[x.type].name} ${x.name}: ${types[x.type].type} = ${types[x.type].parser(`argv[${i}]`)};`).join("\n") ?? "")
        .replace("{FUNCTION_ARGS}", inputs.map(x => x.name).join(", "))

    const solutionFile = SOLUTION
        .replace(/{FUNCTION_NAME}/g, functionName)
        .replace("{FUNCTION_ARGS}", inputs.map(x => `${x.name}: ${types[x.type].type}`).join(", "))

    fs.writeFileSync(path.join(langPath, "main.ts"), mainCode)
    fs.writeFileSync(path.join(langPath, "solution.ts"), solutionFile)
    console.log("Generated 🎉")
}

exports.generateTS = generate;