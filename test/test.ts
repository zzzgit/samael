import {
	appendToFile,
	chance,
	factorial,
	flipCoin,
	formatTimeRange,
	getCounter,
	random,
	range,
	readFromFile,
	shuffle,
	wait,
	writeToFile,
} from '../src/utils'

// ...existing code...

// Test formatTimeRange
console.assert(formatTimeRange(86409000).includes('1000天'), 'formatTimeRange failed')
console.assert(formatTimeRange(3609000).includes('18小时'), 'formatTimeRange failed')
console.assert(formatTimeRange(60900).includes('55分钟'), 'formatTimeRange failed')
console.assert(formatTimeRange(1090).includes('10秒'), 'formatTimeRange failed')

// Test random
console.assert(random(10) < 10, 'random failed')
console.assert(random(10, true) < 10, 'random failed')

// Test range
console.assert(range(1, 10) >= 1 && range(1, 10) <= 10, 'range failed')
console.assert(range(1, 10, true) >= 1 && range(1, 10, true) <= 10, 'range failed')

// Test flipCoin
console.assert([0, 1].includes(flipCoin()), 'flipCoin failed')

// Test factorial
console.assert(factorial(5) === 120, 'factorial failed')
console.assert(factorial(0) === 1, 'factorial failed')

// Test getCounter
const counter = getCounter()
console.assert(counter() === 1, 'getCounter failed')
console.assert(counter() === 2, 'getCounter failed')

// Test chance
console.assert(chance(1, 1) === true, 'chance failed')
console.assert(chance(0, 1) === false, 'chance failed')

// Test wait
wait(1000).then(result=> console.assert(result === true, 'wait failed')).catch(()=> {})

// Test shuffle
const arr = [1, 2, 3, 4, 5]
shuffle(arr)
console.assert(arr.length === 5, 'shuffle failed')

// Test appendToFile, writeToFile, readFromFile
const testFile = './test.txt'
writeToFile(testFile, 'Hello').then(()=> {
	return appendToFile(testFile, ' World')
}).then(()=> {
	return readFromFile(testFile)
})
	.then((content)=> {
		return console.assert(content === 'Hello World', 'File operations failed')
	})
	.catch(()=> {})
