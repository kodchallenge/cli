#!/usr/bin/env node

const { commands } = require("./commands");

/**@type string[] */
const args = process.argv;

try {
    if (args.length < 3) {
        throw new Error(`Wrong format. Use this actions\n\ncreate: Creates a problem\ng: Creates a language solution based on the --lang argument it receives.`)
    }
    const cmdName = args[2];

    const cmdAction = commands[cmdName];

    if (typeof cmdAction !== "function") {
        throw new Error("Command name not found")
    }
    cmdAction()
} catch (err) {
    console.log(err.message)
}
