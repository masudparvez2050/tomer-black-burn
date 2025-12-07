'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { useEstimatorStore } from '@/lib/store';

export default function PreviewPage() {
  const router = useRouter();
  const { bathroomType, basePrice, selectedItems, totalPrice, setClientInfo, setProjectNotes, reset } = useEstimatorStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
  });
  const [notes, setNotes] = useState('');

  if (!bathroomType) {
    router.push('/estimator');
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setClientInfo(formData);
    setProjectNotes(notes);
    router.push('/estimator/confirmation');
  };

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Review Your Estimate</h1>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Estimate Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Bathroom Type:</span>
                <span className="text-gray-600">{bathroomType}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="font-medium">Base Price:</span>
                <span className="text-gray-600">${basePrice.toLocaleString()}</span>
              </div>
            </div>

            {selectedItems.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold mb-3">Selected Options:</h3>
                <div className="space-y-2">
                  {selectedItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm py-2 border-b border-gray-100">
                      <span className="text-gray-600">Additional Item {index + 1}</span>
                      <span className="font-medium">${item.totalCost.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t-2 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">Total Estimate:</span>
                <span className="text-3xl font-bold text-blue-600">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Project Notes (Optional)</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional details or questions..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4">Your Information</h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Zip Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                ← Back to Edit
              </Button>
              <Button type="submit" className="flex-1">
                Submit Estimate →
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
