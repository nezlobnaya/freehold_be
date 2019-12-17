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
        class: "moreInfo",
        onclick: "{showContent('models')}",
        content: "<button>v</button> Models",
      },
      {
        section: "endpoints",
        tag: "h2",
        class: "moreInfo",
        onclick: "{showContent('endpoints')}",
        content: "<button>v</button> Endpoints",
        subHeaders: [
          {
            section: "userEndpoints",
            tag: "h3",
            class: "moreInfo",
            onclick: "{showContent('userEndpoints')}",
            content: "User Endpoints",
          },
          {
            section: "propertyEndpoints",
            tag: "h3",
            class: "moreInfo",
            onclick: "{showContent('propertyEndpoints')}",
            content: "Property Endpoints",
          },
          {
            section: "tenantHistoryEndpoints",
            tag: "h3",
            class: "moreInfo",
            onclick: "{showContent('tenantHistoryEndpoints')}",
            content: "Tenant History Endpoints",
          },
        ]
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
// Models
let modelsMenu = '<div id="models" class="hid"> \n <ul> \n';
for (let i = 0; i < Object.keys(docs.models).length; i++) {
  let key = Object.keys(docs.models)[i];
  let object = docs.models[key];
  modelsMenu = modelsMenu + 
  "<li onclick='" + object.function + "'>" + key + " Models </li> \n";
}
modelsMenu = modelsMenu + ' \n </ul> \n </div>';

function displayList(sec, call, content) {
  let output = '<div id="' + sec + '" class="hid"> \n <ul> \n';
  for (let i = 0; i < Object.keys(content).length; i++) {
    let key = Object.keys(content)[i];
    let object = content[key];
    let setCall = call + "[\"" + key.trim() + "\"]";
    let callFunction = "displayEndpoints(" + setCall + ")";

    output = output + 
    "<li onclick='" + callFunction + "'>" + object.header + " </li> \n";
  }
  output = output + ' \n </ul> \n </div>';

  return output;
}


// Left Side Menu
module.exports = '<div id="leftMenu"> \n' +
  displayMenu(menu.planning) + "\n" +
  displayMenu(menu.developmentBE) + "\n" +

  // Development Back End
  '<div id="developmentBE" class="show">' +
    // Models
    displayMenu(menu.developmentBE.subSections[0]) + "\n" +
    modelsMenu +
    displayMenu(menu.developmentBE.subSections[1]) + "\n" +
    '<div id="endpoints" class="show">' +
      // User Endpoints
      displayMenu(menu.developmentBE.subSections[1].subHeaders[0]) + "\n" +
      displayList('userEndpoints', 'docs.endpoints.User', docs.endpoints.User) +
      // Property Endpoints
      displayMenu(menu.developmentBE.subSections[1].subHeaders[1]) + "\n" +
      displayList('propertyEndpoints', 'docs.endpoints.Property', docs.endpoints.Property) +
      // Tenant History Endpoints
      displayMenu(menu.developmentBE.subSections[1].subHeaders[2]) + "\n" +
      displayList('tenantHistoryEndpoints', 'docs.endpoints.TenantHistory', docs.endpoints.TenantHistory) +

    '</div>' +
    "\n" +
  '</div>' +

  '</div>';