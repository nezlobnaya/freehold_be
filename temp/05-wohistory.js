exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from('wohistory').insert([
    {
      // id: 1, (auto)
      woId: 1,
      woStatus: 'new', // new request
      woUrgency: 4, // scale of 1 to 5:
      // 1 - not urgent, 2 - least urgent, 3 - moderately urgent, 4 - urgent, 5 - most urgent
      // 'woUpdatedate': timestamp
    },
    {
      // id: 2, (auto)
      woId: 1,
      woStatus: 'acknowledged', // landlord acknowledged the request
      woUrgency: 4,
    },
    {
      // id: 3, (auto)
      woId: 1,
      woStatus: 'assigned', // landlord has contacted and assigned work
      woUrgency: 3,
      woUpdate: {
        assignedTo: 'ABC Plumbing',
        comment: 'Waiting on confirmation on date and time frame for repair.', // comment optional
      },
    },
    {
      // id: 4, (auto)
      woId: 1,
      woStatus: 'sending', // sending crew to repair
      woUrgency: 3,
      woUpdate: {
        assignedTo: 'ABC Plumbing',
        expectedRepairDate: '11-04-2018',
        comment:
          'ABC Plumbing will send repair crew to site on 11-04-2018 between 12pm-2pm.',
      },
    },
    {
      // id: 5, (auto)
      woId: 1,
      woStatus: 'review', // require tenant to acknowledge if repaired
      woUrgency: 1,
      woUpdate: {
        assignedTo: 'ABC Plumbing',
        expectedRepairDate: '11-04-2018',
      },
    },
    {
      // id: 6, (auto)
      woId: 1,
      woStatus: 'closed', // tenant acknowledged repair
      woUpdate: {
        comment: 'Thank you, the issue is resolved.',
      },
    },
    {
      // id: 7, (auto)
      woId: 2,
      woStatus: 'new',
      woUrgency: 4,
    },
    {
      // id: 8, (auto)
      woId: 2,
      woStatus: 'acknowledged',
      woUrgency: 4,
    },
    {
      // id: 9, (auto)
      woId: 2,
      woStatus: 'assigned', // landlord has contacted and assigned work
      woUrgency: 2,
      woUpdate: {
        assignedTo: 'Bee Electricans',
        comment: 'Waiting on confirmation on date and time frame for repair.', // comment optional
      },
    },
  ])
}
