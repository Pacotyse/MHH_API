-- Revert mhh:skill_view from pg

BEGIN;

DROP VIEW IF EXISTS "skills_with_effects";

COMMIT;
