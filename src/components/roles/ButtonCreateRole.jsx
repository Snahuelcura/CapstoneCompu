import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonCreateRole = ({ hospitalId, roleData, onError }) => {
  const handleCreateRole = async () => {
    // Check if any field is empty
    if (!roleData.title) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');

    roleData.hospitalId = hospitalId;

    console.log('Role data:', roleData);
    
    const config = {
      method: 'post',
      url: `${env.API_URL}/roles`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: roleData,
    };

    axios(config)
      .then((response) => {
        console.log('Role created:', response.data);
        console.log('Response', response.status)
        if (response.status === 201) {
          console.log('Response', response)
          // window.location.href = '/admin-dashboard#/Roles';
        }
      })
      .catch((error) => {
        console.error('Error trying to create role:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateRole}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Create Role
    </Button>
  );
}

export default ButtonCreateRole;