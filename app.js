angular.module('MickitTicketApp', [])
.controller('MainController', function() {
    const vm = this;
    
    // Navigation Configuration
    vm.tabs = [
        { id: 'home', title: 'Home' },
        { id: 'events', title: 'Events' },
        { id: 'categories', title: 'Categories' },
        { id: 'about', title: 'About' }
    ];
    vm.currentView = 'home';
    
    // Event Data
    vm.events = [
        {
            id: 1,
            name: 'Rock & Roll Music Festival',
            category: 'concert',
            location: 'Central Park Arena',
            date: '10-06-2025',
            price: 850,
            image: 'https://img.freepik.com/free-psd/rock-music-festival-banner-template_23-2148971257.jpg'
        },
        {
            id: 2,
            name: 'One Night Only: Broadway Musical Night',
            category: 'theater',
            location: 'City Opera House',
            date: '03-08-2025',
            price: 950,
            image: 'https://broadwaycares.org/wp-content/uploads/2020/12/ONO-TBOB-2020-Post-Event_Header.jpg'
        },
        {
            id: 3,
            name: 'The Jamie Lever Show: Stand-Up Comedy Special',
            category: 'comedy',
            location: 'Laugh Factory',
            date: '22-03-2025',
            price: 300,
            image: 'https://assets-in.bmscdn.com/discovery-catalog/events/et00383924-cgadnkrxwg-landscape.jpg'
        },
        {
            id: 4,
            name: 'Marvel: Avengers Endgame',
            category: 'movie',
            location: 'Cineplex City Mall',
            date: '21-04-2025',
            price: 450,
            image: 'https://i.redd.it/c6vvgssko2r21.jpg'
        },
        {
            id: 5,
            name: 'NBA Championship Finals',
            category: 'sports',
            location: 'City Stadium',
            date: '15-05-2025',
            price: 1200,
            image: 'https://wallpapers.com/images/hd/basketball-background-q06gyxrgxqzk7yry.jpg'
        },
        {
            id: 6,
            name: 'Winter Orchestra Concert',
            category: 'concert',
            location: 'Ross N. Robinson Auditorium',
            date: '27-02-2025',
            price: 800,
            image: 'https://3.files.edl.io/b780/25/02/19/193835-3f2cfc8b-3e4b-4648-9622-ab6178c9e2e8.png'
        },
        {
            id: 7,
            name: 'Romantic Comedy Night',
            category: 'comedy',
            location: "Lodi's Pop the Bubble",
            date: '01-08-2025',
            price: 350,
            image: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F939555483%2F575114286297%2F1%2Foriginal.20250119-215040?w=1000&auto=format%2Ccompress&q=75&sharp=10&s=22db08b922c5971c9e1610f196d425cb'
        },
        {
            id: 8,
            name: 'Harry Potter and the Goblet of Fire',
            category: 'movie',
            location: 'Retro Cinema House',
            date: '25-10-2025',
            price: 450,
            image: 'https://img.usanetwork.com/files/images/2019/5/29/HarryPotterAndTheGobletOfFire-S4-KeyArt-Logo-Show-Tile-1920x1080.jpg'
        },
        {
            id: 9,
            name: 'Champions League Final',
            category: 'sports',
            location: 'International Arena',
            date: '19-12-2025',
            price: 1000,
            image: 'https://editorial.uefa.com/resources/0278-15f34aee6aa8-ce2307ea1bfc-1000/uclf_2023_poster_landscape_aw40_002_.jpeg'
        },
        {
            id: 10,
            name: 'Shakespeare in the Park',
            category: 'theater',
            location: 'Greenfield Park',
            date: '10-11-2025',
            price: 200,
            image: 'https://assets.playbill.com/editorial/5702c4eea9f621260c1e34b156e61cb5-shakespeare-in-the-park.jpg'
        }
    ];
    
    // Categories
    vm.categories = ['Concert', 'Theater', 'Comedy', 'Sports', 'Movie'];
    vm.selectedCategory = '';
    vm.searchQuery = '';
    
    // Seat Booking System
    vm.seats = [];
    vm.selectedEvent = null;
    vm.activeModal = null;
    
    // Controller Methods
    vm.changeView = function(view) {
        if (!vm.loggedInUser && view !== 'auth') {
            alert("Please log in or sign up to access this section.");
            vm.openAuthModal();
            return;
        }
        vm.currentView = view;
        vm.activeModal = null;
        if (view === 'wishlist') {
            vm.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        }
    };

    // Add this method to the controller
    vm.viewCategoryEvents = function(category) {
        vm.selectedCategory = category;
        vm.changeView('events');
    };
    
    vm.openSeatSelection = function(event) {
        vm.selectedEvent = event;
        vm.activeModal = 'seatSelection';
    
        const seatCategories = ['VIP', 'Regular'];
        
        vm.seats = Array.from({ length: 50 }, (_, i) => {
            let category = i < 10 ? 'VIP' : 'Regular';
            let priceMultiplier = category === 'VIP' ? 1.5 : 1;
    
            return {
                number: i + 1,
                selected: false,
                category: category,
                price: Math.round(event.price * priceMultiplier) // Adjust price per seat category
            };
        });
    };
    
    vm.toggleSeat = function(seat) {
        seat.selected = !seat.selected;
    };
    
    vm.getSelectedSeats = function() {
        return vm.seats.filter(seat => seat.selected);
    };
    
    // Update Price Calculation
    vm.getTotalPrice = function() {
        return vm.getSelectedSeats().reduce((total, seat) => total + seat.price, 0);
    };
    
    vm.openPayment = function() {
        if(vm.getSelectedSeats().length > 0) {
            vm.paymentMethod = 'UPI'; // Default selection
            vm.activeModal = 'payment';
        }
    };

    vm.processPayment = function() {
        if (vm.paymentMethod) {
            vm.showConfirmation();
        } else {
            alert("Please select a payment method.");
        }
        
        if (vm.paymentMethod === "UPI") {
            alert("Redirecting to UPI payment...");
        } else if (vm.paymentMethod === "Card") {
            alert("Processing card payment...");
        }
    
        setTimeout(() => {
            vm.showConfirmation();
            vm.$apply(); // Ensure AngularJS updates the view
        }, 1000);
    };

    vm.showConfirmation = function() {
        vm.activeModal = 'confirmation';
    };
    
    vm.closeModal = function() {
        vm.activeModal = null;
        vm.selectedEvent = null;
        vm.seats = [];
    };
    
    vm.getEventsByCategory = function(category) {
        return vm.events.filter(event => event.category === category);
    };

    // User Authentication
    vm.loggedInUser = localStorage.getItem('loggedInUser') || null;
    vm.authMode = 'login'; // Default mode: Login
    vm.authName = '';
    vm.authEmail = '';
    vm.authPassword = '';

    // Open Login/Signup Modal
    vm.openAuthModal = function() {
        vm.activeModal = 'auth';
        vm.authMode = 'login';
        vm.authName = '';
        vm.authEmail = '';
        vm.authPassword = '';
    };

    // Toggle Between Login and Signup
    vm.toggleAuthMode = function() {
        vm.authMode = vm.authMode === 'login' ? 'signup' : 'login';
    };

    // Authenticate User (Login/Signup)
    vm.authenticate = function() {
        if (!vm.authEmail) {
            alert("Please enter both email and password!");
            return;
        }

        if (vm.authMode === 'signup') {
            if (!vm.authName) {
                alert("Please enter your name for signup!");
                return;
            }
            // Check if user already exists
            let storedUser = JSON.parse(localStorage.getItem(vm.authEmail));
            if (storedUser) {
                alert("This email is already registered. Please log in.");
                return;
            }

            // Store user data in localStorage
            let userData = {
                name: vm.authName,
                password: vm.authPassword
            };
            localStorage.setItem(vm.authEmail, JSON.stringify(userData));
            localStorage.setItem('loggedInUser', vm.authName);
            localStorage.setItem('loggedInUserEmail', vm.authEmail);
            vm.loggedInUser = vm.authName;
        } else {
            // Validate Login
            let storedUser = JSON.parse(localStorage.getItem(vm.authEmail));
            if (!storedUser || storedUser.password !== vm.authPassword) {
                alert("Invalid email or password. Please try again.");
                return;
            }

            vm.loggedInUser = storedUser.name;
            localStorage.setItem('loggedInUser', storedUser.name);
            localStorage.setItem('loggedInUserEmail', vm.authEmail);
        }

        vm.closeModal();
    };

    // Logout Function
    vm.logout = function() {
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('userEmail');
        vm.loggedInUser = null;
    };

    vm.filteredEvents = function() {
        let filtered = vm.events;
    
        // Apply Search Filter
        if (vm.searchQuery) {
            let query = vm.searchQuery.toLowerCase();
            filtered = filtered.filter(event => 
                event.name.toLowerCase().includes(query) || 
                event.category.toLowerCase().includes(query) ||
                event.location.toLowerCase().includes(query)
            );
        }
    
        // Apply Category Filter
        if (vm.selectedCategory) {
            let selectedCategoryLower = vm.selectedCategory.toLowerCase();
            filtered = filtered.filter(event => event.category.toLowerCase() === selectedCategoryLower);
        }
    
        // Apply Sorting
        if (vm.sortOption === 'priceLow') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (vm.sortOption === 'priceHigh') {
            filtered.sort((a, b) => b.price - a.price);
        } else if (vm.sortOption === 'dateSoon') {
            filtered.sort((a, b) => vm.convertDate(a.date) - vm.convertDate(b.date));
        } else if (vm.sortOption === 'dateLate') {
            filtered.sort((a, b) => vm.convertDate(b.date) - vm.convertDate(a.date));
        }
    
        return filtered;
    };   
    
    vm.convertDate = function(dateStr) {
        let parts = dateStr.split("-");
        return new Date(parts[2], parts[1] - 1, parts[0]); // yyyy, mm (0-indexed), dd
    }; 
    
    // Initialize Wishlist from LocalStorage
    vm.wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Check if Event is in Wishlist
    vm.isInWishlist = function(event) {
        return vm.wishlist.some(e => e.id === event.id);
    };

    // Add/Remove from Wishlist
    vm.toggleWishlist = function(event) {
        if (vm.isInWishlist(event)) {
            vm.wishlist = vm.wishlist.filter(e => e.id !== event.id);
        } else {
            vm.wishlist.push(event);
        }
        localStorage.setItem('wishlist', JSON.stringify(vm.wishlist));
    };

    vm.bookTickets = function() {
        if (!vm.selectedEvent || vm.getSelectedSeats().length === 0) {
            alert('Please select an event and at least one seat.');
            return;
        }
    
        // Generate a unique ticket ID
        const ticketID = 'TCKT-' + Math.floor(Math.random() * 1000000);
    
        // Create ticket object
        vm.ticket = {
            id: ticketID,
            event: vm.selectedEvent.name,
            date: vm.selectedEvent.date,
            location: vm.selectedEvent.location,
            price: vm.getTotalPrice(),
            user: vm.loggedInUser || 'Guest',
            seats: vm.getSelectedSeats().map(seat => seat.number)
        };
    
        // Show the ticket modal
        vm.activeModal = 'ticket';
    
        // Generate QR Code
        setTimeout(() => {
            generateQRCode(ticketID);
        }, 200);
    };

    function generateQRCode(ticketID) {
        let qrContainer = document.getElementById('qrCode');
        if (qrContainer) {
            qrContainer.innerHTML = ''; // Clear previous QR code
            new QRCode(qrContainer, {
                text: ticketID,  // The unique ticket ID
                width: 128,
                height: 128
            });
        }
    }

    vm.processPayment = function() {
        if (vm.paymentMethod) {
            alert("Payment Successful! Generating your ticket...");
            vm.bookTickets();
        } else {
            alert("Please select a payment method.");
        }
    };

}); 