import React, { useEffect, useState } from 'react';
import axios from 'axios';
import env from '../../../../next.config.mjs';
import jsonServerProvider from 'ra-data-json-server';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ButtonToFormCreateUser from '../../../components/users/ButtonToFormCreateUser';
import ButtonToFormEditUser from '@/components/users/ButtonToFormEditUser';
import ButtonStatePanel from '../../../components/ButtonStatePanel';
import ButtonLogout from '../../../components/ButtonLogout';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    console.log(`${env.API_URL}/users`);
    const config = {
      method: 'get',
      url: `${env.API_URL}/users`,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    axios(config)
      .then((response) => {
        const sortedUsers = response.data.sort((a, b) => a.lastName.localeCompare(b.lastName));
        setUsers(sortedUsers);
        console.log('Users:', sortedUsers);
      })
      .catch((error) => {
        console.error('Error trying to obtain users:', error);
      });
  };

  return (
    <>
      <div className='flex justify-between'>
        <ButtonToFormCreateUser />
        <ButtonStatePanel />
        <ButtonLogout />
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Last Name</TableCell>
              <TableCell align="center">First Name</TableCell>
              <TableCell align="center">Título de rol</TableCell>
              <TableCell align="center">Unidad Médica</TableCell>
              <TableCell align="center">Está activo?</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.lastName}>
                <TableCell align="center">{user.lastName}</TableCell>
                <TableCell align="center">{user.firstName}</TableCell>
                <TableCell align="center">{user.Role.title}</TableCell>
                <TableCell align="center">{user.Unit.name}</TableCell>
                <TableCell align="center">{user.isActive ? 'Yes' : 'No'}</TableCell>
                <TableCell align="center">
                  <ButtonToFormEditUser userId={user.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Users;
