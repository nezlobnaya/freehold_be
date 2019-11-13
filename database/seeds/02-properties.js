exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("properties").insert([
    {
      // id: 1, (auto)
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
    {
      // id: 2, (auto)
      'propertyName': "Sample",
      'propertyAddress': {},
      'propertyStatus': "closed", // closed - no longer an active property
      'propertyStartdate': "01-01-2001",
      'propertyEnddate': "05-01-2018",
      'landlordId': 1
    },
  ]);
};
