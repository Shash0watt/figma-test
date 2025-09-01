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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-[#1a1a1a] p-6 rounded-lg shadow-lg max-w-sm w-full text-white border border-[#8a94a733]">
        <h2 className="text-xl font-semibold mb-4">Welcome to the Demo</h2>
        <p className="text-sm text-[#8a94a7] mb-6">
          This is a demonstration version of the Financial Trading Dashboard. All data displayed is for illustrative purposes only and should not be considered real financial information.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#00ffab] text-black font-medium py-2 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Acknowledge
        </button>
      </div>
    </div>
  );
};

export default function App() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Use sessionStorage to only show the modal once per session
    if (!sessionStorage.getItem('demoModalShown')) {
      setShowModal(true);
      sessionStorage.setItem('demoModalShown', 'true');
    }
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#121212] dark">
      <Modal show={showModal} onClose={handleCloseModal} />
      <Dashboard />
    </div>
  );
}
