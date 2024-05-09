import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ButtonToFormEditBed = ({ bedId }) => {
  const handleEditBed = () => {
    console.log(`Edit bed with ID ${bedId}`);
    window.location.href = `/admin-dashboard/edit-bed?bedId=${bedId}`;
  };

  return (
    <Button 
      variant="contained"
      color="primary" 
      startIcon={<EditIcon />}
      style={{ margin: '5px', width: '100%', fontSize: '15px'}}
      onClick={handleEditBed}
    >
      Edit
    </Button>
  );
}

export default ButtonToFormEditBed;
