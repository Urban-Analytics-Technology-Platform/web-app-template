#!/usr/bin/env node
import * as p from '@clack/prompts';
import fs from "node:fs";
import { resolve } from "node:path";
import { setupTemplate } from "./index.js";

// The title is the second argument
p.note(
    "Press Enter to answer the questions, and arrow keys to select options.\nPress Ctrl-C to exit at any time.",
    "Welcome to the UA web template setup!",
    // Terminal width of emojis not correctly calculated (upstream bug)
    // "🗺️ Welcome to the UA web template setup! 🧑‍💻",
)

// Determine working directory
let cwd = process.argv[2];
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
        const yes = exitIfCancelled(
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
const projectName = exitIfCancelled(await p.text({
    message: '🗺️ What is the name of your project?',
    placeholder: 'my-cool-ua-project',
    initialValue: resolve(cwd).split("/").pop(),
    validate(value) {
        if (value.length === 0) return `Value is required!`;
    },
}));
if (projectName === undefined) process.exit(0);

// Prompt for Rust/Python backends
const backendLanguage = exitIfCancelled(await p.select({
    message: '🧑‍💻 Would you like your web app to use additional languages?',
    options: [
        { value: "rust", label: 'Yes, Rust 🦀' },
        { value: "python", label: 'Yes, Python 🐍' },
        { value: "none", label: 'No' },
    ],
}));

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
