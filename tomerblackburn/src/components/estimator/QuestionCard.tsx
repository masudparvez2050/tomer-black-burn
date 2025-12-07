'use client';

import { useState } from 'react';
import { CostCode } from '@/types';
import { useEstimatorStore } from '@/lib/store';

interface QuestionCardProps {
  costCode: CostCode;
}

export function QuestionCard({ costCode }: QuestionCardProps) {
  const { addItem, removeItem, updateItem, selectedItems } = useEstimatorStore();
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [dropdownValue, setDropdownValue] = useState('');

  const existingItem = selectedItems.find(item => item.costCodeId === costCode.id);

  const handleToggle = (value: boolean) => {
    setSelected(value);
    if (value) {
      addItem({
        costCodeId: costCode.id,
        quantity: costCode.quantity || 1,
        unitCost: costCode.unitCost,
        totalCost: costCode.unitCost * (costCode.quantity || 1),
      });
    } else {
      removeItem(costCode.id);
    }
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(value);
    if (value > 0) {
      const totalCost = value * costCode.unitCost;
      if (existingItem) {
        updateItem(costCode.id, { quantity: value, totalCost });
      } else {
        addItem({
          costCodeId: costCode.id,
          quantity: value,
          unitCost: costCode.unitCost,
          totalCost,
        });
      }
    } else {
      removeItem(costCode.id);
    }
  };

  const handleDropdownChange = (value: string, qty: number) => {
    setDropdownValue(value);
    const totalCost = qty * costCode.unitCost;
    if (existingItem) {
      updateItem(costCode.id, { quantity: qty, totalCost });
    } else {
      addItem({
        costCodeId: costCode.id,
        quantity: qty,
        unitCost: costCode.unitCost,
        totalCost,
      });
    }
  };

  const bgColors = {
    WHITE: 'bg-white',
    BLUE: 'bg-blue-50 border-blue-200',
    GREEN: 'bg-green-50 border-green-200',
    ORANGE: 'bg-orange-50 border-orange-200',
    PURPLE: 'bg-purple-50 border-purple-200',
    YELLOW: 'bg-yellow-50 border-yellow-200',
    RED: 'bg-red-50 border-red-200',
  };

  if (costCode.questionType === 'WHITE') {
    return (
      <div className={`${bgColors.WHITE} border border-gray-200 rounded-lg p-4 mb-4`}>
        <h4 className="font-semibold text-gray-900 mb-1">{costCode.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{costCode.description}</p>
        <p className="text-sm text-gray-500">Included in base price</p>
      </div>
    );
  }

  if (costCode.questionType === 'BLUE') {
    return (
      <div className={`${bgColors.BLUE} border rounded-lg p-4 mb-4`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-1">{costCode.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{costCode.description}</p>
            <p className="text-sm font-medium text-blue-600">
              +${costCode.unitCost.toLocaleString()}
            </p>
          </div>
          <button
            onClick={() => handleToggle(!selected)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ml-4 ${
              selected ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                selected ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    );
  }

  if (costCode.questionType === 'GREEN') {
    return (
      <div className={`${bgColors.GREEN} border rounded-lg p-4 mb-4`}>
        <h4 className="font-semibold text-gray-900 mb-1">{costCode.title}</h4>
        <p className="text-sm text-gray-600 mb-3">{costCode.description}</p>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="0"
            value={quantity || ''}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            placeholder={`Enter ${costCode.unit}`}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
          <div className="text-sm text-gray-600 whitespace-nowrap">
            ${costCode.unitCost} per {costCode.unit}
          </div>
          {quantity > 0 && (
            <div className="text-lg font-semibold text-green-600 whitespace-nowrap">
              +${(quantity * costCode.unitCost).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (costCode.questionType === 'ORANGE') {
    return (
      <div className={`${bgColors.ORANGE} border rounded-lg p-4 mb-4`}>
        <h4 className="font-semibold text-gray-900 mb-1">{costCode.title}</h4>
        <p className="text-sm text-gray-600 mb-3">{costCode.description}</p>
        <div className="flex items-center gap-4">
          <select
            value={dropdownValue}
            onChange={(e) => setDropdownValue(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            <option value="">Select option</option>
            {costCode.dropdownOptions?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          {dropdownValue && (
            <input
              type="number"
              min={costCode.minValue || 1}
              max={costCode.maxValue || 10}
              placeholder="Qty"
              onChange={(e) => handleDropdownChange(dropdownValue, Number(e.target.value))}
              className="w-20 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          )}
        </div>
        {existingItem && (
          <p className="text-lg font-semibold text-orange-600 mt-2">
            +${existingItem.totalCost.toLocaleString()}
          </p>
        )}
      </div>
    );
  }

  return null;
}
