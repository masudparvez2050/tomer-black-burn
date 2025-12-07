# UI/UX Design Specification

## Design Philosophy

**Goal:** Create an intuitive, transparent, and engaging estimation experience that builds trust and encourages completion.

### Core Principles

1. **Clarity**: Every option clearly explained with pricing transparency
2. **Simplicity**: Minimal cognitive load, one decision at a time
3. **Trust**: Professional design reflecting BBurn Builders brand
4. **Responsiveness**: Seamless experience across all devices
5. **Feedback**: Immediate visual feedback for all interactions

---

## Brand Guidelines

### Colors

```css
/* Primary Colors */
--primary-blue: #2563EB;      /* Main CTA, links */
--primary-dark: #1E40AF;      /* Hover states */
--primary-light: #DBEAFE;     /* Backgrounds */

/* Secondary Colors */
--gray-900: #111827;          /* Headings */
--gray-700: #374151;          /* Body text */
--gray-500: #6B7280;          /* Secondary text */
--gray-300: #D1D5DB;          /* Borders */
--gray-100: #F3F4F6;          /* Backgrounds */

/* Question Type Colors */
--white-bg: #FFFFFF;          /* Default scope */
--blue-bg: #DBEAFE;           /* Yes/No questions */
--green-bg: #D1FAE5;          /* Numeric input */
--orange-bg: #FED7AA;         /* Dropdown */
--purple-bg: #E9D5FF;         /* Auto-calculated */
--yellow-bg: #FEF3C7;         /* Conditional */

/* Status Colors */
--success: #10B981;           /* Success messages */
--warning: #F59E0B;           /* Warnings */
--error: #EF4444;             /* Errors */
```

### Typography

```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;      /* 12px - Small labels */
--text-sm: 0.875rem;     /* 14px - Body text */
--text-base: 1rem;       /* 16px - Default */
--text-lg: 1.125rem;     /* 18px - Large text */
--text-xl: 1.25rem;      /* 20px - Section headers */
--text-2xl: 1.5rem;      /* 24px - Page headers */
--text-3xl: 1.875rem;    /* 30px - Hero text */
--text-4xl: 2.25rem;     /* 36px - Main headings */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing

```css
/* Consistent spacing scale (Tailwind default) */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

---

## Page Layouts

### 1. Home Page / Estimator Landing

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
│  [Logo]                    [Home] [About] [Contact]         │
└─────────────────────────────────────────────────────────────┘
│                                                              │
│                    HERO SECTION                              │
│                                                              │
│         Get Your Bathroom Remodel Estimate                   │
│              in Minutes, Not Days                            │
│                                                              │
│         [Start Your Free Estimate →]                         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              HOW IT WORKS (3 Steps)                          │
│                                                              │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │    1     │    │    2     │    │    3     │            │
│   │  Select  │ →  │  Answer  │ →  │   Get    │            │
│   │   Type   │    │Questions │    │ Estimate │            │
│   └──────────┘    └──────────┘    └──────────┘            │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│              BATHROOM TYPES PREVIEW                          │
│                                                              │
│   ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐     │
│   │  Four   │  │  Three  │  │  Three  │  │   Two   │     │
│   │  Piece  │  │  Piece  │  │  Piece  │  │  Piece  │     │
│   │         │  │ Shower  │  │   Tub   │  │         │     │
│   │ $15,000 │  │ $13,000 │  │ $10,000 │  │ $4,000  │     │
│   └─────────┘  └─────────┘  └─────────┘  └─────────┘     │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                         FOOTER                               │
│  © 2025 BBurn Builders | Privacy | Terms                    │
└─────────────────────────────────────────────────────────────┘
```

---

### 2. Bathroom Type Selection Page

```
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                               │
└─────────────────────────────────────────────────────────────┘
│                                                              │
│              Select Your Bathroom Type                       │
│     Choose the type of bathroom remodel you're planning      │
│                                                              │
│   ┌──────────────────┐  ┌──────────────────┐              │
│   │                  │  │                  │              │
│   │  [Image]         │  │  [Image]         │              │
│   │                  │  │                  │              │
│   │  Four Piece      │  │  Three Piece     │              │
│   │  Toilet + Sink + │  │  Toilet + Sink + │              │
│   │  Shower + Tub    │  │  Shower          │              │
│   │                  │  │                  │              │
│   │  Starting at     │  │  Starting at     │              │
│   │  $15,000         │  │  $13,000         │              │
│   │                  │  │                  │              │
│   │  [Selected ✓]    │  │  [Select]        │              │
│   └──────────────────┘  └──────────────────┘              │
│                                                              │
│   ┌──────────────────┐  ┌──────────────────┐              │
│   │  Three Piece Tub │  │  Two Piece       │              │
│   │  $10,000         │  │  $4,000          │              │
│   └──────────────────┘  └──────────────────┘              │
│                                                              │
│              [Continue to Estimate →]                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 3. Questionnaire Page (Main Estimator)

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Four Piece Bathroom Estimate        [Save] [Exit]  │
└─────────────────────────────────────────────────────────────┘
│                                                              │
│  ┌─────────────────────────────┐  ┌──────────────────────┐ │
│  │                             │  │  ESTIMATE SUMMARY    │ │
│  │  PROGRESS BAR               │  │                      │ │
│  │  ████████░░░░░░░░░░ 40%     │  │  Base Price:         │ │
│  │                             │  │  $15,000             │ │
│  └─────────────────────────────┘  │                      │ │
│                                    │  Additional Items:   │ │
│  ┌─────────────────────────────┐  │  + Item 1: $500     │ │
│  │  CATEGORY: Demolition       │  │  + Item 2: $1,000   │ │
│  │  ─────────────────────────  │  │                      │ │
│  │                             │  │  ─────────────────   │ │
│  │  [WHITE] Remove fixtures    │  │  TOTAL ESTIMATE:     │ │
│  │  Included in base price     │  │  $17,660             │ │
│  │                             │  │                      │ │
│  │  [BLUE] Wall tile removal?  │  │  * Final price may   │ │
│  │  ┌─────────────────────┐    │  │    vary based on     │ │
│  │  │ Description text... │    │  │    site conditions   │ │
│  │  │ +$20/sqft          │    │  │                      │ │
│  │  │         [No] [Yes] │    │  └──────────────────────┘ │
│  │  └─────────────────────┘    │                           │
│  │                             │                           │
│  │  [GREEN] Enter square feet  │                           │
│  │  ┌─────────────────────┐    │                           │
│  │  │ [Input: 50 sqft]   │    │                           │
│  │  │ $20/sqft           │    │                           │
│  │  │ Total: +$1,000     │    │                           │
│  │  └─────────────────────┘    │                           │
│  │                             │                           │
│  └─────────────────────────────┘                           │
│                                                              │
│  ┌─────────────────────────────┐                           │
│  │  CATEGORY: Plumbing         │                           │
│  │  ─────────────────────────  │                           │
│  │  ...                        │                           │
│  └─────────────────────────────┘                           │
│                                                              │
│              [← Back] [Continue to Preview →]               │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 4. Preview & Submission Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]  Review Your Estimate                               │
└─────────────────────────────────────────────────────────────┘
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ESTIMATE SUMMARY                                   │   │
│  │                                                      │   │
│  │  Bathroom Type: Four Piece                          │   │
│  │  Base Price: $15,000                                │   │
│  │                                                      │   │
│  │  Selected Options:                                  │   │
│  │  ✓ Wall tile removal (50 sqft) .......... $1,000   │   │
│  │  ✓ Additional outlet ..................... $150     │   │
│  │  ✓ Recessed lighting (4 cans) ............ $600     │   │
│  │  ...                                                 │   │
│  │                                                      │   │
│  │  ─────────────────────────────────────────────────  │   │
│  │  TOTAL ESTIMATE: $17,660                            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  PROJECT NOTES (Optional)                           │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │ [Textarea]                                    │  │   │
│  │  │ Add any additional details or questions...    │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  UPLOAD PHOTOS & VIDEOS                             │   │
│  │  ┌────┐ ┌────┐ ┌────┐ ┌────┐                       │   │
│  │  │img │ │img │ │vid │ │ +  │                       │   │
│  │  └────┘ └────┘ └────┘ └────┘                       │   │
│  │  [Choose Files] (3/10 images, 1/2 videos)          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  YOUR INFORMATION                                   │   │
│  │  ┌─────────────────────────────────────────────┐   │   │
│  │  │ Name: [Input]                               │   │   │
│  │  │ Email: [Input]                              │   │   │
│  │  │ Phone: [Input]                              │   │   │
│  │  │ Address: [Input]                            │   │   │
│  │  │ Zip Code: [Input]                           │   │   │
│  │  └─────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  ☐ I agree to receive my estimate via email        │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
│         [← Back to Edit] [Submit Estimate →]                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

### 5. Confirmation Page

```
┌─────────────────────────────────────────────────────────────┐
│  [Logo]                                                      │
└─────────────────────────────────────────────────────────────┘
│                                                              │
│                    ┌──────────┐                             │
│                    │    ✓     │                             │
│                    └──────────┘                             │
│                                                              │
│              Thank You for Your Submission!                  │
│                                                              │
│     Your bathroom estimate has been received.                │
│     We'll send a detailed proposal to your email shortly.    │
│                                                              │
│     Estimate Number: EST-2025-001                            │
│     Total: $17,660                                           │
│                                                              │
│     ┌─────────────────────────────────────────────┐         │
│     │  What happens next?                         │         │
│     │                                              │         │
│     │  1. You'll receive an email confirmation    │         │
│     │  2. We'll review your estimate (1-2 hours)  │         │
│     │  3. You'll get a detailed PDF proposal      │         │
│     │  4. We'll contact you to discuss next steps │         │
│     └─────────────────────────────────────────────┘         │
│                                                              │
│              [Download PDF] [Start New Estimate]             │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Design Specifications

### 1. Bathroom Type Card

**Desktop (280px × 400px):**
```
┌──────────────────────────┐
│                          │
│      [Image 280×200]     │
│                          │
├──────────────────────────┤
│  Four Piece              │
│  Toilet + Sink +         │
│  Shower + Tub            │
│                          │
│  Starting at             │
│  $15,000                 │
│                          │
│  [Select This Type]      │
└──────────────────────────┘
```

**States:**
- Default: White background, gray border
- Hover: Shadow elevation, blue border
- Selected: Blue border (2px), checkmark icon

---

### 2. Question Card (Blue - Yes/No)

```
┌────────────────────────────────────────────────┐
│  Wall tile removal?                      [Toggle]│
│                                                  │
│  Remove tile from walls outside of shower area  │
│                                                  │
│  +$20 per square foot                           │
└────────────────────────────────────────────────┘
```

**Background:** Light blue (#DBEAFE)  
**Border:** Blue (#93C5FD)  
**Toggle:** iOS-style switch (off: gray, on: blue)

---

### 3. Question Card (Green - Numeric Input)

```
┌────────────────────────────────────────────────┐
│  Enter square feet of tile                     │
│                                                  │
│  Specify the area to be tiled                   │
│                                                  │
│  ┌──────────┐  $25/sqft    Total: +$1,250      │
│  │ 50 sqft  │                                   │
│  └──────────┘                                   │
└────────────────────────────────────────────────┘
```

**Background:** Light green (#D1FAE5)  
**Border:** Green (#86EFAC)  
**Input:** White background, green border on focus

---

### 4. Question Card (Orange - Dropdown)

```
┌────────────────────────────────────────────────┐
│  Select recessed can size                      │
│                                                  │
│  Choose the size of recessed lighting          │
│                                                  │
│  ┌──────────────────┐  ┌──────────────┐        │
│  │ 6 inch        ▼  │  │ Quantity: 4▼ │        │
│  └──────────────────┘  └──────────────┘        │
│                                                  │
│  $150 each                    Total: +$600      │
└────────────────────────────────────────────────┘
```

**Background:** Light orange (#FED7AA)  
**Border:** Orange (#FDBA74)  
**Dropdown:** White background, custom arrow icon

---

### 5. Floating Price Calculator

**Desktop (320px width, sticky):**
```
┌──────────────────────────┐
│  Estimate Summary        │
├──────────────────────────┤
│  Base Price:             │
│  $15,000                 │
│                          │
│  Additional Items:       │
│  + Item 1: $500          │
│  + Item 2: $1,000        │
│  + Item 3: $150          │
│  ─────────────────────   │
│  Additions: +$1,650      │
│                          │
│  ═════════════════════   │
│  TOTAL ESTIMATE:         │
│  $16,650                 │
│                          │
│  * Final price may vary  │
└──────────────────────────┘
```

**Mobile (Full width, bottom sheet):**
- Collapses to bottom bar showing only total
- Expands on tap to show full breakdown
- Sticky at bottom of screen

---

## Interaction Patterns

### 1. Question Answering Flow

```
User Action → Visual Feedback → Price Update → Scroll to Next

Example:
1. User toggles "Wall tile removal" to YES
2. Card highlights with green checkmark
3. Price calculator animates: +$1,000
4. Conditional question appears below (if any)
5. Auto-scroll to next unanswered question
```

### 2. Form Validation

**Real-time validation:**
- Email: Check format on blur
- Phone: Format as user types
- Zip: Validate length and format
- Required fields: Show error on submit

**Error Display:**
```
┌──────────────────────────┐
│  Email *                 │
│  ┌────────────────────┐  │
│  │ invalid@          │  │ ← Red border
│  └────────────────────┘  │
│  ⚠ Please enter a valid  │ ← Red text
│     email address         │
└──────────────────────────┘
```

### 3. File Upload

**Drag & Drop Zone:**
```
┌────────────────────────────────────┐
│                                    │
│         📁                         │
│                                    │
│    Drag & drop images here         │
│    or click to browse              │
│                                    │
│    Max 10MB per file               │
│                                    │
└────────────────────────────────────┘
```

**Upload Progress:**
```
┌────────────────────────────────────┐
│  bathroom-photo-1.jpg              │
│  ████████████░░░░░░░░ 65%          │
└────────────────────────────────────┘
```

---

## Responsive Breakpoints

### Mobile (< 768px)

- Single column layout
- Stacked bathroom type cards
- Bottom sheet price calculator
- Collapsible category sections
- Full-width form inputs
- Touch-friendly buttons (min 44px height)

### Tablet (768px - 1024px)

- Two-column bathroom type cards
- Sidebar price calculator
- Expanded category sections
- Optimized form layout

### Desktop (> 1024px)

- Four-column bathroom type cards
- Sticky sidebar price calculator
- Full category expansion
- Multi-column forms

---

## Accessibility (WCAG 2.1 AA)

### Color Contrast

- Text on white: Minimum 4.5:1 ratio
- Large text (18px+): Minimum 3:1 ratio
- Interactive elements: Clear focus states

### Keyboard Navigation

- Tab order follows visual flow
- All interactive elements keyboard accessible
- Skip navigation links
- Focus indicators visible

### Screen Readers

- Semantic HTML (headings, landmarks)
- ARIA labels for custom components
- Alt text for all images
- Form labels properly associated

### Focus Management

```css
/* Focus styles */
*:focus {
  outline: 2px solid #2563EB;
  outline-offset: 2px;
}

button:focus-visible {
  ring: 2px solid #2563EB;
  ring-offset: 2px;
}
```

---

## Animation & Transitions

### Micro-interactions

```css
/* Button hover */
button {
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Price update animation */
.price-update {
  animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Card selection */
.card-selected {
  animation: selectBounce 0.4s ease-out;
}

@keyframes selectBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.02); }
  100% { transform: scale(1); }
}
```

### Page Transitions

- Fade in: 300ms
- Slide up: 400ms
- Modal open: 200ms with backdrop fade

---

## Loading States

### Skeleton Screens

```
┌──────────────────────────┐
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │  ← Animated shimmer
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
└──────────────────────────┘
```

### Spinner

- Primary: Blue spinning circle
- Size: 24px (small), 48px (large)
- Position: Centered in container

---

## Error States

### Empty State

```
┌────────────────────────────────────┐
│                                    │
│         📋                         │
│                                    │
│    No submissions yet              │
│    Start your first estimate       │
│                                    │
│    [Create Estimate]               │
│                                    │
└────────────────────────────────────┘
```

### Error Message

```
┌────────────────────────────────────┐
│  ⚠ Something went wrong            │
│                                    │
│  We couldn't load your estimate.   │
│  Please try again.                 │
│                                    │
│  [Retry] [Contact Support]         │
└────────────────────────────────────┘
```

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Status:** UI/UX Design Specification
