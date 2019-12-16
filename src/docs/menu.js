const docs = require("./docs.js");

const menu = {
  planning: {
    tag: "h1",
    onclick: "{showContent('planning')}",
    content: "Planning",
  },
  developmentBE: {
    tag: "h1",
    onclick: "{showContent('developmentBE')}",
    content: "Development Back End",
    subSections: [
      {
        section: "models",
        tag: "h2",
        onclick: "{showContent('models')}",
        content: "<button>v</button> Models",
      }
    ]
  }
}

function displayMenu(item) {
  let display = "";

  // tag
  if (item.tag) {
    display = "<" + item.tag + " ";

    // class
    if (item.class) { display = display + "class='" + item.class + "' " }

    // onclick
    if (item.onclick) { display = display + "onclick=\"" + item.onclick + "\" " }

    display = display + ">"
  }

  // text
  if (item.content) {
    display = display + item.content
  }

  // close tag
  if (item.tag) {
    display = display + "</" + item.tag + "> \n"
  }

  return display;
}
let modelsMenu = "";
for (let i = 0; i < Object.keys(docs.models).length; i++) {
  let key = Object.keys(docs.models)[i];
  let object = docs.models[key];
  modelsMenu = modelsMenu + 
  "<li onclick='" + object.function + "'>" + key + "</li> \n";
};

// Left Side Menu
module.exports = '<div id="leftMenu"> \n' +
  displayMenu(menu.planning) + "\n" +
  displayMenu(menu.developmentBE) + "\n" +

  // Development Back End
  '<div id="developmentBE" class="show">' +
    // Models
    displayMenu(menu.developmentBE.subSections[0]) + "\n" +
    modelsMenu +

    "\n" +
  '</div>' +

  '</div>';