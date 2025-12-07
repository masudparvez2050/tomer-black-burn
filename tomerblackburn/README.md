# Bathroom Estimator - BBurn Builders

A professional, interactive bathroom remodeling cost estimator with admin dashboard built with Next.js 14 and Tailwind CSS.

## 🚀 Features

### Client-Facing Features
- **4 Bathroom Types**: Four Piece, Three Piece (Shower/Tub), Two Piece
- **Interactive Questionnaire**: Color-coded question types (White, Blue, Green, Orange)
- **Real-time Price Calculator**: Floating price box with live updates
- **Responsive Design**: Fully responsive across all devices
- **State Management**: Zustand for persistent state
- **Professional UI**: Clean, modern design with BBurn Builders branding

### Admin Dashboard Features
- **Dashboard Overview**: Stats, recent submissions, activity log
- **Cost Code Management**: Add, edit, delete, and filter cost codes
- **Submissions Management**: View, filter, and export all submissions
- **Settings**: Company information and notification preferences
- **Secure Login**: Admin authentication system

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Icons**: Heroicons (SVG)

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Development Server

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Home page
│   ├── estimator/               # Client estimator
│   │   ├── page.tsx            # Bathroom type selection
│   │   ├── [type]/             # Dynamic question page
│   │   ├── preview/            # Preview & submission
│   │   └── confirmation/       # Success page
│   ├── admin/                   # Admin dashboard
│   │   ├── layout.tsx          # Admin layout with sidebar
│   │   ├── login/              # Admin login
│   │   ├── dashboard/          # Dashboard overview
│   │   ├── cost-codes/         # Cost code management
│   │   ├── submissions/        # Submissions management
│   │   └── settings/           # Settings page
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── shared/                 # Reusable components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Button.tsx
│   ├── estimator/              # Estimator-specific
│   │   ├── PriceCalculator.tsx
│   │   └── QuestionCard.tsx
│   └── admin/                  # Admin-specific
│       ├── Sidebar.tsx
│       └── StatsCard.tsx
├── lib/
│   ├── store.ts                # Zustand store
│   ├── mockData.ts             # Mock data
│   └── utils.ts                # Utilities
└── types/
    └── index.ts                # TypeScript types
```

## 🎨 Pages

### Client Pages

#### 1. Home Page (`/`)
- Hero section with CTA
- How it works (3 steps)
- Bathroom types preview
- Features section

#### 2. Bathroom Type Selection (`/estimator`)
- 4 interactive cards
- Base price display
- Selection with visual feedback

#### 3. Questionnaire (`/estimator/[type]`)
- Category-based questions
- Color-coded question types
- Floating price calculator
- Real-time price updates

#### 4. Preview & Submission (`/estimator/preview`)
- Estimate summary
- Project notes (optional)
- Client information form

#### 5. Confirmation (`/estimator/confirmation`)
- Success message
- Estimate number
- Next steps

### Admin Pages

#### 1. Login (`/admin/login`)
- Secure admin authentication
- Remember me option
- Demo credentials provided

#### 2. Dashboard (`/admin/dashboard`)
- Key statistics (4 stat cards)
- Recent submissions table
- Quick actions panel
- Activity log

#### 3. Cost Codes (`/admin/cost-codes`)
- Searchable cost code table
- Filter by question type
- Add/Edit/Delete functionality
- Pagination

#### 4. Submissions (`/admin/submissions`)
- All submissions overview
- Status statistics
- Search and filter
- Export functionality

#### 5. Settings (`/admin/settings`)
- Company information
- Notification preferences
- Danger zone (data management)

## 🎯 Question Types

| Color | Type | Purpose | User Action |
|-------|------|---------|-------------|
| White | Default | Included in base | View only |
| Blue | Yes/No | Optional add-ons | Toggle |
| Green | Numeric | Quantity input | Enter number |
| Orange | Dropdown | Select options | Choose from list |

## 💾 State Management

Uses Zustand with localStorage persistence:

```typescript
{
  bathroomType: string | null;
  basePrice: number;
  selectedItems: SelectedItem[];
  totalPrice: number;
  clientInfo: ClientInfo | null;
  projectNotes: string;
}
```

## 🎨 Design System

### Colors
- Primary Blue: `#2563EB`
- Gray Scale: `#111827` to `#F3F4F6`
- Question Colors: Blue, Green, Orange backgrounds
- Admin Dark: `#111827` (sidebar)

### Typography
- Font: Inter (Google Fonts)
- Sizes: 12px to 60px
- Weights: 400, 500, 600, 700

### Spacing
- Consistent 4px scale (Tailwind default)
- Container: max-w-7xl

## 📱 Responsive Design

- **Mobile**: < 768px (stacked layout)
- **Tablet**: 768px - 1024px (2-column)
- **Desktop**: > 1024px (full layout)

## 🔐 Admin Access

**Demo Credentials:**
- Email: `admin@bburnbuilders.com`
- Password: `password`

**Admin Routes:**
- `/admin/login` - Login page
- `/admin/dashboard` - Main dashboard
- `/admin/cost-codes` - Manage cost codes
- `/admin/submissions` - View submissions
- `/admin/settings` - Application settings

## 🔧 Configuration

### Next.js Config
- Image optimization for Unsplash
- TypeScript strict mode
- Tailwind CSS integration

### Environment Variables
No environment variables required for demo.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm start
```

## 📝 Mock Data

Located in `src/lib/mockData.ts`:
- 4 bathroom types with images
- 4 categories (Demolition, Plumbing, Electrical, Tile)
- 8 cost codes with different question types
- 6 sample submissions

## 🎯 Features Implemented

### Client Features ✅
- [x] Home page with hero and features
- [x] Bathroom type selection
- [x] Interactive questionnaire
- [x] Real-time price calculator
- [x] Preview and submission form
- [x] Confirmation page
- [x] Responsive design
- [x] State persistence

### Admin Features ✅
- [x] Admin login page
- [x] Dashboard with stats
- [x] Cost code management
- [x] Submissions management
- [x] Settings page
- [x] Sidebar navigation
- [x] Search and filters
- [x] Responsive admin panel

## 🎯 Next Steps (Backend Integration)

1. **Authentication**: Implement JWT-based auth
2. **API Integration**: Connect to NestJS backend
3. **Database**: PostgreSQL + Prisma setup
4. **File Upload**: AWS S3 integration
5. **PDF Generation**: Puppeteer implementation
6. **Email**: AWS SES integration
7. **Real-time Updates**: WebSocket for live data

## 📊 Project Stats

- **Total Pages**: 10 pages (5 client + 5 admin)
- **Components**: 10+ reusable components
- **Lines of Code**: ~2,500+ lines
- **Fully Responsive**: ✅
- **Production Ready**: ✅ (for demo)

## 📄 License

© 2025 BBurn Builders LLC. All rights reserved.

## 👨💻 Developer

Built with ❤️ for BBurn Builders

---

**Status**: ✅ Full Prototype Ready (Client + Admin)
**Version**: 1.0.0
**Last Updated**: January 2025
