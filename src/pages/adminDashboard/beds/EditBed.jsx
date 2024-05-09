'use client';

import axios from 'axios';
import env from '../../../../next.config.mjs';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import ButtonEditBed from '@/components/beds/ButtonEditBed';
import ButtonBackToBeds from '@/components/beds/ButtonBackToBeds';

export default function EditBed() {
  const [bedId, setBedId] = useState('');
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
  }

  useEffect(() => {
    const getBedIdFromURL = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const bedId = searchParams.get('bedId');
      setBedId(bedId);
      console.log('Bed ID:', bedId);
    };

    const fetchBed = async () => {
      console.log('BedId to fetch:', bedId);
      const config = {
        method: 'get',
        url: `${env.API_URL}/beds/${bedId}`,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      axios(config)
        .then((response) => {
          const bed = response.data;
          if (bed.id !== bedId) {
            setError('No se encontró la cama');
            return;
          }
          setBedData({
            name: bed.name,
            subUnitId: bed.subUnitId,
            isIsolated: bed.isIsolated,
            status: bed.status,
            cleaningStatus: bed.cleaningStatus,
            equipment: bed.equipment,
          });
        })
        .catch((error) => {
          console.error('Error trying to obtain bed:', error);
        });
    };

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
        });
    };

    getBedIdFromURL();
    fetchSubUnits();
    if (bedId) {
      fetchBed();
    }
  }, [bedId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para editar cama</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Nombre de la cama</label>
              <input
                type="text"
                name="name"
                value={bedData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Nombre de la Cama"
              />
            </div>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Sub-Unidad</label>
              <select
                name="subUnitId"
                value={bedData.subUnitId}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                {subUnits.map((subUnit) => (
                  <option key={subUnit.id} value={subUnit.id}>
                    {subUnit.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Cama de aislamiento</label>
              <select
                name="isIsolated"
                value={bedData.isIsolated}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value={false}>No</option>
                <option value={true}>Sí</option>
              </select>
            </div>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Estado de ocupación</label>
              <select
                name="status"
                value={bedData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                {Object.entries(status).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Estado de limpieza</label>
              <select
                name="cleaningStatus"
                value={bedData.cleaningStatus}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                {Object.entries(cleaningStatus).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Equipamiento</label>
              <input
                type="text"
                name="equipment"
                value={bedData.equipment}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Equipamiento"
              />
            </div>
            <div className="flex justify-between">
              <ButtonBackToBeds />
              <ButtonEditBed bedId={bedId} bedData={bedData} onError={setError} />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
