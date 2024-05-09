'use client';

import Navbar from "@/components/Navbar";
import axios from "axios";
import env from "../../../../next.config.mjs";
import ButtonEditUnit from "@/components/units/ButtonEditUnit";
import ButtonBackToUnits from "@/components/units/ButtonBackToUnits";
import React, { useState, useEffect } from "react";

export default function EditUnit() {
  const [unitId , setUnitId] = useState('');
  const [unitData, setUnitData] = useState({
    name: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const getUnitIdFromURL = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const unitIdParam = searchParams.get("unitId");
      setUnitId(unitIdParam);
      const unitNameParam = searchParams.get("unitName");
      setUnitData({ name: unitNameParam });
    };
  
  
    const fetchUnit = () => {
      const config = {
        method: 'get',
        url: `${env.API_URL}/units/${unitData.name}`,
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      axios(config)
        .then((response) => {
          console.log("Response:", response.data);
          const unit = response.data;
          console.log("Unit:", unit);
          setUnitData({ name: unit.name });
        })
        .catch((error) => {
          console.error("Error trying to obtain unit:", error);
        });
    };

    getUnitIdFromURL();
    if (unitId) {
      fetchUnit();
    }
  }, [unitId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUnitData({ ...unitData, [name]: value });
    console.log(unitData);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Editar Unidad Médica</h1>
        <h3 className="mb-12 text-lg text-center">Please fill out all fields</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form className="space-y-6">
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Nombre Unidad Médica</label>
              <input
                type="text"
                name="name"
                value={unitData.name}
                onChange={handleChange}
                className="w-full pl-5 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border text-black"
                placeholder="Nombre Unidad Médica"
                style={{ fontFamily: "Inter, sans-serif" }}
              />
            </div>
            <div className="flex justify-between">
              <ButtonBackToUnits />
              <ButtonEditUnit unitId={unitId} unitData={unitData} onError={setError} />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}