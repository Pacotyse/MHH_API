-- Revert mhh:armor_view from pg

BEGIN;

DROP VIEW IF EXISTS "armors_with_skills";

COMMIT;
