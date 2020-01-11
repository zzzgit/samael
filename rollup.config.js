/* eslint-env node */
const path = require("path")
const pkg = require("./package.json")
const ts = require("rollup-plugin-ts")


module.exports = {
	input: path.resolve(__dirname, "./src/main.js"),
	output: {
		file: path.resolve(__dirname, pkg.main),
		format: "cjs",
		name: "samael",
		banner: "/* eslint-disable */",
	},
	plugins: [
		ts({
			"include": [
				"src/**/*"
			],
			browserslist: false,
			"compilerOptions": "./tsconfig.json"
		})
	],
	external: ['node-fetch', 'fs', 'mkdirp', 'path', 'util']
	// sourcemap: 'external',
}
