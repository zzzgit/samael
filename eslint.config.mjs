import js from 'eslint-config-janus/js.js'
import ts from 'eslint-config-janus/ts.js'
import { jsify, tsify } from 'eslint-config-janus/utils.js'

const ignoreArr = [{ ignores: ['built/**/*'] }]
const jsArr = jsify(js)
const tsConfig = {
	languageOptions: {
		parserOptions: {
			projectService: true,
			// project: 'tsconfig.json',
			// tsconfigRootDir: import.meta.url,
		},
	},
}
const tsArr = tsify(ts)
tsArr.push(...tsify([tsConfig]))

export default [
	...ignoreArr,
	...jsArr,
	...tsArr,
]

