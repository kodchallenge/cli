/**
 * kc g --lang=cpp --dir=C:\problems
 * --lang is required.
 * --dir opsionel. Default is current directory.
 */

const path = require("path")
const fs = require("fs")

exports.generate = () => {
    try {
        const args = require("yargs").argv
        const lang = args.lang;
        if (!lang)
            throw new Error("--lang argument is required")

        const language = langs[lang]
        if (!language)
            throw new Error("--lang is invalid.")

        const dir = args.dir ?? process.cwd();

        const langPath = path.join(dir, "langs", lang)
        fs.mkdirSync(langPath, { recursive: true })

        const problemArgs = (args.args ?? "").split(",");
        const inputs = problemArgs.filter(x => x?.includes(":")).map(x => {
            const tiles = x.split(":");
            if (tiles?.length != 2 || !["int", "string", "double", "char"].includes(tiles[1]))
                throw new Error("--args is invalid.")
            return {
                type: tiles[1],
                name: tiles[0]
            }
        })
        const slug = path.basename(dir);
        const functionName = language.getFunctionName(slug)
        const runnerCode = language.runner
        .replace("{FUNCTION_NAME}", functionName)
        .replace("{VERIABLES}", inputs.map((x,i) => `${x.type} ${x.name} = ${language.types[x.type].parser(i)};`).join("\n\t") ?? "")
        .replace("{FUNCTION_ARGS}", inputs.map(x => x.name).join(", "))
        
        console.log(runnerCode)
    } catch (err) {
        console.error(err.message)
    }
}

const langs = {
    cpp: {
        getFunctionName: (slug) =>  slug.replace(/-./g, x=>x[1].toUpperCase()),
        types: {
            int: {
                name: "int",
                parser: (i) => `stoi(argv[${i + 1}])`
            },
            string: {
                name: "std::string",
                parser: (i) => `argv[${i + 1}]`
            },
            char: {
                name: "char",
                parser: (i) => `argv[${i + 1}][0]`
            },
            double: {
                name: "double",
                parser: (i) => `atof(argv[${i + 1}])`
            }
        },
        runner:
            `#include "base.hpp"
#include <iostream>
#include <string>
#include <cstdlib>

int main(int argc, char* argv[]) {
    {VERIABLES}
    kod::{FUNCTION_NAME}({FUNCTION_ARGS});
    return 0;
}
`
    }
}