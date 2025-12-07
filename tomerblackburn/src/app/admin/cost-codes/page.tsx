'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';
import { CostCodeModal } from '@/components/admin/CostCodeModal';

const mockCostCodes = [
  { id: '1', code: 'FP-001', title: 'Remove existing fixtures', category: 'Demolition', unitCost: 500, unit: 'each', type: 'WHITE', description: 'Remove all existing bathroom fixtures', active: true },
  { id: '2', code: 'FP-002', title: 'Wall tile removal', category: 'Demolition', unitCost: 20, unit: 'sqft', type: 'BLUE', description: 'Remove tile from walls', active: true },
  { id: '3', code: 'FP-010', title: 'Install new toilet', category: 'Plumbing', unitCost: 300, unit: 'each', type: 'WHITE', description: 'Install toilet in existing location', active: true },
  { id: '4', code: 'FP-011', title: 'Relocate shower drain', category: 'Plumbing', unitCost: 1400, unit: 'each', type: 'BLUE', description: 'Move shower drain to new location', active: true },
  { id: '5', code: 'FP-020', title: 'Install vanity light', category: 'Electrical', unitCost: 200, unit: 'each', type: 'WHITE', description: 'Install new vanity light', active: true },
  { id: '6', code: 'FP-021', title: 'Install recessed cans', category: 'Electrical', unitCost: 150, unit: 'each', type: 'ORANGE', description: 'Install recessed lighting', active: true },
];

export default function CostCodesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const [costCodes, setCostCodes] = useState(mockCostCodes);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<any>(null);

  const filteredCodes = costCodes.filter(code => {
    const matchesSearch = code.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         code.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'ALL' || code.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleAddNew = () => {
    setEditingCode(null);
    setIsModalOpen(true);
  };

  const handleEdit = (code: any) => {
    setEditingCode(code);
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (editingCode) {
      // Update existing
      setCostCodes(costCodes.map(c => c.id === editingCode.id ? { ...data, id: editingCode.id } : c));
    } else {
      // Add new
      setCostCodes([...costCodes, { ...data, id: Date.now().toString() }]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this cost code?')) {
      setCostCodes(costCodes.filter(c => c.id !== id));
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      WHITE: 'bg-gray-100 text-gray-800',
      BLUE: 'bg-blue-100 text-blue-800',
      GREEN: 'bg-green-100 text-green-800',
      ORANGE: 'bg-orange-100 text-orange-800',
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Cost Codes</h1>
          <p className="text-gray-600">Manage pricing and cost codes</p>
        </div>
        <Button onClick={handleAddNew}>+ Add New Cost Code</Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by code or title..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Types</option>
              <option value="WHITE">White (Default)</option>
              <option value="BLUE">Blue (Yes/No)</option>
              <option value="GREEN">Green (Numeric)</option>
              <option value="ORANGE">Orange (Dropdown)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cost Codes Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Unit Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCodes.map((code) => (
                <tr key={code.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {code.code}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {code.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {code.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${code.unitCost}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeBadge(code.type)}`}>
                      {code.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      code.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {code.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => handleEdit(code)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(code.id)}
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

      {/* Pagination */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCodes.length} of {costCodes.length} cost codes
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* Modal */}
      <CostCodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        costCode={editingCode}
        onSave={handleSave}
      />
    </div>
  );
}
