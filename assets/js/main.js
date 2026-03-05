// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    offset: 100
});

// --- Map Initialization ---
let map;
function initMap() {
    if (!document.getElementById('map')) return;
    
    map = L.map('map').setView([40.7128, -74.0060], 4);
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    }).addTo(map);
    
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

// --- Chat Functionality ---
const chatBtn = document.getElementById('chatBtn');
const chatWindow = document.getElementById('chatWindow');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');

function toggleChat() {
    if (chatWindow) chatWindow.classList.toggle('active');
}

if (chatBtn) chatBtn.addEventListener('click', toggleChat);

function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;
    
    const clientEmail = sessionStorage.getItem('clientEmail') || 'Website Visitor';
    const clientName = sessionStorage.getItem('clientName') || 'Anonymous';
    
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
    
    const userMsgDiv = document.createElement('div');
    userMsgDiv.className = 'chat-message user';
    userMsgDiv.textContent = message;
    chatMessages.appendChild(userMsgDiv);
    
    chatInput.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    setTimeout(() => {
        const adminMsgDiv = document.createElement('div');
        adminMsgDiv.className = 'chat-message admin';
        adminMsgDiv.textContent = 'Thank you! A consultant will respond shortly.';
        chatMessages.appendChild(adminMsgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

// --- Form Validation ---
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
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
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            if (form.id === 'appointmentForm') {
                let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
                appointments.push({ ...data, timestamp: new Date().toLocaleString(), status: 'pending', id: Date.now() });
                localStorage.setItem('appointments', JSON.stringify(appointments));
                
                const statusDiv = document.getElementById('appointmentStatus');
                if (statusDiv) { statusDiv.style.display = 'block'; form.style.display = 'none'; }
                return;
            }
            
            let messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
            messages.push({ ...data, timestamp: new Date().toLocaleString(), id: Date.now() });
            localStorage.setItem('customerMessages', JSON.stringify(messages));
            
            alert('Submitted successfully!');
            form.reset();
        }
    });
}

// --- Employment Workflow Logic ---
const allCategories = [
    "Accounting", "Financial Analysis", "Investment Banking", "Risk Management", "Auditing",
    "Tax Consulting", "Data Science", "Web Development", "Cyber Security", "Project Management",
    "Customer Support", "Digital Marketing", "Content Writing", "Virtual Assistant", "Legal Advice",
    "Sales Strategy", "Human Resources", "UI/UX Design", "Business Development", "Forex Trading",
    "Wealth Management", "Compliance Officer", "Loan Officer", "Actuary", "Stock Analysis"
]; // Note: Ensure your HTML has a container for these

let selectedCats = [];

function openWorkflow() {
    const modal = document.getElementById('jobModal');
    if (modal) {
        modal.style.display = 'block';
        loadCategories();
    }
}

function closeWorkflow() {
    const modal = document.getElementById('jobModal');
    if (modal) modal.style.display = 'none';
}

function nextStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.step').forEach(step => {
        step.style.display = 'none';
        step.classList.remove('active');
    });
    // Show target step
    const target = document.getElementById('step' + stepNumber);
    if (target) {
        target.style.display = 'block';
        target.classList.add('active');
    }
}

function selectOnly(el) {
    const options = el.parentElement.querySelectorAll('.stack-option');
    options.forEach(opt => opt.classList.remove('selected'));
    el.classList.add('selected');
}

function updateSalary(val) {
    const display = document.getElementById('salaryDisplay');
    if (display) display.innerText = '$' + Number(val).toLocaleString();
}

function loadCategories() {
    const container = document.getElementById('categoryContainer');
    if (!container) return;
    container.innerHTML = allCategories.sort().map(cat => `
        <div class="stack-option" onclick="toggleCategory(this, '${cat}')">${cat}</div>
    `).join('');
}

function toggleCategory(el, cat) {
    if (el.classList.contains('selected')) {
        el.classList.remove('selected');
        selectedCats = selectedCats.filter(i => i !== cat);
    } else {
        if (selectedCats.length < 3) {
            el.classList.add('selected');
            selectedCats.push(cat);
        } else {
            alert("Please select only 3 categories.");
        }
    }
    const counter = document.getElementById('catCount');
    if (counter) counter.innerText = selectedCats.length;
}

// --- Initialization on Load ---
document.addEventListener('DOMContentLoaded', function() {
    initMap();
    validateForm('appointmentForm');
    validateForm('signupForm');
    validateForm('contactForm');

    // Handle smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
});

// Close modal if user clicks outside
window.onclick = function(event) {
    const modal = document.getElementById('jobModal');
    if (event.target == modal) closeWorkflow();
};