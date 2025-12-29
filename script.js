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

// ===========================
// LOAD TOURS FUNCTION
// ===========================
function loadTours() {
    tours.forEach(tour => {
        const tourCard = document.createElement('div');
        tourCard.className = 'tour-card';
        tourCard.innerHTML = `
            <div class="tour-img" style="background-image: url('${tour.image}')">
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
// INITIALIZE ON PAGE LOAD
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    loadTours();
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('tourDate').min = today;
});

// ===========================
// FLOATING CONTACT PANEL
// ===========================
const floatingContactBtn = document.getElementById('floatingContactBtn');
const contactPanel = document.getElementById('contactPanel');
const closePanelBtn = document.getElementById('closePanel');

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
// MOBILE MENU TOGGLE
// ===========================
mobileMenuBtn.addEventListener('click', function() {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// ===========================
// CLOSE MOBILE MENU ON LINK CLICK
// ===========================
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function() {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ===========================
// FORM SUBMISSION WITH WHATSAPP
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

    // Create WhatsApp message with emojis for better formatting
    let whatsappMessage = `🎉 *NEW BOOKING REQUEST*%0A%0A`;
    whatsappMessage += `👤 *Name:* ${fullName}%0A`;
    whatsappMessage += `📧 *Email:* ${email}%0A`;
    whatsappMessage += `📱 *Phone:* ${phone}%0A`;
    whatsappMessage += `%0A`;
    whatsappMessage += `🎫 *Tour:* ${tourName}%0A`;
    whatsappMessage += `📅 *Date:* ${formattedDate}%0A`;
    whatsappMessage += `👥 *Number of Guests:* ${guests}%0A`;
    
    if (pickupLocation) {
        whatsappMessage += `📍 *Pickup Location:* ${pickupLocation}%0A`;
    }
    
    if (specialRequests) {
        whatsappMessage += `%0A💬 *Special Requests:*%0A${specialRequests}%0A`;
    }
    
    whatsappMessage += `%0A------------------------------------%0A`;
    whatsappMessage += `_Sent via EJ Tours Website_`;

    // Your WhatsApp business number (including country code, no spaces or special characters)
    const whatsappNumber = '27749310308';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
    
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
    
    // Open WhatsApp after a short delay (gives time for user to see the modal)
    setTimeout(function() {
        window.open(whatsappURL, '_blank');
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