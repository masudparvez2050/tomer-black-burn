import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SelectedItem } from '@/types';

interface EstimatorState {
  bathroomType: string | null;
  basePrice: number;
  selectedItems: SelectedItem[];
  totalPrice: number;
  clientInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    zip: string;
  } | null;
  projectNotes: string;
  
  setBathroomType: (type: string, basePrice: number) => void;
  addItem: (item: SelectedItem) => void;
  removeItem: (costCodeId: string) => void;
  updateItem: (costCodeId: string, updates: Partial<SelectedItem>) => void;
  setClientInfo: (info: EstimatorState['clientInfo']) => void;
  setProjectNotes: (notes: string) => void;
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
      
      setBathroomType: (type, basePrice) => {
        set({ bathroomType: type, basePrice, totalPrice: basePrice, selectedItems: [] });
      },
      
      addItem: (item) => {
        set((state) => ({
          selectedItems: [...state.selectedItems, item],
        }));
        get().calculateTotal();
      },
      
      removeItem: (costCodeId) => {
        set((state) => ({
          selectedItems: state.selectedItems.filter((item) => item.costCodeId !== costCodeId),
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
      
      calculateTotal: () => {
        const state = get();
        const itemsTotal = state.selectedItems.reduce((sum, item) => sum + item.totalCost, 0);
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
        });
      },
    }),
    {
      name: 'estimator-storage',
    }
  )
);
