'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/shared/Button';
import { bathroomTypes } from '@/lib/mockData';
import { useEstimatorStore } from '@/lib/store';

export default function EstimatorPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | null>(null);
  const setBathroomType = useEstimatorStore((state) => state.setBathroomType);

  const handleSelect = (code: string, basePrice: number) => {
    setSelected(code);
    setBathroomType(code, basePrice);
  };

  const handleContinue = () => {
    if (selected) {
      router.push(`/estimator/${selected.toLowerCase()}`);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Select Your Bathroom Type
            </h1>
            <p className="text-lg text-gray-600">
              Choose the type of bathroom remodel you're planning
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {bathroomTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleSelect(type.code, type.basePrice)}
                className={`bg-white rounded-xl overflow-hidden transition-all duration-200 ${
                  selected === type.code
                    ? 'ring-4 ring-blue-500 shadow-xl scale-105'
                    : 'hover:shadow-lg hover:scale-102'
                }`}
              >
                <div className="relative h-48">
                  <Image
                    src={type.imageUrl}
                    alt={type.name}
                    fill
                    className="object-cover"
                  />
                  {selected === type.code && (
                    <div className="absolute top-4 right-4 bg-blue-600 text-white rounded-full p-2">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    Starting at ${type.basePrice.toLocaleString()}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <div className="text-center">
            <Button
              size="lg"
              disabled={!selected}
              onClick={handleContinue}
              className="min-w-64"
            >
              Continue to Estimate →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
