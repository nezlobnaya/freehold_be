// #region - variables for models
        
  // Users
  const landlordModel = { 
    userId: 1,
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
  }
  const devModel = { 
    userId: 2,
    email: "dev@email.com",
    name: {
      firstname: "Web",
      lastname: "Dev"
    },
    type: "dev"
  }
  const tenantModel = { 
    userId: 3,
    email: "tenant@email.com",
    name: {
      firstname: "Tenant"
    },
    type: "tenant"
  }

  // Properties
  const property1 = {
    propertiesId: 1,
    propertyName: "Name for the Property",
    propertyAddress: {
      street: "1 First St",
      street2: "Suite 2",
      city: "Salt Lake City",
      state: "Utah",
      zip: "84101",
      country: "USA"
    },
    propertyImage: "property.jpg",
    propertyStatus: "occupied",
    propertyStartdate: "2001-01-01T05:00:00.000Z",
    propertyEnddate: null,
    name: {
      title: "Title",
      firstname: "Firstname",
      middlename: "Middlename",
      lastname: "Lastname",
      suffix: "Suffix",
      preferredname: "Preferred"
    },
    email: "landlord@email.com"
  };
  const property2 = {
    propertiesId: 2,
    propertyName: "Sample",
    propertyAddress: { },
    propertyImage: null,
    propertyStatus: "closed",
    propertyStartdate: "2001-01-01T05:00:00.000Z",
    propertyEnddate: "2018-05-01T04:00:00.000Z",
    name: {
      title: "Title",
      firstname: "Firstname",
      middlename: "Middlename",
      lastname: "Lastname",
      suffix: "Suffix",
      preferredname: "Preferred"
    },
    email: "landlord@email.com"
  };

  // Tenant History
  const tenantHistory = {
    "id": 2,
    "propertyId": 1,
    "propertyName": "Name for the Property",
    "tenantId": 3,
    "name": {
      "firstname": "Tenant"
    },
    "email": "tenant@email.com",
    "phone":null,
    "historyStartdate": "01/01/2010",
    "historyEnddate": null,
    "historyRawStartdate": "2010-01-01T05:00:00.000Z",
    "historyRawEnddate": null
  };

  // Work Orders

  // Work Order History

//#endregion

function fromJSON(obj) {
  return JSON.stringify(obj, undefined, 2);
}

const docs = {
  changes: [
    'Added User Endpoints',
    'Added Tenant History Endpoints'
  ],
  planning: [
    '<h2>PropMan Links</h2>' +
    'Front-End: <a href="https://propman.netlify.com/">Propman - Property Management</a> <br />' +
    'Back-End: <a href="https://pt6-propman.herokuapp.com/">Property Manager Backend</a> <br />' +
    '<br />' +
    '<strong>Notion Product Board</strong>  <br />' +
    '<a href="https://www.notion.so/Property-Manager-bd4c33b5c8974b8aa938512b993f9108">Property Manager</a> <br />' +
    '<br />' +
    '<strong>Trello Boards</strong> <br />' +
    '<a href="https://trello.com/b/mKfgx81y/property-manager">Property Manager</a> <br />' +
    '<a href="https://trello.com/b/llCWH1QF/property-manager-retrospective">Property Manager Retrospective</a> <br />' +
    '<br />' +
    '<strong>GitHub</strong> <br />' +
    '<a href="https://github.com/Lambda-School-Labs/property-manager-fe">Front-End</a> <br />' +
    '<a href="https://github.com/Lambda-School-Labs/property-manager-be">Back-End</a> <br />' +
    '<br />' +
    '<a href="https://www.figma.com/file/Mtjt9s7kxfGmh6fIgEszRY/PropMan">PropMan – Figma</a> <br />' +
    '<a href="https://docs.google.com/document/d/1bYrgvbAEnnRviKBgIuJjOvdBhLfcCzw5stIwvk0ErM8">Labs Sprint Rubric</a> <br />'
  ],
  address: "https://pt6-propman.herokuapp.com",
  menu: {
    planning: {
      tag: "h1",
      onclick: "{showContent('planning')}",
      content: "Planning",
    },
    developmentBE: {
      tag: "h1",
      onclick: "{showContent('developmentBE')}",
      content: "Development Back End",
      subSections: [
        {
          section: "models",
          tag: "h2",
          class: "moreInfo",
          onclick: "{showContent('models')}",
          content: "<button>v</button> Models",
        },
        {
          section: "endpoints",
          tag: "h2",
          class: "moreInfo",
          onclick: "{showContent('endpoints')}",
          event: 'displayEndpoints',
          content: "<button>v</button> Endpoints",
          subHeaders: [
            {
              section: "userEndpoints",
              tag: "h3",
              class: "moreInfo",
              onclick: "{showContent('userEndpoints')}",
              docs: 'docs.endpoints.User',
              content: "User Endpoints",
            },
            {
              section: "propertyEndpoints",
              tag: "h3",
              class: "moreInfo",
              onclick: "{showContent('propertyEndpoints')}",
              docs: 'docs.endpoints.Property',
              content: "Property Endpoints",
            },
            {
              section: "tenantHistoryEndpoints",
              tag: "h3",
              class: "moreInfo",
              onclick: "{showContent('tenantHistoryEndpoints')}",
              docs: 'docs.endpoints.TenantHistory',
              content: "Tenant History Endpoints",
            },
            {
              section: "sampleEndpoints",
              tag: "h3",
              class: "moreInfo",
              onclick: "{showContent('sampleEndpoints')}",
              docs: 'docs.endpoints.Sample',
              content: "Sample Endpoints",
            },
          ]
        },
        {
          section: "database",
          tag: "h2",
          class: "moreInfo",
          onclick: "{showContent('database')}",
          event: 'displayDatabase',
          content: "<button>v</button> Database Structures",
          subHeaders: [
            {
              section: "tables",
              tag: "h3",
              class: "moreInfo",
              onclick: "{showContent('tables')}",
              docs: 'docs.database.tables',
              content: "Tables",
            }
          ]
        }
      ]
    },
  },
  models: {
    'User': {
      function: "modelsUsers()",
      examples: [
        landlordModel,
        devModel,
        tenantModel
      ]
    },
    'Property': {
      function: "modelsProperty()",
      examples: [
        property1,
        property2
      ]
    },
    'Tenant History': {
      function: "modelsTenantHistory()",
      examples: [ tenantHistory ]
    },
    'Work Orders': {
      function: "test()",
      examples: [
        {}
      ]
    },
    'Work Order History': {
      function: "test()",
      examples: [
        {}
      ]
    },
  },
  endpoints: {
    User: {
      Register: {
        header: "User Endpoints - Register",
        todo: "Add expected returns",
        comment: "",
        endpoint: "/api/auth/register",
        type: "POST",
        description: "Register a new user",
        expectedInput: {
          "email": "example@gmail.com",
          "password": "badpassword",
        },
        sampleRequest: {
          axiosThen: "token => console.log&lpar;token&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        },
        expectedReturn: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
        expectedFailedReturn: "" // TODO: if Fails
      },
      Login: {
        header: "User Endpoints - Login",
        todo: "Add expected returns",
        comment: "",
        endpoint: "/api/auth/login",
        type: "POST",
        description: "Login user",
        expectedInput: {
          "email": "example@gmail.com",
          "password": "badpassword",
        },
        sampleRequest: {
          axiosThen: "token => console.log&lpar;token&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        },
        expectedReturn: {
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
        },
        expectedFailedReturn: "" // TODO: if Fails
      },
      'Update User': {
        header: "User Endpoints - Update User",
        todo: "TODO",
        comment: "",
        endpoint: "",
        type: "",
        description: "",
        expectedInput: { },
        sampleRequest: { },
        expectedReturn: { },
        expectedFailedReturn: ""
      },
      'Delete User': {
        header: "User Endpoints - Delete User",
        todo: "TODO",
        comment: "",
        endpoint: "",
        type: "",
        description: "",
        expectedInput: { },
        sampleRequest: { },
        expectedReturn: { },
        expectedFailedReturn: ""
      }
    },
    Property: {
      Add: {
        header: "Add a Property",
        todo: "In Review",
        comment: "",
        endpoint: "/api/properties/",
        type: "post",
        description: "Adds a Property to the database.",
        expectedInput: {
          "propertyName": "New Property Added",
          "propertyAddress": {
            "street": "1 First St",
            "street2": "Suite 2",
            "city": "Salt Lake City",
            "state": "Utah",
            "zip": "84101",
            "country": "USA"
          },
          "propertyImage": "newProperty.jpg",
          "propertyStatus": "occupied",
          "propertyStartdate": "2019-01-01",
          "landlordId": 1
        },
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: {
          "propertyName": "New Property Added",
          "propertyAddress": {
            "street": "1 First St",
            "street2": "Suite 2",
            "city": "Salt Lake City",
            "state": "Utah",
            "zip": "84101",
            "country": "USA"
          },
          "propertyImage": "newProperty.jpg",
          "propertyStatus": "occupied",
          "propertyStartdate": "2019-01-01",
          "propertyEnddate": null,
          "landlordId": 1
        },
        expectedFailedReturn: { message: 'Failed to create new property.' }
      },
      Get: {
        header: "Get a Property",
        todo: "In Review",
        comment: "",
        endpoint: "/api/properties/:id",
        type: "get",
        description: "Returns an object based on the Property id.",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: property1,
        expectedFailedReturn: { message: 'Failed to get results.' }
      },
      GetAll: {
        header: "Get All Properties",
        todo: "In Review",
        comment: "",
        endpoint: "/api/properties/",
        type: "GET",
        description: "Returns an array of all Properties in the database.",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "token => console.log&lpar;token&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: fromJSON([property1, property2]),
        expectedFailedReturn: { message: 'Failed to get results.' }
      },
      GetAllUser: {
        header: "Get All Properties for User",
        todo: "In Review",
        comment: "",
        endpoint: "/api/properties/user/:email",
        type: "GET",
        description: "Returns an array of all Properties for User.",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "token => console.log&lpar;token&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: fromJSON([property1, property2]),
        expectedFailedReturn: { message: 'Failed to get results.' }
      },
      Update: {
        header: "Update a Property",
        todo: "In Review",
        comment: "",
        endpoint: "/api/properties/:id",
        type: "put",
        description: "Updates a Property based on property id.",
        expectedInput: {
        "propertyName": "Property Updated",
        "propertyStatus": "open"
        },
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: {
          "propertiesId": 1,
          "propertyName": "Property Updated",
          "propertyAddress": {
            "street": "1 First St",
            "street2": "Suite 2",
            "city": "Salt Lake City",
            "state": "Utah",
            "zip": "84101",
            "country": "USA"
          },
          "propertyImage": "property.jpg",
          "propertyStatus": "open",
          "propertyStartdate": "2001-01-01T05:00:00.000Z",
          "propertyEnddate": null,
          "name": {
            "title": "Title",
            "firstname": "Firstname",
            "middlename": "Middlename",
            "lastname": "Lastname",
            "suffix": "Suffix",
            "preferredname": "Preferred"
          },
          "email": "landlord@email.com"
        },
        expectedFailedReturn: { message: 'Failed to update the property.' }
      },
      Delete: {
        header: "Delete a Property",
        todo: "In Review",
        comment: "Currently this will not delete if property is linked in another database. This function should be added, or maybe a way to archive property.",
        endpoint: "/api/properties/:id",
        type: "delete",
        description: "Deletes a Property based on property id, and returns the property information.",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: {
          "propertiesId": 2,
          "propertyName": "Sample",
          "propertyAddress": {},
          "propertyImage": null,
          "propertyStatus": "closed",
          "name": {
            "title": "Title",
            "firstname": "Firstname",
            "middlename": "Middlename",
            "lastname": "Lastname",
            "suffix": "Suffix",
            "preferredname": "Preferred"
          },
          "email": "landlord@email.com"
        },
        expectedFailedReturn: { message: 'Failed to delete property.' }
      }
    },
    TenantHistory: {
      Add: {
        header: "Add Entry",
        todo: "",
        comment: "",
        endpoint: "/api/history/",
        type: "post",
        description: "Add Entry for Tenant History",
        expectedInput: {
          'tenantId': 5,
          'propertyId': 1,
          'historyStartdate': "12-31-2018"
        },
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: {
          id: 9,
          propertyId: 1,
          propertyName: 'Name for the Property',
          tenantId: 5,
          name: { firstname: 'Second', lastname: 'Tenant' },
          email: 'tenant2@email.com',
          phone: null,
          historyStartdate: '2018-12-31T05:00:00.000Z',
          historyEnddate: null 
        },
        expectedFailedReturn: { message: 'Failed to create new entry.' }
      },
      Get: {
        header: "Get by Id",
        todo: "",
        comment: "",
        endpoint: "/api/history/:id",
        type: "get",
        description: "Get tenant history results for given id.",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: tenantHistory,
        expectedFailedReturn: { message: 'Failed to get results for given id.' }
      },
      GetByProperty: {
        header: "Get Results by Property",
        todo: "",
        comment: "",
        endpoint: "/api/history/property/:id",
        type: "get",
        description: "Get all tenant history results for property, by property id.",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: [
          {
            "id":2,
            "tenantId":3,
            "name":{"firstname":"Tenant"},
            "email":"tenant@email.com",
            "phone":null,
            "historyStartdate":"01/01/2010",
            "historyEnddate":null,
            "historyRawStartdate":"2010-01-01T05:00:00.000Z"
          }
        ],
        expectedFailedReturn: { message: 'Failed to get results for given property id.' }
      },
      GetByTenant: {
        header: "Get Results by Tenant",
        todo: "",
        comment: "",
        endpoint: "/api/history/tenant/:id",
        type: "get",
        description: "Get all tenant history results for tenant.",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: [
          {
            "id":1,
            "propertyId":2,
            "propertyName":"Sample",
            "historyStartdate":"01/01/2001",
            "historyEnddate":"12/31/2009",
            "historyRawStartdate":"2001-01-01T05:00:00.000Z"
          },
          {
            "id":2,
            "propertyId":1,
            "propertyName":"Name for the Property",
            "historyStartdate":"01/01/2010",
            "historyEnddate":null,
            "historyRawStartdate":"2010-01-01T05:00:00.000Z"
          }
        ],
        expectedFailedReturn: { message: 'Failed to get results for given tenant id.' }
      },
      Update: {
        header: "Update Entry",
        todo: "",
        comment: "",
        endpoint: "/api/history/:id",
        type: "put",
        description: "Update Entry for Tenant History by Id",
        expectedInput: {
          'historyStartdate': "01-01-2001",
          'historyEnddate': "12-31-2010"
        },
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: {
          id: 1,
          propertyId: 2,
          propertyName: 'Sample',
          tenantId: 3,
          name: { firstname: 'Tenant' },
          email: 'tenant@email.com',
          phone: null,
          historyStartdate: '2001-01-01T05:00:00.000Z',
          historyEnddate: '2010-12-31T05:00:00.000Z' 
        },
        expectedFailedReturn: [
          { message: 'Could not find entry with given id.' },
          { message: 'Failed to update the entry.' }
      ]
      },
      Delete: {
        header: "Delete Entry",
        todo: "",
        comment: "",
        endpoint: "/api/history/:id",
        type: "delete",
        description: "Delete Entry for Tenant History by Id",
        expectedInput: "",
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: {
          id: 2,
          propertyId: 1,
          propertyName: 'Name for the Property',
          tenantId: 3,
          name: { firstname: 'Tenant' },
          email: 'tenant@email.com',
          phone: null,
          historyStartdate: '2010-01-01T05:00:00.000Z',
          historyEnddate: null
        },
        expectedFailedReturn: [
          { message: 'Could not delete entry.' },
          { message: 'Could not find entry with given id.' },
          { message: 'Failed to delete entry.' }
        ]
      }
    },
    Sample: {
      // Add: {
      //   header: "Add a ",
      // },
      Get: {
        header: "This is a Sample for Documentation Only.",
        todo: "This is still Todo.",
        comment: "This is a comment.",
        endpoint: "/api/sample/",
        type: "post",
        description: "Description of the Endpoint",
        expectedInput: {
          "sample": "this is a sample object",
          "object": {
            "can": "can have an object inside an object.",
          }
        },
        sampleRequest: {
          axiosThen: "response => console.log&lpar;response&rpar;",
          axiosCatch: "err => console.error&lpar;err&rpar;",
        }, 
        expectedReturn: "Expected Return",
        expectedFailedReturn: "Expected Return if Fails."
      },
      // Update: {
      //   header: "Update a ",
      // },
      // Delete: {
      //   header: "Delete a ",
      // }
    }
  },
  database: {
    tables: {
      user: {
        header: "Users Table",
        todo: "Reformatting need to update.",
        comment: "",
        table: {
          id: "integer -> increment number assigned by database", 
          email: "string, notNullable, unique",
          name: {
            title: "string",
            firstname: "string",
            middlename: "string",
            lastname: "string",
            suffix: "string",
            preferredname: "string"
          },
          address: {
            street: "string",
            street2: "string",
            city: "string",
            state: "string",
            zip: "integer",
            country: "string"
          },
          type: "string, notNullable -> (expects one of these:) landlord, tenant, dev",
          phone: "string"
        }
      },
      properties: {
        header: "Properties Table",
        todo: "",
        comment: "Status options may include: open, closed, occupied, forRent, or forSale.",
        table: {
          id: "integer -> increment number assigned by database", 
          propertyName: "string -> Name for the Property",
          propertyAddress: {
            street: "string",
            street2: "string",
            city: "string",
            state: "string",
            zip: "integer",
            country: "string"
          },
          propertyImage: "string -> can be null",
          propertyStatus: "string -> can be null", 
          propertyStartdate: "date -> can be null",
          propertyEnddate: "date -> can be null",
          landlordId: "integer -> references id in table \'users\'"
        }
      },
      tenantHistory: {
        header: "Tenant History Table",
        todo: "",
        comment: "",
        table: {
          id: "integer -> increment number assigned by database", 
          tenantId: "integer -> references id in table \'users\'",
          propertyId: "integer -> references id in table \'properties\'",
          historyStartdate: "date, can be 'null'",
          historyEnddate: "date, can be 'null'"
        }
      },
      workOther: {
        header: "Work Order Table",
        todo: "",
        comment: "",
        table: {
          id: "integer -> increment number assigned by database", 
          workorder: "string -> Work Order Title",
          woDescription: "text -> Description of the issue.",
          woType: "string -> type like: plumbing or electrical",
          woStartdate: "date -> from a timestamp or date selection?",
          woEnddate: "date, can be 'null'",
          propertyId: "integer -> references id in table 'properties'",
        }
      },
      woHistory: {
        header: "Work Order History Table",
        todo: "Need to review work order status options. <br> Right now: 'new, acknowledged, assigned, sending, review, or closed'",
        comment: "Scale: 1 - not urgent, 2 - least urgent, 3 - moderately urgent, 4 - urgent, 5 - most urgent",
        table: {
          id: "integer -> increment number assigned by database", 
          woId: "integer -> references id in table \'workorders\'",
          woStatus: 'string -> status of work order', 
          woUrgency: "integer -> Scale of 1 to 5",
          woUpdate: { 
            assignedTo: "string -> Name of Company task assigned to",
            comment: "string -> optional comment"
          },
          woUpdatedate: "timestamp"
        }
      },
      // other: {
      //   header: "Other Table",
      //   todo: "",
      //   comment: "",
      //   table: {}
      // }
    },
  }
};

module.exports = docs;