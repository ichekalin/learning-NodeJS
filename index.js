//Для создания вебсервера, в NodeJS есть специальный модуль 'http'
const http = require('http')
const fs = require('fs')
const path = require('path')

//колбек этого метода, принимает два объекта - request, response
const server = http.createServer((request, response)=> {

	// if (request.url === '/') {
	// 	fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, data) => {
	// 		if (err) {
	// 			throw err
	// 		}
	// 		//в респонс, кроме текста, можно передавать html теги
	// 		//если обращаешься к объекту response напрямую, то можно указывать статус ответа и хедеры
	// 		response.writeHead(200, {
	// 			'Content-Type': 'text/html' //если вместо html указать plain, то вернутся просто текст
	// 		})
	// 		response.end(data)
	// 	})
	// } else if (request.url === '/contact') {
	// 	fs.readFile(path.join(__dirname, 'public', 'contact.html'), (err, data) => {
	// 		if (err) {
	// 			throw err
	// 		}
	// 		response.writeHead(200, {
	// 			'Content-Type': 'text/html'
	// 		})
	// 		response.end(data)
	// 	})
	// }

	let filePath = path.join(__dirname, 'public', request.url === '/' ? 'index.html' : request.url)
	const ext = path.extname(filePath)
	let contentType = 'text/html'

	switch (ext) {
		case '.css':
			contentType = 'text/css'
			break
		case '.js':
			contentType = 'text/javascript'
			break
		default:
			contentType = 'text/html'
	}

	if (!ext) {
		filePath += '.html'
	}
	fs.readFile(filePath, (err, content) => {
		if (err) {
			fs.readFile(path.join(__dirname, 'public', 'error.html'), (err, data) => {
				if (err) {
					response.writeHead(500)
					response.end('Error')
				} else {
					response.writeHead(200, {
						'Content-Type': 'text/html'
					})
					response.end(data)
				}
			})
		} else {
			response.writeHead(200, {
				'Content-Type': contentType
			})
			response.end(content)
		}
	})
})
const PORT = process.env.PORT || 3000

//для нормальной работы сервера, должны быть задержки по времени. Также, после внесения изменений, нужно перезапускать сервер
//но чтобы обновление было автоматическим, нужно установить модуль nodemon, и в package.json>scripts задать параметры старта сервера, и сервера разработки. После чего запустить модуль nodemon - npm run [имя сервера разработки]
server.listen(PORT, () => {
	console.log(`Server has been started ${PORT}...`)
})