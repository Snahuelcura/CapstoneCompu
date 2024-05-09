'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Link from 'next/link';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import env from '../../../next.config.mjs';

const HospitalTable = () => {
  const [unitsData, setUnitsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${env.API_URL}/units`);
        const units = response.data.map(unit => ({
          name: unit.name,
          available: unit.SubUnits.reduce((sum, sub) => sum + sub.availableBeds, 0),
          occupied: unit.SubUnits.reduce((sum, sub) => sum + sub.occupiedBeds, 0),
          totalBeds: unit.SubUnits.reduce((sum, sub) => sum + sub.bedCount, 0)
        }));
        console.log('Processed Data:', units);
        setUnitsData(units);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Navbar showLogout={false} />
      <div className="container-1" style={{ backgroundColor: 'white' }}>
        <div className="panel is-flex is-flex-direction-column is-align-items-center">
          <h2 className="title is-2 has-text-centered m-9">Estado Hospital</h2>
          <table className="table is-striped is-bordered">
            <thead>
              <tr className="is-selected">
                <th>Unidad</th>
                <th>Total de Camas</th>
                <th>Camas libres</th>
                <th>Camas ocupadas</th>
              </tr>
            </thead>
            <tbody>
              {unitsData.map((unit, index) => (
                <tr key={index}>
                  <td>{unit.name}</td>
                  <td>{unit.totalBeds}</td>
                  <td>{unit.available}</td>
                  <td>{unit.occupied}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="botones is-flex is-justify-content-center is-align-items-center m9 mt-3"  style={{ backgroundColor: 'white' }}>
          <Link href="/Unidades">
            <button className="button is-primary is-3 ml-6 is-outlined">Ver unidades</button>
          </Link>
          <Link href="/admin-dashboard">
            <button className="button is-primary is-3 ml-6 is-outlined">Panel de admin</button>
          </Link>
        </div>
        </div>
        
      </div>
    </div>
  );
};

export default HospitalTable;
