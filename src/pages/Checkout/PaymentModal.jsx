import React from 'react';
import { Text } from "components";

const PaymentModalComp = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  console.log("payment modal data", data);

  const totalCharges = (data.freight_charge || 0) + 
                       (data.cod_charges || 0) + 
                       (data.coverage_charges || 0) + 
                       (data.other_charges || 0);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white-A700 p-10 rounded-lg shadow-2xl w-full max-w-[600px]">
        <h2 className="text-2xl font-bold mb-6 text-center">Delivery Information</h2>
        
        <div className="space-y-4 mb-6">
          <Text className="text-lg"><strong>Courier:</strong> {data.courier_name}</Text>
          <Text className="text-lg"><strong>Delivery Charge:</strong> ₹{data.freight_charge || 0}</Text>
          <Text className="text-lg"><strong>COD Charges:</strong> ₹{data.cod_charges || 0}</Text>
          <Text className="text-lg"><strong>Coverage Charges:</strong> ₹{data.coverage_charges || 0}</Text>
          <Text className="text-lg"><strong>Other Charges:</strong> ₹{data.other_charges || 0}</Text>
          <Text className="text-lg"><strong>Estimated Delivery:</strong> {data.estimated_delivery_days} days</Text>
          <Text className="text-lg"><strong>Delivery State:</strong> {data.state}</Text>
          <Text className="text-lg"><strong>Tracking:</strong> {data.realtime_tracking}</Text>
        </div>

        <div className="border-t border-gray-300 pt-4 mb-6">
          <Text className="text-xl font-bold">Total Delivery Charge: ₹{totalCharges.toFixed(2)}</Text>
        </div>

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

export default PaymentModalComp;