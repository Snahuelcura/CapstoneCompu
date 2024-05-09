'use client';

import axios from 'axios';
import env from '../../../../next.config.mjs';
import Navbar from '../../../components/Navbar';
import ButtonCreateUser from '../../../components/users/ButtonCreateUser';
import React, { useState, useEffect } from 'react';
import ButtonBackToUsers from '@/components/users/ButtonBackToUsers';

export default function CreateUser() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    roleId: '',
    unitId: '',
    isActive: true
  });
  const [roles, setRoles] = useState([]);
  const [medicalUnits, setMedicalUnits] = useState([]);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    console.log(userData);
  };

  useEffect(() => {
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
        const roles = response.data.map((role) => ({ id: role.id, title: role.title }));
        setRoles(roles);
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
          const medicalUnits = response.data.map((unit) => ({ id: unit.id, name: unit.name }));
          setMedicalUnits(medicalUnits);
        })
        .catch((error) => {
          console.error('Error trying to obtain medical units:', error);
        });
    }

    fetchRoles();
    fetchMedicalUnits();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para crear usuario</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form className="space-y-6">
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Apellido(s)</label>
              <input
                type="text"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Apellido(s)"
                style={{fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Nombre(s)</label>
              <input
                type="text"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Nombre(s)"
                style={{fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Correo electrónico</label>
              <input
                type="text" // TODO change to email
                name="email"
                value={userData.email}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Correo electrónico"
                style={{fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Contraseña</label>
              <input
                type="text" // TODO change to password
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Contraseña"
                style={{fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Rol de usuario</label>
              <select
                name="roleId"
                value={userData.roleId}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              >
                <option value="">Seleccione un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>{role.title}</option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Unidad médica</label>
              <select
                name="unitId"
                value={userData.unitId}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              >
                <option value="">Seleccione una unidad médica</option>
                {medicalUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                ))}
              </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className='flex justify-between'>
              <ButtonBackToUsers />
              <ButtonCreateUser userData={userData} onError={setError} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
