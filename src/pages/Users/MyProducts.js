import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyProducts.css'; // Import your custom styles

const MyProducts = () => {
  const [userProducts, setUserProducts] = useState([]);
  const [selectedProductAccessories, setSelectedProductAccessories] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const navigate = useNavigate(); // Initialize useNavigate hook

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

  const handleAccessoriesClick = (productData) => {
    setSelectedProductAccessories(productData);
    setPopupOpen(true);
  };

  const handleServiceRequestClick = (productData) => {
    // Use navigate to navigate to the /user/service-phases path
    navigate('/user/service-phases');
  };

  return (
    <div>
      <header>
        <img src="C:/Users/User/Downloads/logo.jpg" alt="MK SRINIVASAN SYSTEMS PRIVATE LIMITED" />
        <div style={{ flexGrow: 1.5, marginTop: '60px' }}>MK SRINIVASAN SYSTEMS PRIVATE LIMITED</div>
      </header>

      <div id="search-bar">
        <input type="text" id="search-input" placeholder="Search for serial number" />
        <button id="search-button">Search</button>
      </div>

      <div id="highlighted-title">
        DIGITAL EARTH RESISTANCE TESTER
      </div>

      <div className="product-container">
        {userProducts.map((productData) => (
          <div key={productData.ProductSerialNumber} className="product-column" onClick={() => handleCardClick(productData)}>
            <h2>{productData.Product}</h2>
            <img className="product-img" src={`C:/Users/User/Downloads/${productData.Product}.jpg`} alt={productData.Product} />
            <div className="accessories-heading">Click on the product to see the AccessoriesData</div>

            <div className="buttons-container">
              <Button color="primary" onClick={() => handleAccessoriesClick(productData)}>
                Accessories
              </Button>
              <Button color="success" onClick={() => handleServiceRequestClick(productData)}>
                Service Request
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isPopupOpen} toggle={handleClosePopup} centered>
        <ModalHeader toggle={handleClosePopup}>
          {selectedProductAccessories && (
            <>
              <h5>{selectedProductAccessories.Product}</h5>
              <p>Serial Number: {selectedProductAccessories.ProductSerialNumber}</p>
            </>
          )}
        </ModalHeader>
        <ModalBody>
          <div className="table-responsive">
            <Table>
              <thead>
                <tr>
                  <th>Accessory Name</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {selectedProductAccessories?.Accessories && (
                  JSON.parse(selectedProductAccessories.Accessories).Accessories.map((accessory, index) => (
                    <tr key={index}>
                      <td>{accessory['Accessory Name']}</td>
                      <td>{accessory.Quantity}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MyProducts;
