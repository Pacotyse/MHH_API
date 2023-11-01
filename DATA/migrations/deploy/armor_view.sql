-- Deploy mhh:armor_view to pg

BEGIN;

CREATE VIEW "armors_with_skills" AS 
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
                WHEN "skills_with_effects".id IS NULL THEN NULL
                ELSE json_build_object(
					'id', "skills_with_effects".id, 
					'name', "skills_with_effects".name, 
					'skill_description', "skills_with_effects".skill_description,
					'color', "skills_with_effects".color,
					'level', "skills_with_effects".level, 
					'level_max', "skills_with_effects".level_max, 
					'effect_description', "skills_with_effects".effect_description,
					'modifier', "skills_with_effects".modifier
				)
            END
        ),
        '[]'::json
    ) AS skills
FROM "armor"
JOIN "armor_set" ON "armor".armor_set_id = "armor_set".id
LEFT JOIN "armors_has_skills" ON "armor".id = "armors_has_skills".armor_id
LEFT JOIN "skills_with_effects" ON "skills_with_effects".id = "armors_has_skills".skill_id
AND "armors_has_skills".level = "skills_with_effects".level
GROUP BY "armor".id, "armor_set".id;

COMMIT;
