const footer = "Property Manager Backend";
const functions = require("./functions.js");

let display = "\n";
Object.keys(functions).forEach(function (item) {
  display = display + 
    "\n" + 
    functions[item].toString() + "\n";
});

module.exports = "<footer>" +
  // footer + 
  "</footer> \n" +
  "<script> \n" +
    display + "\n" +
  "</script> \n" +
  "</body> \n" +
  "</html>";