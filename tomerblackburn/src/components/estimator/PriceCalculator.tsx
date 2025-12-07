'use client';

import { useEstimatorStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export function PriceCalculator() {
  const { basePrice, selectedItems, totalPrice } = useEstimatorStore();
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const itemsTotal = selectedItems.reduce((sum, item) => sum + item.totalCost, 0);

  return (
    <div
      className={`bg-white border-2 border-blue-500 rounded-lg shadow-lg p-6 transition-all ${
        isSticky ? 'fixed top-20 right-4 w-80 z-40' : 'sticky top-24'
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Estimate Summary</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Price:</span>
          <span className="font-medium">${basePrice.toLocaleString()}</span>
        </div>

        {selectedItems.length > 0 && (
          <>
            <div className="border-t pt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Additional Items:</p>
              {selectedItems.slice(0, 5).map((item, index) => (
                <div key={index} className="flex justify-between text-xs text-gray-600 mb-1">
                  <span className="truncate mr-2">Item {index + 1}</span>
                  <span className="whitespace-nowrap">+${item.totalCost.toLocaleString()}</span>
                </div>
              ))}
              {selectedItems.length > 5 && (
                <p className="text-xs text-gray-500 mt-1">
                  +{selectedItems.length - 5} more items
                </p>
              )}
            </div>

            <div className="flex justify-between text-sm border-t pt-3">
              <span className="text-gray-600">Additions Total:</span>
              <span className="font-medium">+${itemsTotal.toLocaleString()}</span>
            </div>
          </>
        )}
      </div>

      <div className="border-t-2 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">Total Estimate:</span>
          <span className="text-3xl font-bold text-blue-600">
            ${totalPrice.toLocaleString()}
          </span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4 text-center">
        * Final price may vary based on site conditions
      </p>
    </div>
  );
}
