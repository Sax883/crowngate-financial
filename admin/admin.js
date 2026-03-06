// Admin Dashboard JavaScript

// Load all data from localStorage
function loadAllData() {
    updateDashboard();
    loadMessages();
    loadAppointments();
    loadSignups();
    loadClients();
}

// Admin Dashboard JavaScript

// Load all data from localStorage
function loadAllData() {
    updateDashboard();
    loadMessages();
    loadAppointments();
    loadSignups();
    loadClients();
}

// Show specific section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    
    // Update nav links
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).style.display = 'block';
    if (event && event.target) {
        event.target.closest('.nav-link').classList.add('active');
    }
    
    // Load data for the section
    if (sectionId === 'messages') {
        loadMessages();
    } else if (sectionId === 'appointments') {
        loadAppointments();
    } else if (sectionId === 'signups') {
        loadSignups();
    } else if (sectionId === 'clients') {
        loadClients();
    }
}

// Update Dashboard
function updateDashboard() {
    const messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const signups = JSON.parse(localStorage.getItem('signups')) || [];
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    
    // Update stat cards
    if(document.getElementById('totalMessages')) document.getElementById('totalMessages').textContent = messages.length;
    if(document.getElementById('totalAppointments')) document.getElementById('totalAppointments').textContent = appointments.length;
    if(document.getElementById('totalClients')) document.getElementById('totalClients').textContent = clients.length;
    if(document.getElementById('pendingSignups')) document.getElementById('pendingSignups').textContent = signups.filter(s => s.status === 'pending').length;
    
    // Update message badge
    if(document.getElementById('msgBadge')) document.getElementById('msgBadge').textContent = messages.filter(m => !m.replied).length;
    
    // Display recent activity
    const recentActivity = document.getElementById('recentActivity');
    if (recentActivity) {
        let activity = '<ul class="list-unstyled">';
        
        if (messages.length > 0) {
            activity += `<li class="mb-2"><i class="fas fa-envelope text-primary"></i> <strong>${messages.length}</strong> customer messages</li>`;
        }
        if (appointments.length > 0) {
            activity += `<li class="mb-2"><i class="fas fa-calendar text-success"></i> <strong>${appointments.length}</strong> appointments booked</li>`;
        }
        if (signups.length > 0) {
            activity += `<li class="mb-2"><i class="fas fa-user-plus text-info"></i> <strong>${signups.length}</strong> new sign ups</li>`;
        }
        if (clients.length > 0) {
            activity += `<li class="mb-2"><i class="fas fa-users text-warning"></i> <strong>${clients.length}</strong> total clients</li>`;
        }
        
        if (activity === '<ul class="list-unstyled">') {
            activity += '<li class="text-muted">No activity yet</li>';
        }
        
        activity += '</ul>';
        recentActivity.innerHTML = activity;
    }
}

// Load Messages
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
    const messagesList = document.getElementById('messagesList');
    
    if (!messagesList) return;

    if (messages.length === 0) {
        messagesList.innerHTML = '<p class="text-muted">No messages yet</p>';
        return;
    }
    
    let html = '';
    messages.forEach((msg, index) => {
        const unread = !msg.replied ? 'unread' : '';
        const status = msg.replied ? '<span class="badge bg-success float-end">Replied</span>' : '<span class="badge bg-warning float-end">Pending</span>';
        
        // Use HTML entities to prevent single/double quotes from breaking the onclick string
        const safeMsg = (msg.message || msg.description || "").replace(/'/g, "&apos;").replace(/"/g, "&quot;");
        const safeFirst = (msg.firstName || "").replace(/'/g, "&apos;");
        const safeLast = (msg.lastName || "").replace(/'/g, "&apos;");
        
        html += `
            <div class="message-item ${unread}">
                <h6>${msg.firstName} ${msg.lastName} ${status}</h6>
                <p>${msg.message || msg.description}</p>
                <small class="text-muted">${msg.timestamp}</small>
                <div class="mt-2">
                    <button class="btn btn-sm btn-canada-red me-2" 
                            onclick="openReplyModal(${index}, '${safeFirst}', '${safeLast}', '${msg.email}', '${safeMsg}')">
                        <i class="fas fa-reply"></i> Reply
                    </button>
                    <button class="btn btn-sm btn-outline-danger" onclick="deleteMessage(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `;
    });
    
    messagesList.innerHTML = html;
}

// Open Reply Modal
function openReplyModal(index, firstName, lastName, email, originalMsg) {
    // Fill the modal fields
    document.getElementById('replyClientName').value = firstName + ' ' + lastName;
    document.getElementById('replyClientEmail').value = email;
    document.getElementById('replyOriginalMsg').value = originalMsg;
    document.getElementById('replyText').value = '';
    window.currentMessageIndex = index;
    
    // Trigger the Bootstrap Modal correctly for both mobile and desktop
    const modalElement = document.getElementById('replyModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
        modal.show();
    }
}

// Send Reply
function sendReply() {
    const replyText = document.getElementById('replyText').value.trim();
    if (!replyText) {
        alert('Please type a reply message');
        return;
    }
    
    const messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
    if (window.currentMessageIndex !== undefined && messages[window.currentMessageIndex]) {
        messages[window.currentMessageIndex].replied = true;
        messages[window.currentMessageIndex].reply = replyText;
        messages[window.currentMessageIndex].replyDate = new Date().toLocaleString();
        
        localStorage.setItem('customerMessages', JSON.stringify(messages));
        alert('Reply sent successfully!');
        
        const modalElement = document.getElementById('replyModal');
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) modal.hide();
        
        loadMessages();
        updateDashboard();
    }
}

// Delete Message
function deleteMessage(index) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
        messages.splice(index, 1);
        localStorage.setItem('customerMessages', JSON.stringify(messages));
        loadMessages();
        updateDashboard();
    }
}

// Load Appointments
function loadAppointments() {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const appointmentsTable = document.getElementById('appointmentsTable');
    
    if (!appointmentsTable) return;

    if (appointments.length === 0) {
        appointmentsTable.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">No appointments scheduled</td></tr>';
        return;
    }
    
    let html = '';
    appointments.forEach((appt, index) => {
        const statusBadge = appt.status === 'confirmed' ? 'badge-approved' : (appt.status === 'pending' ? 'badge-pending' : 'badge-rejected');
        
        html += `
            <tr>
                <td>${appt.firstName} ${appt.lastName}</td>
                <td>${appt.appointmentDate} ${appt.appointmentTime}</td>
                <td>${appt.serviceType}</td>
                <td><span class="badge-custom ${statusBadge}">${appt.status || 'Pending'}</span></td>
                <td>
                    <button class="btn btn-sm btn-canada-red me-1" onclick="approveAppointment(${index})">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn btn-sm btn-danger me-1" onclick="rejectAppointment(${index})">
                        <i class="fas fa-times"></i> Reject
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="deleteAppointment(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    appointmentsTable.innerHTML = html;
}

// Approve Appointment
function approveAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments[index].status = 'confirmed';
    localStorage.setItem('appointments', JSON.stringify(appointments));
    alert('Appointment approved!');
    loadAppointments();
    updateDashboard();
}

// Reject Appointment
function rejectAppointment(index) {
    if (confirm('Are you sure you want to reject this appointment?')) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments[index].status = 'rejected';
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
        updateDashboard();
    }
}

// Delete Appointment
function deleteAppointment(index) {
    if (confirm('Are you sure you want to delete this appointment? This action cannot be undone.')) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
        alert('Appointment deleted successfully!');
        loadAppointments();
        updateDashboard();
    }
}

// Load Signups
function loadSignups() {
    const signups = JSON.parse(localStorage.getItem('signups')) || [];
    const signupsTable = document.getElementById('signupsTable');
    
    if (!signupsTable) return;

    if (signups.length === 0) {
        signupsTable.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No new sign ups</td></tr>';
        return;
    }
    
    let html = '';
    signups.forEach((signup, index) => {
        const statusBadge = signup.status === 'approved' ? 'badge-approved' : (signup.status === 'pending' ? 'badge-pending' : 'badge-rejected');
        
        html += `
            <tr>
                <td>${signup.firstName} ${signup.lastName}</td>
                <td>${signup.email}</td>
                <td>${signup.accountType}</td>
                <td>${signup.timestamp || 'N/A'}</td>
                <td><span class="badge-custom ${statusBadge}">${signup.status || 'Pending'}</span></td>
                <td>
                    <button class="btn btn-sm btn-canada-red me-1" onclick="approveSignup(${index})">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn btn-sm btn-danger me-1" onclick="rejectSignup(${index})">
                        <i class="fas fa-times"></i> Reject
                    </button>
                    <button class="btn btn-sm btn-secondary" onclick="deleteSignup(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    signupsTable.innerHTML = html;
}

// Approve Signup
function approveSignup(index) {
    const signups = JSON.parse(localStorage.getItem('signups')) || [];
    signups[index].status = 'approved';
    
    // Move to clients
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push({
        ...signups[index],
        status: 'active'
    });
    
    localStorage.setItem('signups', JSON.stringify(signups));
    localStorage.setItem('clients', JSON.stringify(clients));
    alert('Signup approved! User added to clients.');
    loadSignups();
    updateDashboard();
}

// Reject Signup
function rejectSignup(index) {
    if (confirm('Are you sure you want to reject this signup?')) {
        const signups = JSON.parse(localStorage.getItem('signups')) || [];
        signups[index].status = 'rejected';
        localStorage.setItem('signups', JSON.stringify(signups));
        loadSignups();
        updateDashboard();
    }
}

// Delete Signup
function deleteSignup(index) {
    if (confirm('Are you sure you want to delete this signup? This action cannot be undone.')) {
        const signups = JSON.parse(localStorage.getItem('signups')) || [];
        signups.splice(index, 1);
        localStorage.setItem('signups', JSON.stringify(signups));
        alert('Signup deleted successfully!');
        loadSignups();
        updateDashboard();
    }
}

// Load Clients
function loadClients() {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const clientsTable = document.getElementById('clientsTable');
    
    if (!clientsTable) return;

    if (clients.length === 0) {
        clientsTable.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No clients found</td></tr>';
        return;
    }
    
    let html = '';
    clients.forEach((client, index) => {
        const statusBadge = client.status === 'active' ? 'badge-approved' : 'badge-pending';
        
        html += `
            <tr>
                <td>${client.firstName} ${client.lastName}</td>
                <td>${client.email}</td>
                <td>${client.phone || 'N/A'}</td>
                <td>${client.accountType}</td>
                <td><span class="badge-custom ${statusBadge}">${client.status || 'Active'}</span></td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="viewClientDetails(${index})">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteClient(${index})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            </tr>
        `;
    });
    
    clientsTable.innerHTML = html;
}

// View Client Details
function viewClientDetails(index) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const client = clients[index];
    
    alert(`
Client Details:
Name: ${client.firstName} ${client.lastName}
Email: ${client.email}
Phone: ${client.phone}
Account Type: ${client.accountType}
Status: ${client.status}
    `);
}

// Delete Client
function deleteClient(index) {
    if (confirm('Are you sure you want to delete this client?')) {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        clients.splice(index, 1);
        localStorage.setItem('clients', JSON.stringify(clients));
        loadClients();
        updateDashboard();
    }
}

// Save Settings
function saveSettings() {
    const settings = {
        adminName: document.getElementById('adminName').value,
        adminEmail: document.getElementById('adminEmail').value,
        supportEmail: document.getElementById('supportEmail').value,
        whatsappNumber: document.getElementById('whatsappNumber').value,
        responseTime: document.getElementById('responseTime').value,
        openTime: document.getElementById('openTime').value,
        closeTime: document.getElementById('closeTime').value
    };
    
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
}

// Load Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || {};
    
    if (settings.adminName && document.getElementById('adminName')) document.getElementById('adminName').value = settings.adminName;
    if (settings.adminEmail && document.getElementById('adminEmail')) document.getElementById('adminEmail').value = settings.adminEmail;
    if (settings.supportEmail && document.getElementById('supportEmail')) document.getElementById('supportEmail').value = settings.supportEmail;
    if (settings.whatsappNumber && document.getElementById('whatsappNumber')) document.getElementById('whatsappNumber').value = settings.whatsappNumber;
    if (settings.responseTime && document.getElementById('responseTime')) document.getElementById('responseTime').value = settings.responseTime;
    if (settings.openTime && document.getElementById('openTime')) document.getElementById('openTime').value = settings.openTime;
    if (settings.closeTime && document.getElementById('closeTime')) document.getElementById('closeTime').value = settings.closeTime;
}

// Export Data
function exportData(type) {
    let data = [];
    let filename = '';
    
    if (type === 'clients') {
        data = JSON.parse(localStorage.getItem('clients')) || [];
        filename = 'clients.json';
    } else if (type === 'messages') {
        data = JSON.parse(localStorage.getItem('customerMessages')) || [];
        filename = 'messages.json';
    } else if (type === 'appointments') {
        data = JSON.parse(localStorage.getItem('appointments')) || [];
        filename = 'appointments.json';
    }
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
}

// Logout
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '../index.html';
    }
}

// Intercept form submissions to save to localStorage
window.addEventListener('load', function() {
    loadSettings();
    loadAllData();
    
    // Intercept signup form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(signupForm);
            const data = Object.fromEntries(formData);
            
            let signups = JSON.parse(localStorage.getItem('signups')) || [];
            signups.push({
                ...data,
                timestamp: new Date().toLocaleString(),
                status: 'pending',
                id: Date.now()
            });
            localStorage.setItem('signups', JSON.stringify(signups));
            
            signupForm.reset();
        });
    }
    
    // Intercept appointment form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(appointmentForm);
            const data = Object.fromEntries(formData);
            
            let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
            appointments.push({
                ...data,
                timestamp: new Date().toLocaleString(),
                status: 'pending',
                id: Date.now()
            });
            localStorage.setItem('appointments', JSON.stringify(appointments));
            
            appointmentForm.reset();
        });
    }
});

// Auto refresh dashboard
setInterval(() => {
    const dashboard = document.getElementById('dashboard');
    if (dashboard && dashboard.style.display !== 'none') {
        updateDashboard();
    }
}, 5000);