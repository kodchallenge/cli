const fs = require("fs")
const path = require("path")

const MAIN_CODE =
    `#include "solution.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int* getIntArray(char* str) {
    int* nums = malloc(sizeof(int) * strlen(str) / 2 + 1);
    char *numsStr = strtok(str, " ");
    for(int i = 0; numsStr != NULL; i++) {
        nums[i] = atoi(numsStr);
        numsStr = strtok(NULL, " ");
    }
    return nums;
}


double* getDoubleArray(char* str) {
    double* nums = malloc(sizeof(double) * strlen(str) / 2 + 1);
    char *numsStr = strtok(str, " ");
    for(int i = 0; numsStr != NULL; i++) {
        nums[i] = atof(numsStr);
        numsStr = strtok(NULL, " ");
    }
    return nums;
}

int main(int argc, char* argv[]) {
    {VERIABLES}
    {FUNCTION_NAME}({FUNCTION_ARGS});
    return 0;
}`

const SOLUTION_H =
    `#ifndef SOLUTION_HPP
#define SOLUTION_HPP
#endif

void {FUNCTION_NAME}({FUNCTION_ARGS});
`

const SOLUTION_C =
    `#include "solution.h"
#include <stdio.h>

void {FUNCTION_NAME}({FUNCTION_ARGS}) {
    throw "Implementation this function";
};`

const types = {
    int: {
        name: "int",
        parser: (arg) => `atoi(${arg})`
    },
    string: {
        name: "char*",
        parser: (arg) => `${arg}`
    },
    char: {
        name: "char",
        parser: (arg) => `${arg}[0]`
    },
    double: {
        name: "double",
        parser: (arg) => `atof(${arg})`
    },
    intArr: {
        name: "int*",
        parser: (arg) => `getIntArray(${arg})`
    },
    doubleArr: {
        name: "double*",
        parser: (arg) => `getDoubleArray(${arg})`
    },
}

const generate = (dir, functionName, inputs) => {
   const langPath = path.join(dir, "c")
   fs.mkdirSync(langPath, { recursive: true })
    const mainCode = MAIN_CODE
        .replace("{FUNCTION_NAME}", functionName)
        .replace("{VERIABLES}", inputs.map((x, i) => `${types[x.type].name} ${x.name} = ${types[x.type].parser(`argv[${i + 1}]`)};`).join("\n\t") ?? "")
        .replace("{FUNCTION_ARGS}", inputs.map(x => x.name).join(", "))

    const solutionHeader = SOLUTION_H
        .replace("{FUNCTION_NAME}", functionName)
        .replace("{FUNCTION_ARGS}", inputs.map(x => `${types[x.type].name} ${x.name}`).join(", "))

    const solutionFile = SOLUTION_C
        .replace("{FUNCTION_NAME}", functionName)
        .replace("{FUNCTION_ARGS}", inputs.map(x => `${types[x.type].name} ${x.name}`).join(", "))

    fs.writeFileSync(path.join(langPath, "main.c"), mainCode)
    fs.writeFileSync(path.join(langPath, "solution.h"), solutionHeader)
    fs.writeFileSync(path.join(langPath, "solution.c"), solutionFile)
    console.log("Generated C 🎉")
}

exports.generateC = generate;