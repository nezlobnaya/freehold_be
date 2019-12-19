const docs = require("./docs.js");

let latest = "\n";
docs.changes.forEach(function(item) {
  latest = latest + "\n" + 
    '<li>' + item + '</li> \n';
});

// Color Key
const colorkey = [
  '<div style="float: right;">',
  '<span class="codesnip">Code - lightgreen</span> <br />',
  '<span class="todo">ToDo - Yellow</span> <br />',
  '<span class="alert">Alert - red</span> <br />',
  '<span class="comment">Commnet - lightseagreen</span>',
  '</div>'
]

// Right Side Content
module.exports = '<div id="#content" class="moreContent"> \n' +
  '<h1>Property Manager Backend</h1> \n' +
  colorkey.join('\n') + 

  // Latest Changes
  '<div class="comment"> \n' +
    '<strong>Latest changes include: </strong> \n' +
    '<ul> \n' + latest + '</ul> \n' + 
  '</div> \n' +

  // Planning
  '<div id="planning" class="show">' + docs.planning.join('\n') + '</div>' +

  // Content Container
  '<div id="container"></div>'

'</div> \n';

  