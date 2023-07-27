-- Deploy mhh:user_init to pg

BEGIN;

CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "steam_id" TEXT,
    "playstation_id" TEXT,
    "xbox_id" TEXT,
    "switch_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

COMMIT;
