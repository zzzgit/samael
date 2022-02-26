/* eslint-env node */
const path = require("path")
const pkg = require("./package.json")
// const ts = require("@rollup/plugin-typescript")
const ts = require("rollup-plugin-typescript2")


module.exports = {
	input: path.resolve(__dirname, "./src/index.ts"),
	output: {
		file: path.resolve(__dirname, pkg.main),
		format: "commonjs",
		name: "samael",
		banner: "/* eslint-disable */",
	},
	plugins: [
		ts({
			verbosity: 3,
			useTsconfigDeclarationDir: true,
			clean: false,
			tsconfigOverride: {
				compilerOptions: {module: "ESNext"},
			},
		}),
	],
	external: ['node-fetch', 'fs', 'mkdirp', 'path', 'util'],
}
