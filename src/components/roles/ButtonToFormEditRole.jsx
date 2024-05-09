import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ButtonToFormEditRole = ({ roleId }) => {
  const handleEditRole = () => {
    console.log(`Edit role with ID ${roleId}`);
    window.location.href = `/admin-dashboard/editrole?roleId=${roleId}`;
  };

  return (
    <Button 
      variant="contained"
      color="primary" 
      startIcon={<EditIcon />}
      style={{ margin: '5px', width: '100%', fontSize: '15px'}}
      onClick={handleEditRole}
    >
      Edit
    </Button>
  );
}

export default ButtonToFormEditRole;
