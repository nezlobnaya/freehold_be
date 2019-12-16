const footer = "Property Manager Backend";
const functions = require("./functions.js");

let display = "\n";
Object.keys(functions).forEach(function (item) {
  display = display + 
    "\n" + 
    functions[item].toString() + "\n";
});

// Docs
const docs = require("./docs.js");
let displayDocs = ""
//JSON.stringify(docs, undefined, 1);

module.exports = "<footer>" +
  // footer + 
  "</footer> \n" +
  "<script> \n" +
    "const docs = { \n" + displayDocs + "} \n" +
    display + "\n" +
  "</script> \n" +
  "</body> \n" +
  "</html>";