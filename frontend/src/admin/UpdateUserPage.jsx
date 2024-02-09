import React from 'react';
import { Link } from 'react-router-dom';

const UpdateButton = ({ userId }) => {
  return (
    <Link to={`/update/${userId}`} className="update-button">
      Update
    </Link>
  );
};

export default UpdateButton;
