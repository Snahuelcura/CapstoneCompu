import Link from 'next/link';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ButtonStatePanel = () => {
  return (
    <Link href="/panel">
      <Button
        variant="contained"
        color="secondary"
        startIcon={<ArrowBackIcon />}
        style={{ margin: '20px', width: '90%', fontSize: '25px'}}
      >
        Ir a Panel de Estado
      </Button>
    </Link>
  );
};

export default ButtonStatePanel;

