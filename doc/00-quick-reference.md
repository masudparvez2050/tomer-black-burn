# Quick Reference Guide

## 🎯 Project at a Glance

**Project Name:** Bathroom Estimator Tool  
**Client:** BBurn Builders LLC  
**Budget:** $3,000  
**Timeline:** 8-11 weeks  
**Status:** Ready for Development

---

## 📊 Key Numbers

| Metric | Value |
|--------|-------|
| Bathroom Types | 4 (TP, TPS, TPT, FP) |
| Base Prices | $4K - $15K |
| Question Types | 6 color-coded types |
| API Endpoints | 20+ endpoints |
| Database Tables | 8 core tables |
| Max Image Uploads | 10 per submission |
| Max Video Uploads | 2 per submission |
| Estimated Monthly AWS Cost | ~$170 |

---

## 🏗️ Tech Stack Summary

```
Frontend:  Next.js 14 + TypeScript + Tailwind CSS + Zustand
Backend:   NestJS + TypeScript + Prisma + PostgreSQL
Hosting:   AWS ECS (Fargate) + RDS + S3 + CloudFront
DevOps:    Docker + GitHub Actions
```

---

## 🎨 Bathroom Types

| Code | Name | Description | Base Price |
|------|------|-------------|------------|
| FP | Four Piece | Toilet + Sink + Shower + Tub | $15,000 |
| TPS | Three Piece Shower | Toilet + Sink + Shower | $13,000 |
| TPT | Three Piece Tub | Toilet + Sink + Tub | $10,000 |
| TP | Two Piece | Toilet + Sink | $4,000 |

---

## 🎨 Question Types (Color Coding)

| Color | Type | Purpose | User Action |
|-------|------|---------|-------------|
| ⚪ White | Default | Included in base price | View only |
| 🔵 Blue | Yes/No | Optional add-ons | Toggle switch |
| 🟢 Green | Numeric | Quantity input | Enter number |
| 🟠 Orange | Dropdown | Select from options | Choose from list |
| 🟣 Purple | Auto-calc | Calculated from parent | Auto-populated |
| 🟡 Yellow | Conditional | Appears after parent | Answer if shown |
| 🔴 Red | Inactive | Future features | Hidden |

---

## 📁 Project Structure

```
/bathroom-estimator
├── /frontend                 # Next.js application
│   ├── /app                 # App Router pages
│   ├── /components          # React components
│   ├── /lib                 # Utilities & hooks
│   └── /types               # TypeScript types
├── /backend                 # NestJS application
│   ├── /src
│   │   ├── /modules         # Feature modules
│   │   ├── /prisma          # Database schema
│   │   └── /common          # Shared code
│   └── /test                # Tests
├── /doc                     # Documentation (this folder)
└── docker-compose.yml       # Local development
```

---

## 🔑 Key API Endpoints

### Public Endpoints
```
GET    /api/bathroom-types              # List all types
GET    /api/bathroom-types/:code        # Get type with cost codes
POST   /api/submissions                 # Submit estimate
POST   /api/upload/image                # Upload image
POST   /api/upload/video                # Upload video
```

### Admin Endpoints (Auth Required)
```
POST   /api/auth/login                  # Admin login
GET    /api/submissions                 # List submissions
PATCH  /api/cost-codes/:id              # Update cost code
GET    /api/admin/audit-logs            # View audit logs
```

---

## 🗄️ Database Tables

1. **bathroom_types** - 4 bathroom configurations
2. **categories** - Demolition, Plumbing, Electrical, etc.
3. **cost_codes** - Individual line items with pricing
4. **submissions** - User estimate submissions
5. **submission_items** - Selected items per submission
6. **uploaded_files** - User uploaded images/videos
7. **admin_users** - Admin authentication
8. **audit_logs** - Change tracking

---

## 🔐 Environment Variables

### Frontend (.env.local)
```bash
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

### Backend (.env)
```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/db
JWT_SECRET=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=bathroom-estimator-uploads
```

---

## 🚀 Quick Start Commands

### Local Development

```bash
# Start all services
docker-compose up -d

# Frontend only
cd frontend
npm install
npm run dev

# Backend only
cd backend
npm install
npx prisma migrate dev
npm run start:dev
```

### Database

```bash
# Create migration
npx prisma migrate dev --name init

# Seed database
npx prisma db seed

# Open Prisma Studio
npx prisma studio
```

### Deployment

```bash
# Build Docker images
docker build -t frontend ./frontend
docker build -t backend ./backend

# Push to ECR (AWS)
aws ecr get-login-password | docker login --username AWS --password-stdin
docker push ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/frontend:latest
```

---

## 📋 Development Checklist

### Setup Phase
- [ ] Clone repository
- [ ] Install dependencies
- [ ] Set up environment variables
- [ ] Start Docker containers
- [ ] Run database migrations
- [ ] Seed initial data

### Development Phase
- [ ] Implement database schema
- [ ] Create API endpoints
- [ ] Build frontend components
- [ ] Integrate API with frontend
- [ ] Add authentication
- [ ] Implement file upload
- [ ] Create admin dashboard

### Testing Phase
- [ ] Unit tests (backend)
- [ ] Component tests (frontend)
- [ ] Integration tests
- [ ] E2E tests
- [ ] Manual testing

### Deployment Phase
- [ ] Set up AWS resources
- [ ] Configure CI/CD pipeline
- [ ] Deploy to staging
- [ ] Test in staging
- [ ] Deploy to production
- [ ] Set up monitoring

---

## 🐛 Common Issues & Solutions

### Issue: Database connection failed
```bash
# Check if PostgreSQL is running
docker ps | grep postgres

# Restart database
docker-compose restart postgres
```

### Issue: Port already in use
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Issue: Prisma client not generated
```bash
# Regenerate Prisma client
npx prisma generate
```

### Issue: AWS credentials not found
```bash
# Configure AWS CLI
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
```

---

## 📞 Quick Links

| Resource | Link |
|----------|------|
| Full Documentation | [README.md](./README.md) |
| Project Overview | [01-project-overview.md](./01-project-overview.md) |
| System Architecture | [02-system-architecture.md](./02-system-architecture.md) |
| Database Schema | [03-database-schema.md](./03-database-schema.md) |
| API Endpoints | [04-api-endpoints.md](./04-api-endpoints.md) |
| Frontend Guide | [05-frontend-architecture.md](./05-frontend-architecture.md) |
| UI/UX Design | [06-ui-ux-design.md](./06-ui-ux-design.md) |
| Flow Diagrams | [07-flow-diagrams.md](./07-flow-diagrams.md) |
| Deployment Guide | [08-deployment-strategy.md](./08-deployment-strategy.md) |

---

## 🎯 Development Priorities

### Week 1-2: Foundation
1. Database schema implementation
2. Basic API endpoints
3. Authentication setup

### Week 3-4: Core Features
1. Bathroom type selection
2. Question rendering system
3. Price calculation logic

### Week 5-6: User Features
1. File upload functionality
2. Preview & submission
3. Email notifications

### Week 7-8: Admin & Polish
1. Admin dashboard
2. Cost code management
3. Testing & bug fixes

---

## 💡 Pro Tips

### For Developers
- Use Prisma Studio for database inspection
- Enable hot reload for faster development
- Use React DevTools for debugging
- Test API endpoints with Postman/Insomnia

### For Designers
- Follow the color-coding system strictly
- Maintain consistent spacing (Tailwind scale)
- Test on mobile devices early
- Use placeholder images during development

### For DevOps
- Set up CloudWatch alarms early
- Use staging environment for testing
- Keep secrets in AWS Secrets Manager
- Monitor costs regularly

---

## 📊 Success Metrics

### Technical Metrics
- Page load time: < 2 seconds
- API response time: < 500ms
- Uptime: > 99.5%
- Error rate: < 1%

### Business Metrics
- Completion rate: > 70%
- Time to complete: < 10 minutes
- Mobile usage: > 40%
- Conversion rate: Track after launch

---

## 🔒 Security Checklist

- [ ] Environment variables secured
- [ ] JWT tokens properly configured
- [ ] HTTPS enabled (production)
- [ ] CORS configured correctly
- [ ] SQL injection prevention (Prisma)
- [ ] XSS protection (Helmet.js)
- [ ] Rate limiting enabled
- [ ] File upload validation
- [ ] Admin routes protected
- [ ] Secrets in AWS Secrets Manager

---

## 📝 Git Workflow

```bash
# Feature branch
git checkout -b feature/bathroom-type-selector
git add .
git commit -m "feat: add bathroom type selector component"
git push origin feature/bathroom-type-selector

# Create PR → Review → Merge to main → Auto-deploy
```

### Commit Message Convention
```
feat: new feature
fix: bug fix
docs: documentation
style: formatting
refactor: code restructuring
test: adding tests
chore: maintenance
```

---

## 🎉 Ready to Code!

Everything you need is documented. Start with the setup checklist above, and refer to detailed docs as needed.

**Happy coding! 🚀**

---

**Last Updated:** January 2025  
**Version:** 1.0
