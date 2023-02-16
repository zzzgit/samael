import * as path from "path"
import * as ensurePath from "mkdirp"
import {promises} from "fs"

const {appendFile, writeFile, readFile} = promises


const getQandR = (dividend: number, divisor:number): number[] => {
	const remainder = dividend % divisor
	const quotient = (dividend - remainder) / divisor
	return [quotient, remainder]
}

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

const flipCoin = (): number => {
	return randomInt(999) % 2
}

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

// const checkRedirect = (url) => {
// 	console.log(`[samael][check-redirect]: ${url}`)
// 	return nodeFetch(url, {
// 		headers: {
// 			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
// 		},
// 		redirect: 'manaul',
// 	}).then((resp) => {
// 		if (resp.ok) {
// 			return url
// 		}
// 		if (resp.status === 301) {
// 			return resp.headers.get("Location")
// 		}
// 		const err = new Error(resp.statusText)
// 		err["code"] = resp.status
// 		throw err
// 	})
// 		.catch(function(err) {
// 			throw err
// 		})
// }

const randomInt = (n: number, max?: number) : number=> {	// 一個參數，from 0 on, n is not included，兩個參數，all included
	if (max == undefined) {
		return Math.floor(Math.random() * n)
	}
	let min = n
	min = Math.ceil(min)
	max = Math.floor(max)
	return min + Math.floor(Math.random() * (max - min + 1))
}

const random = (n: number, max?: number): number=> {
	if (max == undefined) {
		return Math.random() * n
	}
	const min = n
	return min + Math.random() * (max - min)
}

const shuffle = (arr: any[]): void => {
	const n = arr.length
	for (let i = 0, len = arr.length - 1; i < len; i++) {
		const t = i + random(n - i - 1) + 1
		const temp = arr[i]
		arr[i] = arr[t]
		arr[t] = temp
	}
}

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
	randomInt,
	shuffle,
	flipCoin,
	factorial,
	getCounter,
}
