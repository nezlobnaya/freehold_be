exports.seed = function(knex) {
  return knex.from("tenanthistory").insert([
    { // id: 1, (auto)
      'tenantId': 3,
      'propertyId': 2,
      'historyStartdate': "01-01-2001",
      'historyEnddate': "12-31-2009"
    },
    { // id: 2, (auto)
      'tenantId': 3,
      'propertyId': 1,
      'historyStartdate': "01-01-2010",
      'historyEnddate': null
    },
    { // id: 3, (auto)
      'tenantId': 5,
      'propertyId': 3,
      'historyStartdate': "01-01-2001",
      'historyEnddate': "04-30-2005"
    },
    { // id: 4, (auto)
      'tenantId': 5,
      'propertyId': 4,
      'historyStartdate': "05-01-2005",
      'historyEnddate': "12-31-2006"
    },
    { // id: 5, (auto)
      'tenantId': 5,
      'propertyId': 5,
      'historyStartdate': "01-01-2007",
      'historyEnddate': "12-31-2009"
    },
    { // id: 6, (auto)
      'tenantId': 5,
      'propertyId': 6,
      'historyStartdate': "01-01-2010",
      'historyEnddate': "12-31-2013"
    },
    { // id: 7, (auto)
      'tenantId': 5,
      'propertyId': 7,
      'historyStartdate': "01-01-2014",
      'historyEnddate': null
    }
  ]);
};
