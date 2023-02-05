/**
 *  @author Yasin Torun
 *  
 *  @usage kc create {slug} --dir=dir
 *  Example: kc create hello-world
 * 
 *  {slug} => english alphabet & kebab-case 
 *  --dir: Where to create the argument 
 */

const path = require("path")
const fs = require("fs")

exports.createProblem = async () => {
    try {

        const args = require("yargs").argv
        // If --dir arg is undefined, get current directory.
        const dir = args.dir ?? process.cwd();

        if (!process.argv[3]) {
            throw new Error("Slug is required.\nExample: kc create hello-world")
        }
        const slug = process.argv[3].toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => '-' + chr).trim();
        if (!fs.existsSync(dir)) {
            throw new Error("Invalid dir path.")
        }
        const problemPath = path.join(dir, slug)
        fs.mkdirSync(problemPath)
        fs.mkdirSync(path.join(problemPath, "langs"))
        fs.writeFileSync(path.join(problemPath, "description.md"), `# ${slug.split("-").map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(" ")}`)
        fs.writeFileSync(path.join(problemPath, "io.json"), `[\n\t{\n\t\t"input": "",\n\t\t"output": ""\n\t}\n]`)
    } catch (err) {
        console.error(err.message)
    }
}