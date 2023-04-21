/**
 * kc g --lang=cpp --dir=C:\problems
 * --lang is required.
 * --dir opsionel. Default is current directory.
 */

const path = require("path")
const fs = require("fs");
const { languages } = require("../langs");

exports.generate = () => {
    try {
        const args = require("yargs").argv
        const lang = args.lang;

        const basePath = args.dir ?? process.cwd();
        const name = args.name ?? ""
        const dir = path.join(basePath, name)
        const functionName = name.replace(/-./g, x => x[1].toUpperCase()); // kebab case to camel case

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
        console.log(lang)
        if(lang) {
            const language = languages[lang]
            if (!language)
            throw new Error("--lang is invalid.")
            language.generate(dir, functionName, inputs)
            return;
        }
        const langs = Object.keys(languages)
        langs.map(lang => {
            const language = languages[lang]
            language.generate(dir, functionName, inputs)
        })
    } catch (err) {
        console.error(err.message)
    }
}