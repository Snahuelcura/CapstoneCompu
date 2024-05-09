import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonEditSubUnit = ({ subUnitId, subUnitData, onError }) => {
  const handleEditSubUnit = async () => {
    // Check if any field is empty
    if (!subUnitData.name || !subUnitData.unitId) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');
    
    const config = {
      method: 'patch',
      url: `${env.API_URL}/subunits/${subUnitId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: subUnitData,
    };

    console.log('Editing sub unit:', subUnitData);

    axios(config)
      .then((response) => {
        if (response.status === 200) {
          window.location.href = '/admin-dashboard#/SubUnits';
          console.log('Sub unit edited successfully');
        }
      })
      .catch((error) => {
        console.error('Error trying to edit sub unit:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleEditSubUnit}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Editar Sub-Unidad
    </Button>
  );
}

export default ButtonEditSubUnit;
