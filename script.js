// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Remove active from all
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    
    // Add active to clicked
    item.classList.add('active');
    const section = item.dataset.section;
    document.getElementById(section).classList.add('active');
  });
});

// Theme Toggle
let isDark = true;
document.querySelector('.theme-toggle').addEventListener('click', () => {
  isDark = !isDark;
  document.body.style.filter = isDark ? 'none' : 'invert(1)';
  document.querySelector('.theme-toggle').textContent = isDark ? '🌙' : '☀️';
});

// Scan Buttons
let isScanning = false;

document.getElementById('quickScan').addEventListener('click', () => startScan('quick', 5));
document.getElementById('fullScan').addEventListener('click', () => startScan('full', 45));
document.getElementById('customScan').addEventListener('click', () => startScan('custom', 15));

function startScan(type, duration) {
  if (isScanning) return;
  
  isScanning = true;
  let progress = 0;
  let fileCount = 0;
  const maxFiles = type === 'quick' ? 1500 : 8000;
  
  document.querySelectorAll('.scan-options button').forEach(b => b.disabled = true);
  document.getElementById('scanProgress').style.display = 'block';
  document.getElementById('scanResults').style.display = 'none';
  
  const interval = setInterval(() => {
    progress += Math.random() * 8 + 2;
    fileCount = Math.floor((progress / 100) * maxFiles);
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      setTimeout(() => {
        isScanning = false;
        showScanResults(fileCount, Math.floor(Math.random() * 3));
        document.querySelectorAll('.scan-options button').forEach(b => b.disabled = false);
      }, 1000);
    }
    
    document.getElementById('scanFill').style.width = progress + '%';
    document.getElementById('scanPercent').textContent = Math.floor(progress) + '%';
    document.getElementById('scanFiles').textContent = 'Files: ' + fileCount;
  }, 200);
}

function showScanResults(files, threats) {
  document.getElementById('scanProgress').style.display = 'none';
  document.getElementById('scanResults').style.display = 'block';
  
  document.getElementById('resultFiles').textContent = files;
  document.getElementById('resultThreats').textContent = threats;
  document.getElementById('resultTime').textContent = (Math.floor(Math.random() * 30) + 10) + 's';
  
  if (threats > 0) {
    document.querySelector('.status-card').classList.remove('safe');
    document.querySelector('.status-card h2').textContent = 'Threats Found!';
  }
}

document.getElementById('pauseScan').addEventListener('click', function() {
  this.textContent = this.textContent === 'Pause' ? 'Resume' : 'Pause';
});

// Threat Actions
document.querySelectorAll('.threat-item .btn-danger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const item = e.target.closest('.threat-item');
    const threatName = item.querySelector('.threat-name').textContent;
    showNotification(`${threatName} removed successfully`);
    item.style.animation = 'fadeOut 0.3s';
    setTimeout(() => item.remove(), 300);
  });
});

// Quarantine Actions
document.querySelectorAll('.quarantine-item .btn-danger').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const item = e.target.closest('.quarantine-item');
    showNotification('File permanently deleted');
    item.style.animation = 'fadeOut 0.3s';
    setTimeout(() => item.remove(), 300);
  });
});

document.querySelectorAll('.quarantine-item .btn-secondary').forEach(btn => {
  if (btn.textContent.includes('Restore')) {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.quarantine-item');
      showNotification('File restored successfully');
      item.style.animation = 'fadeOut 0.3s';
      setTimeout(() => item.remove(), 300);
    });
  }
});

// Toggle Switches
document.querySelectorAll('toggle-switch').forEach(toggle => {
  toggle.addEventListener('click', () => {
    toggle.toggleAttribute('checked');
  });
});

// Settings Updates
document.querySelectorAll('.setting-item .btn-secondary').forEach(btn => {
  btn.addEventListener('click', () => {
    showNotification('Updating threat definitions...');
    btn.textContent = 'Updating...';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.textContent = 'Updated';
      setTimeout(() => {
        btn.textContent = 'Update Now';
        btn.disabled = false;
      }, 2000);
    }, 2500);
  });
});

// Notification System
function showNotification(message) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #22c55e;
    color: white;
    padding: 14px 20px;
    border-radius: 8px;
    z-index: 1000;
    animation: slideInUp 0.3s ease;
    font-weight: 600;
    font-size: 13px;
  `;
  notif.textContent = message;
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'slideOutDown 0.3s ease';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeOut {
    to {
      opacity: 0;
      transform: translateX(-20px);
    }
  }
  @keyframes slideInUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideOutDown {
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Sidebar Mobile
const sidebar = document.querySelector('.sidebar');
if (window.innerWidth < 768) {
  const toggleBtn = document.createElement('button');
  toggleBtn.innerHTML = '☰';
  toggleBtn.style.cssText = `
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 60;
    background: var(--bg-card);
    border: 1px solid var(--border);
    color: var(--text-primary);
    padding: 10px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 18px;
  `;
  
  toggleBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  document.body.appendChild(toggleBtn);
}

// Simulate live updates
setInterval(() => {
  if (!isScanning) {
    const threats = Math.floor(Math.random() * 3);
    document.getElementById('threatCount').textContent = threats;
    
    if (Math.random() > 0.7) {
      const message = threats > 0 ? 'Threat detected!' : 'System clean';
      showNotification(message);
    }
  }
}, 5000);

// Last scan time update
function updateLastScanTime() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  document.getElementById('lastScanTime').textContent = 
    `Last scan: ${hours}:${minutes.toString().padStart(2, '0')}`;
}

updateLastScanTime();
setInterval(updateLastScanTime, 60000);

// Initialize Protection Ring
document.addEventListener('DOMContentLoaded', () => {
  const ring = document.getElementById('protectionRing');
  if (ring) {
    let angle = 0;
    setInterval(() => {
      angle += 0.5;
      const circle = ring.querySelector('.progress-fill');
      if (circle) {
        circle.style.transform = `rotate(${angle}deg)`;
      }
    }, 50);
  }
});
