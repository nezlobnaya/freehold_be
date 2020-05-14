# API Documentation

[![Maintainability](https://api.codeclimate.com/v1/badges/d16b8cd63a2307a5a0a2/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/property-manager-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/d16b8cd63a2307a5a0a2/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/property-manager-be/test_coverage)

#### Backend delpoyed at [🚫name service here](🚫add URL here) <br>

## Getting Started

To get the server running locally:

1. `git clone <REPO>`
2. `npm install`
3. Install PostgreSQL

- If you're on Mac:

4. `createdb propman` this creates the development database
5. `createdb propman-test` this creates the test database

- If you're on Windows:

5. a. Open pgadmin
   b. Create database named `propman`

6. Run `npm run res` (which runs `npx knex migrate:latest` and `npx knex seed:run` )

## Available Scripts

- `npm start` to start the local server
- `npm start:dev` to start local server in development environment with nodemon
- `npm test` to run test suite once
- `npm run test:watch` to run test suite in watch mode
- `npm run migrate:latest` a convenient wrapper around knex
- `npm run seed:run` a convenient wrapper around knex
- `npm run migrate:test` runs migrations against the test database

---

🚫 [READMEoriginal.md](./READMEoriginal.md) has the original README to reference.

🚫 Sections have been commented out that need to be updated.

---

### Backend framework goes here

🚫 Why did you choose this framework?

<!--
-    Point One
-    Point Two
-    Point Three
-    Point Four -->

## 2️⃣ Endpoints

#### Auth Routes

| Method | Endpoint             | Access Control     | Description                                                         |
| ------ | -------------------- | ------------------ | ------------------------------------------------------------------- |
| POST   | `/api/auth/register` | all users          | Registers a new landlord                                            |
| POST   | `/api/auth/login`    | landlords, tenants | Logs in an existing user. Tenants require invitation from landlord. |

#### Tenant Routes

| Method | Endpoint             | Access Control     | Description                                                         |
| ------ | -------------------- | ------------------ | ------------------------------------------------------------------- |
| GET   | `/api/tenant/bylandlord/:id` | landlord | Returns all tenants tied to the landlord |
| GET   | `/api/tenant/byunit/:id`    | landlords | Returns all tenants tied to specified unit |


#### Property Routes

| Method | Endpoint              | Access Control     | Description                     |
| ------ | --------------------- | ------------------ | ------------------------------- |
| POST   | `/api/properties/`    | landlords          | Adds a property to the database |
| GET    | `/api/properties/:id` | landlords, tenants | Returns a specific property     |
| GET    | `/api/properties/`    |                    | Returns all properties.         |
| PUT    | `/api/properties/:id` | landlords          | Modify an existing property.    |

#### Work Order Routes

| Method | Endpoint              | Access Control     | Description                       |
| ------ | --------------------- | ------------------ | --------------------------------- |
| POST   | `/api/workorders/`    | landlords, tenants | Adds a work order to the database |
| GET    | `/api/workorders/:id` | landlords, tenants | Returns a specific work order     |
| PUT    | `/api/workorders/:id` | landlords, tenants | Updates an existing work order    |

#### Media Routes

| Method | Endpoint         | Access Control     | Description                      |
| ------ | ---------------- | ------------------ | -------------------------------- |
| POST   | `/api/media/`    | landlords, tenants | Adds media info to database      |
| GET    | `/api/media/:id` | landlords, tenants | Returns a specified media's info |
| PUT    | `/api/media/:id` | landlords, tenants | Updates specified media          |
| DELETE | `/api/media/:id` | landlords, tenants | Deletes specified media info     |

#### Message Routes

| Method | Endpoint                        | Access Control     | Description                                                 |
| ------ | ------------------------------- | ------------------ | ----------------------------------------------------------- |
| POST   | `/api/message/`                 | landlords, tenants | Adds a message to the database                              |
| GET    | `/api/message/:id`              | landlords, tenants | Gets a specific message                                     |
| GET    | `/api/message/conversation/:id` | landlords, tenants | Gets all message associated with the specified conversation |

#### Payments Routes

| Method | Endpoint            | Access Control     | Description                      |
| ------ | ------------------- | ------------------ | -------------------------------- |
| POST   | `/api/payments/`    | landlords, tenants | Adds payment info to database    |
| GET    | `/api/payments/:id` | landlords, tenants | Gets the specified payments info |

# Data Model

#### user

---

```
{
  id: STRING,
  landlord: BOOLEAN,
  landlord_id: STRING
}
```

#### unit

---

```
{
  id: UUID,
  name: STRING,
  street_address: STRING,
  city: STRING,
  state: STRING,
  zip: STRING,
  occupied: INTEGER,
  rent: INTEGER
}
```

#### user_unit

---

```
{
  unit_id: FOREIGN KEY REFERENCES id IN unit TABLE,
  user_id: FOREIGN KEY REFERENCES id IN user TABLE,
  lease_start: DATE,
  lease_end: DATE
}
```

#### work_order

---

```
{
  id: UUID,
  name: STRING,
  description: STRING,
  type: STRING,
  status: STRING,
  comment: STRING,
  start_date: TIMESTAMP,
  update_date: TIMESTAMP,
  unit_id: FOREIGN KEY REFERENCES id IN unit TABLE,
  user_id: FOREIGN KEY REFERENCES id IN user TABLE,
  in_house: BOOLEAN
}
```

#### media

---

```
{
  id: UUID,
  link: STRING,
  title: STRING,
  timestamp: TIMESTAMP,
  work_order_id: FOREIGN KEY REFERENCES id IN work_order TABLE,
  unit_id: FOREIGN KEY REFERENCES id IN unit TABLE,
  user_id: FOREIGN KEY REFERENCES id IN user TABLE,
}
```

#### payments

---

```
{
  id: UUID,
  unit_id: FOREIGN KEY REFERENCES id IN unit TABLE,
  user_id: FOREIGN KEY REFERENCES id IN user TABLE,
  type: STRING,
  amount: INTEGER,
  payment_date: DATE,
  late: BOOLEAN,
  due_date: INTEGER
}
```

#### message

---

```
{
  id: UUID,
  conversation_id: INTEGER,
  message: STRING
}
```

#### user_message

---

```
{
  user_id: FOREIGN KEY REFERENCES id IN user TABLE,
  message_id: FOREIGN KEY REFERENCES id IN message TABLE
}
```

## 2️⃣ Actions

🚫 This is an example, replace this with the actions that pertain to your backend

<!--
`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` -> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user
-->

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

<!-- will we have a STAGING_DB?
    *  STAGING_DB - optional development db for using functionality
-->

```
PORT=4000         // Port number for express server to run on
NODE_ENV          // set to "development" until ready for "production"
DB_HOST=localhost // Location of the database
DB_PORT=5432      // Port the database is running on
DB_USER=postgres  // THIS IS YOUR LOCAL DB USER NAME (probably postgres)
DB_PASSWORD=pass  // THIS IS YOUR LOCAL DATABASE/PSQL PASSWORD
DB_NAME=propman   // THIS IS YOUR LOCAL DATABASE NAME

TEST_DB_HOST=localhost
TEST_DB_PORT=5432
TEST_DB_USER=postgres
TEST_DB_PASSWORD=postgres
TEST_DB_NAME=propman-test

GOOGLE_APPLICATION_CREDENTIALS=./firebase/admin.json
FIREBASE_URL=example-url
FIREBASE_API_KEY=examplekey
FIREBASE_AUTH_DOMAIN=exampleapp.firebaseapp.com
FIREBASE_DATABASE_URL=exampledb.firebaseio.com
FIREBASE_PROJECT_ID=example-project
FIREBASE_STORAGE_BUCKET=exmaple.appspot.com
FIREBASE_MESSAGING_SENDER_ID=1234
FIREBASE_APP_ID=1234
FIREABASE_MEASUREMENT_ID=example-g-id

JWT_SECRET="Your Secret." // you can generate this by using a python shell or add in a temporary secret.
```

<!-- Currently not using Sendgrid or Stripe at this time
  *  SENDGRID_API_KEY - this is generated in your Sendgrid account
  *  stripe_secret - this is generated in the Stripe dashboard
-->

## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

**This codebase uses Eslint and Prettier to enforce styling.** When you go to commit
code, Husky will lint and format your code, failing to commit if there is
something that cannot be automatically fixed.

### Issue/Bug Request

**If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**

- Check first to see if your issue has already been reported.
- Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
- Create a live example of the problem.
- Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes, where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation](https://github.com/Lambda-School-Labs/property-manager-fe/blob/master/README.md) for details on the fronend of our project.

<!-- Add DS iOS and/or Andriod links here if applicable. (Currently not applicable. An iOS and/or Andriod app would be a good future feature.) -->
