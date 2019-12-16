const styles = {
  body: [
    "background-color: #202020;",
    "color: #ebebeb;",
    "margin: 30px 20px;"
  ],
  button: [
    "background-color: #202020;",
    "border: 2px darkgray solid;",
    "color: cornflowerblue;",
    "padding: 5px;",
    "text-align: center;",
    "text-decoration: none;",
    "display: inline-block;",
    "font-size: 10px;",
    "margin: 4px 10px;",
    "cursor: pointer;",
    "position:relative;",
    "top: -5px;"
  ],
  "button:hover": [
    "color: #202020;", 
    "background-color: cornflowerblue;", 
    "border: 1px #202020 solid; "
  ],
  a: [
    "color: antiquewhite;"
  ], 
  "h1, h2, h3": [
    "position:relative;",
    "cursor: pointer;"
  ],
  ".show": [
    "display: block; "
  ], 
  ".hid": [
    "display: none; "
  ],
  ".moreContent": [
    "min-width: 500px; ",
    "width: 50%;",
    "position: absolute;",
    "left: 400px;",
    "top: 5px;",
    "padding-bottom: 100px;"
  ],
  pre: [
    "outline: 1px solid #ccc; ",
    "padding: 5px; ",
    "margin: 5px; ",
    "color: lightgreen; ",
    "max-width: 600px; ",
    "white-space: pre-wrap;", 
    "white-space: -moz-pre-wrap;",
    "white-space: -pre-wrap;",
    "white-space: -o-pre-wrap;",
    "word-wrap: break-word;"
  ],
  ".moreInfo": [
    "position:relative;",
    "left: 5px; "
  ],
  ".moreInfo:hover": [ "color: lightskyblue;" ],
  "h2.moreInfo:hover": [ "text-decoration: underline wavy; " ],
  "#main": [ "min-width: 400px; padding-bottom: 100px; " ],
  "#leftMenu": [ "left: 5px; color: cornflowerblue; " ],
  "#leftMenu h1, h2, h3": [ "font-weight: normal;" ],
  "#leftMenu h3": [ "padding-left: 45px; " ],
  "#leftMenu ul": [ "padding-left: 50px; " ],
  "#leftMenu li": [ "cursor: pointer; margin-left: 15px; " ],
  "#leftMenu li:hover": [ "color: lightskyblue; " ],
  "code": [ "color: lime; " ],
  "code p": [ "margin: 0; " ],
  ".indent": [ "padding-left: 15px; " ],
  ".indent2": [ "padding-left: 40px; " ],
  ".codesnip": [ "color: lightgreen; " ],
  ".alert": [ "color: red; " ],
  ".todo": [ "color: yellow; " ],
  ".comment": [ "color: lightseagreen; " ]
}

let display = "\n";
Object.keys(styles).forEach(function (item) {
  display = display + 
    item + " { \n" + 
    styles[item].join(" \n ") + "\n } \n";
});

module.exports = "<style>" + 
  display +
  "</style>";