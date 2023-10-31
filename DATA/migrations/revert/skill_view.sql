-- Revert mhh:skill_view from pg

BEGIN;

DROP VIEW IF EXISTS "skill_with_effect";

COMMIT;
