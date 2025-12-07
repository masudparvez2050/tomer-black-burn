export type BathroomType = {
  id: string;
  code: 'FP' | 'TPS' | 'TPT' | 'TP';
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
};

export type QuestionType = 'WHITE' | 'BLUE' | 'GREEN' | 'ORANGE' | 'PURPLE' | 'YELLOW' | 'RED';

export type CostCode = {
  id: string;
  code: string;
  title: string;
  description: string;
  unitCost: number;
  unit: string;
  questionType: QuestionType;
  quantity?: number;
  dropdownOptions?: { label: string; value: string }[];
  minValue?: number;
  maxValue?: number;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  costCodes: CostCode[];
};

export type SelectedItem = {
  costCodeId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  userInput?: Record<string, any>;
};
