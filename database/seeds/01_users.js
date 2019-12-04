exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("users").insert([
    { // id: 1, (auto) - landlord@email.com
      // username: "landlord", -- not needed if using Firebase
      // password: "examplepass", -- not needed if using Firebase
      email: "landlord@email.com",
      name: {
        title: "Title",
        firstname: "Firstname",
        middlename: "Middlename",
        lastname: "Lastname",
        suffix: "Suffix",
        preferredname: "Preferred"
      },
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
    { // id: 2, (auto) - dev@email.com
      // username: "dev", -- not needed if using Firebase
      // password: "pass", -- not needed if using Firebase
      email: "dev@email.com",
      name: {
        firstname: "Web",
        lastname: "Dev"
      },
      type: "dev"
    },
    { // id: 3, (auto) - tenant@email.com
      // username: "tenant", -- not needed if using Firebase
      // password: "pass", -- not needed if using Firebase
      email: "tenant@email.com",
      name: { firstname: "Tenant" },
      type: "tenant"
    },
    { // id: 4, (auto) - landlord2@email.com
      email: "landlord2@email.com",
      name: { firstname: "Landlord" },
      type: "landlord"
    },
    { // id: 5, (auto) - tenant2@email.com
      email: "tenant2@email.com",
      name: { 
        firstname: "Second",
        lastname: "Tenant"
      },
      type: "tenant"
    },
  ]);
};
