// ServicePhases.js
import React from 'react';
import { Card, CardBody, CardTitle } from 'reactstrap';
import './ServicePhases.css'; // Import the CSS file

const ServicePhases = () => {
  return (
    <div>
      <h2>Service Phases</h2>
      <div className="service-phases-container">
        <Card className="card">
          <CardBody>
            <CardTitle>Reception</CardTitle>
            {/* Additional content for the Reception phase */}
          </CardBody>
        </Card>

        {/* Repeat similar Card components for other service phases */}
        <Card className="card">
          <CardBody>
            <CardTitle>Evaluation</CardTitle>
            {/* Additional content for the Evaluation phase */}
          </CardBody>
        </Card>

        <Card className="card">
          <CardBody>
            <CardTitle>Quotation</CardTitle>
            {/* Additional content for the Quotation phase */}
          </CardBody>
        </Card>

        <Card className="card">
          <CardBody>
            <CardTitle>Awaiting for the work order</CardTitle>
            {/* Additional content for the Awaiting for the work order phase */}
          </CardBody>
        </Card>

        <Card className="card">
          <CardBody>
            <CardTitle>Service in Progress</CardTitle>
            {/* Additional content for the Service in Progress phase */}
          </CardBody>
        </Card>

        <Card className="card">
          <CardBody>
            <CardTitle>Calibration</CardTitle>
            {/* Additional content for the Calibration phase */}
          </CardBody>
        </Card>

        <Card className="card">
          <CardBody>
            <CardTitle>Packing</CardTitle>
            {/* Additional content for the Packing phase */}
          </CardBody>
        </Card>

        <Card className="card">
          <CardBody>
            <CardTitle>Dispatched</CardTitle>
            {/* Additional content for the Dispatched phase */}
          </CardBody>
        </Card>

        <Card className="card">
          <CardBody>
            <CardTitle>Delivery</CardTitle>
            {/* Additional content for the Delivery phase */}
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ServicePhases;
