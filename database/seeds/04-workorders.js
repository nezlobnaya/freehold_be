exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("workorders").insert([
    {
      // id: 1, (auto)
      'workorder': "Work Order Title",
      'wo-description': "Description of the issue. For example: Tub is leaking.",
      'wo-type': "plumbing",
      'wo-startdate': "10-31-2018",
      'wo-enddate': "11-05-2018",
      'property-id': 1
    },
    {
      // id: 2, (auto)
      'workorder': "Work Order Title",
      'wo-description': "Description of the issue. For example: Lights not working in the living room.",
      'wo-type': "electrical",
      'wo-startdate': "11-03-2019",
      'wo-enddate': null,
      'property-id': 1
    }
  ]);
};
