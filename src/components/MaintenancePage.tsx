'use client';

import React from 'react';
import ParticleBackground from './ParticleBackground';
import Image from 'next/image';

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo */}
        <div className="mb-12 animate-pulse">
          <div className="w-48 h-48 md:w-64 md:h-64 mx-auto relative">
            {/* Logo real con fallback al placeholder */}
            <div className="w-full h-full flex items-center justify-center relative">
              <Image 
                src="/images/tree-logo.png" 
                alt="Tree Logo" 
                width={256}
                height={256}
                className="object-contain drop-shadow-2xl"
                onError={() => {
                  // Si el logo no se carga, el CSS mostrará automáticamente el fallback
                }}
                style={{ display: 'block' }}
              />
              {/* Fallback placeholder - se muestra si el logo no existe */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl"
                style={{ display: 'none' }}
                id="logo-fallback"
              >
                <span className="text-white text-6xl md:text-8xl font-bold italic">Tree</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Message */}
        <div className="max-w-4xl mx-auto mb-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Estamos trabajando en algo
            <span className="block text-blue-400">increíble</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
            Somos una agencia de desarrollo de soluciones tecnológicas.
            <span className="block mt-2">
              Si quieres conversar, haz clic en el botón de WhatsApp que está abajo.
            </span>
          </p>
        </div>

        {/* Additional Info */}
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-400">
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">Desarrollo Web</h3>
              <p className="text-sm">Aplicaciones modernas y escalables</p>
            </div>
            
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">Apps Móviles</h3>
              <p className="text-sm">iOS y Android nativo</p>
            </div>
            
            <div className="p-4">
              <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-1">Backend & APIs</h3>
              <p className="text-sm">Arquitecturas robustas</p>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Button - Same as original */}
      <a
        href="https://wa.me/584121010744"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse"
        style={{
          boxShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.4), 0 0 60px rgba(34, 197, 94, 0.2)'
        }}
        aria-label="Contactar por WhatsApp"
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
        </svg>
      </a>
    </div>
  );
};

export default MaintenancePage;