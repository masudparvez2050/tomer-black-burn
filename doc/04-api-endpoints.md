# API Endpoints Documentation

## Base URL

```
Development: http://localhost:3001/api
Production: https://api.bburnbuilders.com/api
```

## Authentication

Admin endpoints require JWT authentication:

```http
Authorization: Bearer <access_token>
```

---

## API Endpoints Overview

| Category | Endpoint | Method | Auth Required |
|----------|----------|--------|---------------|
| **Bathroom Types** | `/bathroom-types` | GET | No |
| | `/bathroom-types/:code` | GET | No |
| | `/bathroom-types` | POST | Yes (Admin) |
| | `/bathroom-types/:id` | PATCH | Yes (Admin) |
| | `/bathroom-types/:id` | DELETE | Yes (Admin) |
| **Cost Codes** | `/cost-codes` | GET | No |
| | `/cost-codes/:code` | GET | No |
| | `/cost-codes/bathroom/:code` | GET | No |
| | `/cost-codes` | POST | Yes (Admin) |
| | `/cost-codes/:id` | PATCH | Yes (Admin) |
| | `/cost-codes/:id` | DELETE | Yes (Admin) |
| **Submissions** | `/submissions` | POST | No |
| | `/submissions` | GET | Yes (Admin) |
| | `/submissions/:id` | GET | Yes (Admin) |
| | `/submissions/:id/export` | GET | Yes (Admin) |
| **File Upload** | `/upload/image` | POST | No |
| | `/upload/video` | POST | No |
| **Auth** | `/auth/login` | POST | No |
| | `/auth/refresh` | POST | No |
| | `/auth/logout` | POST | Yes |
| **Admin** | `/admin/users` | GET | Yes (Super Admin) |
| | `/admin/users` | POST | Yes (Super Admin) |
| | `/admin/audit-logs` | GET | Yes (Admin) |

---

## Detailed Endpoint Specifications

### 1. Bathroom Types

#### GET /bathroom-types

Get all active bathroom types.

**Request:**
```http
GET /api/bathroom-types
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "code": "FP",
      "name": "Four Piece",
      "description": "Toilet + Sink + Shower + Tub",
      "basePrice": 15000.00,
      "imageUrl": "https://cdn.example.com/four-piece.jpg",
      "displayOrder": 1
    },
    {
      "id": "uuid-2",
      "code": "TPS",
      "name": "Three Piece - Shower",
      "description": "Toilet + Sink + Shower",
      "basePrice": 13000.00,
      "imageUrl": "https://cdn.example.com/three-piece-shower.jpg",
      "displayOrder": 2
    }
  ]
}
```

---

#### GET /bathroom-types/:code

Get specific bathroom type with all categories and cost codes.

**Request:**
```http
GET /api/bathroom-types/FP
```

**Query Parameters:**
- `includeInactive` (optional): Include inactive cost codes (default: false)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "code": "FP",
    "name": "Four Piece",
    "description": "Toilet + Sink + Shower + Tub",
    "basePrice": 15000.00,
    "imageUrl": "https://cdn.example.com/four-piece.jpg",
    "categories": [
      {
        "id": "uuid-cat-1",
        "name": "Demolition",
        "description": "Removal of existing fixtures",
        "displayOrder": 1,
        "costCodes": [
          {
            "id": "uuid-cc-1",
            "code": "FP-001",
            "title": "Remove existing fixtures",
            "description": "Uninstall and remove all fixtures",
            "quantity": 1,
            "unit": "each",
            "unitCost": 500.00,
            "clientPrice": 500.00,
            "questionType": "WHITE",
            "displayOrder": 1
          }
        ]
      }
    ]
  }
}
```

---

#### POST /bathroom-types (Admin Only)

Create new bathroom type.

**Request:**
```http
POST /api/bathroom-types
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "FP",
  "name": "Four Piece",
  "description": "Toilet + Sink + Shower + Tub",
  "basePrice": 15000.00,
  "imageUrl": "https://cdn.example.com/four-piece.jpg",
  "displayOrder": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "code": "FP",
    "name": "Four Piece",
    "basePrice": 15000.00,
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
```

---

### 2. Cost Codes

#### GET /cost-codes/bathroom/:code

Get all cost codes for a specific bathroom type.

**Request:**
```http
GET /api/cost-codes/bathroom/FP
```

**Response:**
```json
{
  "success": true,
  "data": {
    "bathroomType": {
      "code": "FP",
      "name": "Four Piece",
      "basePrice": 15000.00
    },
    "categories": [
      {
        "id": "uuid-cat-1",
        "name": "Demolition",
        "costCodes": [
          {
            "id": "uuid-cc-1",
            "code": "FP-001",
            "title": "Remove existing fixtures",
            "description": "Full description...",
            "unitCost": 500.00,
            "questionType": "WHITE"
          }
        ]
      }
    ]
  }
}
```

---

#### PATCH /cost-codes/:id (Admin Only)

Update cost code pricing or details.

**Request:**
```http
PATCH /api/cost-codes/uuid-cc-1
Authorization: Bearer <token>
Content-Type: application/json

{
  "unitCost": 550.00,
  "clientPrice": 550.00,
  "description": "Updated description"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-cc-1",
    "code": "FP-001",
    "unitCost": 550.00,
    "clientPrice": 550.00,
    "updatedAt": "2025-01-15T11:00:00Z"
  }
}
```

---

### 3. Submissions

#### POST /submissions

Submit a new bathroom estimate.

**Request:**
```http
POST /api/submissions
Content-Type: application/json

{
  "bathroomTypeCode": "FP",
  "clientInfo": {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "773-555-0123",
    "address": "1234 Main St, Chicago, IL",
    "zip": "60614"
  },
  "projectNotes": "Need to start in March",
  "selectedItems": [
    {
      "costCodeId": "uuid-cc-1",
      "quantity": 1,
      "unitCost": 500.00,
      "totalCost": 500.00
    },
    {
      "costCodeId": "uuid-cc-2",
      "quantity": 50,
      "unitCost": 20.00,
      "totalCost": 1000.00,
      "userInput": {
        "squareFeet": 50
      }
    }
  ],
  "uploadedFiles": [
    {
      "fileName": "bathroom-photo-1.jpg",
      "s3Key": "uploads/uuid/photo-1.jpg",
      "s3Url": "https://s3.amazonaws.com/bucket/uploads/uuid/photo-1.jpg",
      "fileType": "image/jpeg",
      "fileSize": 2048576
    }
  ],
  "totalPrice": 17660.00
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-submission-1",
    "submissionNumber": "EST-2025-001",
    "status": "PROCESSING",
    "excelFileUrl": null,
    "pdfFileUrl": null,
    "submittedAt": "2025-01-15T10:30:00Z"
  },
  "message": "Submission received. You will receive an email with your estimate shortly."
}
```

---

#### GET /submissions (Admin Only)

Get all submissions with pagination and filters.

**Request:**
```http
GET /api/submissions?page=1&limit=20&status=COMPLETED&bathroomType=FP
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)
- `status` (optional): Filter by status (PENDING, PROCESSING, COMPLETED, FAILED)
- `bathroomType` (optional): Filter by bathroom type code
- `startDate` (optional): Filter submissions after date (ISO 8601)
- `endDate` (optional): Filter submissions before date (ISO 8601)
- `search` (optional): Search by client name or email

**Response:**
```json
{
  "success": true,
  "data": {
    "submissions": [
      {
        "id": "uuid-1",
        "submissionNumber": "EST-2025-001",
        "clientName": "John Doe",
        "clientEmail": "john@example.com",
        "bathroomType": {
          "code": "FP",
          "name": "Four Piece"
        },
        "totalPrice": 17660.00,
        "status": "COMPLETED",
        "submittedAt": "2025-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
```

---

#### GET /submissions/:id (Admin Only)

Get detailed submission information.

**Request:**
```http
GET /api/submissions/uuid-1
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "submissionNumber": "EST-2025-001",
    "bathroomType": {
      "code": "FP",
      "name": "Four Piece",
      "basePrice": 15000.00
    },
    "clientInfo": {
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "773-555-0123",
      "address": "1234 Main St, Chicago, IL",
      "zip": "60614"
    },
    "projectNotes": "Need to start in March",
    "items": [
      {
        "id": "uuid-item-1",
        "costCode": {
          "code": "FP-001",
          "title": "Remove existing fixtures",
          "category": "Demolition"
        },
        "quantity": 1,
        "unitCost": 500.00,
        "totalCost": 500.00
      }
    ],
    "files": [
      {
        "id": "uuid-file-1",
        "fileName": "bathroom-photo-1.jpg",
        "fileType": "image/jpeg",
        "fileSize": 2048576,
        "s3Url": "https://s3.amazonaws.com/bucket/uploads/uuid/photo-1.jpg",
        "uploadedAt": "2025-01-15T10:25:00Z"
      }
    ],
    "totalPrice": 17660.00,
    "status": "COMPLETED",
    "excelFileUrl": "https://s3.amazonaws.com/bucket/exports/uuid-1.xlsx",
    "pdfFileUrl": "https://s3.amazonaws.com/bucket/exports/uuid-1.pdf",
    "submittedAt": "2025-01-15T10:30:00Z"
  }
}
```

---

#### GET /submissions/:id/export (Admin Only)

Download Excel or PDF export.

**Request:**
```http
GET /api/submissions/uuid-1/export?format=excel
Authorization: Bearer <token>
```

**Query Parameters:**
- `format`: `excel` or `pdf`

**Response:**
- Content-Type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` (Excel)
- Content-Type: `application/pdf` (PDF)
- File download

---

### 4. File Upload

#### POST /upload/image

Upload image file to S3.

**Request:**
```http
POST /api/upload/image
Content-Type: multipart/form-data

file: <binary data>
```

**Validation:**
- Max size: 10MB
- Allowed types: image/jpeg, image/png, image/webp
- Max files per submission: 10

**Response:**
```json
{
  "success": true,
  "data": {
    "fileName": "bathroom-photo-1.jpg",
    "fileType": "image/jpeg",
    "fileSize": 2048576,
    "s3Key": "uploads/uuid/photo-1.jpg",
    "s3Url": "https://s3.amazonaws.com/bucket/uploads/uuid/photo-1.jpg"
  }
}
```

---

#### POST /upload/video

Upload video file to S3.

**Request:**
```http
POST /api/upload/video
Content-Type: multipart/form-data

file: <binary data>
```

**Validation:**
- Max size: 50MB
- Allowed types: video/mp4, video/quicktime
- Max files per submission: 2

**Response:**
```json
{
  "success": true,
  "data": {
    "fileName": "bathroom-video-1.mp4",
    "fileType": "video/mp4",
    "fileSize": 15728640,
    "s3Key": "uploads/uuid/video-1.mp4",
    "s3Url": "https://s3.amazonaws.com/bucket/uploads/uuid/video-1.mp4"
  }
}
```

---

### 5. Authentication

#### POST /auth/login

Admin login.

**Request:**
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@bburnbuilders.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900,
    "user": {
      "id": "uuid-admin-1",
      "email": "admin@bburnbuilders.com",
      "name": "Admin User",
      "role": "ADMIN"
    }
  }
}
```

---

#### POST /auth/refresh

Refresh access token.

**Request:**
```http
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 900
  }
}
```

---

### 6. Admin Management

#### GET /admin/audit-logs (Admin Only)

Get audit logs for tracking changes.

**Request:**
```http
GET /api/admin/audit-logs?page=1&limit=50&entityType=CostCode
Authorization: Bearer <token>
```

**Query Parameters:**
- `page` (optional): Page number
- `limit` (optional): Items per page
- `entityType` (optional): Filter by entity type
- `adminUserId` (optional): Filter by admin user
- `startDate` (optional): Filter logs after date
- `endDate` (optional): Filter logs before date

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "id": "uuid-log-1",
        "action": "UPDATE",
        "entityType": "CostCode",
        "entityId": "uuid-cc-1",
        "adminUser": {
          "name": "Admin User",
          "email": "admin@bburnbuilders.com"
        },
        "oldValue": {
          "unitCost": 500.00
        },
        "newValue": {
          "unitCost": 550.00
        },
        "ipAddress": "192.168.1.1",
        "createdAt": "2025-01-15T11:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 50,
      "total": 250,
      "totalPages": 5
    }
  }
}
```

---

## Error Responses

### Standard Error Format

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": [
      {
        "field": "clientEmail",
        "message": "Invalid email format"
      }
    ]
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Invalid request data |
| `UNAUTHORIZED` | 401 | Missing or invalid authentication |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `CONFLICT` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

---

## Rate Limiting

```
Rate Limit: 100 requests per 15 minutes per IP
Headers:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1642252800
```

---

## Webhooks (Future Enhancement)

### Submission Completed Webhook

When a submission is processed, send webhook to configured URL.

**Payload:**
```json
{
  "event": "submission.completed",
  "timestamp": "2025-01-15T10:35:00Z",
  "data": {
    "submissionId": "uuid-1",
    "submissionNumber": "EST-2025-001",
    "clientEmail": "john@example.com",
    "totalPrice": 17660.00,
    "excelFileUrl": "https://s3.amazonaws.com/bucket/exports/uuid-1.xlsx",
    "pdfFileUrl": "https://s3.amazonaws.com/bucket/exports/uuid-1.pdf"
  }
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Status:** API Specification
