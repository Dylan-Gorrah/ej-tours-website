// ===========================
// TOURS DATA
// ===========================
const tours = [
    {
        name: "Table Mountain Tour",
        description: "Experience breathtaking views from the iconic Table Mountain. Cable car ride included.",
        image: "images/tour-table-mountain.jpg",
        badge: "Popular",
        features: ["Half Day", "Cable Car", "Scenic Views"]
    },
    {
        name: "Cape Point Tour",
        description: "Visit the southernmost tip of Africa with stunning ocean views and dramatic cliffs.",
        image: "images/tour-cape-point.jpg",
        badge: "Adventure",
        features: ["Full Day", "Scenic Drive", "Lighthouse"]
    },
    {
        name: "Wine Tours",
        description: "Explore world-class wineries in Stellenbosch and Franschhoek. Tastings included.",
        image: "images/tour-wine.jpg",
        badge: "Premium",
        features: ["Full Day", "Tastings", "Lunch"]
    },
    {
        name: "Boulders Beach Penguin Tour",
        description: "Meet the famous African penguins at Boulders Beach in their natural habitat.",
        image: "images/tour-penguins.jpg",
        badge: "Family",
        features: ["Half Day", "Wildlife", "Beach"]
    },
    {
        name: "Safari Tour",
        description: "Experience African wildlife up close on a thrilling safari adventure.",
        image: "images/tour-safari.jpg",
        badge: "Wildlife",
        features: ["Full Day", "Big 5", "Nature"]
    },
    {
        name: "Bo-Kaap Colorful Houses",
        description: "Explore the vibrant, historic Bo-Kaap neighborhood with its iconic colorful homes.",
        image: "images/tour-bokaap.jpg",
        badge: "Culture",
        features: ["Half Day", "Photography", "History"]
    },
    {
        name: "Garden Route Tour",
        description: "Discover the scenic Garden Route with its beautiful landscapes and coastal towns.",
        image: "images/tour-garden-route.jpg",
        badge: "Adventure",
        features: ["Multi-Day", "Scenic", "Nature"]
    },
    {
        name: "Robben Island Tour",
        description: "Visit the historic island where Nelson Mandela was imprisoned. A UNESCO World Heritage Site.",
        image: "images/tour-robben-island.jpg",
        badge: "History",
        features: ["Half Day", "Ferry", "Museum"]
    },
    {
        name: "Airport Transfer",
        description: "Reliable, comfortable airport pickup and drop-off service. Available 24/7.",
        image: "images/tour-airport.jpg",
        badge: "Service",
        features: ["24/7", "Meet & Greet", "Luggage"]
    },
    {
        name: "Hunting Experience",
        description: "Professional hunting experiences in South Africa's finest game reserves.",
        image: "images/tour-hunting.jpg",
        badge: "Premium",
        features: ["Multi-Day", "Licensed", "Professional"]
    }
];

// ===========================
// DOM ELEMENTS
// ===========================
const navMenu = document.getElementById('navMenu');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const bookingForm = document.getElementById('bookingForm');
const bookingModal = document.getElementById('bookingModal');
const closeModal = document.getElementById('closeModal');
const confirmBtn = document.getElementById('confirmBtn');
const confirmationMessage = document.getElementById('confirmationMessage');
const toursGrid = document.getElementById('toursGrid');
const floatingContactBtn = document.getElementById('floatingContactBtn');
const contactPanel = document.getElementById('contactPanel');
const closePanelBtn = document.getElementById('closePanel');
const toastNotification = document.getElementById('toastNotification');

// ===========================
// LOAD TOURS FUNCTION
// ===========================
function loadTours() {
    tours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.className = 'tour-card';
        tourCard.innerHTML = `
            <div class="tour-img">
                <div class="tour-img-bg" style="background-image: url('${tour.image}')"></div>
                <div class="tour-badge">${tour.badge}</div>
            </div>
            <div class="tour-info">
                <h3>${tour.name}</h3>
                <p>${tour.description}</p>
                <div class="tour-features">
                    ${tour.features.map(feature => `<span class="feature-tag"><i class="fas fa-check"></i> ${feature}</span>`).join('')}
                </div>
            </div>
        `;
        toursGrid.appendChild(tourCard);
    });
}

// ===========================
// MOBILE MENU TOGGLE - IMPROVED
// ===========================
function toggleMobileMenu() {
    const isActive = navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = isActive 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
    
    // Prevent body scroll when menu is open on mobile
    if (isActive) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Add both click and touchend for better mobile support
mobileMenuBtn.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleMobileMenu();
});

// Prevent double-firing on touch devices
let touchStarted = false;
mobileMenuBtn.addEventListener('touchstart', function() {
    touchStarted = true;
});

mobileMenuBtn.addEventListener('touchend', function(e) {
    if (touchStarted) {
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
        touchStarted = false;
    }
});

// ===========================
// CLOSE MOBILE MENU ON LINK CLICK
// ===========================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(e) {
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        document.body.style.overflow = '';
    }
});

// ===========================
// SCROLL DETECTION FOR CONTACT BUTTON - IMPROVED
// ===========================
let contactBtnVisible = false;
let ticking = false;

function updateContactButton() {
    const heroHeight = document.querySelector('.hero').offsetHeight;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    // Show contact button after scrolling 70% past hero section
    if (scrollPosition > heroHeight * 0.7 && !contactBtnVisible) {
        floatingContactBtn.classList.add('visible');
        contactBtnVisible = true;
    } else if (scrollPosition <= heroHeight * 0.5 && contactBtnVisible) {
        floatingContactBtn.classList.remove('visible');
        contactPanel.classList.remove('active');
        contactBtnVisible = false;
    }
    
    ticking = false;
}

// Use requestAnimationFrame for better performance
window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(updateContactButton);
        ticking = true;
    }
}, { passive: true });

// Also check on load in case user refreshes mid-page
window.addEventListener('load', updateContactButton);

// ===========================
// FLOATING CONTACT PANEL
// ===========================
// Toggle contact panel
floatingContactBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    contactPanel.classList.toggle('active');
});

// Close panel with close button
closePanelBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    contactPanel.classList.remove('active');
});

// Close panel when clicking outside
document.addEventListener('click', function(e) {
    if (!contactPanel.contains(e.target) && !floatingContactBtn.contains(e.target)) {
        contactPanel.classList.remove('active');
    }
});

// Prevent panel from closing when clicking inside it
contactPanel.addEventListener('click', function(e) {
    e.stopPropagation();
});

// ===========================
// EMAIL AUTO-COPY FUNCTIONALITY
// ===========================
const emailBtn = document.querySelector('.email-btn');

function showToast(message) {
    const toastMessage = document.getElementById('toastMessage');
    toastMessage.textContent = message;
    toastNotification.classList.add('show');
    
    setTimeout(() => {
        toastNotification.classList.remove('show');
    }, 3000);
}

emailBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = emailBtn.getAttribute('data-email');
    
    try {
        // Try using the modern Clipboard API
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email);
            showToast('Email copied to clipboard!');
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                showToast('Email copied to clipboard!');
            } catch (err) {
                // If copy fails, open email client
                window.location.href = `mailto:${email}`;
            }
            
            document.body.removeChild(textArea);
        }
    } catch (err) {
        // If all else fails, open email client
        window.location.href = `mailto:${email}`;
        showToast('Opening email client...');
    }
});

// ===========================
// FORM SUBMISSION WITH WHATSAPP - FIXED
// ===========================
bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const tourSelect = document.getElementById('tourSelect');
    const tourName = tourSelect.options[tourSelect.selectedIndex].text;
    const tourDate = document.getElementById('tourDate').value;
    const guests = document.getElementById('guests').value;
    const pickupLocation = document.getElementById('pickupLocation').value;
    const specialRequests = document.getElementById('specialRequests').value;

    // Format the date nicely
    const formattedDate = new Date(tourDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Create professional WhatsApp message with properly encoded emojis
    let whatsappMessage = `✨ *NEW BOOKING REQUEST*
━━━━━━━━━━━━━━━━━━━━
👥 *Guest Information*
Name: ${fullName}
Email: ${email}
Phone: ${phone}
📖 *Booking Details*
Tour: ${tourName}
Date: ${formattedDate}
Guests: ${guests} ${guests === '1' ? 'person' : 'people'}`;
    
    if (pickupLocation) {
        whatsappMessage += `
Pickup: ${pickupLocation}`;
    }
    
    if (specialRequests) {
        whatsappMessage += `
📌 *Additional Notes*
${specialRequests}`;
    }
    
    whatsappMessage += `
━━━━━━━━━━━━━━━━━━━━
🌐 _via EJ Tours Website_`;

    // Your WhatsApp business number
    const whatsappNumber = '27749310308';
    
    // Create WhatsApp URL with proper encoding - FIXED VERSION
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;
    
    // Update confirmation message
    confirmationMessage.innerHTML = `
        <p style="color: #666; margin-bottom: 20px;">Thank you, <strong>${fullName}</strong>!</p>
        <p style="color: #666; margin-bottom: 15px;">Your booking details are ready to send via WhatsApp.</p>
        <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin-top: 20px; text-align: left;">
            <p style="color: #333; margin-bottom: 10px;"><strong>Tour:</strong> ${tourName}</p>
            <p style="color: #333; margin-bottom: 10px;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="color: #333; margin-bottom: 10px;"><strong>Guests:</strong> ${guests}</p>
            ${pickupLocation ? `<p style="color: #333; margin-bottom: 10px;"><strong>Pickup:</strong> ${pickupLocation}</p>` : ''}
        </div>
        <p style="color: #25D366; margin-top: 20px; font-weight: 600;">
            <i class="fab fa-whatsapp"></i> WhatsApp will open automatically...
        </p>
    `;
    
    // Show modal
    bookingModal.style.display = 'flex';
    
    // Open WhatsApp using location.href for better encoding support
    setTimeout(function() {
        window.location.href = whatsappURL;
    }, 1000);
});

// ===========================
// CLOSE MODAL
// ===========================
closeModal.addEventListener('click', function() {
    bookingModal.style.display = 'none';
    bookingForm.reset();
});

confirmBtn.addEventListener('click', function() {
    bookingModal.style.display = 'none';
    bookingForm.reset();
});

// ===========================
// CLOSE MODAL ON OUTSIDE CLICK
// ===========================
window.addEventListener('click', function(e) {
    if (e.target === bookingModal) {
        bookingModal.style.display = 'none';
        bookingForm.reset();
    }
});

// ===========================
// SMOOTH SCROLLING
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// INITIALIZE ON PAGE LOAD
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Load tours
    loadTours();
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tourDate').min = today;
    
    // Check contact button visibility on load
    updateContactButton();
    
    console.log('🚀 EJ Tours website loaded successfully!');
    console.log('✨ Contact button will slide in after scrolling past hero section');
});