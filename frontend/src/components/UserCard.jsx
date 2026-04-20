import React from 'react';

const UserCard = ({ user, onEdit, onDelete }) => {
  return (
    <div
      data-testid={`user-card-${user.id}`}
      style={{
        backgroundColor: 'white',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '12px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ flex: 1 }}>
        <h3 style={{ marginBottom: '5px', color: '#333' }} data-testid={`user-name-${user.id}`}>
          {user.name}
        </h3>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '3px' }} data-testid={`user-email-${user.id}`}>
          📧 {user.email}
        </p>
        {user.age && (
          <p style={{ color: '#888', fontSize: '12px' }} data-testid={`user-age-${user.id}`}>
            🎂 Age: {user.age}
          </p>
        )}
      </div>
      
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => onEdit(user)}
          data-testid={`edit-user-${user.id}`}
          style={{
            padding: '6px 12px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(user.id)}
          data-testid={`delete-user-${user.id}`}
          style={{
            padding: '6px 12px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default UserCard;