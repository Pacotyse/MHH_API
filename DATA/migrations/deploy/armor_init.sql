-- Deploy mhh:armor_init to pg

BEGIN;

CREATE TABLE "armor_set" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "rarity" INTEGER NOT NULL
);

CREATE TABLE "armor" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "armor_type" TEXT NOT NULL,
    "armor_set_id" INTEGER NOT NULL REFERENCES "armor_set"("id") ON DELETE CASCADE,
    "defense" INTEGER NOT NULL,
    "resistance_fire" INTEGER NOT NULL,
    "resistance_water" INTEGER NOT NULL,
    "resistance_thunder" INTEGER NOT NULL,
    "resistance_ice" INTEGER NOT NULL,
    "resistance_dragon" INTEGER NOT NULL
);

COMMIT;
