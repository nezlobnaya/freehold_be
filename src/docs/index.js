const head = require("./head.js");
const menu = require("./menu.js");
const content = require("./content.js");
const foot = require("./foot.js");

module.exports = head + 
  '<div id="main"> \n' +
  menu + 
  content +
  '</div> \n' +
  foot ;
