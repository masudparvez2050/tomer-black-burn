# Frontend Architecture (Next.js)

## Overview

Modern React-based frontend using Next.js 14 with App Router, TypeScript, and Tailwind CSS for a responsive, performant user experience.

---

## Project Structure

```
/frontend
├── /app                                    # Next.js App Router
│   ├── layout.tsx                         # Root layout
│   ├── page.tsx                           # Home page
│   ├── /estimator
│   │   ├── page.tsx                       # Estimator landing
│   │   ├── /[bathroomType]
│   │   │   └── page.tsx                   # Dynamic bathroom type page
│   │   └── /preview
│   │       └── page.tsx                   # Preview & submission
│   ├── /admin
│   │   ├── layout.tsx                     # Admin layout with auth
│   │   ├── /dashboard
│   │   │   └── page.tsx                   # Admin dashboard
│   │   ├── /cost-codes
│   │   │   ├── page.tsx                   # Cost codes list
│   │   │   └── /[id]
│   │   │       └── page.tsx               # Edit cost code
│   │   ├── /submissions
│   │   │   ├── page.tsx                   # Submissions list
│   │   │   └── /[id]
│   │   │       └── page.tsx               # View submission
│   │   └── /settings
│   │       └── page.tsx                   # Admin settings
│   └── /api                               # API routes (if needed)
│       └── /auth
│           └── [...nextauth].ts           # NextAuth config
├── /components
│   ├── /estimator
│   │   ├── BathroomTypeSelector.tsx       # Bathroom type cards
│   │   ├── QuestionRenderer.tsx           # Dynamic question renderer
│   │   ├── PriceCalculator.tsx            # Floating price box
│   │   ├── CategorySection.tsx            # Category with questions
│   │   ├── QuestionTypes
│   │   │   ├── WhiteQuestion.tsx          # Default scope display
│   │   │   ├── BlueQuestion.tsx           # Yes/No toggle
│   │   │   ├── GreenQuestion.tsx          # Numeric input
│   │   │   ├── OrangeQuestion.tsx         # Dropdown
│   │   │   ├── PurpleQuestion.tsx         # Auto-calculated
│   │   │   └── YellowQuestion.tsx         # Conditional
│   │   ├── PreviewSummary.tsx             # Final preview
│   │   ├── FileUpload.tsx                 # Image/video upload
│   │   └── ClientInfoForm.tsx             # Contact form
│   ├── /admin
│   │   ├── Sidebar.tsx                    # Admin sidebar nav
│   │   ├── CostCodeTable.tsx              # Cost codes table
│   │   ├── CostCodeEditor.tsx             # Edit cost code form
│   │   ├── SubmissionTable.tsx            # Submissions table
│   │   ├── SubmissionDetail.tsx           # Submission details
│   │   └── StatsCard.tsx                  # Dashboard stats
│   ├── /shared
│   │   ├── Button.tsx                     # Reusable button
│   │   ├── Input.tsx                      # Form input
│   │   ├── Select.tsx                     # Dropdown select
│   │   ├── Modal.tsx                      # Modal dialog
│   │   ├── Toast.tsx                      # Toast notifications
│   │   ├── Loader.tsx                     # Loading spinner
│   │   └── Card.tsx                       # Card container
│   └── /layout
│       ├── Header.tsx                     # Site header
│       ├── Footer.tsx                     # Site footer
│       └── Container.tsx                  # Content container
├── /lib
│   ├── /api
│   │   ├── client.ts                      # Axios instance
│   │   ├── bathroomTypes.ts               # Bathroom types API
│   │   ├── costCodes.ts                   # Cost codes API
│   │   ├── submissions.ts                 # Submissions API
│   │   ├── upload.ts                      # File upload API
│   │   └── auth.ts                        # Auth API
│   ├── /hooks
│   │   ├── useBathroomTypes.ts            # Fetch bathroom types
│   │   ├── useCostCodes.ts                # Fetch cost codes
│   │   ├── useEstimator.ts                # Estimator state logic
│   │   ├── useFileUpload.ts               # File upload logic
│   │   └── useAuth.ts                     # Auth state
│   ├── /store
│   │   ├── estimatorStore.ts              # Zustand store
│   │   └── authStore.ts                   # Auth store
│   ├── /utils
│   │   ├── priceCalculator.ts             # Price calculation logic
│   │   ├── validation.ts                  # Form validation
│   │   ├── formatters.ts                  # Data formatters
│   │   └── constants.ts                   # App constants
│   └── /schemas
│       ├── submission.ts                  # Zod schemas
│       └── costCode.ts                    # Zod schemas
├── /types
│   ├── bathroom.ts                        # Bathroom type types
│   ├── costCode.ts                        # Cost code types
│   ├── submission.ts                      # Submission types
│   └── index.ts                           # Export all types
├── /styles
│   └── globals.css                        # Global styles
├── /public
│   ├── /images
│   │   ├── four-piece.jpg
│   │   ├── three-piece-shower.jpg
│   │   ├── three-piece-tub.jpg
│   │   └── two-piece.jpg
│   └── logo.svg
├── .env.local                             # Environment variables
├── next.config.js                         # Next.js config
├── tailwind.config.js                     # Tailwind config
├── tsconfig.json                          # TypeScript config
└── package.json                           # Dependencies
```

---

## State Management (Zustand)

### Estimator Store

```typescript
// lib/store/estimatorStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SelectedItem {
  costCodeId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  userInput?: Record<string, any>;
}

interface EstimatorState {
  // Selected bathroom type
  bathroomType: string | null;
  basePrice: number;
  
  // Selected items
  selectedItems: SelectedItem[];
  
  // Calculated total
  totalPrice: number;
  
  // Client info
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
  } | null;
  
  // Project notes
  projectNotes: string;
  
  // Uploaded files
  uploadedFiles: Array<{
    fileName: string;
    s3Key: string;
    s3Url: string;
    fileType: string;
    fileSize: number;
  }>;
  
  // Actions
  setBathroomType: (type: string, basePrice: number) => void;
  addItem: (item: SelectedItem) => void;
  removeItem: (costCodeId: string) => void;
  updateItem: (costCodeId: string, updates: Partial<SelectedItem>) => void;
  setClientInfo: (info: EstimatorState['clientInfo']) => void;
  setProjectNotes: (notes: string) => void;
  addUploadedFile: (file: EstimatorState['uploadedFiles'][0]) => void;
  removeUploadedFile: (s3Key: string) => void;
  calculateTotal: () => void;
  reset: () => void;
}

export const useEstimatorStore = create<EstimatorState>()(
  persist(
    (set, get) => ({
      bathroomType: null,
      basePrice: 0,
      selectedItems: [],
      totalPrice: 0,
      clientInfo: null,
      projectNotes: '',
      uploadedFiles: [],
      
      setBathroomType: (type, basePrice) => {
        set({ bathroomType: type, basePrice, totalPrice: basePrice });
      },
      
      addItem: (item) => {
        set((state) => ({
          selectedItems: [...state.selectedItems, item],
        }));
        get().calculateTotal();
      },
      
      removeItem: (costCodeId) => {
        set((state) => ({
          selectedItems: state.selectedItems.filter(
            (item) => item.costCodeId !== costCodeId
          ),
        }));
        get().calculateTotal();
      },
      
      updateItem: (costCodeId, updates) => {
        set((state) => ({
          selectedItems: state.selectedItems.map((item) =>
            item.costCodeId === costCodeId ? { ...item, ...updates } : item
          ),
        }));
        get().calculateTotal();
      },
      
      setClientInfo: (info) => set({ clientInfo: info }),
      
      setProjectNotes: (notes) => set({ projectNotes: notes }),
      
      addUploadedFile: (file) => {
        set((state) => ({
          uploadedFiles: [...state.uploadedFiles, file],
        }));
      },
      
      removeUploadedFile: (s3Key) => {
        set((state) => ({
          uploadedFiles: state.uploadedFiles.filter(
            (file) => file.s3Key !== s3Key
          ),
        }));
      },
      
      calculateTotal: () => {
        const state = get();
        const itemsTotal = state.selectedItems.reduce(
          (sum, item) => sum + item.totalCost,
          0
        );
        set({ totalPrice: state.basePrice + itemsTotal });
      },
      
      reset: () => {
        set({
          bathroomType: null,
          basePrice: 0,
          selectedItems: [],
          totalPrice: 0,
          clientInfo: null,
          projectNotes: '',
          uploadedFiles: [],
        });
      },
    }),
    {
      name: 'estimator-storage',
    }
  )
);
```

---

## Key Components

### 1. Bathroom Type Selector

```typescript
// components/estimator/BathroomTypeSelector.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBathroomTypes } from '@/lib/hooks/useBathroomTypes';
import { useEstimatorStore } from '@/lib/store/estimatorStore';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';

export function BathroomTypeSelector() {
  const router = useRouter();
  const { data: bathroomTypes, isLoading } = useBathroomTypes();
  const setBathroomType = useEstimatorStore((state) => state.setBathroomType);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (code: string, basePrice: number) => {
    setSelected(code);
    setBathroomType(code, basePrice);
  };

  const handleContinue = () => {
    if (selected) {
      router.push(`/estimator/${selected}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center mb-4">
        Select Your Bathroom Type
      </h1>
      <p className="text-center text-gray-600 mb-12">
        Choose the type of bathroom remodel you're planning
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {bathroomTypes?.map((type) => (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:shadow-lg ${
              selected === type.code
                ? 'ring-2 ring-blue-500 shadow-lg'
                : ''
            }`}
            onClick={() => handleSelect(type.code, type.basePrice)}
          >
            <img
              src={type.imageUrl}
              alt={type.name}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{type.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{type.description}</p>
              <p className="text-2xl font-bold text-blue-600">
                Starting at ${type.basePrice.toLocaleString()}
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          disabled={!selected}
          onClick={handleContinue}
        >
          Continue to Estimate
        </Button>
      </div>
    </div>
  );
}
```

---

### 2. Question Renderer

```typescript
// components/estimator/QuestionRenderer.tsx

'use client';

import { CostCode } from '@/types/costCode';
import { WhiteQuestion } from './QuestionTypes/WhiteQuestion';
import { BlueQuestion } from './QuestionTypes/BlueQuestion';
import { GreenQuestion } from './QuestionTypes/GreenQuestion';
import { OrangeQuestion } from './QuestionTypes/OrangeQuestion';
import { PurpleQuestion } from './QuestionTypes/PurpleQuestion';
import { YellowQuestion } from './QuestionTypes/YellowQuestion';

interface QuestionRendererProps {
  costCode: CostCode;
  onUpdate: (costCodeId: string, data: any) => void;
}

export function QuestionRenderer({ costCode, onUpdate }: QuestionRendererProps) {
  const questionComponents = {
    WHITE: WhiteQuestion,
    BLUE: BlueQuestion,
    GREEN: GreenQuestion,
    ORANGE: OrangeQuestion,
    PURPLE: PurpleQuestion,
    YELLOW: YellowQuestion,
    RED: () => null, // Inactive
  };

  const QuestionComponent = questionComponents[costCode.questionType];

  if (!QuestionComponent) return null;

  return (
    <QuestionComponent
      costCode={costCode}
      onUpdate={onUpdate}
    />
  );
}
```

---

### 3. Blue Question (Yes/No Toggle)

```typescript
// components/estimator/QuestionTypes/BlueQuestion.tsx

'use client';

import { useState } from 'react';
import { CostCode } from '@/types/costCode';
import { useEstimatorStore } from '@/lib/store/estimatorStore';

interface BlueQuestionProps {
  costCode: CostCode;
  onUpdate: (costCodeId: string, data: any) => void;
}

export function BlueQuestion({ costCode, onUpdate }: BlueQuestionProps) {
  const [selected, setSelected] = useState(false);
  const { addItem, removeItem } = useEstimatorStore();

  const handleToggle = (value: boolean) => {
    setSelected(value);

    if (value) {
      addItem({
        costCodeId: costCode.id,
        quantity: costCode.quantity || 1,
        unitCost: costCode.unitCost,
        totalCost: costCode.clientPrice,
      });
    } else {
      removeItem(costCode.id);
    }

    onUpdate(costCode.id, { selected: value });
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 mb-1">
            {costCode.title}
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            {costCode.description}
          </p>
          <p className="text-sm font-medium text-blue-600">
            +${costCode.clientPrice.toLocaleString()}
          </p>
        </div>

        <div className="ml-4">
          <button
            onClick={() => handleToggle(!selected)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
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
    </div>
  );
}
```

---

### 4. Green Question (Numeric Input)

```typescript
// components/estimator/QuestionTypes/GreenQuestion.tsx

'use client';

import { useState, useEffect } from 'react';
import { CostCode } from '@/types/costCode';
import { useEstimatorStore } from '@/lib/store/estimatorStore';
import { Input } from '@/components/shared/Input';

interface GreenQuestionProps {
  costCode: CostCode;
  onUpdate: (costCodeId: string, data: any) => void;
}

export function GreenQuestion({ costCode, onUpdate }: GreenQuestionProps) {
  const [quantity, setQuantity] = useState<number>(0);
  const { addItem, updateItem, removeItem } = useEstimatorStore();

  useEffect(() => {
    if (quantity > 0) {
      const totalCost = quantity * costCode.unitCost;
      
      const existingItem = useEstimatorStore.getState().selectedItems
        .find(item => item.costCodeId === costCode.id);

      if (existingItem) {
        updateItem(costCode.id, {
          quantity,
          totalCost,
          userInput: { [costCode.unit]: quantity },
        });
      } else {
        addItem({
          costCodeId: costCode.id,
          quantity,
          unitCost: costCode.unitCost,
          totalCost,
          userInput: { [costCode.unit]: quantity },
        });
      }
    } else {
      removeItem(costCode.id);
    }

    onUpdate(costCode.id, { quantity });
  }, [quantity]);

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
      <h4 className="font-semibold text-gray-900 mb-1">
        {costCode.title}
      </h4>
      <p className="text-sm text-gray-600 mb-3">
        {costCode.description}
      </p>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input
            type="number"
            min="0"
            value={quantity || ''}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder={`Enter ${costCode.unit}`}
            className="w-full"
          />
        </div>
        <div className="text-sm text-gray-600">
          ${costCode.unitCost.toFixed(2)} per {costCode.unit}
        </div>
        {quantity > 0 && (
          <div className="text-lg font-semibold text-green-600">
            +${(quantity * costCode.unitCost).toLocaleString()}
          </div>
        )}
      </div>
    </div>
  );
}
```

---

### 5. Price Calculator (Floating Box)

```typescript
// components/estimator/PriceCalculator.tsx

'use client';

import { useEstimatorStore } from '@/lib/store/estimatorStore';
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

  const itemsTotal = selectedItems.reduce(
    (sum, item) => sum + item.totalCost,
    0
  );

  return (
    <div
      className={`bg-white border-2 border-blue-500 rounded-lg shadow-lg p-6 transition-all ${
        isSticky ? 'fixed top-4 right-4 w-80 z-50' : 'sticky top-4'
      }`}
    >
      <h3 className="text-xl font-bold mb-4">Estimate Summary</h3>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Base Price:</span>
          <span className="font-medium">
            ${basePrice.toLocaleString()}
          </span>
        </div>

        {selectedItems.length > 0 && (
          <>
            <div className="border-t pt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Additional Items:
              </p>
              {selectedItems.map((item, index) => (
                <div key={index} className="flex justify-between text-xs text-gray-600 mb-1">
                  <span>Item {index + 1}</span>
                  <span>+${item.totalCost.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm border-t pt-3">
              <span className="text-gray-600">Additions Total:</span>
              <span className="font-medium">
                +${itemsTotal.toLocaleString()}
              </span>
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
```

---

### 6. File Upload Component

```typescript
// components/estimator/FileUpload.tsx

'use client';

import { useState } from 'react';
import { useEstimatorStore } from '@/lib/store/estimatorStore';
import { uploadImage, uploadVideo } from '@/lib/api/upload';
import { Button } from '@/components/shared/Button';

export function FileUpload() {
  const { uploadedFiles, addUploadedFile, removeUploadedFile } = useEstimatorStore();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'video'
  ) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const uploadFn = type === 'image' ? uploadImage : uploadVideo;
        const result = await uploadFn(file);
        addUploadedFile(result);
      }
    } catch (error) {
      console.error('Upload failed:', error);
      alert('File upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const imageCount = uploadedFiles.filter(f => f.fileType.startsWith('image')).length;
  const videoCount = uploadedFiles.filter(f => f.fileType.startsWith('video')).length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Photos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload up to 10 images of your bathroom (Max 10MB each)
        </p>
        
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={(e) => handleFileUpload(e, 'image')}
          disabled={uploading || imageCount >= 10}
          className="hidden"
          id="image-upload"
        />
        <label htmlFor="image-upload">
          <Button
            as="span"
            disabled={uploading || imageCount >= 10}
            variant="outline"
          >
            {uploading ? 'Uploading...' : `Choose Images (${imageCount}/10)`}
          </Button>
        </label>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Upload Videos</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload up to 2 videos (Max 50MB each)
        </p>
        
        <input
          type="file"
          accept="video/mp4,video/quicktime"
          multiple
          onChange={(e) => handleFileUpload(e, 'video')}
          disabled={uploading || videoCount >= 2}
          className="hidden"
          id="video-upload"
        />
        <label htmlFor="video-upload">
          <Button
            as="span"
            disabled={uploading || videoCount >= 2}
            variant="outline"
          >
            {uploading ? 'Uploading...' : `Choose Videos (${videoCount}/2)`}
          </Button>
        </label>
      </div>

      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {uploadedFiles.map((file) => (
            <div key={file.s3Key} className="relative group">
              {file.fileType.startsWith('image') ? (
                <img
                  src={file.s3Url}
                  alt={file.fileName}
                  className="w-full h-32 object-cover rounded-lg"
                />
              ) : (
                <video
                  src={file.s3Url}
                  className="w-full h-32 object-cover rounded-lg"
                />
              )}
              <button
                onClick={() => removeUploadedFile(file.s3Key)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## Responsive Design

### Breakpoints (Tailwind)

```javascript
// tailwind.config.js

module.exports = {
  theme: {
    screens: {
      'sm': '640px',   // Mobile landscape
      'md': '768px',   // Tablet
      'lg': '1024px',  // Desktop
      'xl': '1280px',  // Large desktop
      '2xl': '1536px', // Extra large
    },
  },
};
```

### Mobile-First Approach

- Stack bathroom type cards vertically on mobile
- Floating price box becomes bottom sheet on mobile
- Collapsible categories for better mobile UX
- Touch-friendly toggle switches and buttons

---

## Performance Optimization

### Code Splitting

```typescript
// Dynamic imports for heavy components
const AdminDashboard = dynamic(() => import('@/components/admin/Dashboard'), {
  loading: () => <Loader />,
  ssr: false,
});
```

### Image Optimization

```typescript
import Image from 'next/image';

<Image
  src="/images/four-piece.jpg"
  alt="Four Piece Bathroom"
  width={400}
  height={300}
  priority
/>
```

### Caching Strategy

- Static pages: ISR with 1 hour revalidation
- API responses: React Query with 5-minute cache
- Images: CDN caching with 1-year TTL

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Status:** Frontend Architecture Specification
