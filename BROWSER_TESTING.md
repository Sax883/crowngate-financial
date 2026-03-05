# 🧪 BROWSER TESTING GUIDE

## How to Test the Website Locally

### Prerequisites
- Modern web browser (Chrome, Edge, Firefox, Safari)
- Access to http://localhost:8000
- HTTP server running (http-server or similar)

---

## 📍 Testing URLs

| Feature | URL |
|---------|-----|
| 🏠 Home | http://localhost:8000/index.html |
| 📝 Signup | http://localhost:8000/pages/signup.html |
| 📅 Book Appointment | http://localhost:8000/pages/book-appointment.html |
| 👤 Client Dashboard | http://localhost:8000/pages/client-dashboard.html |
| 💬 Contact | http://localhost:8000/pages/contact.html |
| 🔐 Admin Login | http://localhost:8000/admin/login.html |
| ⚙️ Admin Dashboard | http://localhost:8000/admin/index.html |

---

## 🧪 Test Scenarios

### Test 1: Complete Signup & Auto-Login
```
Steps:
1. Go to http://localhost:8000/pages/signup.html
2. Fill form:
   - First Name: TestClient
   - Last Name: One
   - Email: testclient1@test.com
   - Phone: 647-555-1234
   - Password: TestPass123!
   - Confirm Password: TestPass123!
   - Account Type: Individual
   - Check "Financial Planning"
3. Click "Create Account"

Expected Results:
✅ Alert displays: "Account created successfully! Redirecting..."
✅ Page redirects to /pages/client-dashboard.html
✅ Dashboard displays "Welcome, TestClient!"
✅ sessionStorage contains: clientLoggedIn=true, clientEmail=testclient1@test.com
✅ localStorage contains signup data in 'signups' and 'clients' arrays

Browser Console Check (F12):
- No errors in Console tab
- Check Storage > localStorage for 'signups' and 'clients' keys
```

---

### Test 2: Client Dashboard Features
```
Prerequisites: Must be logged in (complete Test 1 first)

Steps:
1. You should already be on dashboard
2. View Home tab statistics
3. Click "My Appointments" tab
4. Click "Portfolio" tab to see professional services
5. Click "Messages" tab
6. Click "Profile" tab and view information

Expected Results:
✅ Dashboard displays client welcome message
✅ Statistics show: Appointments (0), Messages (0), Services (0)
✅ My Appointments tab is empty (no bookings yet)
✅ Portfolio tab shows:
   - Available services with descriptions
   - Service categories (Financial Planning, etc.)
   - Schedule Now buttons
   - Achievements section
✅ Profile tab shows your registered information
✅ Sidebar navigation works smoothly
```

---

### Test 3: Book Appointment with Pending Status
```
Prerequisites: Must be logged in to dashboard

Steps:
1. Click "Book New Appointment" button on dashboard
2. OR go to http://localhost:8000/pages/book-appointment.html
3. Fill form:
   - First Name: TestClient
   - Last Name: One
   - Email: testclient1@test.com
   - Phone: 647-555-1234
   - Date: Select any future date
   - Time: 10:00 AM
   - Service Type: Financial Planning
   - Preferred Advisor: Leave as "Any Available"
   - Consultation Type: Virtual Meeting (Video Call)
   - Description: I need help with financial planning
   - Email Reminders: Checked
4. Click "Confirm Appointment"

Expected Results:
✅ Form disappears immediately
✅ Yellow pending message box appears
✅ Message shows:
   - ✓ Appointment Pending Approval (orange title)
   - Appointment details box with:
     📅 Date & Time
     🎯 Service Type: Financial Planning
     💬 Type: Virtual Meeting (Video Call)
   - ⏳ Status: PENDING - Waiting for admin approval
   - "A consultant will review your appointment..."
   - "← Back to Home" button visible
✅ "Back to Home" button returns to home page
✅ localStorage 'appointments' array has new entry with status: 'pending'

Browser Console Check:
- formData successfully created
- Appointment stored with correct fields
- displayDate, displayTime, etc. populated
```

---

### Test 4: Admin Login & View Pending Appointments
```
Steps:
1. Open new browser tab
2. Go to http://localhost:8000/admin/login.html
3. Login credentials:
   - Email: admin
   - Password: admin123
4. Click "Login" button

Expected Results:
✅ Redirects to /admin/index.html
✅ Admin dashboard loads
✅ Dashboard shows statistics
✅ Total Appointments shows "1" (from Test 3)
✅ Dashboard Activity shows "1 appointments booked"
```

---

### Test 5: Admin Appointment Approval
```
Prerequisites: Must be logged in as admin (complete Test 4 first)

Steps:
1. Click "Appointments" in sidebar
2. Table shows appointments
3. Find your appointment with "Pending" status badge (orange)
4. Click green "Approve" button

Expected Results:
✅ Alert displays: "Appointment approved!"
✅ Appointment status changes from "Pending" to "Confirmed"
✅ Status badge color changes from orange to green
✅ localStorage 'appointments' array updated with status: 'confirmed'

Browser Console Check:
- No errors
- Verify appointment status changed in localStorage
```

---

### Test 6: Client Sees Updated Status
```
Prerequisites: Completed Tests 1-5

Steps:
1. Go back to previous tab with client dashboard
2. Click "My Appointments" tab
3. Refresh page (F5) if needed

Expected Results:
✅ Appointment now shows with "Confirmed" badge (green)
✅ Appointment details displayed:
   - Date and time
   - Service type
   - Consultation type
   - Description
✅ Status changed from "Pending" to "Confirmed"
```

---

### Test 7: Form Validation
```
Steps:
1. Go to http://localhost:8000/pages/signup.html
2. Leave all fields empty
3. Click "Create Account"

Expected Results:
✅ Form validates required fields
✅ No submission occurs
✅ Fields show validation state
✅ Password validation message appears if fields are filled but don't match

Steps (Password Test):
1. Fill password as: Password
2. Fill confirm as: Different
3. Click Create Account

Expected Results:
✅ Alert: "Passwords do not match!"
✅ Form doesn't submit

Steps (Password Length Test):
1. Fill password as: Pass123
2. Fill confirm as: Pass123
3. Click Create Account

Expected Results:
✅ Alert: "Password must be at least 8 characters long!"
```

---

### Test 8: Responsive Design Testing

#### Desktop (1920px)
```
Steps:
1. Open browser at full width
2. View any page

Expected Results:
✅ Full layout displayed
✅ Sidebar visible (if applicable)
✅ All elements properly sized
✅ Text readable
✅ Buttons easily clickable
```

#### Tablet (768px - 1024px)
```
Steps:
1. Right-click browser → Inspect (F12)
2. Click device toggle (phone icon)
3. Select "iPad" or custom 800x600

Expected Results:
✅ Layout adapts to tablet width
✅ Navigation still accessible
✅ Forms responsive
✅ Text remains readable
```

#### Mobile (375px - 425px)
```
Steps:
1. DevTools → Mobile device view
2. Select "iPhone 12 Pro" or "Galaxy S21"
3. Navigate through pages

Expected Results:
✅ Hamburger menu appears (if applicable)
✅ Single-column layout
✅ Touch targets are min 44px
✅ Forms fit screen
✅ Images scale correctly
✅ Text is readable without zoom
```

---

## 🔍 Developer Tools Inspection

### F12 Console Checks

**After Signup:**
```javascript
// In Console, type:
JSON.parse(localStorage.getItem('signups'))
// Should show array with your signup data

JSON.parse(localStorage.getItem('clients'))
// Should show array with client data

sessionStorage.getItem('clientLoggedIn')
// Should return "true"

sessionStorage.getItem('clientEmail')
// Should return your email
```

**After Booking Appointment:**
```javascript
JSON.parse(localStorage.getItem('appointments'))
// Should show array with appointment(s)
// Each appointment should have status: "pending"
```

**After Admin Approval:**
```javascript
JSON.parse(localStorage.getItem('appointments'))[0].status
// Should return "confirmed"
```

---

## 📊 Network Tab Inspection

### What to Look For:
1. All `.html`, `.css`, `.js` files load with 200 status
2. Images load correctly
3. No 404 errors for resources
4. Bootstrap and FontAwesome CDN resources load
5. Font files load properly

### Common Issues:
- ❌ 404 errors = missing files
- ❌ CORS errors = cross-origin issues
- ✅ 200 status = file found
- ✅ 304 status = cached version used

---

## 💾 Storage Inspection

### View localStorage Data:
1. Open DevTools (F12)
2. Go to **Application** tab
3. Click **localStorage** in sidebar
4. Select http://localhost:8000
5. See all stored data:
   - signups
   - clients
   - appointments
   - customerMessages
   - adminSettings

### Clear Storage (Reset App):
```javascript
// In Console:
localStorage.clear()
sessionStorage.clear()
// Then refresh page
```

---

## 🚀 Performance Testing

### Lighthouse Audit:
1. DevTools → Lighthouse tab
2. Select "Desktop" or "Mobile"
3. Click "Analyze page load"

Expected Results:
- ✅ Performance: 80+
- ✅ Accessibility: 80+
- ✅ Best Practices: 80+
- ✅ SEO: 80+

### Page Load Speed:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1

---

## 🔒 Security Testing

### XSS Prevention:
```javascript
// Try in appointment description:
<script>alert('XSS')</script>

// Expected: Text is escaped, no alert
```

### CSRF Protection:
- ✅ Form tokens present (in production)
- ✅ No data modification without user action
- ✅ Credentials stored securely

---

## ✅ Pre-Deployment Checklist

- [ ] All pages load without errors
- [ ] Signup works and redirects
- [ ] Dashboard displays correctly
- [ ] Appointment booking works
- [ ] Pending message shows
- [ ] Admin can approve appointments
- [ ] Status updates in real-time
- [ ] Forms validate correctly
- [ ] Responsive on all devices
- [ ] No console errors
- [ ] localStorage data persists
- [ ] Can logout and log back in
- [ ] Admin functions work

---

## 📞 Getting Help

If you encounter issues:

1. **Clear Cache:**
   ```
   Ctrl+Shift+Delete → Clear all time → Delete
   ```

2. **Check Console (F12):**
   - Look for red error messages
   - Note the file and line number

3. **Check Storage (F12 → Application):**
   - Verify localStorage has data
   - Check if sessionStorage is set

4. **Try Fresh Signup:**
   - Use different email
   - Fill all required fields
   - Check password requirements

5. **Reset Everything:**
   ```javascript
   // In Console:
   localStorage.clear();
   sessionStorage.clear();
   location.reload();
   ```

---

**Ready to Test! 🎯**
