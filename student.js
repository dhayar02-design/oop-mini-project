const API_BASE = 'http://localhost:8080/api';
let currentStudent = null;

// Check authentication
document.addEventListener('DOMContentLoaded', () => {
    const student = localStorage.getItem('student');
    if (!student) {
        window.location.href = 'login.html';
        return;
    }
    
    currentStudent = JSON.parse(student);
    document.getElementById('welcomeMsg').textContent = `Welcome, ${currentStudent.name}!`;
    
    loadMyComplaints();
});

// Tab switching
function showSubmitForm() {
    document.getElementById('submitSection').classList.remove('hidden');
    document.getElementById('complaintsSection').classList.add('hidden');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
}

function showMyComplaints() {
    document.getElementById('submitSection').classList.add('hidden');
    document.getElementById('complaintsSection').classList.remove('hidden');
    document.querySelectorAll('.tab-btn')[0].classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    loadMyComplaints();
}

// Submit complaint
document.getElementById('complaintForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    
    const complaint = {
        studentId: currentStudent.studentId,
        title: title,
        description: description
    };
    
    try {
        const response = await fetch(`${API_BASE}/complaints`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(complaint)
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert(data.message);
            document.getElementById('complaintForm').reset();
            loadMyComplaints();
        } else {
            alert('Submission failed: ' + data.message);
        }
    } catch (error) {
        alert('Error: ' + error.message);
    }
});

// Load student's complaints
async function loadMyComplaints() {
    try {
        const response = await fetch(`${API_BASE}/complaints/student/${currentStudent.studentId}`);
        const complaints = await response.json();
        
        const tbody = document.getElementById('myComplaintsBody');
        tbody.innerHTML = '';
        
        complaints.forEach(complaint => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${complaint.complaintId}</td>
                <td>${complaint.title}</td>
                <td>${complaint.description.substring(0, 50)}...</td>
                <td><span class="status-${complaint.status.toLowerCase().replace(' ', '-')}">${complaint.status}</span></td>
                <td>${new Date(complaint.timestamp).toLocaleDateString()}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error loading complaints:', error);
    }
}

// Logout
function logout() {
    localStorage.removeItem('student');
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