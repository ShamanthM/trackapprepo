import React, { useState, useEffect, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  TablePagination,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import { faTrash, faSquarePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import {
  KeyboardArrowDownRounded,
  KeyboardArrowUpRounded,
} from '@mui/icons-material';
 
import './ViewUsers.css';
 
const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
 
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('UserID');
 
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
 
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
 
  const [isAddUserDialogOpen, setAddUserDialogOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserRole, setNewUserRole] = useState('');
 
  const fetchUsers = useCallback(() => {
    axios
      .get('http://localhost:8080/users')
      .then((response) => {
        const data = response.data;
 
        if (Array.isArray(data) && data.length > 0) {
          setUsers(data);
          setLoading(false);
        } else {
          throw new Error('API response is an empty array or not an array');
        }
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);
 
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
 
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.UserName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.UserID.toString().includes(searchTerm)
    );
 
    setFilteredUsers(filtered);
  }, [users, searchTerm]);
 
  const handleEdit = (user) => {
    setEditedUser(user);
    setEditDialogOpen(true);
  };
 
  const openDeleteDialog = (user) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };
 
  const closeDeleteDialog = () => {
    setUserToDelete(null);
    setDeleteDialogOpen(false);
  };
 
  const handleDelete = (user) => {
    axios
      .delete(`http://localhost:8080/users/${user.UserID}`)
      .then((response) => {
        console.log(`User with ID ${user.UserID} deleted successfully`);
 
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((u) => u.UserID !== user.UserID));
 
        // Close the delete dialog
        setDeleteDialogOpen(false);
      })
      .catch((error) => {
        console.error(`Error deleting user with ID ${user.UserID}:`, error);
      });
  };
 
  const handleTableHeaderClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };
 
  const handleUpdateUser = () => {
    if (!editedUser) {
      return;
    }
 
    axios
      .put(`http://localhost:8080/users/${editedUser.UserID}`, editedUser)
      .then((response) => {
        console.log(`User with ID ${editedUser.UserID} updated successfully`);
 
        // Update the user data in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.UserID === editedUser.UserID ? editedUser : user
          )
        );
 
        // Close the edit dialog
        setEditDialogOpen(false);
        setEditedUser(null); // Clear the edited user
      })
      .catch((error) => {
        console.error(`Error updating user with ID ${editedUser.UserID}:`, error);
      });
  };
 
  const handleAddUser = () => {
    // Prepare the new user data
    const newUser = {
      UserName: newUserName,
      UserPassword: newUserPassword,
      UserRole: newUserRole,
    };
 
    // Post the new user data to the API
    axios
      .post('http://localhost:8080/users', newUser)
      .then((response) => {
        console.log('User added successfully');
 
        // Fetch the updated list of users
        fetchUsers();
 
        // Close the add user dialog
        setAddUserDialogOpen(false);
      })
      .catch((error) => {
        console.error('Error adding user:', error);
      });
  };
 
  const sortedData = [...filteredUsers].sort((a, b) => {
    const isAsc = sortOrder === 'asc';
    const column = sortColumn;
 
    if (a[column] < b[column]) {
      return isAsc ? -1 : 1;
    } else if (a[column] > b[column]) {
      return isAsc ? 1 : -1;
    } else {
      return 0;
    }
  });
 
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
 
  return (
    <div className="view-users-container">
      <Typography variant="h4" gutterBottom></Typography>
      <TextField
        type="text"
        placeholder="Search by Name or User ID"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        className="view-users-search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonSearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
      <Button onClick={() => setAddUserDialogOpen(true)} variant="contained" color="primary">
        Add User
      </Button>
      <TableContainer component={Paper} className="view-users-table-container">
        <Table className="view-users-table">
          <TableHead>
            <TableRow>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('UserID')}
              >
                User ID
                {sortColumn === 'UserID' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('UserName')}
              >
                User Name
                {sortColumn === 'UserName' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell
                className="view-users-table-header"
                onClick={() => handleTableHeaderClick('UserRole')}
              >
                User Role
                {sortColumn === 'UserRole' && (
                  <span>
                    {sortOrder === 'asc' ? (
                      <KeyboardArrowUpRounded />
                    ) : (
                      <KeyboardArrowDownRounded />
                    )}
                  </span>
                )}
              </TableCell>
              <TableCell className="view-users-table-header">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.slice(startIndex, endIndex).map((user) => (
              <TableRow key={user.UserID}>
                <TableCell className="view-users-table-cell">
                  {user.UserID}
                </TableCell>
                <TableCell className="view-users-table-cell">{user.UserName}</TableCell>
                <TableCell className="view-users-table-cell">{user.UserRole}</TableCell>
                <TableCell className="view-users-table-cell">
                  <IconButton
                    onClick={() => handleEdit(user)}
                    color="primary"
                    aria-label="Edit"
                  >
                    <FontAwesomeIcon icon={faSquarePen} />
                  </IconButton>
                  <IconButton
                    onClick={() => openDeleteDialog(user)}
                    color="error"
                    aria-label="Delete"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
          className="view-users-pagination"
        />
      </TableContainer>
 
      {/* Edit User Dialog */}
      {editedUser && (
        <Dialog
          open={isEditDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          className="edit-user-modal"
        >
          <DialogTitle className="edit-user-title">Edit User</DialogTitle>
          <DialogContent className="edit-user-content">
            <TextField
              label="User Name"
              name="UserName"
              value={editedUser.UserName}
              onChange={(e) =>
                setEditedUser({ ...editedUser, UserName: e.target.value })
              }
              fullWidth
              margin="normal"
            />
            <TextField
              label="User Role"
              name="UserRole"
              value={editedUser.UserRole}
              onChange={(e) =>
                setEditedUser({ ...editedUser, UserRole: e.target.value })
              }
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions className="edit-user-actions">
            <Button
              onClick={handleUpdateUser}
              color="primary"
              className="edit-user-save"
            >
              Save
            </Button>
            <Button
              onClick={() => setEditDialogOpen(false)}
              color="primary"
              className="edit-user-cancel"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      )}
 
      {/* Add User Dialog */}
      <Dialog
        open={isAddUserDialogOpen}
        onClose={() => setAddUserDialogOpen(false)}
        className="add-user-modal"
      >
        <DialogTitle className="add-user-title">Add User</DialogTitle>
        <DialogContent className="add-user-content">
          <TextField
            label="User Name"
            name="newUserName"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="User Password"
            name="newUserPassword"
            value={newUserPassword}
            onChange={(e) => setNewUserPassword(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="User Role"
            name="newUserRole"
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions className="add-user-actions">
          <Button onClick={handleAddUser} color="primary" className="add-user-save">
            Save
          </Button>
          <Button onClick={() => setAddUserDialogOpen(false)} color="primary" className="add-user-cancel">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
 
export default ViewUsers;
 