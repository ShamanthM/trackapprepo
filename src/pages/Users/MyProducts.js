import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
} from '@mui/material';
import './MyProducts.css'; // Import your custom styles

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
    setSelectedProductAccessories(productData);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <h2>My Products</h2>
      <Grid container spacing={2}>
        {userProducts.map((productData) => (
          <Grid key={productData.ProductID} item xs={12} sm={6} md={4}>
            <Card className="card" onClick={() => handleCardClick(productData)}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {productData.ProductName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Serial Number: {productData.ProductSerialNumber}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
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
                        {/* Add more table headers as needed */}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {Array.isArray(selectedProductAccessories.AccessoriesList) ? (
                        selectedProductAccessories.AccessoriesList.map((accessory, index) => (
                          <TableRow key={index}>
                            <TableCell>{accessory}</TableCell>
                            {/* Add more table cells as needed */}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell>{selectedProductAccessories.AccessoriesList}</TableCell>
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
