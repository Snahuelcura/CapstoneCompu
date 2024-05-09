/*ih lo que estaba en page.js en la carpeta home */

'use client';

import Navbarhome from '../components/Navbarhome';
import React from 'react';
import Image from 'next/image'; /*ihn cita video youtube */
import Link from 'next/link'; /*ihn doc page.js panel */

export default function Login() {
    return (
        <div style={{zIndex: -1,}}>
            
            <Navbarhome showLogout={false} />
            <div className="flex flex-col items-center justify-center h-screen" style={{zIndex: -1,}}>
                <Image src="/images/upc.png" alt="imagen" layout="fill" objectFit='cover' style={{ opacity: 0.25, zIndex: -1 }}/>
                <h1 className="mb-4 text-3xl font-bold" style={{ fontSize: '45px', fontFamily: 'Open Sans, sans-serif' }}>Bienvenido a MediBed</h1>
                <h3 className="mb-12 text-lg" style={{ color: 'black', fontSize: '24px', fontFamily: 'Inter, sans-serif' }}>Optimiza la asignación de camas según las necesidades de cada paciente. Mejora la seguridad en la atención médica con nuestro sistema especializado.</h3>
                <div className="w-96 p-6 rounded-lg">
                    <div>
                        <Link href="/login">
                        <button type="button" className="w-full py-2 btn-primary rounded-md hover:bg-indigo-700">Comenzar ahora</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
