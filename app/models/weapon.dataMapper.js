import CoreDatamapper from "./core.dataMapper.js";

/**
 * Class representing a data mapper for the 'weapon' table.
 *
 * This class extends the 'CoreDatamapper' class and specifies the 'weapon' table as its target.
 * It can be used for performing database operations related to the 'weapon' table.
 *
 * @class Weapon
 * @extends CoreDatamapper
 */
class Weapon extends CoreDatamapper {
    tableName = "weapon";
}

export default Weapon;