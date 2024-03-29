// AllProducts.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import './AllProducts.css'; // Import the CSS file

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/products');

        if (response.ok) {
          const data = await response.json();
          setProducts(data);
        } else {
          console.error('Error fetching products:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  // URL of the image to be displayed in all cards
  const imageUrl = 'https://th.bing.com/th/id/OIP.VsYsZaXiH5BjsxiZy2dg_wHaE6?rs=1&pid=ImgDetMain';

  return (
    <div className="product-container">
      {products.map((product) => (
        <Card key={product.ProductID} className="product-column">
          <img src={imageUrl} alt={`Product: ${product.ProductName}`} className="product-img" />
          <CardContent>
            <Typography variant="h5" component="div">
              Product: {product.ProductName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Serial Number: {product.SerialNumber}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AllProducts;
