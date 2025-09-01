import React, { useState } from 'react';
import { Dashboard } from './components/Dashboard';

// Import the reusable components
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './components/ui/dialog';
import { Button } from './components/ui/button';

export default function App() {
  // State to control the modal's visibility
  const [showModal, setShowModal] = useState(() => !sessionStorage.getItem('demoModalShown'));

  // This function now handles closing the modal and setting the session storage
  const handleCloseModal = () => {
    setShowModal(false);
    sessionStorage.setItem('demoModalShown', 'true');
  };

  return (
    <div className="min-h-screen bg-[#121212] dark">
      <Dialog open={showModal} onOpenChange={(open) => { if (!open) handleCloseModal(); }}>
        <DialogContent className="bg-card p-12 border-border text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold mb-4 text-center">
              Welcome to the Demo
            </DialogTitle>
            <DialogDescription className="text-base text-muted-foreground mb-8 text-center">
              This is a demonstration version of the Financial Trading Dashboard. 
              All data displayed is for illustrative purposes only and should not be 
              considered real financial information.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleCloseModal}
            className="w-full text-black font-semibold py-3 h-auto hover:bg-primary/90"
          >
            Acknowledge
          </Button>
        </DialogContent>
      </Dialog>

      <Dashboard />
    </div>
  );
}
