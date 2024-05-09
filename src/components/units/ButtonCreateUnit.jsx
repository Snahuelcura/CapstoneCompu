import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonCreateUnit = ({ unitData, onError }) => {
  const handleCreateUnit = async () => {
    // Check if any field is empty
    if (!unitData.name) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');
    
    const config = {
      method: 'post',
      url: `${env.API_URL}/units`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: unitData,
    };

    axios(config)
      .then((response) => {
        console.log('Unit created:', response.data);
        if (response.data.status === 201) {
          window.location.href = '/admin-dashboard#/Units';
        }
      })
      .catch((error) => {
        console.error('Error trying to create unit:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateUnit}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Create Unit
    </Button>
  );
}

export default ButtonCreateUnit;