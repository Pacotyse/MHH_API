-- Revert mhh:weapon_init from pg

BEGIN;

DROP TABLE IF EXISTS "weapon";
DROP TABLE IF EXISTS "weapon_type";

COMMIT;
