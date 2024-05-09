'use client';

import ButtonBackToUnits from '@/components/units/ButtonBackToUnits';
import ButtonCreateUnit from '@/components/units/ButtonCreateUnit';
import { useState } from 'react';
import Navbar from '@/components/Navbar';

export default function CreateUnit() {
  const [unitData, setUnitData] = useState({
    name: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData({ ...unitData, [name]: value });
  }

  return (
    <div className="min-h-screen">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para crear unidad</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form className="space-y-6">
            <div className="relative">
              <label className='text-sm font-semibold text-gray-500'>Nombre de la unidad</label>
              <input
                type="text"
                name="name"
                value={unitData.name}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Name"
                style={{  fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className='flex justify-between'>
              <ButtonBackToUnits />
              <ButtonCreateUnit unitData={unitData} onError={setError} />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}