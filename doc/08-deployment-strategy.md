# Deployment Strategy & DevOps

## Overview

Complete AWS-based deployment with Docker containerization, CI/CD pipeline, and infrastructure as code.

---

## Infrastructure Architecture (AWS)

```
┌─────────────────────────────────────────────────────────────┐
│                         AWS CLOUD                            │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    Route 53 (DNS)                      │ │
│  │  - bburnbuilders.com                                   │ │
│  │  - api.bburnbuilders.com                               │ │
│  └────────────────────┬───────────────────────────────────┘ │
│                       │                                      │
│  ┌────────────────────▼───────────────────────────────────┐ │
│  │              CloudFront (CDN)                          │ │
│  │  - Static assets caching                               │ │
│  │  - SSL/TLS termination                                 │ │
│  │  - DDoS protection                                     │ │
│  └────────────────────┬───────────────────────────────────┘ │
│                       │                                      │
│  ┌────────────────────▼───────────────────────────────────┐ │
│  │        Application Load Balancer (ALB)                 │ │
│  │  - Health checks                                       │ │
│  │  - SSL termination                                     │ │
│  │  - Path-based routing                                  │ │
│  └────────────────────┬───────────────────────────────────┘ │
│                       │                                      │
│         ┌─────────────┴─────────────┐                       │
│         │                           │                       │
│  ┌──────▼──────┐             ┌──────▼──────┐               │
│  │   ECS       │             │   ECS       │               │
│  │  Cluster    │             │  Cluster    │               │
│  │             │             │             │               │
│  │ ┌─────────┐ │             │ ┌─────────┐ │               │
│  │ │ Next.js │ │             │ │ NestJS  │ │               │
│  │ │Container│ │             │ │Container│ │               │
│  │ │ (x2)    │ │             │ │ (x2)    │ │               │
│  │ └─────────┘ │             │ └─────────┘ │               │
│  └─────────────┘             └──────┬──────┘               │
│                                     │                       │
│                       ┌─────────────┴─────────────┐         │
│                       │                           │         │
│                ┌──────▼──────┐           ┌────────▼──────┐  │
│                │   RDS       │           │  ElastiCache  │  │
│                │ PostgreSQL  │           │    Redis      │  │
│                │  (Primary)  │           │               │  │
│                └──────┬──────┘           └───────────────┘  │
│                       │                                      │
│                ┌──────▼──────┐                              │
│                │   RDS       │                              │
│                │ PostgreSQL  │                              │
│                │(Read Replica)│                             │
│                └─────────────┘                              │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    S3 Buckets                          │ │
│  │  - Static assets (images, CSS, JS)                     │ │
│  │  - User uploads (photos, videos)                       │ │
│  │  - Generated files (Excel, PDF)                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                    SES (Email)                         │ │
│  │  - Transactional emails                                │ │
│  │  - Submission notifications                            │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │              CloudWatch (Monitoring)                   │ │
│  │  - Logs aggregation                                    │ │
│  │  - Metrics & alarms                                    │ │
│  │  - Performance monitoring                              │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Docker Configuration

### Frontend Dockerfile (Next.js)

```dockerfile
# /frontend/Dockerfile

# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Backend Dockerfile (NestJS)

```dockerfile
# /backend/Dockerfile

# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Builder
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
COPY prisma ./prisma/

RUN npx prisma generate
RUN npm run build

# Stage 3: Runner
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nestjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package.json ./

USER nestjs

EXPOSE 3001

CMD ["node", "dist/main"]
```

### Docker Compose (Local Development)

```yaml
# docker-compose.yml

version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: bathroom-estimator-db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: bathroom_estimator
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  # Redis Cache
  redis:
    image: redis:7-alpine
    container_name: bathroom-estimator-redis
    ports:
      - "6379:6379"
    networks:
      - app-network

  # Backend (NestJS)
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: bathroom-estimator-backend
    environment:
      DATABASE_URL: postgresql://postgres:postgres@postgres:5432/bathroom_estimator
      REDIS_URL: redis://redis:6379
      JWT_SECRET: your-jwt-secret
      AWS_REGION: us-east-1
      AWS_S3_BUCKET: bathroom-estimator-uploads
    ports:
      - "3001:3001"
    depends_on:
      - postgres
      - redis
    networks:
      - app-network
    volumes:
      - ./backend:/app
      - /app/node_modules

  # Frontend (Next.js)
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: bathroom-estimator-frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3001/api
    ports:
      - "3000:3000"
    depends_on:
      - backend
    networks:
      - app-network
    volumes:
      - ./frontend:/app
      - /app/node_modules
      - /app/.next

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge
```

---

## CI/CD Pipeline (GitHub Actions)

### Workflow Configuration

```yaml
# .github/workflows/deploy.yml

name: Deploy to AWS

on:
  push:
    branches:
      - main
      - staging
  pull_request:
    branches:
      - main

env:
  AWS_REGION: us-east-1
  ECR_REPOSITORY_FRONTEND: bathroom-estimator-frontend
  ECR_REPOSITORY_BACKEND: bathroom-estimator-backend
  ECS_SERVICE_FRONTEND: bathroom-estimator-frontend-service
  ECS_SERVICE_BACKEND: bathroom-estimator-backend-service
  ECS_CLUSTER: bathroom-estimator-cluster

jobs:
  test:
    name: Run Tests
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies (Backend)
        working-directory: ./backend
        run: npm ci

      - name: Run backend tests
        working-directory: ./backend
        run: npm test

      - name: Install dependencies (Frontend)
        working-directory: ./frontend
        run: npm ci

      - name: Run frontend tests
        working-directory: ./frontend
        run: npm test

  build-and-deploy:
    name: Build and Deploy
    runs-on: ubuntu-latest
    needs: test
    if: github.ref == 'refs/heads/main'
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v2
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: ${{ env.AWS_REGION }}

      - name: Login to Amazon ECR
        id: login-ecr
        uses: aws-actions/amazon-ecr-login@v1

      - name: Build, tag, and push backend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd backend
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY_BACKEND:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_BACKEND:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY_BACKEND:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY_BACKEND:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_BACKEND:latest

      - name: Build, tag, and push frontend image
        env:
          ECR_REGISTRY: ${{ steps.login-ecr.outputs.registry }}
          IMAGE_TAG: ${{ github.sha }}
        run: |
          cd frontend
          docker build -t $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:$IMAGE_TAG .
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:$IMAGE_TAG
          docker tag $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:$IMAGE_TAG $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:latest
          docker push $ECR_REGISTRY/$ECR_REPOSITORY_FRONTEND:latest

      - name: Deploy backend to ECS
        run: |
          aws ecs update-service \
            --cluster $ECS_CLUSTER \
            --service $ECS_SERVICE_BACKEND \
            --force-new-deployment

      - name: Deploy frontend to ECS
        run: |
          aws ecs update-service \
            --cluster $ECS_CLUSTER \
            --service $ECS_SERVICE_FRONTEND \
            --force-new-deployment

      - name: Wait for deployment
        run: |
          aws ecs wait services-stable \
            --cluster $ECS_CLUSTER \
            --services $ECS_SERVICE_BACKEND $ECS_SERVICE_FRONTEND

      - name: Notify deployment success
        if: success()
        run: echo "Deployment successful!"

      - name: Notify deployment failure
        if: failure()
        run: echo "Deployment failed!"
```

---

## Environment Variables

### Frontend (.env.production)

```bash
# API Configuration
NEXT_PUBLIC_API_URL=https://api.bburnbuilders.com/api

# AWS Configuration
NEXT_PUBLIC_AWS_REGION=us-east-1
NEXT_PUBLIC_S3_BUCKET=bathroom-estimator-uploads

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Backend (.env.production)

```bash
# Application
NODE_ENV=production
PORT=3001

# Database
DATABASE_URL=postgresql://username:password@rds-endpoint:5432/bathroom_estimator

# Redis
REDIS_URL=redis://elasticache-endpoint:6379

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION=15m
REFRESH_TOKEN_EXPIRATION=7d

# AWS
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_S3_BUCKET=bathroom-estimator-uploads

# Email (SES)
AWS_SES_FROM_EMAIL=noreply@bburnbuilders.com
AWS_SES_OWNER_EMAIL=tomer@bburnbuilders.com

# CORS
CORS_ORIGIN=https://bburnbuilders.com

# Rate Limiting
RATE_LIMIT_TTL=900
RATE_LIMIT_MAX=100
```

---

## AWS Resource Configuration

### ECS Task Definition (Backend)

```json
{
  "family": "bathroom-estimator-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskRole",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/bathroom-estimator-backend:latest",
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT_ID:secret:database-url"
        },
        {
          "name": "JWT_SECRET",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:ACCOUNT_ID:secret:jwt-secret"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/bathroom-estimator-backend",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3001/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ]
}
```

### RDS Configuration

```yaml
Engine: postgres
Version: 15.3
Instance Class: db.t3.micro (dev) / db.t3.small (prod)
Storage: 20 GB SSD (General Purpose)
Multi-AZ: Yes (production)
Backup Retention: 30 days
Automated Backups: Enabled
Encryption: Enabled (AES-256)
```

### S3 Bucket Policy

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::bathroom-estimator-uploads/public/*"
    },
    {
      "Sid": "AllowECSTaskRole",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::ACCOUNT_ID:role/ecsTaskRole"
      },
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject"
      ],
      "Resource": "arn:aws:s3:::bathroom-estimator-uploads/*"
    }
  ]
}
```

---

## Monitoring & Alerting

### CloudWatch Alarms

```yaml
Alarms:
  - Name: HighCPUUtilization
    Metric: CPUUtilization
    Threshold: 80%
    Period: 5 minutes
    Action: SNS notification

  - Name: HighMemoryUtilization
    Metric: MemoryUtilization
    Threshold: 85%
    Period: 5 minutes
    Action: SNS notification

  - Name: HighErrorRate
    Metric: 5XXError
    Threshold: 10 errors
    Period: 5 minutes
    Action: SNS notification + Auto-scale

  - Name: DatabaseConnectionErrors
    Metric: DatabaseConnections
    Threshold: 90% of max
    Period: 5 minutes
    Action: SNS notification

  - Name: SlowResponseTime
    Metric: TargetResponseTime
    Threshold: 2 seconds
    Period: 5 minutes
    Action: SNS notification
```

### Log Groups

```
/ecs/bathroom-estimator-frontend
/ecs/bathroom-estimator-backend
/rds/bathroom-estimator-db
/lambda/excel-generator
/lambda/pdf-generator
```

---

## Backup Strategy

### Database Backups

```yaml
Automated Backups:
  - Frequency: Daily at 3:00 AM UTC
  - Retention: 30 days
  - Point-in-time recovery: Enabled

Manual Snapshots:
  - Before major deployments
  - Before schema migrations
  - Retention: 90 days
```

### S3 Versioning

```yaml
Versioning: Enabled
Lifecycle Rules:
  - Transition to Glacier after 90 days
  - Delete old versions after 365 days
```

---

## Scaling Configuration

### Auto Scaling (ECS)

```yaml
Frontend Service:
  Min Tasks: 2
  Max Tasks: 10
  Target CPU: 70%
  Target Memory: 80%
  Scale Up: +2 tasks when CPU > 70% for 2 minutes
  Scale Down: -1 task when CPU < 30% for 5 minutes

Backend Service:
  Min Tasks: 2
  Max Tasks: 10
  Target CPU: 70%
  Target Memory: 80%
  Scale Up: +2 tasks when CPU > 70% for 2 minutes
  Scale Down: -1 task when CPU < 30% for 5 minutes
```

### Database Scaling

```yaml
RDS:
  Storage Auto Scaling: Enabled
  Max Storage: 100 GB
  Read Replicas: 1 (production)
  
ElastiCache:
  Node Type: cache.t3.micro
  Nodes: 2 (with replication)
```

---

## Security Configuration

### IAM Roles

```yaml
ECS Task Execution Role:
  - AmazonECSTaskExecutionRolePolicy
  - CloudWatchLogsFullAccess
  - SecretsManagerReadWrite

ECS Task Role:
  - S3 Read/Write access
  - SES Send Email
  - CloudWatch Logs Write

RDS Access:
  - Limited to ECS security group only
  - No public access
```

### Security Groups

```yaml
ALB Security Group:
  Inbound:
    - Port 80 (HTTP) from 0.0.0.0/0
    - Port 443 (HTTPS) from 0.0.0.0/0
  Outbound:
    - All traffic to ECS security group

ECS Security Group:
  Inbound:
    - Port 3000 from ALB security group
    - Port 3001 from ALB security group
  Outbound:
    - Port 5432 to RDS security group
    - Port 6379 to Redis security group
    - Port 443 to 0.0.0.0/0 (AWS services)

RDS Security Group:
  Inbound:
    - Port 5432 from ECS security group only
  Outbound:
    - None

Redis Security Group:
  Inbound:
    - Port 6379 from ECS security group only
  Outbound:
    - None
```

---

## Deployment Checklist

### Pre-Deployment

- [ ] Run all tests locally
- [ ] Update environment variables
- [ ] Database migration scripts ready
- [ ] Backup current database
- [ ] Review code changes
- [ ] Update documentation

### Deployment

- [ ] Merge to main branch
- [ ] CI/CD pipeline triggered
- [ ] Docker images built
- [ ] Images pushed to ECR
- [ ] ECS services updated
- [ ] Health checks passing

### Post-Deployment

- [ ] Verify application is running
- [ ] Check CloudWatch logs
- [ ] Test critical user flows
- [ ] Monitor error rates
- [ ] Verify database connections
- [ ] Test email sending
- [ ] Check file uploads to S3

### Rollback Plan

```bash
# Rollback to previous version
aws ecs update-service \
  --cluster bathroom-estimator-cluster \
  --service bathroom-estimator-backend-service \
  --task-definition bathroom-estimator-backend:PREVIOUS_VERSION \
  --force-new-deployment

# Restore database from snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier bathroom-estimator-db-restored \
  --db-snapshot-identifier snapshot-before-deployment
```

---

## Cost Estimation (Monthly)

```
AWS Services:
├─ ECS Fargate (2 tasks × 2 services)    $60
├─ RDS PostgreSQL (db.t3.small)          $40
├─ ElastiCache Redis (cache.t3.micro)    $15
├─ S3 Storage (50 GB)                    $1
├─ S3 Data Transfer (100 GB)             $9
├─ CloudFront (100 GB)                   $8
├─ Route 53 (1 hosted zone)              $0.50
├─ Application Load Balancer             $20
├─ CloudWatch Logs (10 GB)               $5
├─ SES (1000 emails)                     $0.10
└─ Data Transfer                         $10
                                    ─────────
Total Estimated Cost:                    $168.60/month

Note: Costs may vary based on actual usage
```

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Status:** Deployment Strategy & DevOps Guide
