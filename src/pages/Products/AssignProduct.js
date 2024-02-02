import React, { useState, useEffect } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from '@mui/material';

const AssignProduct = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState({});
  const [selectedAccessories, setSelectedAccessories] = useState([]);
  const [accessoryWithQuantity, setAccessoryWithQuantity] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editCount, setEditCount] = useState(0);

  useEffect(() => {
    // Fetch users data
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => {
        console.log('Users:', data);
        setUsers(Array.isArray(data) ? data.map(user => user.UserName) : []);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    // Fetch products data
    fetch('http://localhost:8080/products')
      .then(response => response.json())
      .then(data => {
        console.log('Products:', data);
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Fetch accessories data based on the selected product
    if (selectedProduct && selectedProduct.ProductID) {
      fetch(`http://localhost:8080/productaccessories/report/${selectedProduct.ProductID}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Accessories for selected product:', data);

          const accessoriesArray = data.Accessories || [];

          if (Array.isArray(accessoriesArray) && accessoriesArray.length > 0) {
            const accessoryNames = accessoriesArray.map(accessory => accessory.AccessoryName);
            setAccessories(accessoryNames);
          } else {
            setAccessories([]);
          }
        })
        .catch(error => console.error('Error fetching accessories:', error));
    }
  }, [selectedProduct]);

  const handleAssignProduct = () => {
    // Process the selected accessories and their quantities
    const accessoriesWithQuantity = selectedAccessories.map(accessoryName => {
      const quantity = prompt(`Enter quantity for ${accessoryName}:`);
      return { accessoryName, quantity: parseInt(quantity, 10) || 0 };
    });

    setAccessoryWithQuantity(accessoriesWithQuantity);
  };

  const handleEditAccessory = (index, count) => {
    setEditIndex(index);
    setEditCount(count);
  };

  const handleUpdateCount = () => {
    // Update the count in the table
    const updatedAccessoryWithQuantity = [...accessoryWithQuantity];
    updatedAccessoryWithQuantity[editIndex].quantity = editCount;
    setAccessoryWithQuantity(updatedAccessoryWithQuantity);

    // Reset edit state
    setEditIndex(null);
    setEditCount(0);
  };

  const handleDeleteAccessory = (accessoryName) => {
    // Remove the accessory from the selected accessories
    const updatedAccessories = selectedAccessories.filter(name => name !== accessoryName);
    setSelectedAccessories(updatedAccessories);

    // Remove the accessory from the table
    const updatedAccessoryWithQuantity = accessoryWithQuantity.filter(item => item.accessoryName !== accessoryName);
    setAccessoryWithQuantity(updatedAccessoryWithQuantity);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '80px' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Assign Product
        </Typography>

        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <InputLabel htmlFor="userDropdown">Select User:</InputLabel>
          <Select
            id="userDropdown"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <MenuItem value="">
              <em>Select User</em>
            </MenuItem>
            {users.map((userName, index) => (
              <MenuItem key={index} value={userName}>
                {userName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <InputLabel htmlFor="productDropdown">Select Product:</InputLabel>
          <Select
            id="productDropdown"
            value={selectedProduct.ProductID || ''}
            onChange={(e) => {
              const selectedProductId = e.target.value;
              const selectedProductObject = products.find((product) => product.ProductID === selectedProductId);
              setSelectedProduct(selectedProductObject || {});
            }}
          >
            <MenuItem value="">
              <em>Select Product</em>
            </MenuItem>
            {products.map((product) => (
              <MenuItem key={product.ProductID} value={product.ProductID}>
                {product.ProductName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: '100%', marginBottom: 2 }}>
          <InputLabel htmlFor="accessoryDropdown">Select Accessories:</InputLabel>
          <Select
            id="accessoryDropdown"
            multiple
            value={selectedAccessories}
            onChange={(e) =>
              setSelectedAccessories(Array.isArray(e.target.value) ? e.target.value : [])
            }
          >
            {accessories.map((accessoryName, index) => (
              <MenuItem key={index} value={accessoryName}>
                {accessoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          onClick={handleAssignProduct}
        >
          Assign Product
        </Button>

        {accessoryWithQuantity.length > 0 && (
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Accessory Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accessoryWithQuantity.map((accessory, index) => (
                  <TableRow key={index}>
                    <TableCell>{accessory.accessoryName}</TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <TextField
                          type="number"
                          value={editCount}
                          onChange={(e) => setEditCount(e.target.value)}
                        />
                      ) : (
                        accessory.quantity
                      )}
                    </TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <Button
                          variant="contained"
                          onClick={handleUpdateCount}
                        >
                          Update
                        </Button>
                      ) : (
                        <Box>
                          <Chip
                            label="Edit"
                            onClick={() => handleEditAccessory(index, accessory.quantity)}
                            style={{ marginRight: '8px' }}
                          />
                          <Chip
                            label="Remove"
                            onDelete={() => handleDeleteAccessory(accessory.accessoryName)}
                          />
                        </Box>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default AssignProduct;
