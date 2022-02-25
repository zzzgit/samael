/* eslint-env node */
const path = require("path")
// const babel = require("rollup-plugin-babel")
const pkg = require("./package.json")
const ts = require("@rollup/plugin-typescript")


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
			cacheDir: "./.rts2_cache",
			compilerOptions: {"module": "ESNext"},
		}),
	],
	external: ['node-fetch', 'fs', 'mkdirp', 'path', 'util'],
}
