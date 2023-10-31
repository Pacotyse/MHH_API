-- Revert mhh:skill_init from pg

BEGIN;

DROP TABLE IF EXISTS "armors_has_skills";
DROP TABLE IF EXISTS "effect";
DROP TABLE IF EXISTS "skill";

COMMIT;
