exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from('workorders').insert([
    {
      // id: 1, (auto)
      title: 'Work Order Title',
      description: 'Description of the issue. For example: Tub is leaking.',
      type: 'plumbing',
      startDate: '10-31-2018',
      endDate: '11-05-2018',
      propertyId: 1,
      createdBy: 2,
    },
    {
      // id: 2, (auto)
      title: 'Short Description',
      description: 'Description of the issue. For example: Lights not working in the living room.',
      type: 'electrical',
      startDate: '11-03-2019',
      endDate: null,
      propertyId: 1,
      createdBy: 1
    },
  ])
}
