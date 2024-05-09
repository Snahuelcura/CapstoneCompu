import Link from 'next/link';
import { Button } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

const ButtonToFormCreateUser = () => {
  return (
    <Link href="/admin-dashboard/createuser" passHref>
      <Button 
        variant="contained"
        color="primary" 
        startIcon={<PersonAddAltIcon />}
        style={{ margin: '20px', width: '100%', fontSize: '25px'}}
      >
        Create User
      </Button>
    </Link>
  );
}

export default ButtonToFormCreateUser;
