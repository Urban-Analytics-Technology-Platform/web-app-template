import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from 'node:url';

export function setupTemplate(
    dstDir, // string
    projectName, // string
    backendLanguage, // "python" | "rust" | "none"
) {
    const pathToTemplate = path.join(
        path.dirname(fileURLToPath(import.meta.url)),
        "template"
    );

    // The gitignore file needs to be treated specially. When running this
    // script locally, there is no problem with just copying .gitignore from
    // the source to destination. However, when running `npm create @uatp/web`,
    // npm will silently rename the .gitignore file to .npmignore so we need to
    // copy it from there. The following code ensures that the user gets a
    // .gitignore file regardless of whether they are running this script
    // locally or from npm.
    try {
        cp_r(".gitignore", pathToTemplate, dstDir);
    } catch { ; }
    try {
        fs.cpSync(
            path.join(pathToTemplate, ".npmignore"),
            path.join(dstDir, ".gitignore"),
            { recursive: true },
        );
    } catch { ;}

    // Copy files that will always be there
    // TODO: Don't copy things that match gitignore
    // This is not a problem when running the version published to npm, as the
    // npm package will not contain files which were gitignored. However this
    // is a problem when running locally as cp_r will happily copy things like
    // node_modules
    cp_r("README.md", pathToTemplate, dstDir);
    cp_r("LICENSE", pathToTemplate, dstDir);
    cp_r("web", pathToTemplate, dstDir);

    // Copy appropriate backend folder
    if (backendLanguage === "rust") {
        cp_r("rust_backend", pathToTemplate, dstDir);
        rm("web/src/lib/python_worker.ts", dstDir);
    }
    else if (backendLanguage === "python") {
        cp_r("python_backend", pathToTemplate, dstDir);
        rm("web/src/lib/rust_worker.ts", dstDir);
    }

    // Patch package.json
    const packageJsonPath = path.join(dstDir, "web/package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    const patchedPackageJson = patchPackageJson(packageJson, projectName, backendLanguage);
    fs.writeFileSync(packageJsonPath, JSON.stringify(patchedPackageJson, null, 2));

    // Patch some files
    patchWrapper(dstDir, backendLanguage, ".gitignore", magicCommentRgxGitIgnore, uncommentGitIgnore);
    // TODO: Eventually we want to loop over all files in the web folder and
    // patch them. If they're .ts files, just run the uncommentTs. If they're
    // .svelte files, run both uncommentTs and uncommentHtml.
    patchWrapper(dstDir, backendLanguage, "web/vite.config.ts", magicCommentRgxTs, uncommentTs);
    patchWrapper(dstDir, backendLanguage, "web/src/routes/+page.svelte", magicCommentRgxTs, uncommentTs);
    patchWrapper(dstDir, backendLanguage, "web/src/routes/globals.ts", magicCommentRgxTs, uncommentTs);
    patchWrapper(dstDir, backendLanguage, "web/src/routes/ColourMode.svelte", magicCommentRgxTs, uncommentTs);
    patchWrapper(dstDir, backendLanguage, "web/src/routes/ColourMode.svelte", magicCommentRgxHtml, uncommentHtml);
}


function patchWrapper(
    dstDir,  // string
    backendLanguage, // "python" | "rust" | "none"
    fileNameRel, // string
    magicCommentRgx, // RegExp
    uncommentFunc, // (line: string) => string
) { // -> void
    const dstPath = path.join(dstDir, fileNameRel);
    const lines = fs.readFileSync(dstPath, "utf8").split("\n");
    const patchedLines = patch(lines, backendLanguage, fileNameRel, magicCommentRgx, uncommentFunc);
    fs.writeFileSync(dstPath, patchedLines.join("\n"));
}

function patch(
    inputLines, // string[]
    backendLanguage, // "python" | "rust" | "none"
    fileNameRel, // string
    magicCommentRgx, // RegExp
    uncommentFunc, // (line: string) => string
) { // -> string[]
    // This function generates a state machine which traverses the file line by
    // line. When it encounters a line that contains only the comment:
    //
    //     // @@STATE
    //
    // it will set its state to STATE. Whitespace around the comment is ignored.
    //
    // Depending on the value of the state, it then does different things to the
    // lines of code it sees:
    //
    //  'template': The lines will be omitted. This is because the lines are
    //              meant to be only present in the template itself to allow the
    //              template to be tested.
    //  'rust'    : The lines will be uncommented and included, but only if the
    //              target backend language is Rust.
    //  'python'  : The lines will be uncommented and included, but only if the
    //              target backend language is Python.
    //  'none'    : The lines will be uncommented and included, but only if no
    //              backend language is selected.
    //  'normal'  : The lines will be included as is. This is for code that is
    //              required for all cases, and is the default state.
    //
    // The filename argument is used only for error messages.
    let state = "normal";

    const outputLines = [];
    let lineNum = 0;
    for (const line of inputLines) {
        lineNum++;
        // Update the state
        const match = line.trim().match(magicCommentRgx);
        if (match) {
            const newState = match[1];
            if (newState === "template" || newState === "python" || newState === "rust" || newState === "none" || newState === "normal") {
                state = newState;
                // Skip the line, because we don't want these magic comments to
                // be included in the output
                continue;
            } else {
                throw new Error(`Invalid state: '${newState}' in ${fileNameRel}:${lineNum}`);
            }
        }

        // Process the line accordingly
        if (state === "template") {
            continue;
        }
        else if (state === "python") {
            if (backendLanguage === "python") {
                outputLines.push(uncommentFunc(line));
            } else continue;
        }
        else if (state === "rust") {
            if (backendLanguage === "rust") {
                outputLines.push(uncommentFunc(line));
            } else continue;
        }
        else if (state === "none") {
            if (backendLanguage === "none") {
                outputLines.push(uncommentFunc(line));
            } else continue;
        }
        else if (state === "normal") {
            outputLines.push(line);
        }
    }
    // If we reach the end of the file while in a special state, that's an error
    if (state !== "normal") {
        throw new Error(`Unexpected end of file while in state '${state}' in ${fileNameRel}`);
    }

    return outputLines
}


function patchPackageJson(
    packageJson, // object (parsed package.json)
    projectName, // string,
    backendLanguage, // "python" | "rust" | "none"
) { // -> object
    // Fix project name
    packageJson.name = projectName;

    // Fix scripts
    const scripts = new Map(Object.entries(packageJson.scripts)); // Map<string, string>
    const prefix = `@@${backendLanguage} `;  // Note the space at the end
    // Override any entries that start with the prefix
    const entriesToOverride = [...scripts.entries()]
        .filter(([key, _]) => key.startsWith(prefix))
        .map(([key, val]) => [key.slice(prefix.length), val]);
    for (const [key, val] of entriesToOverride) {
        scripts.set(key, val);
    }
    // Remove all empty commands and any entries that still start with @@
    for (const [key, val] of scripts.entries()) {
        if (val === "" || key.startsWith("@@")) {
            scripts.delete(key);
        }
    }
    packageJson.scripts = Object.fromEntries(scripts);

    // Fix dependencies. I don't know any way to not hardcode this
    packageJson.dependencies["@uatp/components"] = "0.0.1";
    if (backendLanguage !== "python") {
        delete packageJson.dependencies["pyodide"];
    }
    if (backendLanguage !== "rust") {
        delete packageJson.devDependencies["vite-plugin-wasm-pack"];
    }

    return packageJson;
}

// Utils
function cp_r(filename, src, dst) {
    fs.cpSync(
        path.join(src, filename),
        path.join(dst, filename),
        { recursive: true },
    );
}

function rm(filename, dst) {
    fs.rmSync(
        path.join(dst, filename),
    );
}

// Comment functions for TypeScript
const magicCommentRgxTs = /^\/\/ @@([a-z]+)$/;
function uncommentTs(line) {
    return line.replace(/^(\s*)\/\/ (.*)$/, "$1$2");
}

// Comment functions for HTML
const magicCommentRgxHtml = /^<!-- @@([a-z]+) -->$/;
function uncommentHtml(line) {
    return line.replace(/^(\s*)<!-- (.*) -->$/, "$1$2");
}

// Comment functions for .gitignore
const magicCommentRgxGitIgnore = /^# @@([a-z]+)$/;
function uncommentGitIgnore(line) {
    return line.replace(/^(\s*)# (.*)$/, "$1$2");
}
