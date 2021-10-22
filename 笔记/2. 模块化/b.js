var count = 1
var a = require('./a')
console.log(a.age)
a.name = 'rename'
var b = require('./a')
console.log(b.name) // 'rename'



