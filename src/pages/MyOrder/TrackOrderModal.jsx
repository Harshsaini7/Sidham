import React from 'react';
import { Text } from "components"; // Assuming Text is imported from your components

const TrackOrderModal = ({ isOpen, onClose, orderStatus }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white-A700 p-10 rounded-lg shadow-2xl w-full max-w-[600px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Order Status</h2>
        <Text className="mb-6 text-lg text-center">Current Status: {orderStatus}</Text>
        <div className="flex justify-center">
          <button 
            onClick={onClose}
            className="bg-gray-800 text-white-A700 px-6 py-3 rounded hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderModal;
