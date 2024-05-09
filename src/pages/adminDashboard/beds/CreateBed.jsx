'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import env from '../../../../next.config.mjs';
import Navbar from "@/components/Navbar";
import ButtonBackToBeds from "@/components/beds/ButtonBackToBeds";
import ButtonCreateBed from "@/components/beds/ButtonCreateBed";

export default function CreateBed() {
  const [bedData, setBedData] = useState({
    name: '',
    subUnitId: '',
    isIsolated: false,
    status: 'available',
    cleaningStatus: 'clean',
    equipment: '',
  });
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

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const isBooleanValue = value === 'true' || value === 'false';
    const convertedValue = isBooleanValue ? value === 'true' : value;
    setBedData({ ...bedData, [name]: convertedValue });
    console.log('Bed data:', bedData);
  }

  useEffect(() => {
    const fetchSubUnits = async () => {
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
        }
      );
    };

    fetchSubUnits();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para crear cama</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form className="space-y-6">
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Nombre de la cama</label>
              <input
                type="text"
                name="name"
                value={bedData.name}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              />
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Sub-Unidad</label>
              <select
                name="subUnitId"
                value={bedData.subUnitId}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              >
                <option value="">Selecciona una sub-unidad</option>
                {subUnits.map((subUnit) => (
                  <option key={subUnit.id} value={subUnit.id}>
                    {subUnit.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>¿Cama de aislamiento?</label>
              <select
                name="isIsolated"
                value={bedData.isIsolated}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Estado de ocupación</label>
              <select
                name="status"
                value={bedData.status}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              >
                {Object.entries(status).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Estado de limpieza</label>
              <select
                name="cleaningStatus"
                value={bedData.cleaningStatus}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              >
                {Object.entries(cleaningStatus).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Equipamiento</label>
              <input
                type="text"
                name="equipment"
                value={bedData.equipment}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
              />
            </div>
            <div className='flex justify-between'>
              <ButtonBackToBeds />
              <ButtonCreateBed bedData={bedData} onError={setError} />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
