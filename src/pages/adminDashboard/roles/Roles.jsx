import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../../../next.config.mjs';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Tab } from '@mui/material';
import ButtonToFormCreateRole from '../../../components/roles/ButtonToFormCreateRole';
import ButtonToFormEditRole from '../../../components/roles/ButtonToFormEditRole';
import ButtonStatePanel from '../../../components/ButtonStatePanel';
import ButtonLogout from '../../../components/ButtonLogout';

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = () => {
    const config = {
      method: 'get',
      url: `${env.API_URL}/roles`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios(config)
      .then((response) => {
        const sortedRoles = response.data.sort((a, b) => a.title.localeCompare(b.title));
        setRoles(sortedRoles);
      })
      .catch((error) => {
        console.error('Error trying to obtain roles:', error);
      });
  };

  return (
    <>
      <div className='flex justify-between'>
        <ButtonToFormCreateRole />
        <ButtonStatePanel />
        <ButtonLogout />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell align="center">id</TableCell> */}
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Create Patient Record</TableCell>
              <TableCell align="center">Edit Patient Record</TableCell>
              <TableCell align="center">View Patient Record</TableCell>
              <TableCell align="center">Request Transfer</TableCell>
              <TableCell align="center">Accept Transfer Request</TableCell>
              <TableCell align="center">View Notifications</TableCell>
              <TableCell align="center">View Patient Priority List</TableCell>
              <TableCell align="center">Edit Patient Priority List</TableCell>
              <TableCell align="center">View Hospital Summary</TableCell>
              <TableCell align="center">View Subunit Summary</TableCell>
              <TableCell align="center">Admin Patient</TableCell>
              <TableCell align="center">Request Admission</TableCell>
              <TableCell align="center">View Admission Request</TableCell>
              <TableCell align="center">View Transfer Request</TableCell>
              <TableCell align="center">Manage Cleaning</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.title}>
                {/* <TableCell align="center">{role.id}</TableCell> */}
                <TableCell align="center">{role.title}</TableCell>
                <TableCell align="center">{role.createPatientRecord ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.editPatientRecord ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.viewPatientRecord ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.requestTransfer ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.acceptTransferRequest ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.viewNotifications ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.viewPatientPriorityList ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.editPatientPriorityList ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.viewHospitalSummary ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.viewSubunitSummary ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.adminPatient ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.requestAdmission ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.viewAdmissionRequest ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.viewTransferRequest ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">{role.manageCleaning ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">
                  <ButtonToFormEditRole roleId={role.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Roles;
