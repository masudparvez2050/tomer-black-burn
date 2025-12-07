'use client';

import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/shared/Button';
import { PriceCalculator } from '@/components/estimator/PriceCalculator';
import { QuestionCard } from '@/components/estimator/QuestionCard';
import { mockCategories } from '@/lib/mockData';
import { useEstimatorStore } from '@/lib/store';

export default function QuestionPage() {
  const params = useParams();
  const router = useRouter();
  const bathroomType = useEstimatorStore((state) => state.bathroomType);

  if (!bathroomType) {
    router.push('/estimator');
    return null;
  }

  return (
    <div className="py-8 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Customize Your Estimate
            </h1>
            <p className="text-gray-600">
              Answer the questions below to get an accurate estimate
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {mockCategories.map((category) => (
                <div key={category.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>

                  <div className="space-y-4">
                    {category.costCodes.map((costCode) => (
                      <QuestionCard key={costCode.id} costCode={costCode} />
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => router.push('/estimator')}
                >
                  ← Back
                </Button>
                <Button
                  onClick={() => router.push('/estimator/preview')}
                  className="flex-1"
                >
                  Continue to Preview →
                </Button>
              </div>
            </div>

            <div className="lg:col-span-1">
              <PriceCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
