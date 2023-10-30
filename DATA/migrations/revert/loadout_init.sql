-- Revert mhh:loadout_init from pg

BEGIN;

DROP TABLE IF EXISTS "loadout";

COMMIT;
