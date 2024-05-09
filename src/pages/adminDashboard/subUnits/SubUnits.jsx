import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../../../next.config.mjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ButtonToFormCreateSubUnit from '../../../components/subUnits/ButtonToFormCreateSubUnit';
import ButtonToFormEditSubUnit from '@/components/subUnits/ButtonToFormEditSubUnit';
import ButtonStatePanel from '../../../components/ButtonStatePanel';
import ButtonLogout from '../../../components/ButtonLogout';

const SubUnits = () => {
  const [subUnits, setSubUnits] = useState([]);

  useEffect(() => {
    // fetchUnits();
    fetchSubUnits();
  }, []);

  // const fetchUnits = () => {
  //   const config = {
  //     method: 'get',
  //     url: `${env.API_URL}/units`,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   axios(config)
  //     .then((response) => {
  //       const units = response.data.map((unit) => ({ id: unit.id, name: unit.name }));
  //       setUnits(units);
  //       console.log('Units:', units);
  //     })
  //     .catch((error) => {
  //       console.error('Error trying to obtain units:', error);
  //     });
  // };

  const fetchSubUnits = () => {
    const config = {
      method: 'get',
      url: `${env.API_URL}/subunits`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios(config)
      .then((response) => {
        const sortedSubUnits = response.data.sort((a, b) => a.name.localeCompare(b.name));
        setSubUnits(sortedSubUnits);
        console.log('Sub units:', sortedSubUnits);
      })
      .catch((error) => {
        console.error('Error trying to obtain sub units:', error);
      });
  };

  return (
    <>
      <div className='flex justify-between'>
        <ButtonToFormCreateSubUnit />
        <ButtonStatePanel />
        <ButtonLogout />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">id</TableCell> */}
              <TableCell align="center">Nombre Sub-Unidad</TableCell>
              <TableCell align="center">Perteneciente a Unidad Médica</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subUnits.map((subUnit) => (
              <TableRow key={subUnit.name}>
                {/* <TableCell align="center">{subUnit.id}</TableCell> */}
                <TableCell align="center">{subUnit.name}</TableCell>
                <TableCell align="center">{subUnit.Unit.name}</TableCell>
                <TableCell align="center">
                  <ButtonToFormEditSubUnit subUnitId={subUnit.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default SubUnits;