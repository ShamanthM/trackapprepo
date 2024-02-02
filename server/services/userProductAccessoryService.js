const { QueryTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

class UserProductAccessoryService {
  static async getUserProductAccessoriesDetails(userName) {
    try {
      const query = `
      SELECT
      P.ProductName AS Product,
      JSON_ARRAYAGG(
          JSON_OBJECT(
              'Accessory Name', A.AccessoryName,
              'Quantity', PA.Quantity
          )
      ) AS Accessories
  FROM
      Users U
  JOIN
      UserProductAssignments UPA ON U.UserID = UPA.UserID
  JOIN
      Products P ON UPA.ProductID = P.ProductID
  JOIN
      ProductAccessories PA ON P.ProductID = PA.ProductID
  JOIN
      Accessories A ON PA.AccessoryID = A.AccessoryID
  WHERE
      U.UserName = 'RegularUser1'
  GROUP BY
      P.ProductID,
      P.ProductName;
      `;

      const result = await sequelize.query(query, {
        replacements: { userName },
        type: QueryTypes.SELECT,
      });

      return result;
    } catch (error) {
      console.error('Error executing raw SQL query:', error);
      throw new Error('Error executing raw SQL query');
    }
  }
}

module.exports = UserProductAccessoryService;
