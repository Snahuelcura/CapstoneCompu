'use client';

import Navbar from '../../../components/Navbar';
import axios from 'axios';
import env from '../../../../next.config.mjs';
import ButtonEditUser from '../../../components/users/ButtonEditUser';
import React, { useState, useEffect } from 'react';
import ButtonBackToUsers from '@/components/users/ButtonBackToUsers';

export default function EditUser() {
  const [userId, setUserId] = useState('');
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: '',
    unitId: '',
    isActive: ''
  });
  const [roles, setRoles] = useState([]);
  const [medicalUnits, setMedicalUnits] = useState([]);

  const [error, setError] = useState('');

  useEffect(() => {
    // Function to extract userId from the URL
    const getUserIdFromURL = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const userIdParam = searchParams.get('userId');
      setUserId(userIdParam);
    };

    const fetchRoles = async () => {
      const config = {
        method: 'get',
        url: `${env.API_URL}/roles`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then((response) => {
          // Only get the titles of the roles
          const roles = response.data.map((role) => ({ id: role.id, title: role.title }));
          setRoles(roles);
          console.log('Roles:', roles);
        })
        .catch((error) => {
          console.error('Error trying to obtain roles:', error);
        });
    };

    const fetchMedicalUnits = async () => {
      const config = {
        method: 'get',
        url: `${env.API_URL}/units`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then((response) => {
          // Only get the names of the medical units
          const medicalUnits = response.data.map((unit) => ({ id: unit.id, name: unit.name }));
          setMedicalUnits(medicalUnits);
          console.log('Medical units:', medicalUnits);
        })
        .catch((error) => {
          console.error('Error trying to obtain medical units:', error);
        });
    };

    const fetchUsers = () => {
      const config = {
        method: 'get',
        url: `${env.API_URL}/users/${userId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then((response) => {
          console.log('User data:', response.data);
          const user = response.data;
          if (user.id !== userId) {
            setError('No se encontró el usuario');
            return;
          }
          setUserData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            roleId: user.roleId,
            unitId: user.unitId,
            isActive: user.isActive ? true : false
          });
        })
        .catch((error) => {
          console.error('Error trying to obtain users:', error);
        });
    };

    // Call the function when the component mounts
    getUserIdFromURL();
    fetchRoles();
    fetchMedicalUnits();
    if (userId) {
      fetchUsers();
    }
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isBooleanValue = value === 'true' || value === 'false';
    const convertedValue = isBooleanValue ? value === 'true' : value;
    setUserData({ ...userData, [name]: convertedValue });
    console.log('User data:', userData);
  };

  return (
    <div className="min-h-screen">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para editar usuario</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form className="space-y-6">
            <div className="relative">
              <label className="text-sm" htmlFor="lastName">Apellido(s)</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
                placeholder="Apellido(s)"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className="text-sm" htmlFor="firstName">Nombre(s)</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
                placeholder="Nombre(s)"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className="text-sm" htmlFor="email">Correo electrónico</label>
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
                placeholder="Correo electrónico"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className="text-sm" htmlFor="password">Contraseña</label>
              <input
                type="text"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
                placeholder="Contraseña"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className="text-sm" htmlFor="roleId">Título de rol</label>
              <select
                name="roleId"
                value={userData.roleId}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
              >
                <option value="">Seleccione un título de rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.title}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className="text-sm" htmlFor="unitId">Unidad médica</label>
              <select
                name="unitId"
                value={userData.unitId}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
              >
                <option value="">Seleccione una unidad médica</option>
                {medicalUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className="text-sm" htmlFor="isActive">Estado de usuario</label>
              <select
                name="isActive"
                value={userData.isActive}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
              >
                <option value="">Seleccione estado de usuario</option>
                <option value={true}>Activado</option>
                <option value={false}>Desactivado</option>
              </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex justify-between">
              <ButtonBackToUsers />
              <ButtonEditUser userId={userId} userData={userData} onError={setError} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
