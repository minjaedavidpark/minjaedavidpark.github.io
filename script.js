// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    
    if (window.scrollY > 100) {
        if (currentTheme === 'dark') {
            navbar.style.background = 'rgba(26, 26, 26, 0.6)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.6)';
            navbar.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
        }
    } else {
        // Reset to default glassy background
        navbar.style.background = '';
        navbar.style.boxShadow = '';
    }
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about, .skills, .projects, .contact');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});





// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    // Store the original HTML content
    const originalHTML = element.innerHTML;
    
    // Create a temporary element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = originalHTML;
    
    // Get the text content without HTML tags
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    // Clear the element and start typing
    element.innerHTML = '';
    
    let i = 0;
    
    function type() {
        if (i < textContent.length) {
            element.innerHTML = textContent.substring(0, i + 1);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        // Delay typing effect to let page load
        setTimeout(() => {
            typeWriter(heroTitle, '', 80);
        }, 0);
    }
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Add active state to navigation links based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Theme toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update button icon
    const icon = themeToggleBtn.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
    
    // Reset navbar background to match theme
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        // Reset to default glassy background
        navbar.style.background = '';
        navbar.style.boxShadow = '';
    }
}

// Function to toggle theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// Initialize theme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('light'); // Default to light mode
    }
}

// Event listeners
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', initTheme);

// Projects expand/collapse functionality
const expandBtn = document.getElementById('expand-projects-btn');
const additionalProjects = document.querySelectorAll('.project-card:not(.featured)');

if (expandBtn && additionalProjects.length > 0) {
    expandBtn.addEventListener('click', () => {
        const isExpanded = expandBtn.classList.contains('expanded');
        
        if (isExpanded) {
            // Collapse - hide additional projects
            additionalProjects.forEach(project => {
                project.style.display = 'none';
            });
            
            // Update button
            expandBtn.classList.remove('expanded');
            expandBtn.querySelector('.expand-text').textContent = 'Show More Projects';
            expandBtn.querySelector('.expand-icon').className = 'fas fa-chevron-down expand-icon';
            
            // Smooth scroll to top of projects section
            document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
        } else {
            // Expand - show additional projects
            additionalProjects.forEach((project, index) => {
                setTimeout(() => {
                    project.style.display = 'block';
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(20px)';
                    
                    // Animate in
                    setTimeout(() => {
                        project.style.transition = 'all 0.6s ease';
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
            
            // Update button
            expandBtn.classList.add('expanded');
            expandBtn.querySelector('.expand-text').textContent = 'Show Less Projects';
            expandBtn.querySelector('.expand-icon').className = 'fas fa-chevron-up expand-icon';
        }
    });
}

// Add CSS for active navigation state
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #667eea !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Smooth reveal animation for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease';
    
    setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, index * 200);
});

// Add hover effects for skill items
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'scale(1.05)';
        item.style.boxShadow = '0 5px 15px rgba(102, 126, 234, 0.2)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'scale(1)';
        item.style.boxShadow = 'none';
    });
});

// Add scroll-triggered animations for stats
const stats = document.querySelectorAll('.stat');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const originalText = statNumber.textContent;
            
            // Check if it's a number that should be animated
            if (originalText.includes('.')) {
                // Handle decimal numbers like GPA
                const targetNumber = parseFloat(originalText);
                animateNumber(statNumber, 0, targetNumber, 2000, true);
            } else if (originalText.includes('th') || originalText.includes('st') || originalText.includes('nd') || originalText.includes('rd')) {
                // Handle ordinal numbers like "4th"
                const targetNumber = parseInt(originalText);
                const suffix = originalText.replace(/\d+/, ''); // Extract the suffix (th, st, nd, rd)
                animateNumber(statNumber, 0, targetNumber, 2000, false, suffix);
            } else if (originalText.includes('+')) {
                // Handle numbers with plus signs like "10+"
                const targetNumber = parseInt(originalText);
                animateNumber(statNumber, 0, targetNumber, 2000, false, '+');
            } else {
                // Handle regular integers
                const targetNumber = parseInt(originalText);
                animateNumber(statNumber, 0, targetNumber, 2000, false, '');
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => statsObserver.observe(stat));

function animateNumber(element, start, end, duration, isDecimal = false, suffix = '') {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        let current;
        if (isDecimal) {
            current = start + (difference * progress);
            element.textContent = current.toFixed(2);
        } else {
            current = Math.floor(start + (difference * progress));
            element.textContent = current + suffix;
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}




