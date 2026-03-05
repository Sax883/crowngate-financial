# Crowngate Financial Group - Complete Testing & User Guide

## 🎯 Overview
This document provides comprehensive testing instructions and user guide for all features of the Crowngate Financial Group consultation website.

---

## ✅ COMPLETE WORKFLOW TESTING

### 1. CLIENT SIGNUP & DASHBOARD ACCESS
**Location:** `/pages/signup.html`

#### Steps to Test Signup:
1. Navigate to **Signup Page** (Click "Sign Up" in navigation or go to `/pages/signup.html`)
2. Fill in registration form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Phone: `647-555-1234`
   - Password: `Password123` (minimum 8 characters)
   - Confirm Password: `Password123`
   - Account Type: Select `Individual`
   - Areas of Interest: Check `Financial Planning` and `Investment Advisory`
   - Additional Message: (optional)

3. Click **"Create Account"** button
4. **Expected Result:**
   - Alert displays: "Account created successfully! Redirecting to your dashboard..."
   - User is automatically redirected to **Client Dashboard** (`/pages/client-dashboard.html`)
   - Dashboard displays personalized welcome message with client's name
   - Session is created automatically (no separate login needed)

#### What Happens Internally:
- Form data is saved to localStorage under `signups` array
- Client data is also stored in `clients` array
- sessionStorage is set with:
  - `clientLoggedIn: true`
  - `clientEmail: john@example.com`
  - `clientName: John Doe`
- User is logged in automatically and dashboard displays

---

### 2. CLIENT DASHBOARD & PORTFOLIO
**Location:** `/pages/client-dashboard.html`

#### Features Available:

**Dashboard Tab (Home):**
- Welcome greeting with client name
- Statistics cards showing:
  - Upcoming Appointments count
  - Messages Received count
  - Completed Services count
  - Days as Member
- Quick action buttons:
  - Book New Appointment
  - Contact Support
  - Call Consultant
  - WhatsApp Chat
  - Send Email
  - Live Support

**My Appointments Tab:**
- Shows all appointments booked by the client
- Displays status: "Pending" (orange) or "Confirmed" (green)
- Shows appointment details: Date, Time, Service Type, Description

**Portfolio Tab (NEW - Professional Consulting Portfolio):**
- **Service Statistics:**
  - Services Completed (shows approved appointment count)
  - Total Investments (displays as $0 until admin adds)
  - Savings Achieved (displays as $0 until admin adds)

- **Service History:**
  - Lists all completed services
  - Initially shows "No completed services yet"
  - Updates when admin approves appointments

- **Available Services:**
  - Financial Planning
  - Investment Advisory
  - Tax Planning
  - Risk Management
  - Each with description and "Schedule Now" button

- **Achievements & Milestones:**
  - Account Created (shows creation date)
  - First Appointment (prompt to book)

**Messages Tab:**
- Shows all messages sent to admin
- Displays admin replies when received
- Status shows "Pending" or "Replied"

**Profile Tab:**
- Edit client information
- Phone number can be updated
- Other fields (name, email, account type) are read-only
- Save Changes button updates profile

---

### 3. APPOINTMENT BOOKING & PENDING APPROVAL
**Location:** `/pages/book-appointment.html`

#### Steps to Book Appointment:
1. Click **"Book New Appointment"** from dashboard or navigate to `/pages/book-appointment.html`
2. Fill in appointment form:
   - First Name: `John`
   - Last Name: `Doe`
   - Email: `john@example.com`
   - Phone: `647-555-1234`
   - Preferred Date: (select any future date)
   - Preferred Time: (select any time)
   - Service Type: Select `Financial Planning`
   - Preferred Advisor: (optional)
   - Consultation Type: Select `Virtual Meeting (Video Call)`
   - Brief Description: `I need help with investment planning`
   - Email Reminders: Leave checked

3. Click **"Confirm Appointment"** button
4. **Expected Result:**
   - Form disappears
   - **PENDING APPROVAL MESSAGE** displays showing:
     - ✓ Appointment Pending Approval
     - Appointment summary box with:
       - 📅 Date & Time
       - 🎯 Service Type
       - 💬 Consultation Type
     - ⏳ Status: PENDING - Waiting for admin approval
     - Message: "A consultant will review your appointment and contact you shortly."
     - "Back to Home" button to return to home page

#### What Happens Internally:
- Appointment data is saved to localStorage under `appointments` array with:
  - `status: 'pending'` (waiting for admin approval)
  - All appointment details
  - Timestamp of submission
  - Unique ID

- Appointment data is NOT shown to client until admin approves it
- Client sees "Pending" status in My Appointments tab

---

### 4. ADMIN TERMINAL & APPOINTMENT APPROVAL
**Location:** `/admin/login.html` then `/admin/index.html`

#### Admin Login:
1. Navigate to `/admin/login.html`
2. Login credentials:
   - Email: `admin`
   - Password: `admin123`
3. Click **"Login"** button
4. Redirected to **Admin Dashboard** (`/admin/index.html`)

#### Admin Dashboard Features:

**Dashboard Overview:**
- Total Messages count
- Total Appointments count (pending + confirmed)
- Total Clients count
- New Sign Ups count
- Recent Activity feed

**Appointments Tab (Management Terminal):**
1. Click **"Appointments"** in sidebar
2. See all appointments in table:
   - Client Name
   - Date & Time
   - Service Type
   - Status badge (Pending/Confirmed/Rejected)
   - Action buttons

**To Approve an Appointment:**
1. Find appointment with **Pending** status
2. Click **"Approve"** button (green checkmark)
3. **Expected Result:**
   - Status changes from "Pending" to "Confirmed"
   - Alert displays: "Appointment approved!"
   - Appointment moves to confirmed list
   - Client sees updated status in their dashboard

**To Reject an Appointment:**
1. Find appointment to reject
2. Click **"Reject"** button (red X)
3. Confirm rejection in popup
4. **Expected Result:**
   - Status changes to "Rejected"
   - Appointment still visible but marked as rejected

#### Sign Ups Management:
- Click **"Sign Ups"** tab to see pending registrations
- Approve or Reject new client signups
- Approved signups are added to Clients list

#### Messages Management:
- View all customer messages
- Reply to messages (gets stored in localStorage)
- Delete messages
- Track replied vs. pending messages

#### Clients Management:
- View all active clients
- See client details (name, email, phone, account type)
- Delete client if needed

#### Settings:
- Configure admin name and email
- Set support email
- WhatsApp number
- Response time preference
- Business hours

---

## 🔄 COMPLETE END-TO-END WORKFLOW

### Scenario: New Client Books and Gets Approved
1. **Client Signs Up** → Redirected to Dashboard
2. **Client Books Appointment** → Sees pending message
3. **Admin Logs In** → Views appointment as pending
4. **Admin Approves** → Appointment status becomes confirmed
5. **Client Checks Dashboard** → Sees appointment as confirmed
6. **Admin Sends Message Reply** → Client receives notification

---

## 📱 RESPONSIVE DESIGN
- All pages are fully responsive
- Works on desktop, tablet, and mobile
- Sidebar collapses on mobile devices
- Touch-friendly buttons and navigation

---

## 🗂️ DATA STORAGE (localStorage)
All data is stored locally in browser's localStorage:
- `signups` - New user registrations
- `clients` - Active clients
- `appointments` - All appointment bookings
- `customerMessages` - Client messages and admin replies
- `adminSettings` - Admin configuration

**Note:** Data persists as long as browser cache is not cleared. For production, integrate with a backend database.

---

## 🔐 Security Features
- Admin login with credentials
- Session storage for client authentication
- Form validation on all inputs
- Email format validation
- Password strength requirements

---

## 📞 Contact & Support
- **Email:** support@crowngatefinancialgroup.com
- **Phone:** +1 (647) 555-1234
- **WhatsApp:** Available through booking form
- **Live Chat:** Available on website

---

## ⚙️ Browser Compatibility
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🐛 Troubleshooting

**Problem:** Client can't log into dashboard
- **Solution:** Make sure sessionStorage isn't cleared. Re-sign up or log back in.

**Problem:** Appointment not showing in admin panel
- **Solution:** Check browser console for errors. Ensure appointment form is submitted (should show pending message).

**Problem:** Admin can't approve appointment
- **Solution:** Ensure you're logged in with correct credentials (admin/admin123)

**Problem:** Data disappeared
- **Solution:** Check if browser cache/localStorage was cleared. Data is stored locally.

---

## 📊 Key Features Summary

✅ **Client Features:**
- Self-service signup (no manual approval needed for access to dashboard)
- Professional consultation portfolio
- Appointment booking with pending status
- Message system
- Profile management
- Responsive design

✅ **Admin Features:**
- Appointment approval workflow
- Client management
- Message management and replies
- Signup approval (optional)
- Settings configuration
- Data export functionality

✅ **System Features:**
- Automatic session management
- Real-time status updates
- localStorage data persistence
- Mobile-responsive design
- Professional UI with Crowngate branding

---

## 🎨 Styling & Colors
- Primary: Canada Red (#C41E3A)
- Secondary: White (#FFFFFF)
- Accent: Light Gray (#F5F5F5)
- Text: Dark Gray (#2C3E50)

---

## 📝 File Structure
```
crowngate financialgroup/
├── index.html (Home page)
├── pages/
│   ├── signup.html (Client registration)
│   ├── login.html (Client login)
│   ├── book-appointment.html (Appointment booking with pending status)
│   ├── client-dashboard.html (Client portal with portfolio)
│   ├── contact.html (Contact form)
├── admin/
│   ├── login.html (Admin login)
│   ├── index.html (Admin dashboard)
│   ├── admin.js (Admin functionality)
├── assets/
│   ├── css/style.css (Main styling)
│   ├── js/main.js (Client-side scripts)
│   └── images/ (Image files)
```

---

**Last Updated:** 2026
**Version:** 1.0 - Complete
