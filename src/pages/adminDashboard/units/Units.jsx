import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../../../next.config.mjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ButtonToFormCreateUnit from '../../../components/units/ButtonToFormCreateUnit';
import ButtonToFormEditUnit from '../../../components/units/ButtonToFormEditUnit';
import ButtonStatePanel from '../../../components/ButtonStatePanel';
import ButtonLogout from '../../../components/ButtonLogout';

const Units = () => {
  const [units, setUnits] = useState([]);

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = () => {
    const config = {
      method: 'get',
      url: `${env.API_URL}/units`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios(config)
      .then((response) => {
        const sortedUnits = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setUnits(sortedUnits);
        console.log('Units:', sortedUnits);
      })
      .catch((error) => {
        console.error('Error trying to obtain units:', error);
      });
  };

  return (
    <>
      <div className='flex justify-between'>
        <ButtonToFormCreateUnit />
        <ButtonStatePanel />
        <ButtonLogout />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">id</TableCell> */}
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {units.map((unit) => (
              <TableRow key={unit.name}>
                {/* <TableCell align="center">{unit.id}</TableCell> */}
                <TableCell align="center">{unit.name}</TableCell>
                <TableCell align="center">
                  <ButtonToFormEditUnit unitName={unit.name} unitId={unit.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Units;