const docs = require('../docs.js')
const menu = docs.menu

function displayMenu(item) {
  let display = ''
  let onclick = ''

  // tag
  if (item.tag) {
    display = '<' + item.tag + ' '

    // class
    if (item.class) {
      display = display + "class='" + item.class + "' "
    }

    // onclick
    if (item.onclick) {
      if (item.onclick === 'showContent') {
        if (item.section) {
          onclick = 'onclick="{showContent(\'' + item.section + '\')}" '
        } else {
          onclick = 'onclick="{showContent(\'planning\')}" '
        }
      } else {
        onclick = 'onclick="' + item.onclick + '" '
      }

      display = display + onclick
    }

    display = display + '>'
  }

  // text
  if (item.content) {
    display = display + item.content
  }

  // close tag
  if (item.tag) {
    display = display + '</' + item.tag + '> \n'
  }

  return display
}

// Models
function displayModels() {
  let modelsMenu = '<div id="models" class="hid"> \n <ul> \n'
  for (let i = 0; i < Object.keys(docs.models).length; i++) {
    let key = Object.keys(docs.models)[i]
    let object = docs.models[key]
    modelsMenu =
      modelsMenu +
      "<li onclick='" +
      object.function +
      "'>" +
      key +
      ' Models </li> \n'
  }
  modelsMenu = modelsMenu + ' \n </ul> \n </div>'
  return modelsMenu
}

// Display List
function displayList(sec, content, event) {
  // If any value is empty
  if (sec === '' || !sec) {
    return 'Empty Section Information.'
  }
  if (content === '' || !content) {
    return 'Empty Content Information.'
  }

  // Check that sec is a string
  if (sec && typeof sec === 'string') {
    // Output Div and List
    let output = '<div id="' + sec + '" class="hid"> \n <ul> \n'

    let section = eval(content)

    // check that section returns an object
    if (section && typeof section === 'object') {
      let keys = Object.keys(section)
      let count = keys.length

      for (let i = 0; i < count; i++) {
        let key = keys[i]
        let object = section[key]
        let call = '["' + key.trim() + '"]'
        let callFunction = ''

        if (event && typeof event === 'string') {
          callFunction = " onclick='" + event + '(' + content + call + ")'"
        }

        // Check that Object exists
        if (object && typeof object === 'object') {
          let header = "<span class='alert'>Header missing in docs.<span>"
          if (object.header) {
            header = object.header
          }

          // Output
          output = output + '<li' + callFunction + '>' + header + ' </li> \n'
        } else {
          output = output + '<li>Key Object is missing.</li>'
        }
      }
    } else {
      output = output + 'Section Object is missing for List.'
    }

    // Close List and Div
    output = output + ' \n </ul> \n </div>'

    return output
  } else {
    return 'Missing List information - Section Name'
  }
}

function displaySubSections(section) {
  let count = 0,
    output = ''

  if ('subHeaders' in section) {
    count = Object.keys(section.subHeaders).length
  }

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      if (section.subHeaders[i] && section.subHeaders[i] != '') {
        let subHeader = section.subHeaders[i]

        if (!subHeader.section || subHeader.section === '') {
          output = output + 'No Section Informtion.'
        }
        if (!subHeader.docs || subHeader.docs === '') {
          output = output + 'No Documents Reference for: ' + subHeader.section
        }
        if (!section.event) {
          output =
            output +
            'No Event Informtion. Must at least be an empty string. For:' +
            subHeader.section
        }

        output =
          output +
          displayMenu(subHeader) +
          '\n' +
          displayList(subHeader.section, subHeader.docs, section.event)
      }
    }
    return output
  } else {
    return 'No SubSection'
  }
}

function outputMenu(thisMenu) {
  let output = '',
    menuItems = {},
    subSection = {}

  // Check menu exists and is an object
  if (thisMenu && typeof thisMenu === 'object') {
    // For Each Menu item
    Object.keys(thisMenu).forEach(function(item) {
      menuItems = thisMenu[item]

      // Display Menu item
      output = output + displayMenu(menuItems) + '\n'

      if (item == 'planning') {
        output = output + '<div> \n'
      } else {
        output = output + '<div id="' + item + '" class="show"> \n'
      }

      // check for subSections
      if (menuItems.subSections) {
        // For Each Menu subSection
        Object.keys(menuItems.subSections).forEach(function(i) {
          subSection = menuItems.subSections[i]

          // Display Header for subSections
          output = output + displayMenu(subSection) + '\n'

          if (subSection.section) {
            if (subSection.section == 'models') {
              output = output + displayModels()
            } else {
              output =
                output + '<div id="' + subSection.section + '" class="hid">'
              output = output + displaySubSections(subSection)
              output = output + '</div> \n'
            }
          }
        })
      }

      output = output + '</div> \n'
    })
  }

  // Disply Output
  return output
}

// Left Side Menu
module.exports = '<div id="leftMenu"> \n' + outputMenu(menu) + '</div>'
