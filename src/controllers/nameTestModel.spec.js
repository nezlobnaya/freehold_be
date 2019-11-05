const nameTest = require("./nameTestModel");
const db = require("../../database/db-config");

beforeEach(async () => {
  await db.raw('TRUNCATE "test"');
});

it("Should return all names", async () => {
  try {
    await db.from("test").insert([
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

    const names = await nameTest.getAll();

    expect(names).toEqual([
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
  } catch (err) {
    console.error(err);
  }
});
