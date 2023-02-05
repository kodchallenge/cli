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
        if (!lang)
            throw new Error("--lang argument is required")

        const language = languages[lang]
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
        language.generate(dir, langPath, inputs)
        
    } catch (err) {
        console.error(err.message)
    }
}