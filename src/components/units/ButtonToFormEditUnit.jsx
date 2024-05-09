import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ButtonToFormEditUnit = ({ unitName, unitId }) => {
  const handleEditUnit = () => {
    console.log(`Edit unit with ID ${unitId}`);
    window.location.href = `/admin-dashboard/editunit?unitId=${unitId}&unitName=${unitName}`;
  };

  return (
    <Button 
      variant="contained"
      color="primary" 
      startIcon={<EditIcon />}
      style={{ margin: '5px', width: '100%', fontSize: '15px'}}
      onClick={handleEditUnit}
    >
      Edit
    </Button>
  );
}

export default ButtonToFormEditUnit;