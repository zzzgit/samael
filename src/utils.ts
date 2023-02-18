import * as path from "path"
import * as ensurePath from "mkdirp"
import {promises} from "fs"

const {appendFile, writeFile, readFile} = promises

/**
 * Returns the quotient and the remainder of the division operation.
 * @param {number} dividend
 * @param {number} divisor
 * @return {number[]} an array of two elements representing quotient and remainder
 */
const getQandR = (dividend: number, divisor:number): number[] => {
	const remainder = dividend % divisor
	const quotient = (dividend - remainder) / divisor
	return [quotient, remainder]
}
/**
 * Format a time range into the form of "x天x時x分x秒".
 * @param {number} range time range in milliseconds
 * @return {string} formatted time range
 */
const formatTimeRange = (range: number): string => {
	const delta = Math.max(+range * 1000, 0)
	let temp = getQandR(delta, 1000 * 60 * 60 * 24)
	const days = Math.floor(temp[0])
	temp = getQandR(temp[1], 1000 * 60 * 60)
	const hours = Math.floor(temp[0])
	temp = getQandR(temp[1], 1000 * 60)
	const minutes = Math.floor(temp[0])
	temp = getQandR(temp[1], 1000)
	const seconds = Math.floor(temp[0])
	let result = ""
	if (days) {
		result += days + "天"
		if (hours) {
			result += hours + "小时"
		}
		return result
	}
	if (hours) {
		result += hours + "小时"
		if (minutes) {
			result += minutes + "分钟"
		}
		return result
	}
	if (minutes) {
		result += minutes + "分钟"
		if (seconds) {
			result += seconds + "秒"
		}
		return result
	}
	return seconds + "秒"
}
/**
 * Append some text to the file.
 * @param {string} file The file to append
 * @param {string} str  The text to append
 * @return {string} A promise
 */
const appendToFile = (file: string, str: string): Promise<void> => {
	return ensurePath(path.resolve(file, "../")).then(() => {
		return appendFile(file, str, "utf8")
	})
		.catch((e:Error) => {
			if (e) {
				throw e
			}
		})
}
/**
 * Flip a coin to get 0 or 1
 * @return {number} 0 or 1
 */
const flipCoin = (): number => {
	return random(999) % 2
}
/**
 * Write some text to the file. Current content would be overwritten.
 * @param {string} file the file to write to
 * @param {string} str the content to write in the form of a string
 * @return {Promise} a pormise
 */
const writeToFile = (file:string, str:string): Promise<void> => {
	return ensurePath(path.resolve(file, "../")).then(() => {
		return writeFile(file, str, "utf8")
	})
		.catch((e:Error) => {
			if (e) {
				throw e
			}
		})
}
/**
 * Read from a file
 * @param {string} file the file to read
 * @return {Promise<string | void>} a promise which solves with the contents of the file
 */
const readFromFile = (file: string): Promise<string | void> => {
	return ensurePath(path.resolve(file, "../")).then(() => {
		return readFile(file, "utf8")
	})
		.catch((e:Error) => {
			if (e) {
				throw e
			}
		})
}
/**
 * Produces a random number between 0 which is not included and upper bound which is included. If isFloating is true, a floating-point number is returned instead of an integer. By default, the isFloating property is false.
 * @param {number} n  Upper bound of the range
 * @param {number} isFloating Specify returning a floating-point number.
 * @return {number} Returns the random number.
 */
const random = (n: number, isFloating: boolean = false) : number=> {
	if (isFloating) {
		return Math.random() * n
	}
	return Math.trunc(Math.random() * n)
}
/**
 * Produces a random number between the lower and upper bounds, both are included.
 * @param  {number} min The lower bound.
 * @param  {number} max The upper bound.
 * @param  {boolean} isFloating Specify returning a floating-point number.
 * @return  {number} Returns the random number.
 */
const range = (min: number, max: number, isFloating:boolean = false) : number=> {
	if (!isFloating) {
		min = Math.ceil(min)
		max = Math.floor(max)
	}
	let delta = Math.random() * (max - min + 1)
	if (!isFloating) {
		delta = Math.trunc(delta)
	}
	return min + delta
}
/**
 * Suffles an array. This will under the hood use the random method.
 * @param {any[]} arr the array to shuffle
 */
const shuffle = (arr: any[]): void => {
	const n = arr.length
	for (let i = 0, len = arr.length - 1; i < len; i++) {
		const t = i + random(n - i - 1, false) + 1
		const temp = arr[i]
		arr[i] = arr[t]
		arr[t] = temp
	}
}
/**
 * Calculates factorial.
 * @param {number} num
 * @return {number} the result
 */
const factorial = (num: number): number => {
	let result = num
	if (num < 0) {
		return -1
	}
	if (num === 0 || num === 1) {
		return 1
	}
	while (num > 1) {
		num--
		result *= num
	}
	return result
}
/**
 * Generates a counter closure
 * @return {number} the counter closure
 */
const getCounter = (): ()=>number =>{
	let counter = 0
	return function() {
		counter += 1
		return counter
	}
}


export default {
	formatTimeRange,
	appendToFile,
	writeToFile,
	readFromFile,
	// checkRedirect,
	random,
	range,
	shuffle,
	flipCoin,
	factorial,
	getCounter,
}
