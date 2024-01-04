import CoreDatamapper from "./core.dataMapper.js";

/**
 * Class representing a data mapper for the 'skill' table.
 *
 * This class extends the 'CoreDatamapper' class and specifies the 'skill' table as its target.
 * It can be used for performing database operations related to the 'skill' table.
 *
 * @class skill
 * @extends CoreDatamapper
 */
class Skill extends CoreDatamapper {
    tableName = "skill";
}

export default Skill;
