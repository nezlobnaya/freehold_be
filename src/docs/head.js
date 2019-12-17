const title = "Property Manager Backend";
const styles = require("./styles.js");

// Docs
const docs = require("./docs.js");
let displayDocs = JSON.stringify(docs, undefined, 1);

module.exports = "<!DOCTYPE html> \n" +
  "<html>" +
  "<head> \n" +
  "<title>" + title + "</title> \n" +
  "<meta charset=\"utf-8\" /> \n" +
  "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, user-scalable=no\" /> \n" +
  styles +
  "<script> \n" +
    "const docs =  \n" + displayDocs + " \n" +
  "</script> \n" +
  "</head> \n" +
  "<body> \n";