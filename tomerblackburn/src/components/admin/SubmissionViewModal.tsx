'use client';

import { Button } from '@/components/shared/Button';

interface Submission {
  id: string;
  client: string;
  email: string;
  type: string;
  amount: number;
  date: string;
  status: string;
  phone?: string;
  address?: string;
  notes?: string;
  items?: Array<{ name: string; quantity: number; cost: number }>;
}

interface SubmissionViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  submission: Submission | null;
  onExport: (id: string) => void;
}

export function SubmissionViewModal({ isOpen, onClose, submission, onExport }: SubmissionViewModalProps) {
  if (!isOpen || !submission) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Submission Details</h2>
            <p className="text-sm text-gray-600 mt-1">{submission.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status Badge */}
          <div className="flex items-center gap-4">
            <span className={`px-4 py-2 text-sm font-medium rounded-full ${
              submission.status === 'Completed' ? 'bg-green-100 text-green-800' :
              submission.status === 'Processing' ? 'bg-blue-100 text-blue-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {submission.status}
            </span>
            <span className="text-sm text-gray-600">{submission.date}</span>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Client Information</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{submission.client}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{submission.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{submission.phone || '(773) 555-0123'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Address</p>
                <p className="font-medium text-gray-900">{submission.address || '1234 Main St, Chicago, IL 60614'}</p>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Bathroom Type</p>
                <p className="font-medium text-gray-900">{submission.type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-blue-600">${submission.amount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Selected Items */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Items</h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Base Package</td>
                    <td className="px-4 py-3 text-sm text-gray-600">1</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">$15,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Wall tile removal</td>
                    <td className="px-4 py-3 text-sm text-gray-600">50 sqft</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">$1,000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Additional outlet</td>
                    <td className="px-4 py-3 text-sm text-gray-600">2</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">$300</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-900">Recessed lighting</td>
                    <td className="px-4 py-3 text-sm text-gray-600">4</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">$600</td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="px-4 py-3 text-sm text-gray-900" colSpan={2}>Total</td>
                    <td className="px-4 py-3 text-sm text-gray-900 text-right">${submission.amount.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Project Notes */}
          {submission.notes && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Notes</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700">{submission.notes || 'Need to start in March. Prefer white subway tiles.'}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Close
          </Button>
          <Button onClick={() => onExport(submission.id)} className="flex-1">
            📥 Export to Excel
          </Button>
          <Button variant="secondary" className="flex-1">
            📄 Generate PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
