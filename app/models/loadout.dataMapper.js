import CoreDatamapper from "./core.dataMapper.js";

/**
 * Class representing a data mapper for the 'loadout' table.
 *
 * This class extends the 'CoreDatamapper' class and specifies the 'loadout' table as its target.
 * It can be used for performing database operations related to the 'loadout' table.
 *
 * @class Loadout
 * @extends CoreDatamapper
 */
class Loadout extends CoreDatamapper {
    tableName = "loadout";
}

export default Loadout;