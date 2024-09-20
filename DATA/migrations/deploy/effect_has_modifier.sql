-- Deploy mhh:effect_has_modifier to pg

BEGIN;

ALTER TABLE "effect" DROP "modifier";

CREATE TABLE "modifier" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "effect_id" INTEGER REFERENCES "effect"("id") ON DELETE CASCADE,
    "field" TEXT NOT NULL,
    "operator" TEXT NOT NULL,
    "value" INT NOT NULL
);

COMMIT;
