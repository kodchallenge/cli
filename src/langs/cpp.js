const fs = require("fs")
const path = require("path")

const RUNNER_CODE =
    `#include "solution.hpp"
#include <iostream>
#include <string>
#include <cstdlib>

int main(int argc, char* argv[]) {
    {VERIABLES}
    kod::{FUNCTION_NAME}({FUNCTION_ARGS});
    return 0;
}`

const SOLUTION_HPP =
    `#ifndef SOLUTION_HPP
#define SOLUTION_HPP
#endif

namespace kod {
    void {FUNCTION_NAME}({FUNCTION_ARGS});
}`

const SOLUTION_CPP =
    `#include "solution.hpp"
#include <iostream>

namespace kod {
    void {FUNCTION_NAME}({FUNCTION_ARGS}) {
        throw "Implementation this function";
    };
}`

const types = {
    int: {
        name: "int",
        parser: (arg) => `stoi(${arg})`
    },
    string: {
        name: "std::string",
        parser: (arg) => `${arg}`
    },
    char: {
        name: "char",
        parser: (arg) => `${arg}[0]`
    },
    double: {
        name: "double",
        parser: (arg) => `atof(${arg})`
    }
}

const generate = (dir, langPath, inputs) => {
    const functionName = path.basename(dir).replace(/-./g, x => x[1].toUpperCase());

    const runnerCode = RUNNER_CODE
        .replace("{FUNCTION_NAME}", functionName)
        .replace("{VERIABLES}", inputs.map((x, i) => `${types[x.type].name} ${x.name} = ${types[x.type].parser(`argv[${i + 1}]`)};`).join("\n\t") ?? "")
        .replace("{FUNCTION_ARGS}", inputs.map(x => x.name).join(", "))

    const solutionHpp = SOLUTION_HPP
        .replace("{FUNCTION_NAME}", functionName)
        .replace("{FUNCTION_ARGS}", inputs.map(x => `${types[x.type].name} ${x.name}`).join(", "))

    const solutionCpp = SOLUTION_CPP
        .replace("{FUNCTION_NAME}", functionName)
        .replace("{FUNCTION_ARGS}", inputs.map(x => `${types[x.type].name} ${x.name}`).join(", "))

    fs.writeFileSync(path.join(langPath, "runner.cpp"), runnerCode)
    fs.writeFileSync(path.join(langPath, "solution.hpp"), solutionHpp)
    fs.writeFileSync(path.join(langPath, "solution.cpp"), solutionCpp)
    console.log("Generated 🎉")
}

exports.generateCpp = generate;