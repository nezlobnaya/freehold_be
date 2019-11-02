exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex.from("test").insert([
    {
      name: "Elvis"
    },
    {
      name: "Matt"
    },
    {
      name: "Sandy"
    },
    {
      name: "Anthony"
    },
    {
      name: "Ian"
    },
    {
      name: "Teddy"
    },
    {
      name: "Tyler"
    }
  ]);
};
