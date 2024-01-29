import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  
  // Parse the JSON string to get the actual object and then extract the 'userName' property
  const storedUserData = localStorage.getItem('userData');
  const { userName } = storedUserData ? JSON.parse(storedUserData) : {};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/userProductAccessories/getUserProductAccessoriesDetails/${userName}`);
       
        console.log(response);

        if (response.ok) {
          const data = await response.json();
          setUserProducts(data);
        } else {
          console.error('Error fetching user products:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching user products:', error);
      }
    };

    fetchData();
  }, [userName]);

  return (
    <div>
      <h2>My Products</h2>
      {userProducts.map((productObject, index) => (
        <div key={index}>
          {Object.keys(productObject).map((key) => {
            // Check if the key is a number (indicating product data)
            if (!isNaN(key)) {
              const productData = productObject[key];
              return (
                <Card key={key} className="card">
                  <CardContent>
                    <Typography variant="h5" component="div">
                      Product: {productData.ProductName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Description: {productData.ProductDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Accessory: {productData.AccessoryName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Quantity: {productData.AccessoryQuantity}
                    </Typography>
                  </CardContent>
                </Card>
              );
            }
            return null; // Ignore non-numeric keys
          })}
        </div>
      ))}
    </div>
  );
};

export default MyProducts;
