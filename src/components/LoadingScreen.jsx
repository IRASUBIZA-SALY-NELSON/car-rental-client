import React from 'react';
import { assets } from '../assets/assets';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center">
        <img
          src={assets.logo}
          alt="Intare Logo"
          className="w-24 h-24 md:w-32 md:h-32 object-contain animate-pulse-custom"
        />
        <div className="mt-8 flex gap-2">
           <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-0"></div>
           <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
           <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></div>
        </div>
      </div>
      <style jsx>{`
        @keyframes pulse-custom {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.9); opacity: 0.8; }
        }
        .animate-pulse-custom {
          animation: pulse-custom 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
