import Link from 'next/link';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ButtonToFormCreateBed = () => {
  return (
    <Link href="/admin-dashboard/create-bed" passHref>
      <Button 
        variant="contained"
        color="primary" 
        startIcon={<AddCircleIcon />}
        style={{ margin: '20px', width: '100%', fontSize: '25px'}}
      >
        Create Bed
      </Button>
    </Link>
  );
}

export default ButtonToFormCreateBed;
