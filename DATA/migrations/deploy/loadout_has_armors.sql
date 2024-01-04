-- Deploy mhh:loadout_has_armors to pg

BEGIN;

ALTER TABLE "loadout" ADD "head" JSON;
ALTER TABLE "loadout" ADD "chest" JSON;
ALTER TABLE "loadout" ADD "arms" JSON;
ALTER TABLE "loadout" ADD "waist" JSON;
ALTER TABLE "loadout" ADD "legs" JSON;

COMMIT;
