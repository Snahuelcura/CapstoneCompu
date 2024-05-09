import { Button } from '@mui/material';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ButtonBackToUnits = () => {
  return (
    <Link href="/admin-dashboard#/Units" passHref>
      <Button 
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        style={{ margin: '20px', width: '90%'}}
      >
        Go Back
      </Button>
    </Link>
  );
}

export default ButtonBackToUnits;