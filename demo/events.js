//Концепт

const EventEmitter = require('events')
const emitter =	new EventEmitter()

// можно прослушать данное событие. Первый параметр - название, второй - колбек
// emitter.on('anything', (data) => {
// 	console.log('ON: anything', data)
// })
// // первый - прослушиваемое событие, второй параметр - аргументы/конфигурации
// emitter.emit('anything', {a: 1})
//
// setTimeout(() => {
// 	emitter.emit('anything', {b: 2})
// }, 1500)

class Dispatcher extends EventEmitter{
	subcribe(eventName, callback) {
		console.log('[Subscribe...]')
		//чтобы подписаться на событие, можно использовать метод 'on', который доступен благодаря наследованию
		this.on(eventName, callback)
	}
	dispatch(eventName, data) {
		console.log('Dispatching...')
		this.emit(eventName, data)
	}
}

const dis = new Dispatcher()
//порядок диспатчинга и сабскрайба важен. Если поменять их местами, то subcribe не выполнится
dis.subcribe('aa', (data) => {
	console.log('ON: aa', data)
})

dis.dispatch('aa', {aa: 22})