exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from('workorders').insert([
    {
      // id: 1, (auto)
      workorder: 'Work Order Title',
      woDescription: 'Description of the issue. For example: Tub is leaking.',
      woType: 'plumbing',
      woStartdate: '10-31-2018',
      woEnddate: '11-05-2018',
      propertyId: 1,
    },
    {
      // id: 2, (auto)
      workorder: 'Work Order Title',
      woDescription:
        'Description of the issue. For example: Lights not working in the living room.',
      woType: 'electrical',
      woStartdate: '11-03-2019',
      woEnddate: null,
      propertyId: 1,
    },
  ])
}
