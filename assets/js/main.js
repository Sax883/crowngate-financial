// Initialize AOS
AOS.init({
    duration: 1000,
    offset: 100
});

// Map initialization
let map;
function initMap() {
    map = L.map('map').setView([40.7128, -74.0060], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
    // Add markers for office locations
    const locations = [
        { lat: 40.7128, lng: -74.0060, name: 'New York Office', address: '123 Financial Street, New York, NY 10001' },
        { lat: 43.6629, lng: -79.3957, name: 'Toronto Office', address: '456 Maple Avenue, Toronto, ON M5V 3A8' },
        { lat: 34.0522, lng: -118.2437, name: 'Los Angeles Office', address: '789 Commerce Boulevard, Los Angeles, CA 90001' }
    ];
    
    locations.forEach(location => {
        L.marker([location.lat, location.lng])
            .bindPopup(`<strong>${location.name}</strong><br>${location.address}`)
            .addTo(map);
    });
}

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('map')) {
        initMap();
    }
});

// Chat functionality
const chatBtn = document.getElementById('chatBtn');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

function toggleChat() {
    chatWindow.classList.toggle('active');
}

chatBtn.addEventListener('click', toggleChat);

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    // Get client email if logged in, otherwise use 'Website Visitor'
    const clientEmail = sessionStorage.getItem('clientEmail') || 'Website Visitor';
    const clientName = sessionStorage.getItem('clientName') || 'Anonymous';
    
    // Save message to localStorage for admin dashboard
    let messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
    messages.push({
        firstName: clientName.split(' ')[0],
        lastName: clientName.split(' ')[1] || 'User',
        email: clientEmail,
        message: message,
        timestamp: new Date().toLocaleString(),
        replied: false,
        id: Date.now()
    });
    localStorage.setItem('customerMessages', JSON.stringify(messages));
    
    // Add user message to chat display
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'chat-message user';
    userMsgDiv.textContent = message;
    chatMessages.appendChild(userMsgDiv);
    
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate admin response
    setTimeout(() => {
        const adminMsgDiv = document.createElement('div');
        adminMsgDiv.className = 'chat-message admin';
        adminMsgDiv.textContent = 'Thank you for your message! A consultant will respond shortly.';
        chatMessages.appendChild(adminMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    isValid = false;
                    input.classList.add('is-invalid');
                } else {
                    input.classList.remove('is-invalid');
                }
            });
            
            if (isValid) {
                // Store form data in localStorage (demo purpose)
                const formData = new FormData(form);
                const data = Object.fromEntries(formData);
                
                // For appointment form, store with pending status
                if (form.id === 'appointmentForm') {
                    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                    appointments.push({
                        ...data,
                        timestamp: new Date().toLocaleString(),
                        status: 'pending',
                        id: Date.now()
                    });
                    localStorage.setItem('appointments', JSON.stringify(appointments));
                    
                    // Show pending message
                    const statusDiv = document.getElementById('appointmentStatus');
                    if (statusDiv) {
                        statusDiv.style.display = 'block';
                        form.style.display = 'none';
                    }
                    return;
                }
                
                // Get existing messages from localStorage
                let messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
                messages.push({
                    ...data,
                    timestamp: new Date().toLocaleString(),
                    id: Date.now()
                });
                localStorage.setItem('customerMessages', JSON.stringify(messages));
                
                alert('Form submitted successfully! Our team will contact you shortly.');
                form.reset();
            }
        });
    }
}

// Initialize form validation
validateForm('appointmentForm');
validateForm('signupForm');
validateForm('contactForm');

// Add click handler for appointment button link
window.addEventListener('load', function() {
    const appointmentBtns = document.querySelectorAll('[onclick*="appointmentForm"]');
    appointmentBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const appointmentForm = document.getElementById('appointmentForm');
            if (appointmentForm) {
                appointmentForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
