
exports.up = function(knex) {
  return knex.schema
  
  // users
  .createTable("users", tbl => {
    tbl.increments();
    tbl.string('username').notNullable().unique();
    tbl.string('password').notNullable();
    tbl.json("name").notNullable();
    tbl.string('email').notNullable().unique();
    tbl.json("address").notNullable();
    tbl.string('type').notNullable();
    tbl.string('phone').notNullable();
    /* SQL
      CREATE TABLE "users" (
        "id" serial NOT NULL UNIQUE,
        "username" varchar(255) NOT NULL UNIQUE,
        "password" varchar(255) NOT NULL,
        "name" json NOT NULL,
        "email" varchar(255) NOT NULL,
        "address" json NOT NULL,
        "type" char NOT NULL,
        "phone" varchar(12) NOT NULL,
        CONSTRAINT "users_pk" PRIMARY KEY ("id")
      ) WITH (
        OIDS=FALSE
      );
    */
  })
  
  // properties
  .createTable("properties", tbl => {
    tbl.increments();
    tbl.string('property-name').notNullable();
    tbl.json('property-address').notNullable();
    tbl.string('property-image').notNullable();
    tbl.string('property-status').notNullable();
    tbl.date('property-startdate');
    tbl.date('property-enddate');
    tbl.integer('landlord-id').unsigned()
      .references('id').inTable('users');
    /* SQL
      CREATE TABLE "properties" (
        "id" serial NOT NULL,
        "property-name" varchar(255) NOT NULL,
        "property-address" json NOT NULL,
        "property-image" varchar(255),
        "property-status" varchar(255),
        "property-startdate" DATE,
        "property-enddate" DATE,
        "landlord-id" bigint NOT NULL,
        CONSTRAINT "properties_pk" PRIMARY KEY ("id")
      ) WITH (
        OIDS=FALSE
      );
    */
  })
  
  // tenanthistory
  .createTable("tenanthistory", tbl => {
    tbl.increments();
    tbl.integer('tenant-id').unsigned()
      .references('id').inTable('users');
      tbl.integer('property-id').unsigned()
        .references('id').inTable('properties');
    tbl.date('history-startdate');
    tbl.date('history-enddate');
    /* SQL
      CREATE TABLE "tenanthistory" (
        "id" serial NOT NULL,
        "tenant-id" bigint NOT NULL,
        "property-id" bigint NOT NULL,
        "history-startdate" DATE,
        "history-enddate" DATE,
        CONSTRAINT "tenanthistory_pk" PRIMARY KEY ("id")
      ) WITH (
        OIDS=FALSE
      );
    */
  })
  
  // workorders
  .createTable("workorders", tbl => {
    tbl.increments();
    tbl.string('workorder').notNullable().unique();
    tbl.text("wo-description").notNullable();
    tbl.string("wo-type").notNullable();
    tbl.date("wo-startdate").notNullable();
    tbl.date("wo-enddate");
    tbl.integer('property-id').unsigned()
      .references('id').inTable('properties');
    /* SQL
      CREATE TABLE "workorders" (
        "id" serial NOT NULL,
        "workorder" char NOT NULL,
        "wo-description" TEXT NOT NULL,
        "wo-type" varchar(255) NOT NULL,
        "wo-startdate" DATE NOT NULL,
        "wo-enddate" DATE,
        "property-id" bigint NOT NULL,
        CONSTRAINT "workorders_pk" PRIMARY KEY ("id")
      ) WITH (
        OIDS=FALSE
      );
    */
  })
  
  // wohistory
  .createTable("wohistory", tbl => {
    tbl.increments();
    tbl.integer('wo-id').unsigned()
      .references('id').inTable('workorders');
    tbl.string('wo-status');
    tbl.string('wo-urgency');
    tbl.string('wo-update');
    tbl.timestamp('wo-updatedate');
    tbl.string('wo-assignedto');
    /* SQL
      CREATE TABLE "wohistory" (
        "id" serial NOT NULL,
        "wo-id" bigint NOT NULL,
        "wo-status" varchar(255),
        "wo-urgency" int,
        "wo-update" TEXT,
        "wo-updatedate" TIMESTAMP NOT NULL,
        "wo-assignedto" varchar(255),
        CONSTRAINT "wohistory_pk" PRIMARY KEY ("id")
      ) WITH (
        OIDS=FALSE
      );
    */
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('wohistory');
    .dropTableIfExists('workorders');
    .dropTableIfExists('tenanthistory');
    .dropTableIfExists('properties');
    .dropTableIfExists('users');
};
