'use client';

import axios from "axios";
import env from "../../../../next.config.mjs";
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ButtonEditSubUnit from "@/components/subUnits/ButtonEditSubUnit";
import ButtonBackToSubUnits from "@/components/subUnits/ButtonBackToSubUnits";

export default function EditSubUnit() {
  const [subUnitId, setSubUnitId] = useState("");
  const [subUnitData, setSubUnitData] = useState({
    name: "",
    unitId: ""
  });
  // const [medicalUnits, setMedicalUnits] = useState([]);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSubUnitData({ ...subUnitData, [name]: value });
  }

  useEffect(() => {
    const getSubUnitIdFromURL = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const subUnitId = searchParams.get("subUnitId");
      setSubUnitId(subUnitId);
    };

    const fetchSubUnit = async () => {
      const config = {
        method: "get",
        url: `${env.API_URL}/subunits`,
        headers: {
          "Content-Type": "application/json"
        }
      };

      axios(config)
        .then((response) => {
          const subUnit = response.data.find((subUnit) => subUnit.id === subUnitId);
          setSubUnitData({
            name: subUnit.name,
            unitId: subUnit.unitId
          });
        })
        .catch((error) => {
          console.error("Error trying to obtain sub unit:", error);
        });
    };

    // const fetchMedicalUnits = async () => {
    //   const config = {
    //     method: 'get',
    //     url: `${env.API_URL}/units/`,
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   };

    //   axios(config)
    //     .then((response) => {
    //       const medicalUnits = response.data.map((unit) => ({ id: unit.id, name: unit.name }));
    //       setMedicalUnits(medicalUnits);
    //       console.log('Medical units:', medicalUnits);
    //     })
    //     .catch((error) => {
    //       console.error('Error trying to obtain medical units:', error);
    //     }
    //   );
    // };

    getSubUnitIdFromURL();
    if (subUnitId) {
      fetchSubUnit();
    }
    // fetchMedicalUnits();
  }, [subUnitId]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar showLogout={false} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold text-center">Formulario para editar sub-unidad</h1>
        <h3 className="mb-12 text-lg text-center">Por favor llenar todos los campos</h3>
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 mx-auto">
          <form>
            <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Nombre de la sub-unidad</label>
              <input
                type="text"
                name="name"
                value={subUnitData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
                placeholder="Nombre de la sub-unidad"
              />
            </div>
            {/* <div className="relative">
              <label className="text-sm font-semibold text-gray-500">Unidad médica a la que pertenece</label>
              <select
                name="unitId"
                value={subUnitData.unitId}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Selecciona una unidad médica</option>
                {medicalUnits.map((unit) => (
                  <option key={unit.id} value={unit.name}>{unit.name}</option>
                ))}
              </select>
            </div> */}
            <div className="flex justify-between">
              <ButtonBackToSubUnits />
              <ButtonEditSubUnit subUnitId={subUnitId} subUnitData={subUnitData} onError={setError} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

