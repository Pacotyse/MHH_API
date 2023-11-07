-- Revert mhh:armor_view from pg

BEGIN;

DROP VIEW IF EXISTS "armor_with_skill";

COMMIT;
