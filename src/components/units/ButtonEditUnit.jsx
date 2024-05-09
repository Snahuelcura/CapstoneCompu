import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonEditUnit = ({ unitId, unitData, onError }) => {
  const handleEditUnit = async () => {
    // Check if any field is empty
    if (!unitData.name) {
      console.log("Unit data:", unitData);
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');
    
    const config = {
      method: 'patch',
      url: `${env.API_URL}/units/${unitId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: unitData,
    };

    axios(config)
      .then((response) => {
        console.log('Unit edited:', response.data);
        if (response.status === 200) {
          window.location.href = '/admin-dashboard#/Units';
        }
      })
      .catch((error) => {
        console.error('Error trying to edit unit:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleEditUnit}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Edit Unit
    </Button>
  );
}

export default ButtonEditUnit;