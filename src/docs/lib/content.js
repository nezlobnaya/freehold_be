const docs = require('../docs.js')

let latest = '',
  latestDiv = ''
if ('changes' in docs) {
  docs.changes.forEach(function(item) {
    latest = latest + '\n' + '<li>' + item + '</li> \n'
  })
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
const colorkey = docs.colorkey

// Right Side Content
module.exports =
  '<div id="#content" class="moreContent"> \n' +
  '<h1>' +
  docs.header +
  '</h1> \n' +
  colorkey.join('\n') +
  // Latest Changes
  latestDiv +
  // Planning
  '<div id="planning" class="show">' +
  docs.planning.join('\n') +
  '</div>' +
  // Content Container
  '<div id="container"></div>'
;('</div> \n')
