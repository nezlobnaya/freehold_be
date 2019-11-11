CREATE TABLE "users" (
	"id" serial NOT NULL UNIQUE,
	"username" varchar(255) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"name" json NOT NULL,
	"email" varchar(255) NOT NULL,
	"type" char NOT NULL,
	"address" json NOT NULL,
	"phone" varchar(12) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



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




ALTER TABLE "properties" ADD CONSTRAINT "properties_fk0" FOREIGN KEY ("landlord-id") REFERENCES "users"("id");

ALTER TABLE "tenanthistory" ADD CONSTRAINT "tenanthistory_fk0" FOREIGN KEY ("tenant-id") REFERENCES "users"("id");
ALTER TABLE "tenanthistory" ADD CONSTRAINT "tenanthistory_fk1" FOREIGN KEY ("property-id") REFERENCES "properties"("id");

ALTER TABLE "workorders" ADD CONSTRAINT "workorders_fk0" FOREIGN KEY ("property-id") REFERENCES "properties"("id");

ALTER TABLE "wohistory" ADD CONSTRAINT "wohistory_fk0" FOREIGN KEY ("wo-id") REFERENCES "workorders"("id");

