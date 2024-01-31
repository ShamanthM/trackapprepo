import React, { useState, useEffect } from 'react';

const AssignProduct = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  useEffect(() => {
    // Fetch users data
    fetch('http://localhost:8080/users')
      .then(response => response.json())
      .then(data => {
        console.log('Users:', data);
        // Assuming the user data contains an array of objects with properties like 'UserID', 'UserName', etc.
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
        // Assuming the product data contains an array of objects with properties like 'ProductID', 'ProductName', etc.
        setProducts(Array.isArray(data) ? data : []);
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Fetch accessories data based on the selected product
    if (selectedProduct && selectedProduct.ProductID) {
      fetch(`http://localhost:8080/product/${selectedProduct.ProductID}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Accessories for selected product:', data);
          // Assuming the accessory data contains an array of objects with properties like 'AccessoryID', 'AccessoryName', etc.
          setAccessories(Array.isArray(data) ? data.map(accessory => accessory.AccessoryName) : []);
        })
        .catch(error => console.error('Error fetching accessories:', error));
    }
  }, [selectedProduct]);

  return (
    <div className="dropdown-container">
      <label htmlFor="userDropdown">Select User:</label>
      <select
        id="userDropdown"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="dropdown"
      >
        <option key="default" value="">
          Select User
        </option>
        {users.map((userName, index) => (
          <option key={index} value={userName}>
            {userName}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="productDropdown">Select Product:</label>
      <select
        id="productDropdown"
        value={selectedProduct}
        onChange={(e) => setSelectedProduct(e.target.value)}
        className="dropdown"
      >
        <option key="default" value="">
          Select Product
        </option>
        {products.map((product, index) => (
          <option key={index} value={product}>
            {product.ProductName}
          </option>
        ))}
      </select>

      <br />

      <label htmlFor="accessoryDropdown">Select Accessories:</label>
      <select
        id="accessoryDropdown"
        multiple
        value={selectedAccessories}
        onChange={(e) =>
          setSelectedAccessories(
            Array.from(e.target.selectedOptions, (option) => option.value)
          )
        }
        className="dropdown"
      >
        {accessories.map((accessoryName, index) => (
          <option key={index} value={accessoryName}>
            {accessoryName}
          </option>
        ))}
      </select>

      <br />

      <button
        onClick={() =>
          console.log('Assign Product:', {
            selectedUser,
            selectedProduct,
            selectedAccessories,
          })
        }
      >
        Assign Product
      </button>
    </div>
  );
};

export default AssignProduct;