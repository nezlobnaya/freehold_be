const cleaner = require('knex-cleaner')
const example = require('./example')
const db = require('../../database/db')

beforeEach(async () => {
  // This wipes the entire test database clean before each test
  await cleaner.clean(db, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  })
})

afterAll(async () => {
  // This closes out all remaining database connections after the file finishes
  // running.
  await db.destroy()
})

// Just a personal perference but I like to write tests using it() instead of
// test(), and always write my test description starting with "should" and then
// describe the expectation.
//
// This helps me decide what the test should focus on testing, helps document
// for future developers what exactly is failing if there is a regression, and
// makes it so I have a framework to follow.
it('should return all names', async () => {
  // When testing code wrapped in async, sometimes the error that gets displayed
  // for a failing test isn't all that helpful. It's best to wrap the
  // asynchronous code in a try..catch and console.error the error out.
  try {
    // When writing tests I like to think of the three As
    // 1) Arrange
    // 2) Act
    // 3) Assert
    //
    // Arrange does any set up required for the test. This can be seeding the
    // database with some data, or setting up props for a component.
    //
    // Act is testing the thing (usually a function) the way a 'user' would. A user
    // can be an end user, or another developer. It's important to remember that you
    // should write tests with the user in mind, and avoid testing implementation
    // details (testing hidden things that the user will never interact with).
    //
    // Assert is the part where you actually test the thing. I'm not of the mindset
    // that 1 test should only have 1 assertion, instead that 1 test should test
    // only 1 feature. There are many cases where you might make multiple, or many
    // assertions inside of a single test.

    // 1) Arrange
    // We are seeding the 'test' table in the database with an array of objects
    // with names.
    await db.from('test').insert([
      {
        name: 'Elvis',
      },
      {
        name: 'Matt',
      },
      {
        name: 'Sandy',
      },
      {
        name: 'Anthony',
      },
      {
        name: 'Ian',
      },
      {
        name: 'Teddy',
      },
      {
        name: 'Tyler',
      },
    ])

    // 2) Act
    // Here we are using the function to get the data from the database. The
    // user we are simulating with this 'act' is another developer. The person
    // who writes a route using this function is a good example.
    const names = await example.getAll()

    // 3) Assert
    // This is a pretty simple assertion that just checks that the array is
    // equal (toEqual checks if a structure deeply equals) to what we expect.
    expect(names).toEqual([
      {
        name: 'Elvis',
      },
      {
        name: 'Matt',
      },
      {
        name: 'Sandy',
      },
      {
        name: 'Anthony',
      },
      {
        name: 'Ian',
      },
      {
        name: 'Teddy',
      },
      {
        name: 'Tyler',
      },
    ])
  } catch (err) {
    console.error(err)
  }
})
