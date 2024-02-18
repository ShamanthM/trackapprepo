// ServicePhases.js
import React, { useState } from 'react';
import { Container, Typography, Button, Link, Card, CardContent, Grid, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import './ServicePhases.css'; // Import your custom styles

const ServicePhases = () => {
  const [selectedPhase, setSelectedPhase] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const phases = [
    { name: 'Reception', link: 'https://your-inward-form-link.com' },
    { name: 'Evaluation' },
    { name: 'Quotation', link: 'https://your-quotation-form-link.com' },
    { name: 'Awaiting for the Work Order' },
    { name: 'Service in Progress' },
    { name: 'Calibration' },
    { name: 'Packing' },
    { name: 'Dispatched', link: 'https://your-outward-form-link.com' },
    { name: 'Delivery' },
  ];

  const selectPhase = (phaseName) => {
    setSelectedPhase(phaseName);
    setOpenDialog(true);
  };

  const closeDeliveryPhase = () => {
    setOpenDialog(false);
  };

  const handleYesClick = () => {
    setOpenDialog(false);
    const selectedCard = document.querySelector(`.phase-card[data-name="${selectedPhase}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }
  };

  const handleNoClick = () => {
    setOpenDialog(false);
    const selectedCard = document.querySelector(`.phase-card[data-name="${selectedPhase}"]`);
    if (selectedCard) {
      selectedCard.classList.remove('selected');
    }
  };

  return (
    <Container className="container" maxWidth="md">
      <Typography variant="h2" align="center" gutterBottom>
        SERVICE PHASES
      </Typography>
      <Grid container spacing={2}>
        {phases.map((phase, index) => (
          <Grid key={index} item xs={12} sm={6} md={4}>
            <Card
              className={`phase-card ${selectedPhase === phase.name ? 'selected' : ''}`}
              data-name={phase.name}
              onClick={() => selectPhase(phase.name)}
            >
              <CardContent>
                <Typography variant="h4">{phase.name}</Typography>
                {phase.link && (
                  <Typography>
                    <Link href={phase.link} target="_blank" rel="noopener noreferrer">
                      {`Fill ${phase.name} Form`}
                    </Link>
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={closeDeliveryPhase} maxWidth="xs" fullWidth>
        <DialogTitle>
          <Typography variant="h6">{`You selected: ${selectedPhase}`}</Typography>
          <IconButton sx={{ position: 'absolute', right: 0, top: 0 }} onClick={closeDeliveryPhase} aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Add content for the selected phase */}
          <Typography variant="body1">Customize this content as needed</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleYesClick} variant="contained" color="success" startIcon={<CheckIcon />}>
            Yes
          </Button>
          <Button onClick={handleNoClick} variant="contained" color="error">
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ServicePhases;
