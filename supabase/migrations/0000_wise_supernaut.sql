CREATE TABLE IF NOT EXISTS "user" (
	"auth0Id" varchar(120) PRIMARY KEY NOT NULL,
	"email" varchar(255) NOT NULL,
	"firstName" varchar(120),
	"lastName" varchar(120),
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
