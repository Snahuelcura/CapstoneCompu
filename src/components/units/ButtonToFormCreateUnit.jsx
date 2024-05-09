import Link from 'next/link';
import { Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const ButtonToFormCreateUnit = () => {
  return (
    <Link href="/admin-dashboard/createunit" passHref>
      <Button 
        variant="contained"
        color="primary" 
        startIcon={<AddCircleIcon />}
        style={{ margin: '20px', width: '100%', fontSize: '25px'}}
      >
        Create Unit
      </Button>
    </Link>
  );
}

export default ButtonToFormCreateUnit;
