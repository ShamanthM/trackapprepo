import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Modal, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [selectedProductAccessories, setSelectedProductAccessories] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

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

  const handleCardClick = (productData) => {
    // Extract and set the accessories data for the selected product
    setSelectedProductAccessories(productData);
    // Open the popup
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    // Close the popup
    setPopupOpen(false);
  };

  return (
    <div>
      <h2>My Products</h2>
      {userProducts.map((productObject, index) => (
        <div key={index}>
          {Object.keys(productObject).map((key) => {
            if (!isNaN(key)) {
              const productData = productObject[key];
              return (
                <Card key={key} className="card" onClick={() => handleCardClick(productData)}>
                  <CardContent>
                    <Typography variant="h5" component="div">
                      {productData.ProductName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Serial Number: {productData.ProductSerialNumber}
                    </Typography>
                  </CardContent>
                </Card>
              );
            }
            return null; 
          })}
        </div>
      ))}
      
      {/* Popup to display accessories data */}
      <Modal open={isPopupOpen} onClose={handleClosePopup}>
        <Box className="popup">
          {selectedProductAccessories && (
            <Card className="card">
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Accessory Name</TableCell>
                        <TableCell>Serial Number</TableCell>
                        <TableCell>Quantity</TableCell>
                        {/* Add more table headers as needed */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(selectedProductAccessories) ? (
                        selectedProductAccessories.map((accessory, index) => (
                          <TableRow key={index}>
                            <TableCell>{accessory.AccessoryName}</TableCell>
                            <TableCell>{accessory.AccessorySerialNumber}</TableCell>
                            <TableCell>{accessory.AccessoryQuantity}</TableCell>
                            {/* Add more table cells as needed */}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell>{selectedProductAccessories.AccessoryName}</TableCell>
                          <TableCell>{selectedProductAccessories.AccessorySerialNumber}</TableCell>
                          <TableCell>{selectedProductAccessories.AccessoryQuantity}</TableCell>
                          {/* Add more table cells as needed */}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
              <Button onClick={handleClosePopup}>Close</Button>
            </Card>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default MyProducts;
