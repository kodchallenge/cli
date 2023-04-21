/*
    Burada bir problem yüklemek için kullanılan komutlar bulunmaktadır.
*/
const fs = require("fs")
const path = require("path");
const { languages } = require("../langs");
const kodConfig = require("../../kod.config");
exports.uploadProblem = async () => {
    
    const args = require("yargs").argv
    // If --dir arg is undefined, get current directory.
    const dir = args.dir ?? process.cwd();
    const title = args.title
    if(!title) {
        throw new Error("title is required.")
    }
    const slug = args.slug ?? title.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => '-' + chr).trim();
    const score = args.score
    if(!score) {
        throw new Error("score is required.")
    }
    const descriptionPath = path.join(dir, "description.md")
    const ioPath = path.join(dir, "io.json")

    if (!fs.existsSync(descriptionPath)) {
        throw new Error("description.md is required.")
    }
    if (!fs.existsSync(ioPath)) {
        throw new Error("io.json is required.")
    }
    const description = fs.readFileSync(descriptionPath, "utf-8")
    let io = fs.readFileSync(ioPath, "utf-8")
    io = JSON.stringify(JSON.parse(io))

    const langFolders = fs.readdirSync(dir)
        .filter(x => x != "description.md" && x != "io.json")

    const langs = langFolders.map((lang, i) => {
        const langDir = path.join(dir, lang, "solution."+languages[lang].ext)
        const code = fs.readFileSync(langDir, "utf-8")
        return {
            name: lang,
            code: code
        }
    })
    const problem = {
        title,
        slug,
        score,
        description,
        io,
        langs
    }
    console.log("Uploading problem...")
    fetch(kodConfig.API + "/v1/problems", {
        body: JSON.stringify(problem),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST"
    }).then(res => {
        if(res.status == 200) {
            console.log("Problem uploaded.")
        } else {
            console.log("Problem upload failed.\nHata: " + res.statusText)
        }
    })
}

const test = {
    "name": "hello-world",
    "description": "Hello World",
    "io": [
        {
            "input": "Hello World",
            "output": "Hello World"
        }
    ],
    "langs": [
        {
            "name": "cpp",
            "code": "int main() {\n\treturn 0;\n}"
        },
        {
            "name": "java",
            "code": "public class Main {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println(\"Hello World\");\n\t}\n}"
        }
    ]
}