-- Deploy mhh:weapon_init to pg

BEGIN;

CREATE TABLE "weapon_type" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE
);

CREATE TABLE "weapon" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL UNIQUE,
  "weapon_type_id" INTEGER NOT NULL REFERENCES "weapon_type"("id") ON DELETE CASCADE, 
  "rarity" INTEGER NOT NULL DEFAULT 1,
  "attack" INTEGER NOT NULL,
  "affinity" INTEGER NOT NULL,
  "defense_bonus" INTEGER NOT NULL DEFAULT 0,
  "secret_effect" TEXT,
  "sharpness_red" INTEGER NOT NULL,
  "sharpness_orange" INTEGER DEFAULT 0,
  "sharpness_yellow" INTEGER DEFAULT 0,
  "sharpness_green" INTEGER DEFAULT 0,
  "sharpness_blue" INTEGER DEFAULT 0,
  "sharpness_white" INTEGER DEFAULT 0,
  "sharpness_purple" INTEGER DEFAULT 0
);

COMMIT;
