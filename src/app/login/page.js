'use client';

import Navbar from '../../components/Navbar';
import React from 'react';

export default function Login() {
  const handleLogin = () => {
    window.location.href = '/admin-dashboard';
  };

  return (
    <div>
      <Navbar showLogout={false} />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="mb-4 text-3xl font-bold" style={{ fontFamily: 'Open Sans, sans-serif' }}>¡Bienvenido!</h1>
        <h3 className="mb-12 text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>Ingrese sus credenciales para continuar.</h3>
        <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
          <form className="space-y-6">
            <div className="relative">
              <input
                type="email"
                className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Email Address"
                style={{ color: '#000', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div className="relative mt-4">
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 border rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 input-border"
                placeholder="Password"
                style={{ color: '#000', fontFamily: 'Inter, sans-serif' }}
              />
            </div>
            <div>
              <button type="button" onClick={handleLogin} className="w-full py-2 btn-primary rounded-md hover:bg-indigo-700">Log in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
