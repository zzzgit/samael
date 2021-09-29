const nodeFetch = require('node-fetch')

let fetch = function (url, header_obj={}) {
	let pathName = url

	return nodeFetch(url, {
		headers: Object.assign({
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.65 Safari/537.36',
		}, header_obj),
		redirect: 'error',
	}).then(resp => {
		if (resp.ok) {
			return resp
		}
		let err = new Error(`${resp.statusText}，${pathName}`)
		err.code = resp.status
		throw err
	}).then((resp) => {
		return resp.textConverted()
	}).catch(function (err) {
		if (!err.code) {
			err.message = `${err.message}，${pathName}`
		}
		throw err
	})
}

module.exports = fetch
