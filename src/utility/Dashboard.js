// Dashboard.js
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const Dashboard = ({ userData }) => {
  return (
    <div>
      <h2>User Dashboard</h2>
      {userData &&
        userData.map((userObject, index) => (
          <div key={index}>
            {Object.keys(userObject).map((key) => {
              // Check if the key is a number (indicating user data)
              if (!isNaN(key)) {
                const userData = userObject[key];
                return (
                  <Card key={key} sx={{ minWidth: 275, margin: 2 }}>
                    <CardContent>
                      <Typography variant="h5" component="div">
                        User: {userData.UserName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Product: {userData.ProductName} - {userData.ProductDescription}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Accessory: {userData.AccessoryName} - {userData.AccessoryDescription}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {userData.AccessoryQuantity}
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

export default Dashboard;
