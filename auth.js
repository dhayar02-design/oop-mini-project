 const API_BASE = 'http://localhost:8080/api';

// Tab switching
function showLogin() {
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.querySelectorAll('.tab-btn')[1].classList.remove('active');
}

function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
    document.querySelectorAll('.tab-btn')[0].classList.remove('active');
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
}

// Login form handler
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('student', JSON.stringify(data.student));
            alert('Login successful!');
            window.location.href = 'index.html';
        } else {
            alert('Login failed: ' + data.message);
        }
    } catch (error) {
        alert('Login error: ' + error.message);
    }
});

// Register form handler
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    
    try {
        const response = await fetch(`${API_BASE}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Registration successful! Please login.');
            showLogin();
            document.getElementById('registerForm').reset();
        } else {
            alert('Registration failed: ' + data.message);
        }
    } catch (error) {
        alert('Registration error: ' + error.message);
    }
});

// Admin login
function adminLogin() {
    const password = prompt('Enter admin password:');
    if (password === 'admin123') {
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid admin password!');
    }
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