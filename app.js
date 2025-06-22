// DataSovereign Final MVP - Main JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Main initialization function
function initApp() {
    // Initialize data category controls
    initDataCategories();
    
    // Initialize pricing engine visualization
    initPricingEngine();
    
    // Initialize quantum security badge
    initQuantumBadge();
    
    // Set up navigation
    initNavigation();
}

// Initialize data category controls
function initDataCategories() {
    // Get all data category cards
    const categoryCards = document.querySelectorAll('.data-category-card');
    
    // For each card, set up the sharing controls
    categoryCards.forEach(card => {
        const sharingOptions = card.querySelectorAll('.sharing-option');
        const dataPoints = card.querySelectorAll('.data-point-value');
        
        // Add click event to each sharing option
        sharingOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove active class from all options in this card
                sharingOptions.forEach(opt => opt.classList.remove('active'));
                
                // Add active class to clicked option
                this.classList.add('active');
                
                // Update data points based on sharing level
                const sharingLevel = this.getAttribute('data-value');
                updateDataPoints(dataPoints, sharingLevel);
                
                // Update the pricing engine
                updatePricing();
            });
        });
    });
}

// Update data points based on sharing level
function updateDataPoints(dataPoints, sharingLevel) {
    switch(sharingLevel) {
        case 'none':
            dataPoints.forEach(point => {
                point.textContent = 'Not Shared';
            });
            break;
        case 'partial':
            // Randomly share some data points
            dataPoints.forEach((point, index) => {
                point.textContent = index % 2 === 0 ? 'Shared' : 'Not Shared';
            });
            break;
        case 'full':
            dataPoints.forEach(point => {
                point.textContent = 'Shared';
            });
            break;
    }
}

// Initialize pricing engine visualization
function initPricingEngine() {
    // Set up initial pricing
    updatePricing();
    
    // Animate the chart line
    animateChartLine();
}

// Update pricing based on current sharing settings
function updatePricing() {
    // Get all active sharing options
    const activeOptions = document.querySelectorAll('.sharing-option.active');
    
    // Calculate base value
    let totalValue = 0;
    
    activeOptions.forEach(option => {
        const sharingLevel = option.getAttribute('data-value');
        const categoryCard = option.closest('.data-category-card');
        const categoryValueElement = categoryCard.querySelector('.category-value');
        
        // Extract the numeric value from the category value text
        const valueText = categoryValueElement.textContent.trim();
        const value = parseFloat(valueText.replace('$', '').replace('/mo', ''));
        
        // Add to total based on sharing level
        switch(sharingLevel) {
            case 'none':
                // No value added
                break;
            case 'partial':
                totalValue += value * 0.5; // 50% of full value
                break;
            case 'full':
                totalValue += value; // 100% of full value
                break;
        }
    });
    
    // Update the pricing display
    const pricingValueElement = document.querySelector('.pricing-value');
    pricingValueElement.textContent = `$${totalValue.toFixed(2)}/month`;
    
    // Add animation effect
    pricingValueElement.classList.add('highlight');
    setTimeout(() => {
        pricingValueElement.classList.remove('highlight');
    }, 1000);
}

// Animate the chart line
function animateChartLine() {
    const chartLine = document.querySelector('.chart-line');
    
    // Simple animation effect
    setInterval(() => {
        const randomOffset = Math.random() * 10 - 5;
        chartLine.style.transform = `translateY(${randomOffset}px)`;
    }, 2000);
}

// Initialize quantum security badge
function initQuantumBadge() {
    const badge = document.querySelector('.quantum-badge');
    
    // Add hover effect
    badge.addEventListener('mouseenter', function() {
        showTooltip(badge, 'This system simulates quantum-proof security using lattice-based encryption placeholders');
    });
    
    badge.addEventListener('mouseleave', function() {
        hideTooltip();
    });
    
    // Simulate security checks
    simulateSecurityChecks();
}

// Show tooltip
function showTooltip(element, text) {
    // Remove any existing tooltips
    hideTooltip();
    
    // Create tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '0.8rem';
    tooltip.style.maxWidth = '250px';
    tooltip.style.zIndex = '1000';
    tooltip.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
    
    // Add to body
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    
    // Add animation
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.remove();
    }
}

// Simulate security checks
function simulateSecurityChecks() {
    const status = document.querySelector('.quantum-status');
    
    // Simulate periodic security checks
    setInterval(() => {
        // Simulate check animation
        status.style.backgroundColor = 'var(--warning)';
        setTimeout(() => {
            status.style.backgroundColor = 'var(--success)';
        }, 500);
    }, 30000); // Every 30 seconds
}

// Initialize navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            // Scroll to target section
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}
