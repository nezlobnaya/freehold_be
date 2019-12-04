exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("properties").insert([
    { // id: 1, (auto)
      'propertyName': "Name for the Property",
      'propertyAddress': {
        street: "1 First St",
        street2: "Suite 2",
        city: "Salt Lake City",
        state: "Utah",
        zip: "84101",
        country: "USA"
      },
      'propertyImage': "property.jpg",
      'propertyStatus': "occupied", // open, closed, occupied, forRent, forSale
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': null,
      'landlordId': 1
    },
    { // id: 2, (auto)
      'propertyName': "Sample",
      'propertyAddress': {},
      'propertyStatus': "closed", // closed - no longer an active property
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': "05-01-2018",
      'landlordId': 1
    },
    { // id: 3, (auto)
      'propertyName': "Property that is for Rent",
      'propertyAddress': {},
      'propertyStatus': "forRent", 
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': null,
      'landlordId': 4
    },
    { // id: 4, (auto)
      'propertyName': "Property that is for Sale",
      'propertyAddress': {},
      'propertyStatus': "forSale", 
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': null,
      'landlordId': 4
    },
    { // id: 5, (auto)
      'propertyName': "Property that is Open",
      'propertyAddress': {},
      'propertyStatus': "open", 
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': null,
      'landlordId': 4
    },
    { // id: 6, (auto)
      'propertyName': "Property that is Closed",
      'propertyAddress': {},
      'propertyStatus': "closed", 
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': "12-31-2013",
      'landlordId': 4
    },
    { // id: 7, (auto)
      'propertyName': "Property that is Occupied",
      'propertyAddress': {},
      'propertyStatus': "occupied", 
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': null,
      'landlordId': 4
    },
  ]);
};
