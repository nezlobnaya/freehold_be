const server = require('../server');

const supertest = require('supertest');

const nameTest = require('./nameTestModel');

it('Should return all names', () => {
    expect(nameTest.getAll()).toBe([
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
      ])
})