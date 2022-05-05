var fs = require('fs')
var id = 0
var idFile = null

var tags = ['natural','place','railway','highway','boundary']

module.exports = function (props, feature, file) {
  if (idFile === null) {
    id = fs.existsSync(idFile) ? Number(fs.readFileSync(idFile, 'utf8')) : 0
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
    nprops.id = id++
  }
  if (props.name) {
    nprops.name = props.name
  } else if (props.NAME) {
    nprops.name = props.NAME
  }
  if (props.featurecla === 'Road' && props.type === 'Major Highway') {
    nprops.highway = 'primary'
  } else if (props.featurecla === 'Road' && props.type === 'Secondary Highway') {
    nprops.highway = 'secondary'
  } else if (props.featurecla === 'Road' && props.type === 'Road') {
    nprops.highway = 'road'
  } else if (props.featurecla === 'Road' && props.type === 'Track') {
    nprops.highway = 'track'
  } else if (props.featurecla === 'Road' && props.type === 'Ferry Route') {
    nprops.route = 'ferry'
  } else if (props.featurecla === 'Road' && props.type === 'Ferry, seasonal') {
    nprops.highway = 'ferry'
  } else if (props.featurecla === 'Road' && props.type === 'Beltway') {
    nprops.highway = 'primary'
  } else if (props.featurecla === 'Road' && props.type === 'Bypass') {
    nprops.highway = 'road'
  } else if (props.featurecla === 'Road' && props.type === 'Unknown') {
    nprops.highway = 'road'
  }
  tags.forEach(function (key) {
    if (props[key] !== undefined && props[key].length > 0) {
      var lkey = key.toLowerCase()
      nprops[lkey] = props[key]
    }
  })
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
