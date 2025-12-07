'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import { BathroomTypeModal } from '@/components/admin/BathroomTypeModal';
import { bathroomTypes as initialTypes } from '@/lib/mockData';

export default function BathroomTypesPage() {
  const [bathroomTypes, setBathroomTypes] = useState(initialTypes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<any>(null);

  const handleAddNew = () => {
    setEditingType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (type: any) => {
    setEditingType(type);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingType) {
      setBathroomTypes(bathroomTypes.map(t => t.id === editingType.id ? { ...data, id: editingType.id } : t));
    } else {
      setBathroomTypes([...bathroomTypes, { ...data, id: Date.now().toString() }]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this bathroom type?')) {
      setBathroomTypes(bathroomTypes.filter(t => t.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bathroom Types</h1>
          <p className="text-gray-600">Manage bathroom configurations and base pricing</p>
        </div>
        <Button onClick={handleAddNew}>+ Add New Type</Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Total Types</p>
          <p className="text-3xl font-bold text-gray-900">{bathroomTypes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Active</p>
          <p className="text-3xl font-bold text-green-600">{bathroomTypes.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Avg. Base Price</p>
          <p className="text-3xl font-bold text-blue-600">
            ${Math.round(bathroomTypes.reduce((sum, t) => sum + t.basePrice, 0) / bathroomTypes.length).toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Price Range</p>
          <p className="text-xl font-bold text-gray-900">
            ${Math.min(...bathroomTypes.map(t => t.basePrice)).toLocaleString()} - ${Math.max(...bathroomTypes.map(t => t.basePrice)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Bathroom Types Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {bathroomTypes.map((type) => (
          <div key={type.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative h-48">
              <Image
                src={type.imageUrl}
                alt={type.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                {type.code}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{type.description}</p>
              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${type.basePrice.toLocaleString()}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(type)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(type.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Table View */}
      <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Detailed View</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Base Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bathroomTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {type.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {type.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {type.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    ${type.basePrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {type.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(type)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(type.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <BathroomTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bathroomType={editingType}
        onSave={handleSave}
      />
    </div>
  );
}
