var fs = require('fs')
var id = 0
var idFile = null
var idSeen = new Set

var tags = ['natural','place','railway','highway','boundary']

module.exports = function (props, feature, file) {
  if (idFile === null) {
    id = fs.existsSync(file) ? Number(fs.readFileSync(file, 'utf8')) : 0
  }
  idFile = file
  var nprops = {}
  if (props.ne_id !== undefined) {
    nprops.id = props.ne_id
  } else if (props.NE_ID !== undefined) {
    nprops.id = props.NE_ID
  } else if (props.id !== undefined) {
    nprops.id = props.id
  } else {
    while (idSeen.has(id)) id++
    nprops.id = id++
  }
  if (typeof nprops.id !== 'number') {
    while (idSeen.has(id)) id++
    nprops.id = id++
  }
  while (idSeen.has(nprops.id)) nprops.id++
  idSeen.add(nprops.id)
  if (props.name) {
    nprops.name = props.name
  } else if (props.NAME) {
    nprops.name = props.NAME
  }
  tags.forEach(function (key) {
    if (props[key] !== undefined && props[key].length > 0) {
      var lkey = key.toLowerCase()
      nprops[lkey] = props[key]
    }
  })
  if (props.featurecla === 'Road' && props.type === 'Major Highway') {
    nprops.highway = 'primary'
  } else if (props.featurecla === 'Road' && props.type === 'Secondary Highway') {
    nprops.highway = 'secondary'
  } else if (props.featurecla === 'Road' && props.type === 'Road') {
    nprops.highway = 'road'
  } else if (props.featurecla === 'Road' && props.type === 'Track') {
    nprops.highway = 'track'
  } else if (props.featurecla === 'Road' && props.type === 'Beltway') {
    nprops.highway = 'primary'
  } else if (props.featurecla === 'Road' && props.type === 'Bypass') {
    nprops.highway = 'road'
  } else if (props.featurecla === 'Ferry' || /\bferry\b/i.test(props.type)) {
    nprops.route = 'ferry'
    delete nprops.highway
  } else if (props.featurecla === 'Road') {
    nprops.highway = 'road'
  }
  Object.keys(props).forEach(function (key) {
    if (nprops.name === props[key]) return
    var nkey = key.toLowerCase().replace(/^name_/, 'name:')
    if (/^name(?::|alt|$)/.test(nkey) && props[key].length > 0) {
      if (nkey === 'namealt') nkey = 'name:alt'
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
