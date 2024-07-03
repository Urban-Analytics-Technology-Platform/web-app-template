import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from 'node:url';

export function setupTemplate(
    dstDir: string,
    projectName: string,
    backendLanguage: "python" | "rust" | "none"): void {

    const pathToTemplate = path.join(
        path.dirname(path.dirname(fileURLToPath(import.meta.url))),
        "template"
    );

    // Copy template_app folder
    fs.cpSync(
        path.join(pathToTemplate, "template_app"),
        path.join(dstDir, "template_app"),
        { recursive: true },
    );
    // TODO: Copy the correct 'backend' modules

    // Override project name in package.json
    const packageJsonPath = path.join(dstDir, "template_app", "package.json");
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf8"));
    packageJson.name = projectName;
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Copy appropriate backend
    if (backendLanguage === "rust") {
        fs.cpSync(
            path.join(pathToTemplate, "rust_backend"),
            path.join(dstDir, "rust_backend"),
            { recursive: true },
        );
    }
    else if (backendLanguage === "python") {
        fs.cpSync(
            path.join(pathToTemplate, "python_backend"),
            path.join(dstDir, "python_backend"),
            { recursive: true },
        );
    }
    // TODO: Modify import statements for backend code
    // TODO: Modify dependencies and scripts in package.json
}
