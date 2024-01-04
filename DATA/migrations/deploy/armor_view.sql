-- Deploy mhh:armor_view to pg

BEGIN;

CREATE VIEW "armor_with_skill" AS
SELECT
"armor".id,
"armor".type,
"armor_set".rarity,
"armor_set".name AS "armor_set",
"armor".name,
"armor".defense,
 json_build_object(
        'fire', "armor".resistance_fire,
        'water', "armor".resistance_water,
        'thunder', "armor".resistance_thunder,
        'ice', "armor".resistance_ice,
        'dragon', "armor".resistance_dragon
    ) AS resistances,
	COALESCE(
        json_agg(
            CASE
                WHEN "skill_with_effect".id IS NULL THEN NULL
                ELSE json_build_object(
					'id', "skill_with_effect".id,
                    'color', "skill_with_effect".color,
					'name', "skill_with_effect".name,
					'skill_description', "skill_with_effect".skill_description,
					'level', "skill_with_effect".level,
					'level_max', "skill_with_effect".level_max,
					'effect_description', "skill_with_effect".effect_description
				)
            END
        ),
        '[]'::json
    ) AS skills
FROM "armor"
JOIN "armor_set" ON "armor".armor_set_id = "armor_set".id
LEFT JOIN "armors_has_skills" ON "armor".id = "armors_has_skills".armor_id
LEFT JOIN "skill_with_effect" ON "skill_with_effect".id = "armors_has_skills".skill_id
AND "armors_has_skills".level = "skill_with_effect".level
GROUP BY "armor".id, "armor_set".id;

COMMIT;
