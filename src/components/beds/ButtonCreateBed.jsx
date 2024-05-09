import axios from 'axios';
import env from '../../../next.config.mjs';
import { Button } from '@mui/material';

const ButtonCreateBed = ({ bedData, onError }) => {
  const handleCreateBed = async () => {
    // Check if any field is empty
    if (!bedData.name || !bedData.subUnitId || !bedData.status || !bedData.cleaningStatus) {
      onError('Please fill out all fields');
      return;
    }

    // If all fields are filled out, clear any existing errors
    onError('');

    const config = {
      method: 'post',
      url: `${env.API_URL}/beds`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: bedData,
    };

    axios(config)
      .then((response) => {
        console.log('Bed created:', response.data);
        if (response.status === 201) {
          window.location.href = '/admin-dashboard#/Beds';
        }
      })
      .catch((error) => {
        console.error('Error trying to create bed:', error);
      });
  }

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleCreateBed}
      className="btn-primary rounded-md hover:bg-indigo-700"
      style={{ margin: '20px', width: '40%'}}
    >
      Crear Cama
    </Button>
  );
}

export default ButtonCreateBed;
