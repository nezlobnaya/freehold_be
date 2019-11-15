exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("users").insert([
    {
      // id: 1, (auto)
      // username: "landlord",
      // password: "examplepass", -- not needed if using Firebase
      name: {
        title: "Title",
        firstname: "Firstname",
        middlename: "Middlename",
        lastname: "Lastname",
        suffix: "Suffix",
        preferredname: "Preferred"
      },
      email: "landlord@email.com",
      address: {
        street: "1 First St",
        street2: "Suite 2",
        city: "Salt Lake City",
        state: "Utah",
        zip: "84101",
        country: "USA"
      },
      type: "landlord",
      phone: "123-456-7890"
    },
    {
      // id: 2, (auto)
      // username: "dev",
      // password: "pass", -- not needed if using Firebase
      name: {
        firstname: "Web",
        lastname: "Dev"
      },
      email: "dev@email.com",
      type: "dev"
    },
    {
      // id: 3, (auto)
      // username: "tenant",
      // password: "pass", -- not needed if using Firebase
      name: {
        firstname: "Tenant"
      },
      email: "tenant@email.com",
      type: "tenant"
    },
  ]);
};
