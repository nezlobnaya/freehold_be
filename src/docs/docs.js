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
  models: {
    User: {
      function: "modelsUsers()",
      examples: [
        { 
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
        },
        { 
          userId: 2,
          email: "dev@email.com",
          name: {
            firstname: "Web",
            lastname: "Dev"
          },
          type: "dev"
        },
        { 
          userId: 3,
          email: "tenant@email.com",
          name: {
            firstname: "Tenant"
          },
          type: "tenant"
        }
      ],
    },
    'Property': {
      function: "test()",
    },
    'Tenant History': {}
  }
};

module.exports = docs;