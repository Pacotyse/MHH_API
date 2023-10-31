-- Deploy mhh:skill_view to pg

BEGIN;

CREATE VIEW "skills_with_effects" AS 
SELECT 
"skill".id,
"skill".name,
"skill".description AS "skill_description",
"skill".color,
"effect".level,
"skill".level_max,
"effect".description AS "effect_description",
"effect".modifier
FROM "skill" 
JOIN "effect" ON "skill".id = "effect".skill_id;

COMMIT;
