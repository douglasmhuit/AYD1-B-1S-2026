import React from 'react';
import UserCard from './UserCard';

const UserList = ({ users, onEdit, onDelete, loading }) => {
  if (loading) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#666'
      }}>
        Loading users...
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '12px',
        textAlign: 'center',
        color: '#999'
      }}>
        <p>No users yet. Create your first user!</p>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '20px', color: 'white' }}>
        Users ({users.length})
      </h2>
      <div>
        {users.map(user => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default UserList;