import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonEditRole = ({ roleId, roleData, onError }) => {
  const handleEditRole = async () => {
    // Check if any field is empty
    if (!roleData.title) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');

    console.log('Role data:', roleData);
    
    const config = {
      method: 'patch',
      url: `${env.API_URL}/roles/${roleId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: roleData,
    };

    axios(config)
      .then((response) => {
        console.log('Role edited:', response);
        console.log('Respose data:', response.data);
        console.log('Response', response.status)
        if (response.status === 200) {
          // window.location.href = '/admin-dashboard#/Roles';
        }
      })
      .catch((error) => {
        console.error('Error trying to edit role:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleEditRole}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Edit Role
    </Button>
  );
}

export default ButtonEditRole;