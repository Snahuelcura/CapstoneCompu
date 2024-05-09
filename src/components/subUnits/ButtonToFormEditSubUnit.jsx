import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ButtonToFormEditSubUnit = ({ subUnitId }) => {
  const handleEditSubUnit = () => {
    console.log(`Edit sub unit with ID ${subUnitId}`);
    window.location.href = `/admin-dashboard/edit-subunit?subUnitId=${subUnitId}`;
  };

  return (
    <Button 
      variant="contained"
      color="primary" 
      startIcon={<EditIcon />}
      style={{ margin: '5px', width: '100%', fontSize: '15px'}}
      onClick={handleEditSubUnit}
    >
      Edit
    </Button>
  );
}

export default ButtonToFormEditSubUnit;