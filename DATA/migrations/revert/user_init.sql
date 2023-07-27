-- Revert mhh:user_init from pg

BEGIN;

DROP TABLE IF EXISTS "user";

COMMIT;
