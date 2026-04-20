import React, { useState, useEffect } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { userApi } from './api/users';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async (showLoading = true) => {
    try {
      if (showLoading) {
        setLoading(true);
      }
      const response = await userApi.getAll();
      setUsers(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadUsers = async () => {
      try {
        const response = await userApi.getAll();
        if (ignore) return;
        setUsers(response.data);
        setError('');
      } catch (err) {
        if (ignore) return;
        setError('Failed to load users');
        console.error(err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      ignore = true;
    };
  }, []);

  const handleSave = () => {
    setEditingUser(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await userApi.delete(id);
        fetchUsers();
      } catch {
        setError('Failed to delete user');
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  return (
    <div className="container">
      <div className="app-header">
        <h1>📋 User Management</h1>
        <p>Create, read, update, and delete users</p>
      </div>

      {error && (
        <div className="error">
          {error}
          <button 
            onClick={() => setError('')}
            style={{ marginLeft: '10px', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="main-content">
        <UserForm
          userToEdit={editingUser}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
        
        <UserList
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;