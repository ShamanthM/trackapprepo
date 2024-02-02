import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
  Typography,
} from '@mui/material';

const NewServiceRequest = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedUserName, setSelectedUserName] = useState('');
  const [selectedProductId, setSelectedProductId] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [servicePhase, setServicePhase] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch Users data
    fetch('http://localhost:8080/users')
      .then((response) => response.json())
      .then((data) => {
        // Check if data is an array before setting it to state
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Invalid data format for users:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });

    // Fetch Products data
    fetch('http://localhost:8080/products')
      .then((response) => response.json())
      .then((data) => {
        // Check if data is an array before setting it to state
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Invalid data format for products:', data);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSubmit = () => {
    // Perform the POST request to store data
    fetch('http://localhost:8080/serviceassignments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        UserID: selectedUserId,
        UserName: selectedUserName,
        ProductID: selectedProductId,
        SerialNumber: serialNumber,
        ServicePhase: servicePhase,
        Description: description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success, e.g., show a success message or redirect
        console.log('Service Request submitted successfully:', data);
      })
      .catch((error) => {
        // Handle error, e.g., show an error message
        console.error('Error submitting service request:', error);
      });
  };

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        mt: 4,
      }}
      component="main"
      maxWidth="sm"
    >
      <Typography variant="h4" gutterBottom>
        New Service Request
      </Typography>
      <FormControl sx={{ minWidth: 120, width: '100%', mt: 2 }}>
        <InputLabel>User ID</InputLabel>
        <Select
          value={selectedUserId}
          label="User ID"
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.UserID} value={user.UserID}>
              {user.UserID}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, width: '100%', mt: 2 }}>
        <InputLabel>User Name</InputLabel>
        <Select
          value={selectedUserName}
          label="User Name"
          onChange={(e) => setSelectedUserName(e.target.value)}
        >
          {users.map((user) => (
            <MenuItem key={user.UserID} value={user.UserName}>
              {user.UserName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, width: '100%', mt: 2 }}>
        <InputLabel>Product Name</InputLabel>
        <Select
          value={selectedProductId}
          label="Product Name"
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          {products.map((product) => (
            <MenuItem key={product.ProductID} value={product.ProductID}>
              {product.ProductName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Serial Number"
        value={serialNumber}
        onChange={(e) => setSerialNumber(e.target.value)}
        sx={{ mt: 2 }}
      />

      <FormControl sx={{ minWidth: 120, width: '100%', mt: 2 }}>
        <InputLabel>Service Phases</InputLabel>
        <Select
          value={servicePhase}
          label="Service Phases"
          onChange={(e) => setServicePhase(e.target.value)}
        >
          <MenuItem value="Reception">Reception</MenuItem>
          <MenuItem value="Evaluation">Evaluation</MenuItem>
          <MenuItem value="Quotation">Quotation</MenuItem>
          <MenuItem value="Service in progress">Service in progress</MenuItem>
          <MenuItem value="Calibration">Calibration</MenuItem>
          <MenuItem value="Packing">Packing</MenuItem>
          <MenuItem value="Delivery">Delivery</MenuItem>
        </Select>
      </FormControl>

      {/* Updated Description field */}
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={6}  // Adjust the number of rows as needed
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ mt: 2 }}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewServiceRequest;
