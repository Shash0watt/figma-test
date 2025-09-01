import React, { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';

// Define the props for the Modal component
interface ModalProps {
  show: boolean;
  onClose: () => void;
}

// Modal component for the demo disclaimer
const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 flex justify-center items-center">
      <div className="bg-[#1e1e1e] p-10 rounded-xl shadow-2xl max-w-md w-11/12 text-white border border-[#8a94a733]">
        <h2 className="text-2xl font-bold mb-4 text-center">Welcome to the Demo</h2>
        <p className="text-base text-[#a0a0a0] mb-8 text-center">
          This is a demonstration version of the Financial Trading Dashboard. All data displayed is for illustrative purposes only and should not be considered real financial information.
        </p>
        <button
          onClick={onClose}
          style={{ backgroundColor: '#00ffab' }}
          className="w-full text-black font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
};

export default function App() {
  // Initialize state based on sessionStorage
  const [showModal, setShowModal] = useState(() => !sessionStorage.getItem('demoModalShown'));

  const handleCloseModal = () => {
    setShowModal(false);
    // Set the flag in sessionStorage after the modal is closed
    sessionStorage.setItem('demoModalShown', 'true');
  };

  return (
    <div className={`min-h-screen bg-[#121212] dark ${showModal ? 'overflow-hidden' : ''}`}>
      {showModal && <Modal show={showModal} onClose={handleCloseModal} />}
      <Dashboard />
    </div>
  );
}
