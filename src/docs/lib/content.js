const docs = require('../docs.js')

// Header
let header = ''
if ('header' in docs && typeof docs.header === 'string') {
  header = docs.header
} else {
  console.log('header in docs file should be a string')
}

// Latest Changes
let latest = '',
  latestDiv = ''
if ('changes' in docs && Array.isArray(docs.changes)) {
  docs.changes.forEach(function(item) {
    latest = latest + '\n' + '<li>' + item + '</li> \n'
  })
} else {
  console.log('Changes in documents is not an array.')
}
if (latest != '') {
  latestDiv =
    '<div class="comment"> \n' +
    '<strong>Latest changes include: </strong> \n' +
    '<ul> \n' +
    latest +
    '</ul> \n' +
    '</div> \n'
}

// Color Key
let colorkey = ''
if ('colorkey' in docs && typeof docs.colorkey === 'object') {
  Object.keys(docs.colorkey).forEach(function(item) {
    colorkey =
      colorkey +
      '\n' +
      '<span class="' +
      item +
      '">' +
      docs.colorkey[item] +
      '</span> <br />'
  })
  colorkey =
    '<div style="float: right;"> Color Key: <br />' + colorkey + '</div>'
} else {
  console.log('colorkey in docs file should be an object')
}

// Right Side Content
module.exports =
  '<div id="#content" class="moreContent"> \n' +
  '<h1>' +
  header +
  '</h1> \n' +
  colorkey +
  latestDiv +
  // Planning
  '<div id="planning" class="show">' +
  docs.planning.join('\n') +
  '</div>' +
  // Content Container
  '<div id="container"></div>'
;('</div> \n')
