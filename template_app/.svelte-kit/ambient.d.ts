
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * Environment variables [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env`. Like [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), this module cannot be imported into client-side code. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * _Unlike_ [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), the values exported from this module are statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * ```ts
 * import { API_KEY } from '$env/static/private';
 * ```
 * 
 * Note that all environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * 
 * ```
 * MY_FEATURE_FLAG=""
 * ```
 * 
 * You can override `.env` values from the command line like so:
 * 
 * ```bash
 * MY_FEATURE_FLAG="enabled" npm run dev
 * ```
 */
declare module '$env/static/private' {
	export const MANPATH: string;
	export const npm_package_devDependencies_prettier: string;
	export const ZELLIJ: string;
	export const npm_package_devDependencies_eslint_plugin_svelte: string;
	export const NODE: string;
	export const NVM_CD_FLAGS: string;
	export const npm_package_devDependencies_prettier_plugin_svelte: string;
	export const npm_package_devDependencies_typescript: string;
	export const INIT_CWD: string;
	export const SHELL: string;
	export const TERM: string;
	export const npm_package_devDependencies_vite: string;
	export const TMPDIR: string;
	export const NVM_PATH: string;
	export const CONDA_SHLVL: string;
	export const npm_package_scripts_lint: string;
	export const CONDA_PROMPT_MODIFIER: string;
	export const WINDOWID: string;
	export const npm_package_scripts_dev: string;
	export const npm_package_private: string;
	export const npm_package_devDependencies__sveltejs_kit: string;
	export const npm_config_registry: string;
	export const ZSH: string;
	export const PNPM_HOME: string;
	export const USER: string;
	export const NVM_DIR: string;
	export const LS_COLORS: string;
	export const npm_package_scripts_check_watch: string;
	export const COMMAND_MODE: string;
	export const CONDA_EXE: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const SSH_AUTH_SOCK: string;
	export const __CF_USER_TEXT_ENCODING: string;
	export const npm_package_devDependencies_eslint: string;
	export const npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
	export const npm_package_devDependencies_tslib: string;
	export const npm_execpath: string;
	export const PAGER: string;
	export const npm_package_devDependencies_svelte: string;
	export const LSCOLORS: string;
	export const _CE_CONDA: string;
	export const npm_config_frozen_lockfile: string;
	export const npm_package_devDependencies__typescript_eslint_parser: string;
	export const PATH: string;
	export const LaunchInstanceID: string;
	export const npm_config_engine_strict: string;
	export const __CFBundleIdentifier: string;
	export const NVM_NODEJS_ORG_MIRROR: string;
	export const CONDA_PREFIX: string;
	export const PWD: string;
	export const npm_command: string;
	export const npm_package_scripts_preview: string;
	export const KITTY_PID: string;
	export const npm_lifecycle_event: string;
	export const LANG: string;
	export const npm_package_name: string;
	export const npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
	export const npm_package_scripts_test_integration: string;
	export const NODE_PATH: string;
	export const npm_package_scripts_build: string;
	export const XPC_FLAGS: string;
	export const npm_package_devDependencies_vitest: string;
	export const npm_package_devDependencies_eslint_config_prettier: string;
	export const npm_config_node_gyp: string;
	export const XPC_SERVICE_NAME: string;
	export const _CE_M: string;
	export const npm_package_version: string;
	export const npm_package_devDependencies__sveltejs_adapter_auto: string;
	export const npm_package_devDependencies_svelte_check: string;
	export const HOME: string;
	export const SHLVL: string;
	export const npm_package_type: string;
	export const TERMINFO: string;
	export const npm_package_scripts_test: string;
	export const npm_package_dependencies_svelte_maplibre: string;
	export const LOGNAME: string;
	export const LESS: string;
	export const CONDA_PYTHON_EXE: string;
	export const npm_package_scripts_format: string;
	export const npm_lifecycle_script: string;
	export const npm_package_dependencies_ua_components: string;
	export const NVM_BIN: string;
	export const CONDA_DEFAULT_ENV: string;
	export const KITTY_INSTALLATION_DIR: string;
	export const KITTY_WINDOW_ID: string;
	export const npm_config_user_agent: string;
	export const npm_package_devDependencies__playwright_test: string;
	export const npm_package_devDependencies__types_eslint: string;
	export const SECURITYSESSIONID: string;
	export const npm_package_scripts_check: string;
	export const KITTY_PUBLIC_KEY: string;
	export const COLORTERM: string;
	export const ZELLIJ_SESSION_NAME: string;
	export const npm_package_scripts_test_unit: string;
	export const npm_node_execpath: string;
	export const NODE_ENV: string;
}

/**
 * Similar to [`$env/static/private`](https://kit.svelte.dev/docs/modules#$env-static-private), except that it only includes environment variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Values are replaced statically at build time.
 * 
 * ```ts
 * import { PUBLIC_BASE_URL } from '$env/static/public';
 * ```
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to runtime environment variables, as defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://kit.svelte.dev/docs/cli)), this is equivalent to `process.env`. This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://kit.svelte.dev/docs/configuration#env) (if configured).
 * 
 * This module cannot be imported into client-side code.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * console.log(env.DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 * 
 * > In `dev`, `$env/dynamic` always includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 */
declare module '$env/dynamic/private' {
	export const env: {
		MANPATH: string;
		npm_package_devDependencies_prettier: string;
		ZELLIJ: string;
		npm_package_devDependencies_eslint_plugin_svelte: string;
		NODE: string;
		NVM_CD_FLAGS: string;
		npm_package_devDependencies_prettier_plugin_svelte: string;
		npm_package_devDependencies_typescript: string;
		INIT_CWD: string;
		SHELL: string;
		TERM: string;
		npm_package_devDependencies_vite: string;
		TMPDIR: string;
		NVM_PATH: string;
		CONDA_SHLVL: string;
		npm_package_scripts_lint: string;
		CONDA_PROMPT_MODIFIER: string;
		WINDOWID: string;
		npm_package_scripts_dev: string;
		npm_package_private: string;
		npm_package_devDependencies__sveltejs_kit: string;
		npm_config_registry: string;
		ZSH: string;
		PNPM_HOME: string;
		USER: string;
		NVM_DIR: string;
		LS_COLORS: string;
		npm_package_scripts_check_watch: string;
		COMMAND_MODE: string;
		CONDA_EXE: string;
		PNPM_SCRIPT_SRC_DIR: string;
		SSH_AUTH_SOCK: string;
		__CF_USER_TEXT_ENCODING: string;
		npm_package_devDependencies_eslint: string;
		npm_package_devDependencies__typescript_eslint_eslint_plugin: string;
		npm_package_devDependencies_tslib: string;
		npm_execpath: string;
		PAGER: string;
		npm_package_devDependencies_svelte: string;
		LSCOLORS: string;
		_CE_CONDA: string;
		npm_config_frozen_lockfile: string;
		npm_package_devDependencies__typescript_eslint_parser: string;
		PATH: string;
		LaunchInstanceID: string;
		npm_config_engine_strict: string;
		__CFBundleIdentifier: string;
		NVM_NODEJS_ORG_MIRROR: string;
		CONDA_PREFIX: string;
		PWD: string;
		npm_command: string;
		npm_package_scripts_preview: string;
		KITTY_PID: string;
		npm_lifecycle_event: string;
		LANG: string;
		npm_package_name: string;
		npm_package_devDependencies__sveltejs_vite_plugin_svelte: string;
		npm_package_scripts_test_integration: string;
		NODE_PATH: string;
		npm_package_scripts_build: string;
		XPC_FLAGS: string;
		npm_package_devDependencies_vitest: string;
		npm_package_devDependencies_eslint_config_prettier: string;
		npm_config_node_gyp: string;
		XPC_SERVICE_NAME: string;
		_CE_M: string;
		npm_package_version: string;
		npm_package_devDependencies__sveltejs_adapter_auto: string;
		npm_package_devDependencies_svelte_check: string;
		HOME: string;
		SHLVL: string;
		npm_package_type: string;
		TERMINFO: string;
		npm_package_scripts_test: string;
		npm_package_dependencies_svelte_maplibre: string;
		LOGNAME: string;
		LESS: string;
		CONDA_PYTHON_EXE: string;
		npm_package_scripts_format: string;
		npm_lifecycle_script: string;
		npm_package_dependencies_ua_components: string;
		NVM_BIN: string;
		CONDA_DEFAULT_ENV: string;
		KITTY_INSTALLATION_DIR: string;
		KITTY_WINDOW_ID: string;
		npm_config_user_agent: string;
		npm_package_devDependencies__playwright_test: string;
		npm_package_devDependencies__types_eslint: string;
		SECURITYSESSIONID: string;
		npm_package_scripts_check: string;
		KITTY_PUBLIC_KEY: string;
		COLORTERM: string;
		ZELLIJ_SESSION_NAME: string;
		npm_package_scripts_test_unit: string;
		npm_node_execpath: string;
		NODE_ENV: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * Similar to [`$env/dynamic/private`](https://kit.svelte.dev/docs/modules#$env-dynamic-private), but only includes variables that begin with [`config.kit.env.publicPrefix`](https://kit.svelte.dev/docs/configuration#env) (which defaults to `PUBLIC_`), and can therefore safely be exposed to client-side code.
 * 
 * Note that public dynamic environment variables must all be sent from the server to the client, causing larger network requests — when possible, use `$env/static/public` instead.
 * 
 * Dynamic environment variables cannot be used during prerendering.
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.PUBLIC_DEPLOYMENT_SPECIFIC_VARIABLE);
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
