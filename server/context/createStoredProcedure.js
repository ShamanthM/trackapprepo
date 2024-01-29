const { QueryTypes } = require('sequelize');
const sequelize = require('./sequelize-config');

// SQL query to create the stored procedure
const createStoredProcedureQuery = `
DELIMITER //
CREATE PROCEDURE GetUserProductAccessoriesDetails(
    IN p_UserName VARCHAR(255)
)
BEGIN
    SELECT
        U.UserName AS UserName,
        P.ProductID,
        P.SerialNumber AS ProductSerialNumber,
        P.ProductName AS ProductName,
        P.Description AS ProductDescription,
        A.AccessoryID,
        A.AccessorySerialNo AS AccessorySerialNumber,
        A.AccessoryName AS AccessoryName,
        A.Description AS AccessoryDescription,
        PA.Quantity AS AccessoryQuantity
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
        U.UserName = p_UserName;
END //
DELIMITER ;
`;

// Execute the query to create the stored procedure
sequelize.query(createStoredProcedureQuery, { type: QueryTypes.RAW })
  .then(() => {
    console.log('Stored procedure created successfully.');
  })
  .catch((error) => {
    console.error('Error creating stored procedure:', error.message);
  });
