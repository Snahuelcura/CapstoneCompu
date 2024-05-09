'use client';

import axios from 'axios';
import env from '../../../../next.config.mjs';
import ButtonBackToRoles from '@/components/roles/ButtonBackToRoles';
import Navbar from '../../../components/Navbar';
import ButtonCreateRole from '@/components/roles/ButtonCreateRole';
import React, { useState, useEffect } from 'react';

export default function CreateRole() {
  const [hospitalId, setHospitalId] = useState('');
  const [roleData, setRoleData] = useState({
    title: '',
    createPatientRecord: false,
    editPatientRecord: false,
    viewPatientRecord: false,
    requestTransfer: false,
    acceptTransferRequest: false,
    viewNotifications: false,
    viewPatientPriorityList: false,
    editPatientPriorityList: false,
    viewHospitalSummary: false,
    viewSubunitSummary: false,
    admitPatient: false,
    requestAdmission: false,
    viewAdmissionRequest: false,
    viewTransferRequest: false,
    manageCleanings: false,
    isAdmin: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isBooleanValue = value === 'true' || value === 'false';
    const convertedValue = isBooleanValue ? value === 'true' : value;
    setRoleData({ ...roleData, [name]: convertedValue });
    console.log(roleData);
  }

  useState(() => {
    const fetchHospitalId = async () => {
      const config = {
        method: 'get',
        url: `${env.API_URL}/hospitals`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then((response) => {
          const hospitalId = response.data[0].id;
          setHospitalId(hospitalId);
          // console.log(hospitalId);
        })
        .catch((error) => {
          console.error('Error trying to obtain hospital id:', error);
        });
    }

    fetchHospitalId();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para crear rol</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form className="space-y-6">
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Título de rol</label>
              <input
                type="text"
                name="title"
                value={roleData.title}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Title"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Crear expediente de paciente</label>
              <select
                name="createPatientRecord"
                value={roleData.createPatientRecord}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Editar expediente de paciente</label>
              <select
                name="editPatientRecord"
                value={roleData.editPatientRecord}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Ver expediente de paciente</label>
              <select
                name="viewPatientRecord"
                value={roleData.viewPatientRecord}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Solicitar transferencia</label>
              <select
                name="requestTransfer"
                value={roleData.requestTransfer}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Aceptar solicitud de transferencia</label>
              <select
                name="acceptTransferRequest"
                value={roleData.acceptTransferRequest}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Ver notificaciones</label>
              <select
                name="viewNotifications"
                value={roleData.viewNotifications}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Ver lista de prioridades de pacientes</label>
              <select
                name="viewPatientPriorityList"
                value={roleData.viewPatientPriorityList}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Editar lista de prioridades de pacientes</label>
              <select
                name="editPatientPriorityList"
                value={roleData.editPatientPriorityList}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Ver resumen del hospital</label>
              <select
                name="viewHospitalSummary"
                value={roleData.viewHospitalSummary}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Ver resumen de subunidad</label>
              <select
                name="viewSubunitSummary"
                value={roleData.viewSubunitSummary}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Admitir paciente</label>
              <select
                name="admitPatient"
                value={roleData.admitPatient}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Solicitar admisión</label>
              <select
                name="requestAdmission"
                value={roleData.requestAdmission}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Ver solicitud de admisión</label>
              <select
                name="viewAdmissionRequest"
                value={roleData.viewAdmissionRequest}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Ver solicitud de transferencia</label>
              <select
                name="viewTransferRequest"
                value={roleData.viewTransferRequest}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className='relative'>
              <label className='text-sm font-semibold text-gray-500'>Administrar limpiezas</label>
              <select
                name="manageCleanings"
                value={roleData.manageCleanings}
                onChange={handleChange}
                className='w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border'
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className='flex justify-between'>
              <ButtonBackToRoles />
              <ButtonCreateRole hospitalId={hospitalId} roleData={roleData} onError={setError} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
