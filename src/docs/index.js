const head = require("./lib/head.js");
const menu = require("./lib/menu.js");
const content = require("./lib/content.js");
const foot = require("./lib/foot.js");

module.exports = head + 
  '<div id="main"> \n' +
  menu + 
  content +
  '</div> \n' +
  foot ;