'use client';

import { Admin, Resource, ListGuesser, EditGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import GroupIcon from '@mui/icons-material/Group';
import BadgeIcon from '@mui/icons-material/Badge';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HotelIcon from '@mui/icons-material/Hotel';
import TableUsers from './users/Users';
import TableRoles from './roles/Roles';
import TableUnits from './units/Units';
import TableSubUnits from './subUnits/SubUnits';
import TableBeds from './beds/Beds';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const AdminApp = () => {

  return (
    <>
    <Admin dataProvider={dataProvider}>
      <Resource
        name="Users"
        list={TableUsers}
        // recordRepresentation="name"
        icon={GroupIcon}
      />
      <Resource
        name="Roles"
        list={TableRoles}
        // recordRepresentation="name"
        icon={BadgeIcon}
      />
      <Resource
        name="Units"
        list={TableUnits}
        // recordRepresentation="name"
        icon={MedicalServicesIcon}
      />
      <Resource
        name="SubUnits"
        list={TableSubUnits}
        // recordRepresentation="name"
        icon={MedicalServicesIcon}
      />
      <Resource
        name="Beds"
        list={TableBeds}
        // recordRepresentation="name"
        icon={HotelIcon}
      />
    </Admin>
    </>
  );
};

export default AdminApp;
