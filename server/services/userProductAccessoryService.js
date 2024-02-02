const { QueryTypes } = require('sequelize');
const sequelize = require('../context/sequelize-config');

class UserProductAccessoryService {
  static async getUserProductAccessoriesDetails(userName) {
    try {
      const query = `
      SELECT
    P.SerialNumber AS ProductSerialNumber,
    P.ProductName AS Product,
    JSON_QUERY(
        '{"Accessories":' +
            JSON_QUERY(
                '[' +
                    STRING_AGG(
                        JSON_QUERY(
                            '{"Accessory Name":"' + A.AccessoryName + '","Quantity":' + CONVERT(VARCHAR, PA.Quantity) + '}',
                            '$'
                        ),
                        ','
                    ) WITHIN GROUP (ORDER BY A.AccessoryID)
                + ']',
                '$'
            )
        + '}'
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
    P.SerialNumber,
    P.ProductName;
  
      `;

      const result = await sequelize.query(query, {
        replacements: { userName },
        type: QueryTypes.SELECT,
      });
      console.log(result);
      return result;
    } catch (error) {
      console.error('Error executing raw SQL query:', error);
      throw new Error('Error executing raw SQL query');
    }
  }
}

module.exports = UserProductAccessoryService;
