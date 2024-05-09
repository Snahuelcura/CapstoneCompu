import React from 'react';
import ButtonLogout from './ButtonLogout'; // Importa el componente ButtonLogout
import Link from 'next/link';

const Navbar = ({ showLogout }) => {
  return (
    <nav className="navbar">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl">MediBed</h1>
        <div>
          {showLogout && <ButtonLogout />} {/* Utiliza el componente ButtonLogout si showLogout es true */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;