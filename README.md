# Crowngate Financial Group - Consultation Website

A professional, responsive financial consultation website built with Bootstrap, featuring both client-facing and admin dashboards.

## Project Overview

This is a complete consultation website solution for Crowngate Financial Group with the following features:

### 🎨 Design Features
- **Professional Layout**: Canada flag colors (Red & White)
- **Responsive Design**: Fully optimized for mobile and desktop
- **Modern UI**: Bootstrap 5 with custom styling
- **Smooth Animations**: AOS (Animate On Scroll) integration
- **Interactive Map**: USA office locations with Leaflet.js

### 📄 Client-Facing Pages

#### 1. **Homepage (index.html)**
- Hero section with call-to-action
- Services overview (4 service cards)
- About the company section
- Contact options (Email, WhatsApp, Phone)
- Client testimonials with 5-star ratings
- Interactive map with office locations
- Live chat widget for customer support
- Professional footer with social links

#### 2. **Sign Up Page (pages/signup.html)**
- User registration form
- Account type selection (Individual, Business, Corporate)
- Interest areas (Financial Planning, Investment, Tax, Risk Management)
- Terms and conditions agreement
- Password validation

#### 3. **Book Appointment Page (pages/book-appointment.html)**
- Appointment scheduling form
- Service type selection
- Preferred advisor selection
- Consultation type (In-Person, Virtual, Phone)
- Appointment details sidebar
- WhatsApp and email quick contact options

#### 4. **Contact Page (pages/contact.html)**
- Contact form for inquiries
- Multiple contact methods (Email, WhatsApp, Phone)
- Office locations information
- Business hours display
- FAQ accordion section
- Live support integration

#### 5. **Client Login (pages/login.html)**
- Email and password authentication
- "Remember me" functionality
- Admin dashboard link
- Sign-up redirect

#### 6. **Client Dashboard (pages/client-dashboard.html)**
- Personalized user dashboard
- Upcoming appointments overview
- Message management
- Profile editing
- Quick action buttons
- Support contact options

---

### 🛠️ Admin Dashboard

#### Admin Login (admin/login.html)
- **Demo Credentials:**
  - Username: `admin`
  - Password: `admin123`

#### Admin Dashboard Features (admin/index.html)

1. **Dashboard Section**
   - Real-time statistics (Messages, Appointments, Clients, Sign Ups)
   - Recent activity log
   - Quick overview of key metrics

2. **Message Management**
   - View customer messages
   - Reply to customer inquiries
   - Mark messages as read/unread
   - Delete messages
   - Track response status

3. **Appointment Management**
   - View all scheduled appointments
   - Approve or reject appointments
   - Update appointment status
   - Client details and service type tracking

4. **Sign Up Management**
   - Review new registrations
   - Approve or reject sign-ups
   - Move approved users to clients
   - Track registration status

5. **Client Management**
   - View all registered clients
   - Search clients by name or email
   - View detailed client information
   - Update client status
   - Export client data

6. **Settings**
   - Manage admin profile
   - Update support email and WhatsApp number
   - Set business hours
   - Configure response time settings
   - Export data (JSON format)

---

## 📁 Project Structure

```
crowngate-financialgroup/
│
├── index.html                    # Main homepage
├── pages/
│   ├── signup.html              # User registration
│   ├── login.html               # Client login
│   ├── book-appointment.html    # Appointment booking
│   ├── contact.html             # Contact & support
│   └── client-dashboard.html    # Client portal
│
├── admin/
│   ├── index.html               # Admin dashboard
│   ├── login.html               # Admin login
│   └── admin.js                 # Admin functionality
│
├── assets/
│   ├── css/
│   │   └── style.css            # Main stylesheet
│   ├── js/
│   │   └── main.js              # Client-side JavaScript
│   └── images/                  # Image directory
│
└── README.md                     # This file
```

---

## 🎯 Key Features

### Client Features
✅ User registration and authentication  
✅ Appointment booking system  
✅ Live chat support widget  
✅ Customer message management  
✅ Profile management  
✅ WhatsApp integration  
✅ Email communication  
✅ Testimonials and reviews  
✅ Service information  
✅ Office location map  

### Admin Features
✅ Complete dashboard with statistics  
✅ Message management and replies  
✅ Appointment approval system  
✅ Sign-up verification  
✅ Client management  
✅ Settings configuration  
✅ Data export functionality  
✅ Admin authentication  
✅ Real-time data updates  

---

## 📱 Responsive Design

The website is fully responsive and works seamlessly on:
- 📱 Mobile phones (320px and up)
- 📱 Tablets (768px and up)
- 🖥️ Desktops (1024px and up)

All forms, layouts, and components automatically adapt to screen size.

---

## 🔐 Data Storage

The website uses **localStorage** for data management:
- **customerMessages**: Stores customer inquiries and admin replies
- **appointments**: Stores booked appointments
- **signups**: Stores pending user registrations
- **clients**: Stores approved clients
- **adminSettings**: Stores admin configuration

### Note on Data Persistence
Data is stored locally in the browser. For a production environment, you would need to:
1. Set up a backend server (Node.js, Python, etc.)
2. Use a database (PostgreSQL, MongoDB, etc.)
3. Implement proper authentication
4. Add SSL/TLS encryption
5. Comply with data protection regulations

---

## 🚀 Getting Started

### 1. **Installation**
   - No installation required!
   - Simply open `index.html` in your web browser

### 2. **For Development**
   - Use a local server (Python, Node.js, etc.) to avoid CORS issues
   - Python: `python -m http.server 8000`
   - Node.js: `npx http-server`

### 3. **First Steps**
   - Visit homepage: `index.html`
   - Sign up as a new user: `pages/signup.html`
   - Book an appointment: `pages/book-appointment.html`
   - Admin login: `admin/login.html` (admin/admin123)

---

## 👤 Demo Accounts

### Admin Account
- **Username:** admin
- **Password:** admin123
- **URL:** `/admin/login.html`

### Test User
To test client features:
1. Sign up on `pages/signup.html`
2. Login on `pages/login.html` with created credentials

---

## 📧 Contact Information

**Support Email:** support@crowngatefinancialgroup.com  
**WhatsApp:** +1 (647) 555-1234  
**Phone:** +1 (647) 555-1234

**Office Locations:**
- New York: 123 Financial Street, New York, NY 10001
- Toronto: 456 Maple Avenue, Toronto, ON M5V 3A8
- Los Angeles: 789 Commerce Boulevard, Los Angeles, CA 90001

---

## 🎨 Design Colors

- **Primary Red:** #C41E3A (Canada Flag Red)
- **White:** #FFFFFF
- **Dark Gray:** #2C3E50
- **Light Gray:** #ECF0F1

---

## 📦 Dependencies

### External Libraries
- Bootstrap 5.3.0
- Font Awesome 6.4.0
- AOS (Animate On Scroll) 2.3.4
- Leaflet.js 1.9.4 (for maps)

All libraries are loaded from CDN for easy deployment.

---

## ✨ Features in Detail

### 1. Live Chat Widget
- Fixed position chat button
- Real-time messaging
- Admin reply simulation
- Message history

### 2. Appointment System
- Date/time selection
- Service type selection
- Advisor preferences
- Consultation type options
- Automatic confirmation

### 3. Contact Methods
- Email integration ready
- WhatsApp direct link
- Phone call option
- Live chat support

### 4. Map Integration
- Interactive Leaflet map
- Multiple office markers
- Location information popups
- USA office locations

### 5. Testimonials
- 5-star rating system
- Client names and titles
- Professional testimonial cards
- Social proof

---

## 🔒 Security Considerations

### Current Implementation
- Simple localStorage-based authentication (for demo)
- Client-side validation

### For Production, Add:
- Backend authentication system
- HTTPS/SSL encryption
- Password hashing (bcrypt, Argon2)
- Session management
- CSRF protection
- Rate limiting
- Input sanitization
- Database security
- API authentication (JWT, OAuth)

---

## 📱 Browser Compatibility

The website works on:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 File Descriptions

### HTML Files
- **index.html** - Main landing page
- **pages/signup.html** - User registration
- **pages/login.html** - Client authentication
- **pages/book-appointment.html** - Appointment booking
- **pages/contact.html** - Contact form and FAQ
- **pages/client-dashboard.html** - User portal
- **admin/index.html** - Admin panel
- **admin/login.html** - Admin authentication

### CSS Files
- **assets/css/style.css** - Main stylesheet with all custom styles

### JavaScript Files
- **assets/js/main.js** - Client-side functionality
- **admin/admin.js** - Admin dashboard logic

---

## 🎯 Usage Guide

### For Clients

1. **Sign Up**
   - Go to `Sign Up` page
   - Fill in personal information
   - Select account type and interests
   - Create account

2. **Book Appointment**
   - Click "Book Now" or "Book Appointment"
   - Select date, time, and service type
   - Confirm appointment

3. **Contact Support**
   - Use the live chat widget
   - Send email to support
   - Message via WhatsApp
   - Call directly

4. **View Dashboard**
   - Login at `pages/login.html`
   - View appointments and messages
   - Update profile information

### For Administrators

1. **Login**
   - Go to `admin/login.html`
   - Use admin credentials

2. **Manage Messages**
   - View customer messages
   - Reply with professional responses
   - Track message status

3. **Approve Appointments**
   - Review booking requests
   - Approve or reject
   - Update status

4. **Manage Sign-ups**
   - Review new registrations
   - Approve users as clients
   - Track verification status

5. **Client Management**
   - View all clients
   - Search and filter
   - Export client data
   - Update client status

---

## 🚀 Deployment

### Static Hosting (No Backend)
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

### With Backend
- Heroku
- AWS EC2
- DigitalOcean
- Google Cloud Platform
- Microsoft Azure

### Steps:
1. Replace localStorage with API calls
2. Set up backend server
3. Configure database
4. Update API endpoints in JavaScript
5. Deploy to hosting platform

---

## 📋 Customization Guide

### Change Colors
Edit `assets/css/style.css`:
```css
:root {
    --canada-red: #C41E3A;      /* Change red color */
    --canada-white: #FFFFFF;    /* Change white color */
}
```

### Update Contact Information
1. Email: Search for "support@crowngatefinancialgroup.com"
2. Phone: Search for "+1 (647) 555-1234"
3. WhatsApp: Update the WhatsApp links

### Add Your Company Logo
1. Create a logo image
2. Replace the crown icon with logo in navigation
3. Update branding throughout

### Customize Services
Edit the services section in `index.html` to match your offerings.

---

## 🆘 Troubleshooting

### Data Not Saving
- Check browser's localStorage is enabled
- Clear browser cache and try again
- Check browser console for errors

### Map Not Displaying
- Ensure internet connection for CDN
- Check Leaflet.js is loading properly
- Verify map container exists

### Chat Widget Not Working
- Ensure localStorage is enabled
- Check JavaScript is enabled
- Verify main.js is loaded

### Admin Dashboard Not Loading
- Clear browser cache
- Check if logged in (redirect to login page)
- Verify session is active

---

## 📞 Support

For issues or questions:
1. Check the FAQ on the Contact page
2. Send an email to support@crowngatefinancialgroup.com
3. Use the live chat widget
4. Contact via WhatsApp

---

## 📄 License

This website template is created for Crowngate Financial Group.

---

## 🎉 Credits

Built with:
- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Font Awesome Icons
- Leaflet.js Maps
- AOS Animations

---

## 🔄 Version History

**v1.0** (2026-02-18)
- Initial release
- Complete client website
- Admin dashboard
- All core features

---

## 📌 Important Notes

1. **Demo Data**: The website uses localStorage for demo purposes. In production, use a real database.

2. **Authentication**: Current authentication is basic. Implement proper security for production.

3. **Email Sending**: Email sending requires backend setup. Update email functionality accordingly.

4. **Data Privacy**: Ensure compliance with GDPR, CCPA, and other data protection regulations.

5. **SSL Certificate**: Always use HTTPS in production.

---

**Last Updated:** February 18, 2026

For more information, visit: crowngatefinancialgroup.com
