var fs = require('fs')
var id = 0
var idFile = null

module.exports = function (props, feature, file) {
  if (idFile === null) {
    id = fs.existsSync(idFile) ? Number(fs.readFileSync(idFile, 'utf8')) : 0
  }
  idFile = file
  if (!props.hasOwnProperty('id')) {
    props.id = id++
  }
  return props
}

process.on('exit', function () {
  if (idFile !== null) {
    fs.writeFileSync(idFile, String(id))
  }
})
