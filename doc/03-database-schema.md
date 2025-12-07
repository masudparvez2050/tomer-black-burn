# Database Schema Design

## Overview

PostgreSQL database with Prisma ORM for type-safe database access. The schema is designed for flexibility, scalability, and easy maintenance.

---

## Entity Relationship Diagram

```
┌─────────────────────┐
│   BathroomType      │
├─────────────────────┤
│ id (PK)             │
│ code (UNIQUE)       │──┐
│ name                │  │
│ description         │  │
│ basePrice           │  │
│ imageUrl            │  │
│ isActive            │  │
│ displayOrder        │  │
│ createdAt           │  │
│ updatedAt           │  │
└─────────────────────┘  │
                         │ 1:N
                         │
┌─────────────────────┐  │
│   Category          │  │
├─────────────────────┤  │
│ id (PK)             │  │
│ bathroomTypeId (FK) │──┘
│ name                │
│ description         │──┐
│ displayOrder        │  │
│ isActive            │  │
│ createdAt           │  │
│ updatedAt           │  │
└─────────────────────┘  │
                         │ 1:N
                         │
┌─────────────────────┐  │
│   CostCode          │  │
├─────────────────────┤  │
│ id (PK)             │  │
│ categoryId (FK)     │──┘
│ code (UNIQUE)       │
│ title               │
│ description         │
│ quantity            │
│ unit                │
│ unitCost            │
│ costType            │
│ markedAs            │
│ builderCost         │
│ markUp              │
│ markUpType          │
│ clientPrice         │
│ margin              │
│ profit              │
│ questionType        │
│ isActive            │
│ displayOrder        │
│ conditionalParentId │──┐
│ dropdownOptions     │  │
│ minValue            │  │
│ maxValue            │  │
│ createdAt           │  │
│ updatedAt           │  │
└─────────────────────┘  │
         │               │
         │ N:1           │ Self-referencing
         └───────────────┘ (Conditional questions)
         
┌─────────────────────┐
│   Submission        │
├─────────────────────┤
│ id (PK)             │
│ bathroomTypeId (FK) │──┐
│ clientName          │  │
│ clientEmail         │  │
│ clientPhone         │  │
│ clientAddress       │  │
│ clientZip           │  │
│ projectNotes        │  │
│ totalPrice          │  │
│ status              │  │
│ excelFileUrl        │  │
│ pdfFileUrl          │  │
│ submittedAt         │  │
│ createdAt           │  │
│ updatedAt           │  │
└─────────────────────┘  │
         │               │
         │ 1:N           │
         │               │
┌─────────────────────┐  │
│ SubmissionItem      │  │
├─────────────────────┤  │
│ id (PK)             │  │
│ submissionId (FK)   │──┘
│ costCodeId (FK)     │──┐
│ quantity            │  │
│ unitCost            │  │
│ totalCost           │  │
│ userInput           │  │
│ createdAt           │  │
└─────────────────────┘  │
                         │ N:1
                         │
         ┌───────────────┘
         │
┌─────────────────────┐
│   CostCode          │
│   (Reference)       │
└─────────────────────┘

┌─────────────────────┐
│   UploadedFile      │
├─────────────────────┤
│ id (PK)             │
│ submissionId (FK)   │──┐
│ fileName            │  │
│ fileType            │  │
│ fileSize            │  │
│ s3Key               │  │
│ s3Url               │  │
│ uploadedAt          │  │
└─────────────────────┘  │
                         │ N:1
                         │
         ┌───────────────┘
         │
┌─────────────────────┐
│   Submission        │
│   (Reference)       │
└─────────────────────┘

┌─────────────────────┐
│   AdminUser         │
├─────────────────────┤
│ id (PK)             │
│ email (UNIQUE)      │
│ passwordHash        │
│ name                │
│ role                │
│ isActive            │
│ lastLoginAt         │
│ createdAt           │
│ updatedAt           │
└─────────────────────┘

┌─────────────────────┐
│   AuditLog          │
├─────────────────────┤
│ id (PK)             │
│ adminUserId (FK)    │
│ action              │
│ entityType          │
│ entityId            │
│ oldValue            │
│ newValue            │
│ ipAddress           │
│ createdAt           │
└─────────────────────┘
```

---

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// BATHROOM TYPES
// ============================================

model BathroomType {
  id           String     @id @default(uuid())
  code         String     @unique // TP, TPS, TPT, FP
  name         String
  description  String
  basePrice    Decimal    @db.Decimal(10, 2)
  imageUrl     String?
  isActive     Boolean    @default(true)
  displayOrder Int        @default(0)
  
  categories   Category[]
  submissions  Submission[]
  
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
  
  @@map("bathroom_types")
}

// ============================================
// CATEGORIES
// ============================================

model Category {
  id              String       @id @default(uuid())
  bathroomTypeId  String
  name            String       // Demolition, Plumbing, Electrical, etc.
  description     String?
  displayOrder    Int          @default(0)
  isActive        Boolean      @default(true)
  
  bathroomType    BathroomType @relation(fields: [bathroomTypeId], references: [id], onDelete: Cascade)
  costCodes       CostCode[]
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  @@map("categories")
  @@index([bathroomTypeId])
}

// ============================================
// COST CODES
// ============================================

model CostCode {
  id                  String       @id @default(uuid())
  categoryId          String
  code                String       @unique // FP-001, TPS-020, etc.
  title               String
  description         String       @db.Text
  
  // Pricing
  quantity            Decimal      @default(0) @db.Decimal(10, 2)
  unit                String       // sqft, each, linear ft, etc.
  unitCost            Decimal      @db.Decimal(10, 2)
  costType            String?
  markedAs            String?
  builderCost         Decimal      @db.Decimal(10, 2)
  markUp              Decimal      @default(0) @db.Decimal(10, 2)
  markUpType          String?      // percentage, fixed
  clientPrice         Decimal      @db.Decimal(10, 2)
  margin              Decimal?     @db.Decimal(10, 2)
  profit              Decimal?     @db.Decimal(10, 2)
  
  // Question Configuration
  questionType        QuestionType // white, blue, green, orange, purple, yellow, red
  isActive            Boolean      @default(true)
  displayOrder        Int          @default(0)
  
  // Conditional Logic
  conditionalParentId String?      // If this is a yellow question
  conditionalParent   CostCode?    @relation("ConditionalQuestions", fields: [conditionalParentId], references: [id])
  conditionalChildren CostCode[]   @relation("ConditionalQuestions")
  
  // Dropdown Configuration (for orange questions)
  dropdownOptions     Json?        // Array of options
  minValue            Int?
  maxValue            Int?
  
  category            Category     @relation(fields: [categoryId], references: [id], onDelete: Cascade)
  submissionItems     SubmissionItem[]
  
  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt
  
  @@map("cost_codes")
  @@index([categoryId])
  @@index([questionType])
  @@index([conditionalParentId])
}

enum QuestionType {
  WHITE   // Default scope (non-editable)
  BLUE    // Yes/No toggle
  GREEN   // Numeric input
  ORANGE  // Dropdown selection
  PURPLE  // Auto-calculated
  YELLOW  // Conditional (appears after parent)
  RED     // Inactive placeholder
}

// ============================================
// SUBMISSIONS
// ============================================

model Submission {
  id              String       @id @default(uuid())
  bathroomTypeId  String
  
  // Client Information
  clientName      String
  clientEmail     String
  clientPhone     String?
  clientAddress   String
  clientZip       String
  
  // Project Details
  projectNotes    String?      @db.Text
  totalPrice      Decimal      @db.Decimal(10, 2)
  
  // Status
  status          SubmissionStatus @default(PENDING)
  
  // Generated Files
  excelFileUrl    String?
  pdfFileUrl      String?
  
  // Timestamps
  submittedAt     DateTime     @default(now())
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  bathroomType    BathroomType @relation(fields: [bathroomTypeId], references: [id])
  items           SubmissionItem[]
  files           UploadedFile[]
  
  @@map("submissions")
  @@index([bathroomTypeId])
  @@index([clientEmail])
  @@index([status])
  @@index([submittedAt])
}

enum SubmissionStatus {
  PENDING
  PROCESSING
  COMPLETED
  FAILED
}

// ============================================
// SUBMISSION ITEMS
// ============================================

model SubmissionItem {
  id            String     @id @default(uuid())
  submissionId  String
  costCodeId    String
  
  quantity      Decimal    @db.Decimal(10, 2)
  unitCost      Decimal    @db.Decimal(10, 2)
  totalCost     Decimal    @db.Decimal(10, 2)
  userInput     Json?      // Store any additional user input
  
  submission    Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  costCode      CostCode   @relation(fields: [costCodeId], references: [id])
  
  createdAt     DateTime   @default(now())
  
  @@map("submission_items")
  @@index([submissionId])
  @@index([costCodeId])
}

// ============================================
// UPLOADED FILES
// ============================================

model UploadedFile {
  id            String     @id @default(uuid())
  submissionId  String
  
  fileName      String
  fileType      String     // image/jpeg, video/mp4, etc.
  fileSize      Int        // in bytes
  s3Key         String     // S3 object key
  s3Url         String     // Public URL
  
  submission    Submission @relation(fields: [submissionId], references: [id], onDelete: Cascade)
  
  uploadedAt    DateTime   @default(now())
  
  @@map("uploaded_files")
  @@index([submissionId])
}

// ============================================
// ADMIN USERS
// ============================================

model AdminUser {
  id            String     @id @default(uuid())
  email         String     @unique
  passwordHash  String
  name          String
  role          AdminRole  @default(ADMIN)
  isActive      Boolean    @default(true)
  
  lastLoginAt   DateTime?
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  auditLogs     AuditLog[]
  
  @@map("admin_users")
}

enum AdminRole {
  SUPER_ADMIN
  ADMIN
  VIEWER
}

// ============================================
// AUDIT LOGS
// ============================================

model AuditLog {
  id            String     @id @default(uuid())
  adminUserId   String
  
  action        String     // CREATE, UPDATE, DELETE
  entityType    String     // CostCode, BathroomType, etc.
  entityId      String
  oldValue      Json?
  newValue      Json?
  ipAddress     String?
  
  adminUser     AdminUser  @relation(fields: [adminUserId], references: [id])
  
  createdAt     DateTime   @default(now())
  
  @@map("audit_logs")
  @@index([adminUserId])
  @@index([entityType, entityId])
  @@index([createdAt])
}
```

---

## Database Indexes Strategy

### Primary Indexes (Automatic)
- All `@id` fields have automatic primary key indexes
- All `@unique` fields have automatic unique indexes

### Custom Indexes (Performance Optimization)

```sql
-- Category lookups by bathroom type
CREATE INDEX idx_categories_bathroom_type ON categories(bathroom_type_id);

-- Cost code lookups
CREATE INDEX idx_cost_codes_category ON cost_codes(category_id);
CREATE INDEX idx_cost_codes_question_type ON cost_codes(question_type);
CREATE INDEX idx_cost_codes_conditional ON cost_codes(conditional_parent_id);

-- Submission queries
CREATE INDEX idx_submissions_bathroom_type ON submissions(bathroom_type_id);
CREATE INDEX idx_submissions_email ON submissions(client_email);
CREATE INDEX idx_submissions_status ON submissions(status);
CREATE INDEX idx_submissions_date ON submissions(submitted_at);

-- Submission items
CREATE INDEX idx_submission_items_submission ON submission_items(submission_id);
CREATE INDEX idx_submission_items_cost_code ON submission_items(cost_code_id);

-- File lookups
CREATE INDEX idx_uploaded_files_submission ON uploaded_files(submission_id);

-- Audit log queries
CREATE INDEX idx_audit_logs_admin ON audit_logs(admin_user_id);
CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_date ON audit_logs(created_at);
```

---

## Sample Data Structure

### Bathroom Type Example

```json
{
  "id": "uuid-1",
  "code": "FP",
  "name": "Four Piece",
  "description": "Toilet + Sink + Shower + Tub",
  "basePrice": 15000.00,
  "imageUrl": "https://cdn.example.com/four-piece.jpg",
  "isActive": true,
  "displayOrder": 1
}
```

### Category Example

```json
{
  "id": "uuid-2",
  "bathroomTypeId": "uuid-1",
  "name": "Demolition",
  "description": "Removal of existing fixtures and materials",
  "displayOrder": 1,
  "isActive": true
}
```

### Cost Code Example (White - Default Scope)

```json
{
  "id": "uuid-3",
  "categoryId": "uuid-2",
  "code": "FP-001",
  "title": "Remove existing fixtures",
  "description": "Uninstall and set aside any agreed upon items. Remove existing toilet, shower surround, vanity/sink, bathroom floor tile, mirror(s) and all accessories.",
  "quantity": 1,
  "unit": "each",
  "unitCost": 500.00,
  "builderCost": 500.00,
  "markUp": 0,
  "clientPrice": 500.00,
  "questionType": "WHITE",
  "isActive": true,
  "displayOrder": 1
}
```

### Cost Code Example (Blue - Yes/No)

```json
{
  "id": "uuid-4",
  "categoryId": "uuid-2",
  "code": "FP-002",
  "title": "Wall tile removal",
  "description": "Remove tile from walls outside of shower area",
  "quantity": 0,
  "unit": "sqft",
  "unitCost": 20.00,
  "builderCost": 20.00,
  "clientPrice": 0,
  "questionType": "BLUE",
  "isActive": true,
  "displayOrder": 2
}
```

### Cost Code Example (Orange - Dropdown)

```json
{
  "id": "uuid-5",
  "categoryId": "uuid-3",
  "code": "FP-020",
  "title": "Install recessed cans",
  "description": "Install recessed lighting cans in ceiling",
  "quantity": 0,
  "unit": "each",
  "unitCost": 150.00,
  "builderCost": 150.00,
  "clientPrice": 0,
  "questionType": "ORANGE",
  "dropdownOptions": [
    {"label": "6 inch", "value": "6"},
    {"label": "4 inch", "value": "4"},
    {"label": "2 inch", "value": "2"}
  ],
  "minValue": 1,
  "maxValue": 6,
  "isActive": true,
  "displayOrder": 5
}
```

### Cost Code Example (Yellow - Conditional)

```json
{
  "id": "uuid-6",
  "categoryId": "uuid-4",
  "code": "FP-035",
  "title": "Install RedGuard waterproofing",
  "description": "Apply waterproofing membrane on tile installation area",
  "quantity": 0,
  "unit": "sqft",
  "unitCost": 5.00,
  "builderCost": 5.00,
  "clientPrice": 0,
  "questionType": "YELLOW",
  "conditionalParentId": "uuid-parent",
  "isActive": true,
  "displayOrder": 8
}
```

### Submission Example

```json
{
  "id": "uuid-7",
  "bathroomTypeId": "uuid-1",
  "clientName": "John Doe",
  "clientEmail": "john@example.com",
  "clientPhone": "773-555-0123",
  "clientAddress": "1234 Main St, Chicago, IL",
  "clientZip": "60614",
  "projectNotes": "Need to start in March. Prefer white subway tiles.",
  "totalPrice": 17660.00,
  "status": "COMPLETED",
  "excelFileUrl": "https://s3.amazonaws.com/bucket/submissions/uuid-7.xlsx",
  "pdfFileUrl": "https://s3.amazonaws.com/bucket/submissions/uuid-7.pdf",
  "submittedAt": "2025-01-15T10:30:00Z"
}
```

---

## Database Migrations Strategy

### Initial Migration

```bash
# Create initial schema
npx prisma migrate dev --name init

# Seed database with bathroom types and cost codes
npx prisma db seed
```

### Seed Data Script

```typescript
// prisma/seed.ts

import { PrismaClient, QuestionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create bathroom types
  const fourPiece = await prisma.bathroomType.create({
    data: {
      code: 'FP',
      name: 'Four Piece',
      description: 'Toilet + Sink + Shower + Tub',
      basePrice: 15000,
      displayOrder: 1,
    },
  });

  // Create categories
  const demolition = await prisma.category.create({
    data: {
      bathroomTypeId: fourPiece.id,
      name: 'Demolition',
      description: 'Removal of existing fixtures',
      displayOrder: 1,
    },
  });

  // Create cost codes
  await prisma.costCode.createMany({
    data: [
      {
        categoryId: demolition.id,
        code: 'FP-001',
        title: 'Remove existing fixtures',
        description: 'Uninstall and remove all existing bathroom fixtures',
        quantity: 1,
        unit: 'each',
        unitCost: 500,
        builderCost: 500,
        clientPrice: 500,
        questionType: QuestionType.WHITE,
        displayOrder: 1,
      },
      // ... more cost codes
    ],
  });

  console.log('Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

---

## Query Optimization Examples

### Fetch Bathroom Type with All Cost Codes

```typescript
const bathroomTypeWithCostCodes = await prisma.bathroomType.findUnique({
  where: { code: 'FP' },
  include: {
    categories: {
      where: { isActive: true },
      orderBy: { displayOrder: 'asc' },
      include: {
        costCodes: {
          where: { isActive: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
    },
  },
});
```

### Create Submission with Items

```typescript
const submission = await prisma.submission.create({
  data: {
    bathroomTypeId: 'uuid-1',
    clientName: 'John Doe',
    clientEmail: 'john@example.com',
    clientAddress: '1234 Main St',
    clientZip: '60614',
    totalPrice: 17660,
    items: {
      create: [
        {
          costCodeId: 'uuid-3',
          quantity: 1,
          unitCost: 500,
          totalCost: 500,
        },
        // ... more items
      ],
    },
  },
  include: {
    items: true,
  },
});
```

### Get Recent Submissions with Pagination

```typescript
const submissions = await prisma.submission.findMany({
  where: {
    status: 'COMPLETED',
  },
  include: {
    bathroomType: true,
    items: {
      include: {
        costCode: true,
      },
    },
  },
  orderBy: {
    submittedAt: 'desc',
  },
  skip: (page - 1) * pageSize,
  take: pageSize,
});
```

---

## Backup & Maintenance

### Automated Backups (AWS RDS)

```yaml
Backup Configuration:
  - Automated daily snapshots at 3:00 AM UTC
  - Retention period: 30 days
  - Point-in-time recovery: Enabled
  - Cross-region backup: us-east-1 → us-west-2
```

### Database Maintenance Tasks

```sql
-- Weekly vacuum (automated by RDS)
VACUUM ANALYZE;

-- Monthly index rebuild
REINDEX DATABASE bathroom_estimator;

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Status:** Database Design Specification
