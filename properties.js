// properties.js

const propertiesData = [
    {
        id: 1,
        name: "AURELIA RESIDENCES",
        category: "Residential",
        location: "Whitefield",
        status: "Ongoing",
        bedrooms: "3 BHK",
        price: 25000000,
        description: "A contemporary residential development designed around light, landscape and modern urban living.",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
        slug: "aurelia-residences"
    },
    {
        id: 2,
        name: "THE TERRACE",
        category: "Residential",
        location: "Sarjapur Road",
        status: "Upcoming",
        bedrooms: "4 BHK",
        price: 45000000,
        description: "Premium villa developments offering unparalleled privacy and bespoke architectural design.",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
        slug: "the-terrace"
    },
    {
        id: 3,
        name: "VERDE HEIGHTS",
        category: "Residential",
        location: "Yelahanka",
        status: "Completed",
        bedrooms: "2 BHK",
        price: 15000000,
        description: "An eco-conscious community blending sustainable materials with state-of-the-art home technology.",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop",
        slug: "verde-heights"
    },
    {
        id: 4,
        name: "OAKWOOD RESIDENCES",
        category: "Residential",
        location: "Devanahalli",
        status: "Ongoing",
        bedrooms: "3 BHK",
        price: 30000000,
        description: "Spacious family homes set within acres of curated botanical gardens and walking trails.",
        image: "https://images.unsplash.com/photo-1600607687920-4e2a09be1587?q=80&w=2000&auto=format&fit=crop",
        slug: "oakwood-residences"
    },
    {
        id: 5,
        name: "THE GRAND AVENUE",
        category: "Residential",
        location: "Hebbal",
        status: "Upcoming",
        bedrooms: "4 BHK",
        price: 80000000,
        description: "Sky-high luxury living featuring panoramic views of the city skyline and lake.",
        image: "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2000&auto=format&fit=crop",
        slug: "the-grand-avenue"
    },
    {
        id: 6,
        name: "NEXUS BUSINESS PARK",
        category: "Commercial",
        location: "North Bengaluru",
        status: "Completed",
        bedrooms: "N/A",
        price: 500000000,
        description: "A next-generation tech park designed to foster innovation, collaboration, and growth.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
        slug: "nexus-business-park"
    },
    {
        id: 7,
        name: "ORION COMMERCIAL",
        category: "Commercial",
        location: "Electronic City",
        status: "Ongoing",
        bedrooms: "N/A",
        price: 200000000,
        description: "Premium office spaces equipped with advanced infrastructure and world-class amenities.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
        slug: "orion-commercial"
    },
    {
        id: 8,
        name: "THE COURTYARD",
        category: "Commercial",
        location: "Koramangala",
        status: "Completed",
        bedrooms: "N/A",
        price: 150000000,
        description: "A boutique commercial hub blending retail, dining, and creative workspace environments.",
        image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop",
        slug: "the-courtyard"
    },
    {
        id: 9,
        name: "METRO SQUARE",
        category: "Commercial",
        location: "Whitefield",
        status: "Ongoing",
        bedrooms: "N/A",
        price: 350000000,
        description: "A landmark mixed-use development at the heart of the city's bustling business district.",
        image: "https://images.unsplash.com/photo-1430285561322-780c604615c5?q=80&w=2000&auto=format&fit=crop",
        slug: "metro-square"
    },
    {
        id: 10,
        name: "VISTA HEIGHTS",
        category: "Residential",
        location: "Sarjapur Road",
        status: "Completed",
        bedrooms: "4 BHK",
        price: 55000000,
        description: "Exclusive penthouses offering unprecedented luxury, private pools, and bespoke interiors.",
        image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?q=80&w=2000&auto=format&fit=crop",
        slug: "vista-heights"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // Elements
    const section = document.getElementById("properties-section");
    if (!section) return;

    const bgContainer = document.getElementById("cp-bg-container");
    const metaEl = document.getElementById("cp-meta");
    const titleEl = document.getElementById("cp-title");
    const descEl = document.getElementById("cp-desc");
    const cardStrip = document.getElementById("cp-card-strip");
    
    // Advanced Filter Elements
    const filterTabs = document.querySelectorAll(".cp-tab");
    const selectType = document.getElementById("filter-type");
    const selectLocation = document.getElementById("filter-location");
    const selectStatus = document.getElementById("filter-status");
    const selectBedrooms = document.getElementById("filter-bedrooms");
    const selectPrice = document.getElementById("filter-price");
    const btnReset = document.getElementById("filter-reset");
    const filterCountEl = document.getElementById("filter-count");
    const emptyStateEl = document.getElementById("cp-empty-state");
    const nextPropNav = document.getElementById("cp-next-property");
    const counterEl = document.getElementById("cp-counter");

    // State
    let activeFilters = {
        tab: "ALL",
        type: "ALL",
        location: "ALL",
        status: "ALL",
        bedrooms: "ALL",
        price: "ALL"
    };
    let filteredProperties = [...propertiesData];
    let currentIndex = 0;
    let isAnimating = false;

    // Initialization
    init();

    function init() {
        renderCards();
        updateContent(0, true); // true = initial load (no transition)
        setupEventListeners();
    }

    function renderCards() {
        cardStrip.innerHTML = "";
        filteredProperties.forEach((prop, i) => {
            const card = document.createElement("div");
            card.className = `cp-card ${i === currentIndex ? 'active' : ''}`;
            card.dataset.index = i;
            card.innerHTML = `
                <div class="cp-card-bg" style="background-image: url('${prop.image}')"></div>
                <div class="cp-card-overlay"></div>
                <div class="cp-card-content">
                    <div class="cp-card-meta">${prop.category}</div>
                    <h3 class="cp-card-title">${prop.name}</h3>
                </div>
            `;
            card.addEventListener("click", () => handleNav(i));
            cardStrip.appendChild(card);
        });
    }

    function handleNav(newIndex) {
        if (isAnimating || newIndex === currentIndex || newIndex < 0 || newIndex >= filteredProperties.length) return;
        isAnimating = true;

        const oldIndex = currentIndex;
        currentIndex = newIndex;

        // Transition Logic
        transitionBackground(filteredProperties[newIndex].image);
        transitionText(filteredProperties[newIndex]);
        updateActiveCard();

        // Allow next interaction after animation roughly finishes
        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }

    function transitionBackground(newImageUrl) {
        // Create new background layer
        const newBg = document.createElement("div");
        newBg.className = "cp-bg-layer";
        newBg.style.backgroundImage = `url('${newImageUrl}')`;
        newBg.style.zIndex = 2; // Above existing
        
        // Initial state for animation
        gsap.set(newBg, {
            clipPath: "inset(0 0 0 100%)", // Start clipped to the right
            scale: 1.05
        });
        
        bgContainer.appendChild(newBg);

        // Get old background(s)
        const oldBgs = bgContainer.querySelectorAll(".cp-bg-layer:not(:last-child)");
        
        // Animate
        const tl = gsap.timeline();
        
        // Old background moves slightly to the left (parallax)
        if (oldBgs.length > 0) {
            tl.to(oldBgs, {
                x: "-10%",
                opacity: 0.5,
                duration: 1,
                ease: "power3.inOut"
            }, 0);
        }

        // New background slides in and scales down
        tl.to(newBg, {
            clipPath: "inset(0 0 0 0%)",
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
            onComplete: () => {
                // Cleanup old backgrounds
                oldBgs.forEach(bg => bg.remove());
                newBg.style.zIndex = 1; // Reset z-index
                gsap.set(newBg, { clearProps: "all" }); // Clear GSAP inline styles to prevent issues
                newBg.style.backgroundImage = `url('${newImageUrl}')`; // Re-apply bg
            }
        }, 0);
    }

    function transitionText(prop) {
        const tl = gsap.timeline();
        
        // Animate out
        tl.to([metaEl, titleEl, descEl], {
            y: -20,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.in",
            onComplete: () => {
                // Update content
                metaEl.innerHTML = `${prop.category}<br>${prop.location}`;
                titleEl.innerHTML = `<span>${prop.name.replace(' ', '<br>')}</span>`;
                descEl.textContent = prop.description;
            }
        });

        // Animate in
        tl.to([metaEl, titleEl, descEl], {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out"
        });
    }

    function updateContent(index, isInitial = false) {
        if (filteredProperties.length === 0) {
            bgContainer.innerHTML = "";
            metaEl.innerHTML = "";
            titleEl.innerHTML = "";
            descEl.textContent = "";
            return;
        }

        const prop = filteredProperties[index];
        
        if (isInitial) {
            // Just set it instantly
            const bg = document.createElement("div");
            bg.className = "cp-bg-layer";
            bg.style.backgroundImage = `url('${prop.image}')`;
            bgContainer.innerHTML = "";
            bgContainer.appendChild(bg);

            metaEl.innerHTML = `${prop.category}<br>${prop.location}`;
            titleEl.innerHTML = `<span>${prop.name.replace(' ', '<br>')}</span>`;
            descEl.textContent = prop.description;
        }
    }

    function updateActiveCard() {
        const cards = cardStrip.querySelectorAll(".cp-card");
        cards.forEach((card, i) => {
            if (i === currentIndex) {
                card.classList.add("active");
                card.classList.remove("hidden");
            } else if (i > currentIndex && i <= currentIndex + 2) {
                card.classList.remove("active");
                card.classList.remove("hidden");
            } else {
                card.classList.remove("active");
                card.classList.add("hidden");
            }
        });

        // Shift strip to keep active card visible
        // Width of card + gap = 220 + 32 = 252 (approx)
        const offset = currentIndex * -252;
        
        gsap.to(cardStrip, {
            x: offset,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    function applyFilters() {
        if (isAnimating) return;

        filteredProperties = propertiesData.filter(p => {
            // Filter by Tab (BUY=ALL, RENT=RESIDENTIAL, COMMERCIAL=COMMERCIAL)
            if (activeFilters.tab !== "ALL" && p.category.toUpperCase() !== activeFilters.tab) return false;
            
            // Filter by Dropdowns
            if (activeFilters.type !== "ALL" && p.category !== activeFilters.type) return false;
            if (activeFilters.location !== "ALL" && p.location !== activeFilters.location) return false;
            if (activeFilters.status !== "ALL" && p.status !== activeFilters.status) return false;
            if (activeFilters.bedrooms !== "ALL" && p.bedrooms !== activeFilters.bedrooms) return false;
            
            // Filter by Price
            if (activeFilters.price !== "ALL") {
                const [min, max] = activeFilters.price.split('-').map(Number);
                if (p.price < min || p.price > max) return false;
            }

            return true;
        });

        updateUIState();
        
        currentIndex = 0;
        
        if (filteredProperties.length > 0) {
            // Re-render and transition
            gsap.to(cardStrip, {
                opacity: 0,
                x: 50,
                duration: 0.4,
                onComplete: () => {
                    renderCards();
                    gsap.set(cardStrip, { x: 50 });
                    gsap.to(cardStrip, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" });
                    
                    updateContent(0, true);
                    updateActiveCard();
                }
            });
        } else {
            cardStrip.innerHTML = "";
            updateContent(0, true);
        }
    }

    function updateUIState() {
        const count = filteredProperties.length;
        
        // Update filter count string
        if (count === 0) {
            filterCountEl.innerHTML = "NO PROJECTS FOUND";
            emptyStateEl.style.display = "block";
            nextPropNav.style.display = "none";
            if (counterEl) counterEl.style.display = "none";
        } else if (count === 1) {
            filterCountEl.innerHTML = "1 PROJECT FOUND &rarr;";
            emptyStateEl.style.display = "none";
            nextPropNav.style.display = "none";
            if (counterEl) {
                counterEl.style.display = "flex";
                counterEl.innerHTML = `01 / 01`;
            }
        } else {
            filterCountEl.innerHTML = `${count} PROJECTS FOUND &rarr;`;
            emptyStateEl.style.display = "none";
            nextPropNav.style.display = "flex";
            if (counterEl) {
                counterEl.style.display = "flex";
                updateCounter();
            }
        }
    }

    function updateCounter() {
        if (counterEl && filteredProperties.length > 0) {
            const current = (currentIndex + 1).toString().padStart(2, '0');
            const total = filteredProperties.length.toString().padStart(2, '0');
            counterEl.innerHTML = `${current} / ${total}`;
        }
    }

    // Override handleNav to also update counter
    const originalHandleNav = handleNav;
    handleNav = function(newIndex) {
        originalHandleNav(newIndex);
        // We set a small timeout to let currentIndex update in the original func
        setTimeout(updateCounter, 10);
    }

    function resetFilters() {
        activeFilters = {
            tab: "ALL", type: "ALL", location: "ALL",
            status: "ALL", bedrooms: "ALL", price: "ALL"
        };
        
        filterTabs.forEach(btn => {
            btn.classList.remove("active");
            if (btn.dataset.type === "ALL") btn.classList.add("active");
        });
        
        selectType.value = "ALL";
        selectLocation.value = "ALL";
        selectStatus.value = "ALL";
        selectBedrooms.value = "ALL";
        selectPrice.value = "ALL";
        
        applyFilters();
    }

    function setupEventListeners() {
        if (nextPropNav) {
            nextPropNav.addEventListener("click", () => {
                if (filteredProperties.length > 1) {
                    if (currentIndex < filteredProperties.length - 1) handleNav(currentIndex + 1);
                    else handleNav(0);
                }
            });
        }

        filterTabs.forEach(btn => {
            btn.addEventListener("click", (e) => {
                filterTabs.forEach(b => b.classList.remove("active"));
                e.target.classList.add("active");
                activeFilters.tab = e.target.dataset.type;
                applyFilters();
            });
        });
        
        selectType.addEventListener("change", (e) => { activeFilters.type = e.target.value; applyFilters(); });
        selectLocation.addEventListener("change", (e) => { activeFilters.location = e.target.value; applyFilters(); });
        selectStatus.addEventListener("change", (e) => { activeFilters.status = e.target.value; applyFilters(); });
        selectBedrooms.addEventListener("change", (e) => { activeFilters.bedrooms = e.target.value; applyFilters(); });
        selectPrice.addEventListener("change", (e) => { activeFilters.price = e.target.value; applyFilters(); });
        
        btnReset.addEventListener("click", resetFilters);

        document.addEventListener("keydown", (e) => {
            if (filteredProperties.length <= 1) return;
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                if (e.key === "ArrowLeft") {
                    if (currentIndex > 0) handleNav(currentIndex - 1);
                    else handleNav(filteredProperties.length - 1);
                } else if (e.key === "ArrowRight") {
                    if (currentIndex < filteredProperties.length - 1) handleNav(currentIndex + 1);
                    else handleNav(0);
                }
            }
        });
        
        // Initial setup for counters
        updateUIState();
    }

});
