const path = require("path")
const fs = require("fs")
const util = require('util')
const mkdirp = require('mkdirp')
const nodeFetch = require('node-fetch')
const fetch = require("./src/fetch")

const ensurePath = util.promisify(mkdirp)
const appendFile = util.promisify(fs.appendFile)
const writeFile = util.promisify(fs.writeFile)
const readFile = util.promisify(fs.readFile)

const getQandR = (dividend, divisor) => {
	let remainder = dividend % divisor
	let quotient = (dividend - remainder) / divisor
	return [quotient, remainder]
}

const formatTimeRange = (range) => {
	let delta = Math.max((+range) * 1000, 0)
	let temp = getQandR(delta, (1000 * 60 * 60 * 24))
	let days = Math.floor(temp[0])
	temp = getQandR(temp[1], (1000 * 60 * 60))
	let hours = Math.floor(temp[0])
	temp = getQandR(temp[1], (1000 * 60))
	let minutes = Math.floor(temp[0])
	temp = getQandR(temp[1], (1000))
	let seconds = Math.floor(temp[0])
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

const appendToFile = (file, str) => {
	return ensurePath(path.resolve(file, "../")).then(() => {
		return appendFile(file, str, "utf8")
	}).catch(e => {
		if (e) {
			throw e
		}
	})
}

const writeToFile = (file, str) => {
	return ensurePath(path.resolve(file, "../")).then(() => {
		return writeFile(file, str, "utf8")
	}).catch(e => {
		if (e) {
			throw e
		}
	})
}

const readFromFile = (file) => {
	return ensurePath(path.resolve(file, "../")).then(() => {
		return readFile(file, "utf8")
	}).catch(e => {
		if (e) {
			throw e
		}
	})
}

const checkRedirect = (url) => {
	console.log(`[samael][check-redirect]: ${url}`)
	return nodeFetch(url, {
		headers: {
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
		},
		redirect: 'manaul',
	}).then(resp => {
		if (resp.ok) {
			return url
		}
		if (resp.status === 301) {
			return resp.headers.get("Location")
		}
		let err = new Error(resp.statusText)
		err.code = resp.status
		throw err
	}).catch(function (err) {
		throw err
	})
}

const randomInt = (n, max) => {	// 一個參數，from 0 on, n is not included，兩個參數，all included
	if(max == undefined){
		return Math.floor(Math.random() * n)
	}
	let min = n
	min = Math.ceil(min)
	max = Math.floor(max)
	return min + Math.floor(Math.random() * (max - min + 1)) 
}

const random = (n, max) => {
	if (max == undefined) {
		return Math.random() * n
	}
	let min = n
	return min + Math.random() * (max - min )  
}

const shuffle = (arr) => {
	let n = arr.length
	for (let i = 0, len = arr.length-1; i < len; i++) {
		let t = i + random(n - i - 1) + 1
		let temp = arr[i]
		arr[i] = arr[t]
		arr[t] = temp
	}
}

const factorial = (num) => {
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

module.exports = {
	formatTimeRange,
	appendToFile,
	writeToFile,
	readFromFile,
	checkRedirect,
	fetch,
	random,
	randomInt,
	shuffle,
	factorial
}
