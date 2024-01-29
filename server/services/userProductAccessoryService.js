const { QueryTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

class UserProductAccessoryService {
  static async getUserProductAccessoriesDetails(userName) {
    try {
      const result = await sequelize.query(
        'CALL GetUserProductAccessoriesDetails(:userName)',
        {
          replacements: { userName },
          type: QueryTypes.SELECT,
        }
      );
      return result;
    } catch (error) {
      console.error('Error calling stored procedure:', error);
      throw new Error('Error calling stored procedure');
    }
  }
}

module.exports = UserProductAccessoryService;
