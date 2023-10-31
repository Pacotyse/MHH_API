-- Revert mhh:loadout_has_armors from pg

BEGIN;

ALTER TABLE "loadout" DROP "head";
ALTER TABLE "loadout" DROP "chest";
ALTER TABLE "loadout" DROP "arms";
ALTER TABLE "loadout" DROP "waist";
ALTER TABLE "loadout" DROP "legs";

COMMIT;
