-- Revert mhh:effect_has_modifier from pg

BEGIN;

DROP TABLE "modifier";

ALTER TABLE "effect" ADD "modifier" JSON;

COMMIT;
