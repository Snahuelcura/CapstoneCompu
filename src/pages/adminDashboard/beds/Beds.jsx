import React, { useState, useEffect } from 'react';
import axios from 'axios';
import env from '../../../../next.config.mjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ButtonToFormCreateBed from '../../../components/beds/ButtonToFormCreateBed';
import ButtonToFormEditBed from '@/components/beds/ButtonToFormEditBed';
import ButtonStatePanel from '../../../components/ButtonStatePanel';
import ButtonLogout from '../../../components/ButtonLogout';

const Beds = () => {
  const [beds, setBeds] = useState([]);
  const [subUnits, setSubUnits] = useState([]);
  const [status, setStatus] = useState({
    available: 'Disponible',
    occupied: 'Ocupado',
    reserved: 'Reservado',
  });
  const [cleaningStatus, setCleaningStatus] = useState({
    dirty: 'Sucia',
    awaiting: 'Esperando',
    in_process: 'En proceso',
    clean: 'Limpia',
  });

  useEffect(() => {
    fetchSubUnits();
    fetchBeds();
  }, []);

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
        const subUnits = response.data.map((subUnit) => ({
          id: subUnit.id,
          name: subUnit.name,
        }));
        setSubUnits(subUnits);
        console.log('Sub units:', subUnits);
      })
      .catch((error) => {
        console.error('Error trying to obtain sub units:', error);
      });
  };


  const fetchBeds = () => {
    const config = {
      method: 'get',
      url: `${env.API_URL}/beds`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios(config)
      .then((response) => {
        const sortedBeds = response.data.sort((a, b) => {
          if (a.subUnitId !== b.subUnitId) {
            return a.subUnitId.localeCompare(b.subUnitId);
          } else {
            return a.name.localeCompare(b.name);
          }
        });
        setBeds(sortedBeds);
        console.log('Beds:', sortedBeds);
      })
      .catch((error) => {
        console.error('Error trying to obtain beds:', error);
      });
  };

  return (
    <>
      <div className='flex justify-between'>
        <ButtonToFormCreateBed />
        <ButtonStatePanel />
        <ButtonLogout />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">id</TableCell> */}
              <TableCell align="center">Nombre Cama</TableCell>
              <TableCell align="center">Sub-Unidad</TableCell>
              <TableCell align="center">Cama de aislamiento</TableCell>
              <TableCell align="center">Estado de ocupación</TableCell>
              <TableCell align="center">Estado de limpieza</TableCell>
              <TableCell align="center">Equipamiento</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {beds.map((bed) => (
              <TableRow key={bed.subUnitId}>
                {/* <TableCell align="center">{bed.id}</TableCell> */}
                <TableCell align="center">{bed.name}</TableCell>
                <TableCell align="center">{subUnits.find((subUnit) => subUnit.id === bed.subUnitId)?.name}</TableCell>
                <TableCell align="center">{bed.isIsolated ? 'Sí' : 'No'}</TableCell>
                <TableCell align="center">{status[bed.status]}</TableCell>
                <TableCell align="center">{cleaningStatus[bed.cleaningStatus]}</TableCell>
                <TableCell align="center">{bed.equipment}</TableCell>
                <TableCell align="center">
                  <ButtonToFormEditBed bedId={bed.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Beds;
