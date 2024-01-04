import CoreDatamapper from "./core.dataMapper.js";

/**
 * Class representing a data mapper for the 'armor' table.
 *
 * This class extends the 'CoreDatamapper' class and specifies the 'armor' table as its target.
 * It can be used for performing database operations related to the 'armor' table.
 *
 * @class armor
 * @extends CoreDatamapper
 */
class Armor extends CoreDatamapper {
    tableName = "armor_with_skill";
}

export default Armor;