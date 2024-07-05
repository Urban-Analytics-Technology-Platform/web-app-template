# Developer notes for `@uatp/create-web`

Hello! If you're reading this, it probably means you've decided to contribute to `@uatp/create-web`. Thank you! 🎉

This note is essential reading for anybody looking to modify the template.
It explains exactly what's going on inside each of the files and how you can mark specific lines as being applicable to specific _output versions_ of the template.

## Output versions

When you run `npm create @uatp/web`, it asks you whether you want a Python, Rust, or no 'backend' (these are not traditional backends, but rather Rust or Python code that is compiled to WASM and run in the browser).
These correspond respectively to the output versions `rust`, `python`, and `none`.

## Code generation from the template

The template itself is hosted inside the `template` subdirectory.
It is, itself, a functional web app: this allows you to test changes to the template by running the app locally.

However, when somebody sets up a new web app _based on the template_, they do not simply get the template files copied wholesale into their project directory.
Instead, the template files have to be preprocessed so that the user only gets the code that is relevant to them.
This is done using some JavaScript (to be precise, Node.js) scripts, namely `bin.js` and its dependency `index.js`.

The preprocessing is done differently based on exactly which file it is preprocessing.

### TypeScript

Most of the changes that need to be made are in TypeScript files, or the TypeScript section of Svelte files.
The changes are indicated by **'magic comments'** which have the form of `// @@{state}`, where the `state` can be an output version, `template`, or `normal`.
(To be precise, the magic comments must match the `magicCommentRgxTs` regular expression in `index.js`.)

When processing a TypeScript file, the `create-web` script will read the file line by line, update its internal state whenever it sees a magic comment, and process the lines accordingly.

 - If `state` is `normal`, the line is included in all output versions.
   This represents code that is common to all output versions, and is the default state.
 - If `state` is an output version, the `create-web` script will uncomment all the following lines and include them in the web app corresponding to that version. (Lines here _must_ be commented out because otherwise they would interfere with running the template itself.)
 - If `state` is `template`, this represents code that should _only_ be in the template itself; it will be removed from all output versions.

All magic comments must not have any other text on their lines (except for whitespace).
Non-`normal` states must ultimately be terminated by returning to the `normal` state.

While this sounds complicated, it is actually quite simple in practice.
For example, if the template contains the following code:

```typescript
// @@template
console.log('template')
// @@rust
// console.log('rust')
// @@python
// console.log('python')
// @@none
// @@normal
```

When developing the template, you would see `template` in the console.
But if you run `create-web` and ask for a Rust backend, this entire block would be replaced with just

```typescript
console.log('rust')
```

and so somebody who sets up a Rust app would see `rust` in their console.

If there is no code to be included for a specific output version, you don't need to include the corresponding magic comment.
So, for example, the `@@none` line above could just have been omitted.

### HTML

HTML blocks in Svelte files are preprocessed in exactly the same way, just that the comment format is different (see `magicCommentRgxHtml` in `index.js`).

```html
<!-- @@template -->
<p>template</p>
<!-- @@rust -->
<!-- <p>rust</p> -->
<!-- @@python -->
<!-- <p>python</p> -->
<!-- @@normal -->
```

### `package.json`

Because `package.json` is a JSON file, it turns out that we can directly parse its contents and modify it as a JavaScript object.
However, because `package.json` does not support comments, we have to specify divergences from the template in a different manner.

In particular, the modification of _dependencies_ is hardcoded (for example, if the Python backend is not required, we have to remove `pyodide` as a dependency).
See the `index.js` script, in particular the `patchPackageJson` function, for more details.

On the other hand, the `scripts` section of `package.json` is processed in a different way.
When `create-web` sees a script name of `@@rust test`, for example, it will replace the `test` script with the contents of this script when setting up a Rust app.
So, for example, you can have something like this:

```json
{
"scripts":
    {
        "test": "echo 'template' && cargo test && pytest",
        "@@rust test": "echo 'rust' && cargo test",
        "@@python test": "echo 'python' && pytest",
    }
}
```

The original `test` script means that when you do `pnpm test` on the template, it will echo `template` and run both Rust and Python tests.
However, if you create a Rust app, the `test` script will be replaced with the `@@rust test` script, so that `pnpm test` will echo `rust` and only run the Rust tests.

If a script should be _removed_ in a particular version, you can set the corresponding command to an empty string:

```json
{
"scripts":
    {
        "test:rust": "cargo test",
        "@@rust test:rust": "cargo test",
        "@@python test:rust": "",
    }
}
```

When creating a Python app, `create-web` will override `test:rust` with an empty command; however, at the end, it also does a pass to remove any empty commands from the `scripts` object.
The net effect is that the `test:rust` script will be removed from the `scripts` object in the final `package.json`.

(Note that in the above example, you don't strictly need to include the `@@rust test:rust` script, since its contents are the same as the original.)

## I got an error. What gives?

**Error**: When developing locally, `Failed to resolve entry for package "@uatp/components". The package may have incorrect main/module/exports specified in its package.json.`

**Solution**: `pnpm --filter @uatp/components build`

**Explanation**: When developing the template library locally, it will depend on the version of the components library in the same workspace (i.e. the code inside `packages/components`).
You need to build the component library before developing the template.

----

**Error**: When running Python code in the browser, `Failed to open file: PythonError: [...] File is not a zip file`

**Solution**: `pnpm python` to build the wheel, or check that the path to the wheel in `src/routes/python_worker.ts` is correct

**Explanation**: Pyodide is trying to install your Python wheel, but can't find it. Build the wheel.

----

**Error**: When developing locally, `Can't find ../rust_backend/pkg, run wasm-pack build ../rust_backend --target web`

**Solution**: Run the specified command, or just `pnpm rust` which is equivalent

**Explanation**: Your Rust package wasn't compiled to WASM yet.

----

**Error**: When running Rust or Python code, `Failed to open file: ReferenceError: alert is not defined` (or some other function)

**Solution**: Don't use the `alert()` JavaScript function.
Lots of WASM "hello world" examples use it, but it won't work here.
You can use `console.log()` if you just want to see something.
Alternatively, you can return a string back to the Svelte code and call `alert()` from there.

**Explanation**: The JavaScript `alert()` function is a _browser_ property (it belongs to the global `window` object).
However, the template we've put together runs Rust and Python code in a [_web worker_](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), which is a background thread that is separate from the main browser thread.
Thus, it doesn't have access to the `window` object.
(The benefit of running code in a web worker is that it doesn't stop the user from interacting with the website UI itself; otherwise the browser would effectively freeze whenever you started a Rust/Python calculation.)
