'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar.jsx';
import Link from 'next/link';
import axios from 'axios';
import 'bulma/css/bulma.min.css';
import './unidades.css';
import env from '../../../next.config.mjs';


function getStatusClass(status) {
  switch (status) {
    case 'available': return 'status-available';
    case 'occupied': return 'status-occupied';
    case 'reserved': return 'status-reserved';
    default: return '';
  }
}

function getCleaningStatusClass(status) {
  switch (status) {
    case 'clean': return 'cleaning-clean';
    case 'dirty': return 'cleaning-dirty';
    case 'awaiting': return 'cleaning-waiting';
    case 'in progress': return 'cleaning-in-progress';
    default: return '';
  }
}

const UnidadTable = () => {
  const [units, setUnits] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(null);
  const [beds, setBeds] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const unitsRes = await axios.get(`${env.API_URL}/units`);
        setUnits(unitsRes.data);
      } catch (error) {
        console.error('Error fetching units:', error);
      }
    };

    const fetchBeds = async () => {
      try {
        const bedsRes = await axios.get(`${env.API_URL}/beds`);
        setBeds(bedsRes.data);
      } catch (error) {
        console.error('Error fetching beds:', error);
      }
    };

    fetchUnits();
    fetchBeds();
  }, []);

  // Organizar las camas por subunidad
  const getBedsBySubunit = () => {
    const unit = units.find(unit => unit.id === selectedUnitId);
    const subunits = unit ? unit.SubUnits : [];
    return subunits.map(subunit => {
      return {
        subUnitName: subunit.subUnitName,
        beds: beds.filter(bed => bed.subUnitId === subunit.subUnitId)
      };
    });
  };

  const bedsBySubunit = getBedsBySubunit();

  return (
    <div>
      <Navbar showLogout={false} />
      <div className="container-1">
        <div className="panel">
          <h2 className="title is-2 has-text-centered mt-6">Unidades Hospitalarias</h2>
          <h4 className="subtitle is-4 has-text-centered mt-3">Selecciona una unidad</h4>
          <div className="buttons is-centered mt-5 ">
            {units.map(unit => (
              <button key={unit.id} className="button is-primary is-rounded is-outlined "
                onClick={() => setSelectedUnitId(unit.id)}>
                {unit.name}
              </button>
            ))}
          </div>
          {selectedUnitId && (
            <>
              <table className="table is-striped is-fullwidth mt-9">
                <thead>
                  <tr>
                    <th>Unidad</th>
                    <th>Subunidad</th>
                    <th>Total de camas</th>
                    <th>Camas disponibles</th>
                    <th>Camas ocupadas</th>
                  </tr>
                </thead>
                <tbody>
                  {units.find(unit => unit.id === selectedUnitId)?.SubUnits.map(subunit => (
                    <tr key={subunit.subUnitId}>
                      <td>{units.find(unit => unit.id === selectedUnitId).name}</td>
                      <td>{subunit.subUnitName}</td>
                      <td>{subunit.bedCount}</td>
                      <td>{subunit.availableBeds}</td>
                      <td>{subunit.occupiedBeds}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h3 className="subtitle is-3 has-text-centered">Detalle de camas</h3>
              <table className="table is-striped is-fullwidth mt-3">
                <thead>
                  <tr>
                    <th>Subunidad</th>
                    <th>Nombre</th>
                    <th>Status</th>
                    <th>Cleaning Status</th>
                  </tr>
                </thead>
                <tbody>
                  {bedsBySubunit.map(group => group.beds.map((bed, index) => (
                    <tr key={bed.id}>
                      <td className=''>{index === 0 ? group.subUnitName : ''}</td>
                      <td>{bed.name}</td>
                      <td className={getStatusClass(bed.status)}>{bed.status}</td>
                      <td className={getCleaningStatusClass(bed.cleaningStatus)}>{bed.cleaningStatus}</td>
                    </tr>
                  )))}
                </tbody>
              </table>
            </>
          )}
          <div className="buttons-end">
          <div className="buttons is-centered">
            <Link href="/panel">
              <button className="button is-primary is-responsive is-outlined ">Volver</button>
            </Link>
            <Link href="/admin-dashboard#/Units">
              <button className="button is-primary is-responsive is-outlined">Manejar Unidades</button>
            </Link>
            <Link href="/admin-dashboard#/SubUnits">
              <button className="button is-primary is-responsive is-outlined">Manejar Subunidades</button>
            </Link>
            
          </div>
        </div>
        
        </div>
      </div>
    </div>
  );
}

export default UnidadTable;
