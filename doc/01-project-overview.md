# Project Overview: Bathroom Estimator Tool

## Executive Summary

An interactive web-based bathroom remodeling cost estimator that collects user input through a dynamic questionnaire, calculates real-time pricing, and generates Buildertrend-compatible Excel files and professional PDF proposals.

---

## Project Goals

### Primary Objectives
1. **Streamline Estimation Process**: Replace manual proposal creation with automated system
2. **Improve Client Experience**: Interactive, transparent pricing with real-time updates
3. **Buildertrend Integration**: Generate compatible Excel exports for direct import
4. **Scalability**: Easy price/service updates without developer intervention

### Business Value
- Reduce proposal creation time from hours to minutes
- Increase quote accuracy and consistency
- Improve client engagement and conversion rates
- Enable self-service estimation 24/7

---

## Core Features

### 1. Bathroom Type Selection
- **Four-Piece (FP)**: Toilet + Sink + Shower + Tub - Base: $15,000
- **Three-Piece Shower (TPS)**: Toilet + Sink + Shower - Base: $13,000
- **Three-Piece Tub (TPT)**: Toilet + Sink + Tub - Base: $10,000
- **Two-Piece (TP)**: Toilet + Sink - Base: $4,000

### 2. Dynamic Questionnaire System
**Color-Coded Question Types:**
- **White**: Default scope (non-editable, included in base price)
- **Blue**: Yes/No toggle questions
- **Green**: Numeric input (square feet, quantities)
- **Orange**: Dropdown selections with predefined ranges
- **Purple**: Auto-calculated from previous inputs
- **Yellow**: Conditional questions (appear based on previous answers)
- **Red**: Inactive placeholders for future features

### 3. Real-Time Price Calculator
- Floating price box (always visible during scroll)
- Instant price updates on selection changes
- Add/remove options dynamically
- Clear price breakdown

### 4. Data Collection
- User information (name, email, address, zip)
- Project notes (free text)
- File uploads (3-4 images, 1-2 videos)
- All selections and customizations

### 5. Output Generation
**Excel Export (Buildertrend Format):**
- Category, Cost Code, Title, Description
- Quantity, Unit, Unit Cost, Cost Type
- Builder Cost, Markup, Client Price, Margin, Profit

**PDF Proposal:**
- Company branding (BBurn Builders)
- Client information
- Detailed scope breakdown by category
- Total pricing
- Terms & conditions
- Payment schedule
- Warranty information

### 6. Admin Dashboard
- Update pricing without coding
- Add/edit/disable cost codes
- Manage bathroom types and categories
- View submission history
- Export reports

---

## Technical Requirements

### Performance
- Page load: < 2 seconds
- Real-time calculation: < 100ms
- Support 100+ concurrent users
- Mobile responsive (iOS/Android)

### Security
- Input validation and sanitization
- File upload restrictions (size, type)
- SQL injection prevention
- XSS protection
- HTTPS only

### Scalability
- Horizontal scaling capability
- Database optimization
- CDN for static assets
- Caching strategy

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## User Flows

### Primary User Flow (Client)
1. Land on estimator page
2. Select bathroom type → See base price
3. Answer category questions sequentially
4. Watch price update in real-time
5. Review selections on preview page
6. Add notes and upload files
7. Enter contact information
8. Submit → Receive confirmation

### Admin User Flow
1. Login to admin dashboard
2. Navigate to cost codes management
3. Update prices/descriptions
4. Save changes → Immediate effect
5. View submission reports
6. Export data as needed

---

## Success Metrics

### User Engagement
- Time to complete estimate: < 10 minutes
- Completion rate: > 70%
- Mobile usage: > 40%

### Business Impact
- Proposal generation time: < 5 minutes
- Quote accuracy: > 95%
- Client conversion rate: +20%
- Support tickets: -50%

---

## Project Constraints

### Timeline
- Development: 6-8 weeks
- Testing: 1-2 weeks
- Deployment: 1 week
- **Total: 8-11 weeks**

### Budget
- Development: $3,000
- AWS Hosting: $20-50/month
- Domain/SSL: $50/year

### Dependencies
- Buildertrend API compatibility
- AWS account setup
- Domain configuration
- Email service (AWS SES)

---

## Risks & Mitigation

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Complex conditional logic | High | Medium | Thorough testing, state machine pattern |
| Excel format compatibility | High | Low | Use Buildertrend template, validate exports |
| File upload size limits | Medium | Medium | Client-side compression, AWS S3 |
| Price calculation errors | High | Low | Unit tests, validation rules |
| Admin panel security | High | Medium | JWT auth, role-based access |

---

## Next Steps

1. ✅ Review and approve project overview
2. → Design system architecture
3. → Define database schema
4. → Create API specifications
5. → Design UI/UX mockups
6. → Begin development

---

**Document Version:** 1.0  
**Last Updated:** 2025  
**Status:** Draft - Pending Approval
