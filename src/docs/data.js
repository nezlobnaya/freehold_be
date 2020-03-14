// import the seedData file
const {
  users,
  properties,
  tenanthistory,
  workorders,
} = require('../../database/seedData.js')

// #region - Data from seedData file
// User Data
const userData = []
users.forEach((x, i) => {
  userData.push({id: i + 1, ...x})
})

// Properties Data
const propertiesData = []
properties.forEach((x, i) => {
  propertiesData.push({id: i + 1, ...x})
})

// Tenant History Data
const tenanthistoryData = []
tenanthistory.forEach((x, i) => {
  tenanthistoryData.push({id: i + 1, ...x})
})

// Work Order Data
const workorderData = []
workorders.forEach((x, i) => {
  workorderData.push({id: i + 1, ...x})
})

// #endregion

// Data - Example inputs and results
const data = {
  users: {
    db: userData,
    register: {
      input: {
        email: 'example@gmail.com',
        password: 'badpassword',
        type: 'landlord',
        firstName: 'optional',
        lastName: 'optional',
        phone: '123-456-7890',
      },
      return: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    },
    login: {
      input: {
        email: 'example@gmail.com',
        password: 'badpassword',
      },
      return: {
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      },
    },
  },
  properties: {
    db: propertiesData,
    create: {
      input: {
        name: 'Property Name',
        street: '1 First St',
        city: 'Salt Lake City',
        state: 'Utah',
        zip: '84101',
        status: 'occupied',
        landlordId: 1,
      },
      return: {
        id: 3,
        name: 'Property Name',
        street: '1 First St',
        city: 'Salt Lake City',
        state: 'Utah',
        zip: '84101',
        status: 'occupied',
        image: null,
        landlordId: 1,
      },
    },
    read: {},
    update: {
      input: {
        name: 'Property Updated',
        status: 'vacant',
      },
      return: {
        id: 1,
        name: 'Property Updated',
        street: '1 First St',
        city: 'Salt Lake City',
        state: 'Utah',
        zip: '84101',
        status: 'vacant',
        image: null,
        landlordId: 1,
      },
    },
    delete: {},
  },
  tenanthistory: {
    db: tenanthistoryData,
    add: {
      input: {
        tenantId: 5,
        propertyId: 1,
        historyStartdate: '12-31-2018',
      },
      return: {
        id: 9,
        tenantId: 5,
        propertyId: 1,
        startDate: '12/31/2018',
        endDate: null,
      },
    },
    get: {
      input: '',
      return: tenanthistoryData[0],
    },
    getByProperty: {
      input: '',
      return: tenanthistoryData,
    },
    getByTenant: {
      input: '',
      return: tenanthistoryData,
    },
    update: {
      input: {
        endDate: '12-31-2010',
      },
      return: {
        id: 2,
        tenantId: 3,
        propertyId: 1,
        startDate: '01/01/2010',
        endDate: '12/31/2010',
      },
    },
    delete: {
      input: '',
      return: tenanthistoryData[0],
    },
  },
  workorders: {
    db: workorderData,
    add: {
      input: {
        title: 'Short Description',
        description: 'Description of the issue.',
        type: 'electrical',
        startDate: '01-01-2020',
        endDate: null,
        propertyId: 1,
      },
      return: {
        id: 4,
        title: 'Short Description',
        description: 'Description of the issue.',
        type: 'electrical',
        startDate: '01-01-2020',
        endDate: null,
        propertyId: 1,
        createdBy: 5,
      },
    },
    get: {
      input: '',
      return: workorderData[0],
    },
    getAll: {
      input: '',
      return: workorderData,
    },
    update: {
      input: {
        endDate: '01-20-2020',
      },
      return: {
        id: 3,
        title: 'Third Workorder',
        description: 'Description of the issue.',
        type: 'plumbing',
        startDate: '01-16-2020',
        endDate: '01-20-2020',
        propertyId: 7,
        createdBy: 5,
      },
    },
    delete: {
      input: '',
      return: workorderData[1],
    },
  },
  sample: {
    create: {
      input: {},
      return: {},
    },
    read: {
      input: '',
      return: '',
    },
    update: {
      input: '',
      return: '',
    },
    delete: {
      input: '',
      return: '',
    },
  },
}

module.exports = data
