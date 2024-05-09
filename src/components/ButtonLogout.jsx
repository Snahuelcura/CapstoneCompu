import React from 'react';
import Link from 'next/link';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

const ButtonLogout = () => {
  return (
    <Link href="/login" passHref>
      <Button 
        variant="contained"
        color="primary" 
        startIcon={<LogoutIcon />}
        style={{ margin: '20px', width: '90%', fontSize: '25px', backgroundColor: 'red', color: 'white' }}
      >
        Log Out
      </Button>
    </Link>
  );
};

export default ButtonLogout;
