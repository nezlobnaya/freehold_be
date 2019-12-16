module.exports = {
  showContent,
  output,
  fromJSON,
  // Models
  models,
  modelsUsers,
  test
}

function showContent(e) {
  const select = document.getElementById(e);
  select.classList.toggle("show");
  select.classList.toggle("hid");
}

function output(content) { 
  document.getElementById("planning").classList.remove("show");
  document.getElementById("planning").classList.add("hid");
  document.getElementById("container").innerHTML = content; 
}

function fromJSON(obj) {
  return JSON.stringify(obj, undefined, 2);
}

function models(header, todo, comment, model) {

  // If variable exists, display
  todo = (todo) ? "<p class='todo'>" + todo + "</p>" : "";
  comment = (comment) ? "<p class='comment'>" + comment + "</p>" : "";

  // Return Output
  return "<h3>" + header + "</h3> " + 
    todo + comment +
    "<pre>" + fromJSON(model) + "</pre>";
}

// User Models
function modelsUsers() {

  // Models
  let landlordModel = { 
    userId: 1,
    email: "landlord@email.com",
    name: {
      title: "Title",
      firstname: "Firstname",
      middlename: "Middlename",
      lastname: "Lastname",
      suffix: "Suffix",
      preferredname: "Preferred"
    },
    address: {
      street: "1 First St",
      street2: "Suite 2",
      city: "Salt Lake City",
      state: "Utah",
      zip: "84101",
      country: "USA"
    },
    type: "landlord",
    phone: "123-456-7890"
  };
  let devModel = {};
  let tenantModel = {}; 

  let header = "<h2>User Models</h2> ";
  let outputContent = header + 
    models("Landlord User Model", "Still updating", "", landlordModel) + 
    models("Dev Model", "", "", devModel) + 
    models("Tenant Model", "", "", tenantModel);

  // Display Output
  output(outputContent);
}


function test() {
  output("Something");
}