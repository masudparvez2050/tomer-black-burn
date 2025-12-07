'use client';

import { useState } from 'react';
import { SubmissionViewModal } from '@/components/admin/SubmissionViewModal';

const mockSubmissions = [
  { id: 'EST-001', client: 'John Doe', email: 'john@example.com', type: 'Four Piece', amount: 17660, date: '2025-01-15', status: 'Completed', phone: '(773) 555-0123', address: '1234 Main St, Chicago, IL 60614' },
  { id: 'EST-002', client: 'Jane Smith', email: 'jane@example.com', type: 'Three Piece - Shower', amount: 13500, date: '2025-01-14', status: 'Processing', phone: '(773) 555-0124', address: '5678 Oak Ave, Chicago, IL 60615' },
  { id: 'EST-003', client: 'Bob Johnson', email: 'bob@example.com', type: 'Two Piece', amount: 4200, date: '2025-01-14', status: 'Completed', phone: '(773) 555-0125', address: '9012 Elm St, Chicago, IL 60616' },
  { id: 'EST-004', client: 'Alice Brown', email: 'alice@example.com', type: 'Four Piece', amount: 18900, date: '2025-01-13', status: 'Pending', phone: '(773) 555-0126', address: '3456 Pine Rd, Chicago, IL 60617' },
  { id: 'EST-005', client: 'Charlie Wilson', email: 'charlie@example.com', type: 'Three Piece - Tub', amount: 10500, date: '2025-01-13', status: 'Completed', phone: '(773) 555-0127', address: '7890 Maple Dr, Chicago, IL 60618' },
  { id: 'EST-006', client: 'Diana Martinez', email: 'diana@example.com', type: 'Four Piece', amount: 16800, date: '2025-01-12', status: 'Processing', phone: '(773) 555-0128', address: '2345 Cedar Ln, Chicago, IL 60619' },
];

export default function SubmissionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredSubmissions = mockSubmissions.filter(sub => {
    const matchesSearch = sub.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'ALL' || sub.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleView = (submission: any) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
  };

  const handleExport = (id: string) => {
    // Mock export functionality
    const submission = mockSubmissions.find(s => s.id === id);
    if (submission) {
      // Create CSV content
      const csvContent = `Submission ID,Client,Email,Type,Amount,Date,Status
${submission.id},${submission.client},${submission.email},${submission.type},$${submission.amount},${submission.date},${submission.status}

Selected Items:
Item,Quantity,Cost
Base Package,1,$15000
Wall tile removal,50 sqft,$1000
Additional outlet,2,$300
Recessed lighting,4,$600

Total:,$${submission.amount}`;

      // Create blob and download
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${submission.id}_estimate.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      
      alert(`Exported ${submission.id} successfully!`);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submissions</h1>
        <p className="text-gray-600">View and manage all estimate submissions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Total Submissions</p>
          <p className="text-3xl font-bold text-gray-900">{mockSubmissions.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Completed</p>
          <p className="text-3xl font-bold text-green-600">
            {mockSubmissions.filter(s => s.status === 'Completed').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Processing</p>
          <p className="text-3xl font-bold text-blue-600">
            {mockSubmissions.filter(s => s.status === 'Processing').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-sm text-gray-600 mb-1">Pending</p>
          <p className="text-3xl font-bold text-yellow-600">
            {mockSubmissions.filter(s => s.status === 'Pending').length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by ID, client name, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="ALL">All Status</option>
              <option value="Completed">Completed</option>
              <option value="Processing">Processing</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Bathroom Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
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
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {submission.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {submission.client}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {submission.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {submission.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${submission.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {submission.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      submission.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      submission.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => handleView(submission)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleExport(submission.id)}
                      className="text-green-600 hover:text-green-800 font-medium"
                    >
                      Export
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
          Showing {filteredSubmissions.length} of {mockSubmissions.length} submissions
        </p>
        <div className="flex gap-2">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>

      {/* View Modal */}
      <SubmissionViewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        submission={selectedSubmission}
        onExport={handleExport}
      />
    </div>
  );
}
