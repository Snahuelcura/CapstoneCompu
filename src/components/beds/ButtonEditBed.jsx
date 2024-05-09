import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonEditBed = ({ bedId, bedData, onError }) => {
  const handleEditBed = async () => {
    // Check if any field is empty
    if (!bedData.name || !bedData.subUnitId || !bedData.status || !bedData.cleaningStatus) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');
    
    const config = {
      method: 'patch',
      url: `${env.API_URL}/beds/${bedId}`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: bedData,
    };

    axios(config)
      .then((response) => {
        console.log('Bed edited:', response.data);
        if (response.status === 200) {
          window.location.href = '/admin-dashboard#/Beds';
        }
      })
      .catch((error) => {
        console.error('Error trying to edit bed:', error);
      });
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleEditBed}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Editar Cama
    </Button>
  );
}

export default ButtonEditBed;
