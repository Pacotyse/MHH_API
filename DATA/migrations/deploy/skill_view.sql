-- Deploy mhh:skill_view to pg

BEGIN;

CREATE VIEW "skill_with_effect" AS
SELECT
"skill".id,
"skill".color,
"skill".name,
"skill".description AS "skill_description",
"effect".level,
"skill".level_max,
"effect".description AS "effect_description"
FROM "skill"
JOIN "effect" ON "skill".id = "effect".skill_id;

COMMIT;
