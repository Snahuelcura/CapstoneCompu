import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonEditUser = ({ userId, userData, onError }) => {
  const handleEditUser = async () => {
    // Check if any field is empty
    if (!userData.firstName || !userData.lastName || !userData.roleId || !userData.unitId) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');

    console.log('User ID:', userId);
    
    const config = {
      method: 'patch',
      url: `${env.API_URL}/users/${userId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: userData,
    };

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin-dashboard';
        }
      })
      .catch((error) => {
        console.error('Error trying to edit user:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleEditUser}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Editar Usuario
    </Button>
  );
};

export default ButtonEditUser;
