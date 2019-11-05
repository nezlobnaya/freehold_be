exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("wohistory").insert([
    {
      // id: 1, (auto)
      'wo-id': 1,
      'wo-status': 'new', // new request
      'wo-urgency': 4, // scale of 1 to 5:
        // 1 - not urgent, 2 - least urgent, 3 - moderately urgent, 4 - urgent, 5 - most urgent
      // 'wo-updatedate': timestamp
    },
    {
      // id: 2, (auto)
      'wo-id': 1,
      'wo-status': 'acknowledged', // landlord acknowledged the request
      'wo-urgency': 4
    },
    {
      // id: 3, (auto)
      'wo-id': 1,
      'wo-status': 'assigned', // landlord has contacted and assigned work
      'wo-urgency': 3,
      'wo-update': {
        assignedTo: "ABC Plumbing",
        comment: "Waiting on confirmation on date and time frame for repair." // comment optional
      }
    },
    {
      // id: 4, (auto)
      'wo-id': 1,
      'wo-status': 'sending', // sending crew to repair
      'wo-urgency': 3,
      'wo-update': {
        assignedTo: "ABC Plumbing",
        expectedRepairDate: "11-04-2018",
        comment: "ABC Plumbing will send repair crew to site on 11-04-2018 between 12pm-2pm."
      }
    },
    {
      // id: 5, (auto)
      'wo-id': 1,
      'wo-status': 'review', // require tenant to acknowledge if repaired
      'wo-urgency': 1,
      'wo-update': {
        assignedTo: "ABC Plumbing",
        expectedRepairDate: "11-04-2018"
      }
    },
    {
      // id: 6, (auto)
      'wo-id': 1,
      'wo-status': 'closed', // tenant acknowledged repair
      'wo-update': {
        comment: "Thank you, the issue is resolved."
      }
    },
    {
      // id: 7, (auto)
      'wo-id': 2,
      'wo-status': 'new', 
      'wo-urgency': 4, 
    },
    {
      // id: 8, (auto)
      'wo-id': 2,
      'wo-status': 'acknowledged', 
      'wo-urgency': 4, 
    },
    {
      // id: 9, (auto)
      'wo-id': 2,
      'wo-status': 'assigned', // landlord has contacted and assigned work
      'wo-urgency': 2,
      'wo-update': {
        assignedTo: "Bee Electricans",
        comment: "Waiting on confirmation on date and time frame for repair." // comment optional
      }
    },
  ]);
};
