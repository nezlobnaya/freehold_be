// Parse Date format
const moment = require('moment');

module.exports = {
  simple
};

function simple(date) {
  if ( date != null ) {
    date = moment(date).format("L")
    return date
  } else {
    return null
  }
}