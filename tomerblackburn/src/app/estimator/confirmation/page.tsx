'use client';

import Link from 'next/link';
import { Button } from '@/components/shared/Button';
import { useEstimatorStore } from '@/lib/store';
import { useEffect } from 'react';

export default function ConfirmationPage() {
  const { totalPrice, reset } = useEstimatorStore();

  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Thank You for Your Submission!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Your bathroom estimate has been received. We'll send a detailed proposal to your email shortly.
            </p>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Estimate Number:</span>
                <span className="font-semibold">EST-2025-{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total:</span>
                <span className="text-2xl font-bold text-blue-600">${totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <h3 className="font-semibold text-lg mb-4">What happens next?</h3>
              <ol className="space-y-3">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                  <span className="text-gray-600">You'll receive an email confirmation</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                  <span className="text-gray-600">We'll review your estimate (1-2 hours)</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                  <span className="text-gray-600">You'll get a detailed PDF proposal</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">4</span>
                  <span className="text-gray-600">We'll contact you to discuss next steps</span>
                </li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button variant="outline">
                  Back to Home
                </Button>
              </Link>
              <Link href="/estimator">
                <Button onClick={() => reset()}>
                  Start New Estimate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
