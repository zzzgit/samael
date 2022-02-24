/* eslint-env node */
const path = require("path")
const pkg = require("./package.json")
const ts = require("rollup-plugin-ts")
// const ts = require("rollup-plugin-typescript2")


module.exports = {
	input: path.resolve(__dirname, "./src/main.ts"),
	output: {
		file: path.resolve(__dirname, pkg.main),
		format: "commonjs",
		name: "samael",
		banner: "/* eslint-disable */",
	},
	plugins: [
		ts({
			"include": [
				"src/**/*"
			],
			browserslist: false,
			// "compilerOptions": "./tsconfig.json"
		})
	],
	external: ['node-fetch', 'fs', 'mkdirp', 'path', 'util']
	// sourcemap: 'external',
}
