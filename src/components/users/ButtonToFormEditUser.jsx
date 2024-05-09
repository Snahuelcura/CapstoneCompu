import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ButtonToFormEditUser = ({ userId }) => {
  const handleEditUser = () => {
    console.log(`Edit user with ID ${userId}`);
    window.location.href = `/admin-dashboard/edituser?userId=${userId}`;
  };

  return (
    <Button 
      variant="contained"
      color="primary" 
      startIcon={<EditIcon />}
      style={{ margin: '5px', width: '60%', fontSize: '15px'}}
      onClick={handleEditUser}
    >
      Edit
    </Button>
  );
}

export default ButtonToFormEditUser;
