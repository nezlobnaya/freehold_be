exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("tenanthistory").insert([
    {
      // id: 1, (auto)
      'tenant-id': 3,
      'property-id': 1,
      'history-startdate': "01-01-2001",
      'history-enddate': null
    }
  ]);
};
