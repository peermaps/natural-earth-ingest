var fs = require('fs')
var id = 0
var idFile = null

var tags = ['natural','place']

module.exports = function (props, feature, file) {
  if (idFile === null) {
    id = fs.existsSync(idFile) ? Number(fs.readFileSync(idFile, 'utf8')) : 0
  }
  idFile = file
  var nprops = {}
  if (props.ne_id !== undefined) {
    nprops.id = props.ne_id
  } else if (props.id !== undefined) {
    nprops.id = props.id
  } else {
    nprops.id = id++
  }
  if (props.name) {
    nprops.name = props.name
  }
  tags.forEach(function (key) {
    if (props[key] !== undefined) {
      nprops[key] = props[key]
    }
  })
  Object.keys(props).forEach(function (key) {
    if (props.name === props[key]) return
    var nkey = key.replace(/^name_/, 'name:')
    if (/^name(?:_|$)/.test(nkey)) {
      nprops[nkey] = props[key]
    }
  })
  return nprops
}

process.on('exit', function () {
  if (idFile !== null) {
    fs.writeFileSync(idFile, String(id))
  }
})
