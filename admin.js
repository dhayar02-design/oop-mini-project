const API_BASE = 'http://localhost:8080/api';
let allComplaints = [];

// Check admin authentication
document.addEventListener('DOMContentLoaded', () => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
        window.location.href = 'login.html';
        return;
    }
    
    loadComplaints();
});

// Load all complaints
async function loadComplaints() {
    try {
        const response = await fetch(`${API_BASE}/complaints`);
        allComplaints = await response.json();
        displayComplaints(allComplaints);
    } catch (error) {
        console.error('Error loading complaints:', error);
        alert('Error loading complaints: ' + error.message);
    }
}

// Display complaints in table
function displayComplaints(complaints) {
    const tbody = document.getElementById('complaintTableBody');
    tbody.innerHTML = '';
    
    complaints.forEach(complaint => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${complaint.complaintId}</td>
            <td>${complaint.studentId}</td>
            <td>${complaint.title}</td>
            <td>${complaint.description.substring(0, 100)}...</td>
            <td><span class="status-${complaint.status.toLowerCase().replace(' ', '-')}">${complaint.status}</span></td>
            <td>${new Date(complaint.timestamp).toLocaleDateString()}</td>
            <td>
                ${complaint.status === 'Pending' ? 
                    `<button class="action-btn btn-progress" onclick="updateStatus(${complaint.complaintId}, 'In Progress')">In Progress</button>` : ''}
                ${complaint.status !== 'Resolved' ? 
                    `<button class="action-btn btn-resolve" onclick="updateStatus(${complaint.complaintId}, 'Resolved')">Resolve</button>` : ''}
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Update complaint status
async function updateStatus(complaintId, status) {
    try {
        const response = await fetch(`${API_BASE}/complaints/${complaintId}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Status updated successfully!');
            loadComplaints();
        } else {
            alert('Update failed: ' + data.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
}

// Filter complaints by status
function filterComplaints() {
    const filter = document.getElementById('statusFilter').value;
    
    if (filter === 'all') {
        displayComplaints(allComplaints);
    } else {
        const filtered = allComplaints.filter(complaint => complaint.status === filter);
        displayComplaints(filtered);
    }
}

// Logout
function logout() {
    localStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
}

// Particles animation
function spawnParticles() {
    const wrapper = document.getElementById('particleWrapper');
    
    setInterval(() => {
        const p = document.createElement('div');
        p.classList.add('particle');
        p.style.left = Math.random() * window.innerWidth + 'px';
        p.style.animationDuration = (4 + Math.random() * 3) + 's';
        wrapper.appendChild(p);
        setTimeout(() => p.remove(), 6000);
    }, 200);
}

function sunflowerFlow() {
    const wrapper = document.getElementById('particleWrapper');
    
    setInterval(() => {
        const s = document.createElement('div');
        s.classList.add('sunflower');
        s.style.left = Math.random() * window.innerWidth + 'px';
        s.style.animationDuration = (8 + Math.random() * 6) + 's';
        wrapper.appendChild(s);
        setTimeout(() => s.remove(), 12000);
    }, 700);
}

spawnParticles();
sunflowerFlow();