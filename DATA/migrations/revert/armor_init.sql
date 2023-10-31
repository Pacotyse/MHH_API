-- Revert mhh:armor_init from pg

BEGIN;

DROP TABLE IF EXISTS "armor";
DROP TABLE IF EXISTS "armor_set";

COMMIT;
