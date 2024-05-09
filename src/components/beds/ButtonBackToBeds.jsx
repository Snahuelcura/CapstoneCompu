import Link from 'next/link';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ButtonBackToBeds = () => {
  return (
    <Link href="/admin-dashboard#/Beds" passHref>
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

export default ButtonBackToBeds;
