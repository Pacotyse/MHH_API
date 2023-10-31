-- Deploy mhh:skill_init to pg

BEGIN;

CREATE TABLE "skill" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT NOT NULL,
    "level_max" INTEGER NOT NULL DEFAULT(1),
    "color" TEXT DEFAULT('#fff')
);

CREATE TABLE "effect" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    "skill_id" INTEGER REFERENCES "skill"("id") ON DELETE CASCADE,
    "level" INTEGER,
    "description" TEXT NOT NULL,
    "modifier" JSON
);

CREATE TABLE "armors_has_skills" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "armor_id" INTEGER REFERENCES "armor"("id"),
    "skill_id" INTEGER REFERENCES "skill"("id"),
    "level" INTEGER NOT NULL DEFAULT(1)
);

COMMIT;
