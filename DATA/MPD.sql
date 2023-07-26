BEGIN;

DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "steam_id" TEXT,
    "playstation_id" TEXT,
    "xbox_id" TEXT,
    "switch_id" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL,
    "updated_at" TIMESTAMPTZ
);

DROP TABLE IF EXISTS "armor_set";
CREATE TABLE "armor_set" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "rarity" INTEGER NOT NULL
);

DROP TABLE IF EXISTS "armor_type";
CREATE TABLE "armor_type" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE
);

DROP TABLE IF EXISTS "armor";
CREATE TABLE "armor" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "armor_set_id" INTEGER NOT NULL REFERENCES "armor_set"("id"),
    "armor_type_id" INTEGER NOT NULL REFERENCES "armor_type"("id"),
    "decoration_level_1" INTEGER NOT NULL DEFAULT 0,
    "decoration_level_2" INTEGER NOT NULL DEFAULT 0,
    "decoration_level_3" INTEGER NOT NULL DEFAULT 0,
    "defense" INTEGER NOT NULL,
    "resistance_fire" INTEGER NOT NULL,
    "resistance_water" INTEGER NOT NULL,
    "resistance_thunder" INTEGER NOT NULL,
    "resistance_ice" INTEGER NOT NULL,
    "resistance_dragon" INTEGER NOT NULL
);

DROP TABLE IF EXISTS "skill";
CREATE TABLE "skill" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "name" TEXT NOT NULL,
    "level_max" INTEGER NOT NULL DEFAULT 1,
    "color" TEXT NOT NULL
);

DROP TABLE IF EXISTS "effect";
CREATE TABLE "effect" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "skill_id" INTEGER NOT NULL REFERENCES "skill"("id"),
    "level" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT NOT NULL,
    "modifier" JSON
);

DROP TABLE IF EXISTS "armor_has_skill";
CREATE TABLE "armor_has_skill" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "armor_id" INTEGER NOT NULL REFERENCES "armor"("id"),
    "skill_id" INTEGER NOT NULL REFERENCES "skill"("id"),
    "level" INTEGER NOT NULL
);

DROP TABLE IF EXISTS "weapon_type";
CREATE TABLE "weapon_type" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE
);

DROP TABLE IF EXISTS "substitute_talent";
CREATE TABLE "substitute_talent" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "weapon_type_id" INTEGER REFERENCES "weapon_type"("id"),
  "rank" INTEGER NOT NULL,
  "description" TEXT NOT NULL
);

DROP TABLE IF EXISTS "weapon";
CREATE TABLE "weapon" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "weapon_type_id" INTEGER NOT NULL REFERENCES "weapon_type"("id"), 
  "attack" INTEGER NOT NULL,
  "affinity" INTEGER NOT NULL,
  "rarity" INTEGER NOT NULL DEFAULT 1,
  "defense_bonus" INTEGER NOT NULL DEFAULT 0,
  "secret_effect" TEXT,
  "decoration_level_1" INTEGER NOT NULL DEFAULT 0,
  "decoration_level_2" INTEGER NOT NULL DEFAULT 0,
  "decoration_level_3" INTEGER NOT NULL DEFAULT 0,
  "sharpness_red" INTEGER NOT NULL,
  "sharpness_orange" INTEGER DEFAULT 0,
  "sharpness_yellow" INTEGER DEFAULT 0,
  "sharpness_green" INTEGER DEFAULT 0,
  "sharpness_blue" INTEGER DEFAULT 0,
  "sharpness_white" INTEGER DEFAULT 0,
  "sharpness_purple" INTEGER DEFAULT 0
);

DROP TABLE IF EXISTS "element";
CREATE TABLE "element" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "name" TEXT NOT NULL
);

DROP TABLE IF EXISTS "weapon_has_element";
CREATE TABLE "weapon_has_element" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "weapon_id" INTEGER REFERENCES "weapon"("id"),
  "element_id" INTEGER REFERENCES "element"("id")
);

DROP TABLE IF EXISTS "decoration";
CREATE TABLE "decoration" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "rank" INTEGER NOT NULL,
  "skill_id" INTEGER NOT NULL REFERENCES "skill"("id"),
  "skill_level" INTEGER NOT NULL
);

DROP TABLE IF EXISTS "loadout";
CREATE TABLE "loadout" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
  "name" TEXT NOT NULL,
  "description" TEXT,
  "weapon" JSON NOT NULL,
  "head" JSON,
  "chest" JSON,
  "arms" JSON,
  "waist" JSON,
  "legs" JSON,
  "talisman" JSON,
  "stats" JSON NOT NULL,
  "score" INTEGER NOT NULL DEFAULT 0,
  "created_at" TIMESTAMPTZ NOT NULL,
  "updated_at" TIMESTAMPTZ
);

DROP TABLE IF EXISTS "user_has_loadout";
CREATE TABLE "user_has_loadout" (
    "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "user"("id"),
    "loadout_id" INTEGER NOT NULL REFERENCES "loadout"("id")
);

DROP TABLE IF EXISTS "loadout_has_decoration";
CREATE TABLE "loadout_has_decoration" (
  "id" INTEGER GENERATED ALWAYS AS PRIMARY KEY,
  "loadout_id" INTEGER NOT NULL REFERENCES "loadout"("id"),
  "decoration_id" INTEGER NOT NULL REFERENCES "decoration"("id")
);

COMMIT;