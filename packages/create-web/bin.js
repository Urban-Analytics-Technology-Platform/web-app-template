#!/usr/bin/env node
import * as p from '@clack/prompts';
import fs from "node:fs";
import { resolve } from "node:path";
import { setupTemplate } from "./index.js";
import arg from 'arg';

/// Argument parsing
//  Note that you need to pass `--` between `npm exec ...` and the arguments

const args = arg({
    '--help': Boolean,
    '--directory': String,
    '--force': Boolean,
    '--project-name': String,
    '--backend': String,
    '-h': '--help',
    '-f': '--force',
    '-d': '--directory',
    '-p': '--project-name',
    '-b': '--backend',
});

if (args['--help']) {
    console.log(`
Create a new UATP web project

USAGE
  npm create @uatp/web -- [--directory DIRECTORY] [--force] [--project-name NAME] [--backend rust|python|none] [--help]

OPTIONS
  --directory DIRECTORY       Directory to create the project in
  --force                     Create project even if directory exists already
  --project-name NAME         Name of the project
  --backend rust|python|none  Language for the backend (if any)
  --help                      Show this help message
`.trim())
    process.exit(0);
}


/// Interactive prompt

p.note(
    "Press Enter to answer the questions, and arrow keys to select options.\nPress Ctrl-C to exit at any time.",
    "Welcome to the UA web template setup!",
    // Terminal width of emojis not correctly calculated (upstream bug)
    // "🗺️ Welcome to the UA web template setup! 🧑‍💻",
)

// Determine working directory
let cwd = args['--directory'];
if (cwd === undefined) {
    cwd = exitIfCancelled(await p.text({
        message: '📂 Which directory do you want to create your project in? (leave blank to use current directory)',
        placeholder: ".",
    }));
    if (cwd === undefined) cwd = ".";
}
if (isDirectory(cwd)) {
    // Prompt for confirmation if the directory is not empty
    if (fs.readdirSync(cwd).length > 0) {
        const yes = args['--force'] || exitIfCancelled(
            await p.confirm({ message: '⚠️ That directory is not empty! Do you want to continue?' })
        );
        if (!yes) {
            process.exit(0);
        }
    }
} else {
    // If the directory doesn't exist, create it
    fs.mkdir(cwd, { recursive: true }, (err) => { if (err) throw err });
    p.log.info(`The directory '${cwd}' didn't exist, so I've created it for you! Carry on...`);
}

// Prompt for project name
let projectName = args['--project-name'];
if (projectName === undefined) {
    projectName = exitIfCancelled(await p.text({
        message: '🗺️ What is the name of your project?',
        placeholder: 'my-cool-ua-project',
        initialValue: resolve(cwd).split("/").pop(),
        validate(value) {
            if (value.length === 0) return `Value is required!`;
        },
    }));
    if (projectName === undefined) process.exit(0);
}

// Prompt for Rust/Python backends
let backendLanguage = args['--backend'];
const validBackendLanguages = ["rust", "python", "none"];
if (backendLanguage !== undefined && !validBackendLanguages.includes(backendLanguage)) {
    p.log.error(`Invalid backend language '${backendLanguage}'! Please use one of: ${validBackendLanguages.join(', ')}`);
    process.exit(1);
}
if (backendLanguage === undefined) {
    backendLanguage = exitIfCancelled(await p.select({
        message: '🧑‍💻 Would you like your web app to use additional languages?',
        options: [
            { value: "rust", label: 'Yes, Rust 🦀' },
            { value: "python", label: 'Yes, Python 🐍' },
            { value: "none", label: 'No' },
        ],
    }));
}

const s = p.spinner();
s.start("Initialising project template");
setupTemplate(cwd, projectName, backendLanguage);
s.stop("Initialised project template");

p.outro(`🚀 Your new project '${projectName}' has been successfully set up!`)

/// Utility functions

function isDirectory(path) {
    try {
        return fs.lstatSync(path).isDirectory();
    } catch (e) {
        // path doesn't exist
        return false;
    }
}

function exitIfCancelled(result) {
    if (p.isCancel(result)) {
        process.exit(0);
    }
    return result;
}
