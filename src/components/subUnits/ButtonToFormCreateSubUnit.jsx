import Link from 'next/link';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ButtonToFormCreateSubUnit = () => {
  return (
    <Link href="/admin-dashboard/create-subunit" passHref>
      <Button 
        variant="contained"
        color="primary" 
        startIcon={<AddCircleIcon />}
        style={{ margin: '20px', width: '100%', fontSize: '25px'}}
      >
        Create Sub-Unit
      </Button>
    </Link>
  );
}

export default ButtonToFormCreateSubUnit;