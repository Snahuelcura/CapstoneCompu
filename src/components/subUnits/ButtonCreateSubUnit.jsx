import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonCreateSubUnit = ({ subUnitData, onError }) => {
  const handleCreateSubUnit = async () => {
    // Check if any field is empty
    if (!subUnitData.name || !subUnitData.unitId) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');
    
    const config = {
      method: 'post',
      url: `${env.API_URL}/subunits`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: subUnitData,
    };

    axios(config)
      .then((response) => {
        console.log('Sub unit created:', response.data);
        if (response.status === 201) {
          window.location.href = '/admin-dashboard#/SubUnits';
        }
      })
      .catch((error) => {
        console.error('Error trying to create sub unit:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateSubUnit}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Crear Sub-Unidad
    </Button>
  );
}

export default ButtonCreateSubUnit;