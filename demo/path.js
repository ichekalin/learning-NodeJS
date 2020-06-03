//Path
const path = require('path')

console.log('Название файла: ', path.basename(__filename))
console.log('Имя директории: ', path.dirname(__filename))
console.log('Раширение файла: ', path.extname(__filename))

console.log('Parse: ', path.parse(__filename).ext)

console.log(path.join(__dirname, 'server', 'index.html'))