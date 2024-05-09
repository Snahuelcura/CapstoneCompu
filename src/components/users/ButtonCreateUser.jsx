import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonCreateUser = ({ userData, onError }) => {
  const handleCreateUser = async () => {
    // Check if any field is empty
    if (!userData.firstName || !userData.lastName || !userData.email || !userData.password || !userData.roleId || !userData.unitId) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');
    
    const config = {
      method: 'post',
      url: `${env.API_URL}/users`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: userData,
    };

    axios(config)
      .then((response) => {
        console.log('User created:', response.data);
        if (response.status === 201) {
          console.log('User created successfully');
          window.location.href = '/admin-dashboard#/Users';
        }
      })
      .catch((error) => {
        console.error('Error trying to create user:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateUser}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Crear Usuario
    </Button>
  );
};

export default ButtonCreateUser;
