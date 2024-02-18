import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
} from '@mui/material';
import './InwardForm.css';

const InwardForm = () => {
  const [equipmentName, setEquipmentName] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [accessories, setAccessories] = useState([{ name: '', quantity: '' }]);

  const handleEquipmentChange = (event) => {
    setEquipmentName(event.target.value);
    setModelNumber('');
  };

  const handleAccessoryChange = (index, field, value) => {
    const updatedAccessories = [...accessories];
    updatedAccessories[index][field] = value;
    setAccessories(updatedAccessories);
  };

  const addAccessory = () => {
    setAccessories([...accessories, { name: '', quantity: '' }]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Your form submission logic goes here
  };

  return (
    <Container className="form-container" maxWidth="md">
      <Typography variant="h5" align="center" gutterBottom>
        INWARD FORM
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Customer Name"
          variant="outlined"
          margin="normal"
          required
        />
        <TextareaAutosize
          rowsMin={3}
          placeholder="Address"
          className="textarea"
          required
        />
        <TextField
          fullWidth
          label="Contact Number"
          variant="outlined"
          margin="normal"
          required
        />
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="equipment-name">Equipment Name</InputLabel>
          <Select
            value={equipmentName}
            onChange={handleEquipmentChange}
            label="Equipment Name"
            inputProps={{
              name: 'equipment-name',
              id: 'equipment-name',
            }}
          >
            <MenuItem value="ET">DC EARTH RESISTANCE TESTER</MenuItem>
            <MenuItem value="IT">INSULATION TESTER</MenuItem>
            <MenuItem value="TFR">PREZIOHM TFR</MenuItem>
            <MenuItem value="Offline fault locator">OFFLINE FAULT LOCATOR</MenuItem>
            <MenuItem value="DC">DC EARTH FAULT LOCATOR</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth variant="outlined" margin="normal">
          <InputLabel htmlFor="model-number">Model Number</InputLabel>
          <Select
            value={modelNumber}
            onChange={(e) => setModelNumber(e.target.value)}
            label="Model Number"
            inputProps={{
              name: 'model-number',
              id: 'model-number',
            }}
          >
            {/* Options will be dynamically populated based on the selected equipment */}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          label="Serial Number"
          variant="outlined"
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Kits Received"
          variant="outlined"
          margin="normal"
        />
        <div className="accessories-container">
          <Typography variant="subtitle1">Accessories Received:</Typography>
          {accessories.map((accessory, index) => (
            <div key={index} className="accessory-row">
              <TextField
                label="Accessory Name"
                variant="outlined"
                value={accessory.name}
                onChange={(e) => handleAccessoryChange(index, 'name', e.target.value)}
                required
              />
              <TextField
                label="Quantity"
                variant="outlined"
                type="number"
                value={accessory.quantity}
                onChange={(e) => handleAccessoryChange(index, 'quantity', e.target.value)}
                required
              />
            </div>
          ))}
          <Button variant="outlined" color="primary" onClick={addAccessory}>
            Add Accessory
          </Button>
        </div>
        <TextField
          fullWidth
          label="Customer Email"
          variant="outlined"
          type="email"
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default InwardForm;
