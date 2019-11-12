exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("properties").insert([
    {
      // id: 1, (auto)
      'property-name': "Name for the Property",
      'property-address': {
        street: "1 First St",
        street2: "Suite 2",
        city: "Salt Lake City",
        state: "Utah",
        zip: "84101",
        country: "USA"
      },
      'property-image': "property.jpg",
      'property-status': "occupied", // open, closed, occupied, forRent, forSale
      'property-startdate': "01-01-2001",
      'property-enddate': null,
      'landlord-id': 1
    },
    {
      // id: 2, (auto)
      'property-name': "Sample",
      'property-address': {},
      'property-status': "closed", // closed - no longer an active property
      'property-startdate': "01-01-2001",
      'property-enddate': "05-01-2018",
      'landlord-id': 1
    },
  ]);
};
