'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';
import env from '../../../../next.config.mjs';
import Navbar from "@/components/Navbar";
import ButtonBackToSubUnits from "@/components/subUnits/ButtonBackToSubUnits";
import ButtonCreateSubUnit from "@/components/subUnits/ButtonCreateSubUnit";

export default function CreateSubUnit() {
  const [subUnitData, setSubUnitData] = useState({
    name: '',
    unitId: '',
  });
  const [medicalUnits, setMedicalUnits] = useState([]);

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubUnitData({ ...subUnitData, [name]: value });
  }

  useEffect(() => {
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
          console.log('Medical units:', medicalUnits);
        })
        .catch((error) => {
          console.error('Error trying to obtain medical units:', error);
        }
      );
    };

    fetchMedicalUnits();
  }, []);

  return (
    <div>
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para crear Sub-Unidad Médica</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form className="space-y-6">
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Nombre de la sub-unidad</label>
              <input
                type="text"
                name="name"
                value={subUnitData.name}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Name"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Selecciona una unidad médica a la cual pertenecerá la sub-unidad</label>
              <select
                name="unitId"
                value={subUnitData.unitId}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <option value="">Selecciona una unidad médica</option>
                {medicalUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>{unit.name}</option>
                ))}
              </select>
            </div>
            <div className='flex justify-between'>
              <ButtonBackToSubUnits />
              <ButtonCreateSubUnit subUnitData={subUnitData} onError={setError} />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}