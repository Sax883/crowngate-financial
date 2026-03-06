// Admin Dashboard JavaScript

// Load all data from localStorage
function loadAllData() {
    updateDashboard();
    loadMessages();
    loadAppointments();
    loadSignups();
    loadClients();
    loadSettings();
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
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }

    // Update active class on nav link
    const activeLink = document.querySelector(`.sidebar .nav-link[onclick*="${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Load data for the specific section
    if (sectionId === 'messages') loadMessages();
    else if (sectionId === 'appointments') loadAppointments();
    else if (sectionId === 'signups') loadSignups();
    else if (sectionId === 'clients') loadClients();
}

// Update Dashboard Stats
function updateDashboard() {
    const messages = JSON.parse(localStorage.getItem('customerMessages')) || [];
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    const signups = JSON.parse(localStorage.getItem('signups')) || [];
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    
    if(document.getElementById('totalMessages')) document.getElementById('totalMessages').textContent = messages.length;
    if(document.getElementById('totalAppointments')) document.getElementById('totalAppointments').textContent = appointments.length;
    if(document.getElementById('totalClients')) document.getElementById('totalClients').textContent = clients.length;
    if(document.getElementById('pendingSignups')) document.getElementById('pendingSignups').textContent = signups.filter(s => s.status === 'pending').length;
    
    if(document.getElementById('msgBadge')) document.getElementById('msgBadge').textContent = messages.filter(m => !m.replied).length;
    
    const recentActivity = document.getElementById('recentActivity');
    if (recentActivity) {
        let activity = '<ul class="list-unstyled">';
        if (messages.length > 0) activity += `<li class="mb-2"><i class="fas fa-envelope text-primary"></i> <strong>${messages.length}</strong> customer messages</li>`;
        if (appointments.length > 0) activity += `<li class="mb-2"><i class="fas fa-calendar text-success"></i> <strong>${appointments.length}</strong> appointments booked</li>`;
        if (signups.length > 0) activity += `<li class="mb-2"><i class="fas fa-user-plus text-info"></i> <strong>${signups.length}</strong> new sign ups</li>`;
        if (clients.length > 0) activity += `<li class="mb-2"><i class="fas fa-users text-warning"></i> <strong>${clients.length}</strong> total clients</li>`;
        
        if (activity === '<ul class="list-unstyled">') activity += '<li class="text-muted">No activity yet</li>';
        activity += '</ul>';
        recentActivity.innerHTML = activity;
    }
}

// Load and Render Messages
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
    document.getElementById('replyClientName').value = firstName + ' ' + lastName;
    document.getElementById('replyClientEmail').value = email;
    document.getElementById('replyOriginalMsg').value = originalMsg;
    document.getElementById('replyText').value = '';
    window.currentMessageIndex = index;
    
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

function approveAppointment(index) {
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments[index].status = 'confirmed';
    localStorage.setItem('appointments', JSON.stringify(appointments));
    loadAppointments();
    updateDashboard();
}

function rejectAppointment(index) {
    if (confirm('Are you sure you want to reject this appointment?')) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments[index].status = 'rejected';
        localStorage.setItem('appointments', JSON.stringify(appointments));
        loadAppointments();
        updateDashboard();
    }
}

function deleteAppointment(index) {
    if (confirm('Delete this appointment permanently?')) {
        const appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.splice(index, 1);
        localStorage.setItem('appointments', JSON.stringify(appointments));
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

function approveSignup(index) {
    const signups = JSON.parse(localStorage.getItem('signups')) || [];
    signups[index].status = 'approved';
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    clients.push({ ...signups[index], status: 'active' });
    localStorage.setItem('signups', JSON.stringify(signups));
    localStorage.setItem('clients', JSON.stringify(clients));
    alert('Signup approved!');
    loadSignups();
    updateDashboard();
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
        html += `
            <tr>
                <td>${client.firstName} ${client.lastName}</td>
                <td>${client.email}</td>
                <td>${client.phone || 'N/A'}</td>
                <td>${client.accountType}</td>
                <td><span class="badge-custom badge-approved">Active</span></td>
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

function viewClientDetails(index) {
    const clients = JSON.parse(localStorage.getItem('clients')) || [];
    const client = clients[index];
    alert(`Name: ${client.firstName} ${client.lastName}\nEmail: ${client.email}\nPhone: ${client.phone}\nAccount: ${client.accountType}`);
}

function deleteClient(index) {
    if (confirm('Delete client?')) {
        const clients = JSON.parse(localStorage.getItem('clients')) || [];
        clients.splice(index, 1);
        localStorage.setItem('clients', JSON.stringify(clients));
        loadClients();
        updateDashboard();
    }
}

// Settings Management
function saveSettings() {
    const settings = {
        adminName: document.getElementById('adminName').value,
        adminEmail: document.getElementById('adminEmail').value
    };
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved!');
}

function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('adminSettings')) || {};
    if (settings.adminName && document.getElementById('adminName')) document.getElementById('adminName').value = settings.adminName;
    if (settings.adminEmail && document.getElementById('adminEmail')) document.getElementById('adminEmail').value = settings.adminEmail;
}

// Initializing
window.addEventListener('load', loadAllData);

// Auto refresh
setInterval(() => {
    const dashboard = document.getElementById('dashboard');
    if (dashboard && dashboard.style.display !== 'none') {
        updateDashboard();
    }
}, 5000);