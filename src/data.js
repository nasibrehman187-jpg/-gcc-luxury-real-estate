// ============================================================
//  GCC Luxury Real Estate — Shared Property & Market Data (Phase 3)
//  Single source of truth with optimized Unsplash photography,
//  floor plans, landmarks, market locations, and testimonials
// ============================================================

export const PROPERTIES = [
  {
    id: 'skyline-penthouse',
    slug: 'skyline-penthouse',
    name: 'Skyline Penthouse',
    location: 'Downtown Dubai, UAE',
    locationKey: 'dubai',
    address: {
      streetAddress: 'Sheikh Mohammed bin Rashid Blvd, Downtown Dubai',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '00000',
      addressCountry: 'AE',
    },
    price: 24500000,
    priceUSD: 24500000,
    priceAED: 90000000,
    beds: 4,
    baths: 5,
    sqft: 6200,
    type: 'penthouse',
    typeLabel: 'Waterfront Penthouse',
    purpose: 'primary',
    badge: 'Featured',
    status: 'Ready',
    verified: true,
    developer: 'Meridian Developments',
    serviceCharges: 'AED 24 / sq ft annually',
    handoverDate: 'Ready / Immediate',
    paymentPlan: '100% on Title Transfer (Mortgage & Cash Compliant)',
    ownershipType: '100% Foreign Freehold Title',
    rentalYield: '7.8% p.a.',
    added: '2024-11-15',
    
    // Curated high-res Unsplash photos with responsive sizing
    heroImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=75',
    
    tagline: 'Above the skyline. Beyond expectation.',
    description: [
      'Perched on the 72nd floor of one of Downtown Dubai\'s most iconic towers, the Skyline Penthouse commands panoramic views that stretch from the Burj Khalifa to the Arabian Gulf. Floor-to-ceiling windows flood every room with natural light, while bespoke Italian marble and warm oak panelling create an atmosphere of understated grandeur.',
      'The open-plan living and dining area spans over 1,800 square feet — a single, breathtaking volume designed for both intimate evenings and lavish entertaining. A private chef\'s kitchen, fitted with Gaggenau appliances and Calacatta countertops, sits discreetly adjacent.',
      'Four bedroom suites, each with en-suite bathrooms finished in Venetian plaster and brushed brass, offer sanctuary above the city. The master suite features a walk-in dressing room, freestanding soaking tub, and a private terrace facing the fountain promenade.',
    ],
    amenities: [
      { icon: 'pool', label: 'Private Infinity Pool' },
      { icon: 'smart', label: 'Smart Home System' },
      { icon: 'concierge', label: '24/7 Concierge' },
      { icon: 'parking', label: 'Private Garage (3 Cars)' },
      { icon: 'view', label: 'Burj Khalifa View' },
      { icon: 'gym', label: 'In-Unit Gym' },
      { icon: 'terrace', label: 'Wraparound Terrace' },
      { icon: 'security', label: 'Biometric Security' },
    ],
    floorPlan: {
      totalArea: '6,200 sq ft (576 sq m)',
      internalArea: '5,100 sq ft',
      terraceArea: '1,100 sq ft',
      levels: 'Single Level (Floor 72)',
      rooms: [
        { name: 'Grand Living & Dining Salon', size: '1,820 sq ft' },
        { name: 'Master Bedroom Suite & Dressing', size: '850 sq ft' },
        { name: 'Show Kitchen & Chef\'s Prep Suite', size: '420 sq ft' },
        { name: 'Wraparound Sunset Sky Terrace', size: '1,100 sq ft' },
        { name: '3 Guest En-Suite Suites', size: '1,450 sq ft' },
        { name: 'Private Staff Quarters & Utility', size: '560 sq ft' },
      ],
    },
    landmarks: [
      { name: 'The Dubai Mall & Fountain Promenade', dist: '3 mins walk' },
      { name: 'Burj Khalifa & Armani Hotel', dist: '5 mins walk' },
      { name: 'Dubai Opera District', dist: '6 mins walk' },
      { name: 'DIFC Financial District', dist: '7 mins drive' },
      { name: 'Dubai International Airport (DXB)', dist: '14 mins drive' },
    ],
    areaDescription: 'Downtown Dubai is the vibrant heart of the city — home to the Burj Khalifa, The Dubai Mall, and the iconic Dubai Fountain. Residents enjoy world-class dining, luxury retail, and seamless connectivity to DIFC and Business Bay within minutes.',
    agent: { name: 'Omar Al-Rashid', title: 'Associate Director, Dubai Prime Portfolio', phone: '+92 306 2320099' },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=300&q=70',
        label: 'Grand Salon',
        alt: 'Skyline Penthouse open salon with panoramic Dubai city views'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=300&q=70',
        label: 'Chef\'s Kitchen',
        alt: 'Italian marble kitchen island and bespoke cabinetry'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=300&q=70',
        label: 'Master Bedroom',
        alt: 'Master suite with floor-to-ceiling glass and skyline backdrop'
      },
      {
        url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=300&q=70',
        label: 'Master Bath',
        alt: 'Freestanding soaking tub overlooking city lights'
      },
      {
        url: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=300&q=70',
        label: 'Private Terrace',
        alt: 'Penthouse wraparound terrace overlooking downtown'
      },
    ],
  },
  {
    id: 'palm-villa-retreat',
    slug: 'palm-villa-retreat',
    name: 'Palm Villa Retreat',
    location: 'Palm Jumeirah, Dubai',
    locationKey: 'dubai',
    address: {
      streetAddress: 'Frond G, Palm Jumeirah',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      postalCode: '00000',
      addressCountry: 'AE',
    },
    price: 18500000,
    priceUSD: 18500000,
    priceAED: 67895000,
    beds: 5,
    baths: 6,
    sqft: 12400,
    type: 'villa',
    typeLabel: 'Beachfront Villa',
    purpose: 'investment',
    badge: 'Investment',
    status: 'Ready',
    verified: true,
    developer: 'Horizon Properties',
    serviceCharges: 'AED 14 / sq ft annually',
    handoverDate: 'Ready / Immediate',
    paymentPlan: '100% on Title Transfer / Private Escrow Structure',
    ownershipType: '100% Foreign Freehold Title',
    rentalYield: '7.2% p.a.',
    added: '2024-10-20',
    
    heroImage: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=75',
    
    tagline: 'Where the Gulf meets your private sanctuary.',
    description: [
      'Set along the coveted fronds of Palm Jumeirah, this signature residence offers over 12,000 square feet of refined living space with unobstructed views of the Arabian Gulf. A double-height entrance foyer, finished in Portuguese limestone and brushed gold, sets the tone for a residence that balances architectural grandeur with residential warmth.',
      'The ground floor unfolds through interconnected living spaces — a formal reception, a family lounge opening onto the private beach terrace, and a dining room that seats sixteen beneath a sculptural chandelier. The kitchen, designed for both a private chef and casual family mornings, features Miele appliances, a butler\'s pantry, and a temperature-controlled wine cellar.',
      'Upstairs, five bedroom suites radiate from a gallery landing. The master wing occupies the entire eastern side, with a sitting area, dual dressing rooms, and a spa-inspired bathroom with hammam shower and views across the private beach. Outside, a 20-metre infinity pool, landscaped gardens, and private beach access complete an estate designed for high capital appreciation.',
    ],
    amenities: [
      { icon: 'pool', label: 'Private Beach & Pool' },
      { icon: 'garden', label: 'Landscaped Gardens' },
      { icon: 'smart', label: 'Smart Home System' },
      { icon: 'concierge', label: 'Estate Concierge' },
      { icon: 'parking', label: 'Garage (4 Cars)' },
      { icon: 'view', label: 'Direct Sea View' },
      { icon: 'gym', label: 'Private Gym & Spa' },
      { icon: 'security', label: 'Gated Community' },
    ],
    floorPlan: {
      totalArea: '12,400 sq ft (1,152 sq m)',
      internalArea: '9,800 sq ft',
      terraceArea: '2,600 sq ft',
      levels: 'Ground + First Floor + Rooftop Oasis',
      rooms: [
        { name: 'Double-Height Grand Foyer & Reception', size: '2,400 sq ft' },
        { name: 'Master Retreat Wing & Spa Bath', size: '1,450 sq ft' },
        { name: 'Family Lounge & Garden Pavilion', size: '1,200 sq ft' },
        { name: 'Private Beachfront Infinity Pool & Deck', size: '2,600 sq ft' },
        { name: '4 En-Suite Guest Wings', size: '2,800 sq ft' },
        { name: 'Service Quarters, Prep Kitchen & 4-Car Garage', size: '1,950 sq ft' },
      ],
    },
    landmarks: [
      { name: 'Atlantis The Royal & Aquaventure', dist: '4 mins drive' },
      { name: 'Nakheel Mall & The View at The Palm', dist: '6 mins drive' },
      { name: 'Dubai Marina & Yacht Club', dist: '10 mins drive' },
      { name: 'Mall of the Emirates', dist: '12 mins drive' },
      { name: 'Dubai International Airport (DXB)', dist: '25 mins drive' },
    ],
    areaDescription: 'Palm Jumeirah is Dubai\'s most celebrated address — an engineering marvel shaped like a palm tree, home to the world\'s finest beachfront residences. Residents enjoy private beaches, proximity to Atlantis and Nakheel Mall, and a lifestyle defined by waterfront serenity minutes from the city centre.',
    agent: { name: 'Fatima Al-Zahra', title: 'Partner, Private Waterfront Residences', phone: '+92 306 2320099' },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=300&q=70',
        label: 'Beachfront Exterior',
        alt: 'Palm Villa Retreat exterior with illuminated infinity pool and palm trees'
      },
      {
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=300&q=70',
        label: 'Formal Reception',
        alt: 'Double-height formal living space with modern architecture'
      },
      {
        url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=300&q=70',
        label: 'Master Wing',
        alt: 'Master bedroom suite with direct garden and sea vista'
      },
      {
        url: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=300&q=70',
        label: 'Pool & Lounge',
        alt: 'Sun loungers and outdoor entertaining pavilion'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=300&q=70',
        label: 'Gourmet Kitchen',
        alt: 'Open chef kitchen with marble island and premium appliances'
      },
    ],
  },
  {
    id: 'corniche-residence',
    slug: 'corniche-residence',
    name: 'Corniche Residence',
    location: 'Doha Corniche, Qatar',
    locationKey: 'doha',
    address: {
      streetAddress: 'Doha Waterfront Corniche',
      addressLocality: 'Doha',
      addressRegion: 'Doha',
      postalCode: '00000',
      addressCountry: 'QA',
    },
    price: 12800000,
    priceUSD: 12800000,
    priceAED: 46976000,
    priceQAR: 46976000,
    beds: 3,
    baths: 4,
    sqft: 4100,
    type: 'apartment',
    typeLabel: 'Skyline Apartment',
    purpose: 'investment',
    badge: 'New',
    status: 'Off-Plan',
    verified: true,
    developer: 'Coastline Estates',
    serviceCharges: 'QAR 18 / sq ft annually (≈ AED 18)',
    handoverDate: 'Q4 2026',
    paymentPlan: '60/40 — 60% during construction, 40% on handover',
    ownershipType: 'Designated Freehold Zone (Residency Eligible)',
    rentalYield: '8.4% p.a.',
    added: '2024-12-01',
    
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=75',
    
    tagline: 'Contemporary elegance on the Doha waterfront.',
    description: [
      'Occupying a privileged position on the Corniche, this three-bedroom apartment offers a rare blend of contemporary design and waterfront living in Qatar\'s most prestigious address. Spanning 4,100 square feet across a single floor, the residence has been architecturally conceived to maximise light, space, and uninterrupted views of Doha Bay.',
      'The principal living area — a seamless fusion of lounge, dining, and open kitchen — is framed by floor-to-ceiling glazing that wraps the entire eastern elevation. Materials have been chosen with care: honed travertine floors, walnut joinery, and hand-applied Venetian plaster walls in muted earth tones.',
      'Three generously proportioned bedrooms each feature en-suite bathrooms with rain showers and natural stone finishes. The master suite includes a private study alcove and a dressing area with bespoke cabinetry. Residents benefit from a staffed lobby, rooftop terrace with pool, and direct access to the Corniche promenade.',
    ],
    amenities: [
      { icon: 'view', label: 'Doha Bay Panorama' },
      { icon: 'concierge', label: 'Staffed Lobby' },
      { icon: 'pool', label: 'Rooftop Pool' },
      { icon: 'smart', label: 'Home Automation' },
      { icon: 'parking', label: 'Underground Parking' },
      { icon: 'gym', label: 'Residents\' Gym' },
      { icon: 'terrace', label: 'Private Balcony' },
      { icon: 'security', label: '24/7 Security' },
    ],
    floorPlan: {
      totalArea: '4,100 sq ft (381 sq m)',
      internalArea: '3,450 sq ft',
      terraceArea: '650 sq ft',
      levels: 'Single Floor Residence',
      rooms: [
        { name: 'Panoramic Bayview Salon & Dining', size: '1,400 sq ft' },
        { name: 'Primary Suite with Private Study', size: '750 sq ft' },
        { name: 'Contemporary Italian Open Kitchen', size: '320 sq ft' },
        { name: 'Covered Waterfront Loggia', size: '650 sq ft' },
        { name: '2 En-Suite Guest Rooms', size: '680 sq ft' },
        { name: 'Utility & Staff Accommodation', size: '300 sq ft' },
      ],
    },
    landmarks: [
      { name: 'Museum of Islamic Art (MIA)', dist: '5 mins walk' },
      { name: 'Souq Waqif Heritage District', dist: '7 mins walk' },
      { name: 'National Museum of Qatar', dist: '6 mins drive' },
      { name: 'West Bay Commercial & Diplomatic Zone', dist: '8 mins drive' },
      { name: 'Hamad International Airport (DOH)', dist: '15 mins drive' },
    ],
    areaDescription: 'The Corniche is Doha\'s iconic waterfront promenade — a seven-kilometre arc connecting the Museum of Islamic Art, Souq Waqif, and the West Bay skyline. Living here means immediate access to the cultural and commercial heart of Qatar, with Hamad International Airport just twenty minutes away.',
    agent: { name: 'Khalid Al-Majid', title: 'Managing Director, Qatar & GCC Region', phone: '+92 306 2320099' },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=300&q=70',
        label: 'Bay View Salon',
        alt: 'Floor-to-ceiling glass lounge overlooking Doha waterfront'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=300&q=70',
        label: 'Travertine Dining',
        alt: 'Minimalist dining room with warm walnut and stone accents'
      },
      {
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=300&q=70',
        label: 'Master Suite',
        alt: 'Serene master bedroom suite with neutral palette and coastal light'
      },
      {
        url: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=300&q=70',
        label: 'En-Suite Bath',
        alt: 'Natural stone bathroom with rain shower and brass accents'
      },
      {
        url: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&w=300&q=70',
        label: 'Private Loggia',
        alt: 'Outdoor loggia with panoramic views across the bay'
      },
    ],
  },
  {
    id: 'marina-heights-estate',
    slug: 'marina-heights-estate',
    name: 'Marina Heights Estate',
    location: 'Al Raha Beach, Abu Dhabi',
    locationKey: 'abu-dhabi',
    address: {
      streetAddress: 'Marina Canal Promenade, Al Raha Beach',
      addressLocality: 'Abu Dhabi',
      addressRegion: 'Abu Dhabi',
      postalCode: '00000',
      addressCountry: 'AE',
    },
    price: 15200000,
    priceUSD: 15200000,
    priceAED: 55784000,
    beds: 4,
    baths: 4,
    sqft: 9800,
    type: 'waterfront-villa',
    typeLabel: 'Waterfront Estate',
    purpose: 'primary',
    badge: 'Exclusive',
    status: 'Ready',
    verified: true,
    developer: 'Zenith Group',
    serviceCharges: 'AED 16 / sq ft annually',
    handoverDate: 'Ready / Immediate',
    paymentPlan: '20% Booking, 80% on Title Registration',
    ownershipType: '100% Foreign Freehold (Abu Dhabi Investment Zone)',
    rentalYield: '7.6% p.a.',
    added: '2024-12-10',
    
    heroImage: 'https://images.unsplash.com/photo-160058515340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=75',
    
    tagline: 'Marina living, reimagined.',
    description: [
      'Marina Heights Estate occupies one of the most coveted waterfront plots on Al Raha Beach, overlooking Abu Dhabi\'s yacht marina and the shimmering waters of the Gulf. This four-bedroom villa, spanning nearly 10,000 square feet, marries contemporary Middle Eastern design with the relaxed rhythm of waterfront living.',
      'Interiors are defined by clean architectural lines, double-height ceilings in the main reception, and a material palette of polished concrete, white Thassos marble, and aged teak. The living spaces open through pivoting glass walls onto a covered terrace, creating a single indoor-outdoor volume perfect for the Gulf\'s cooler months.',
      'The upper level houses four en-suite bedrooms, including a master retreat with a private balcony overlooking the marina. A rooftop entertainment terrace with an outdoor kitchen and plunge pool provides a second living space under the stars. The property includes a private mooring — a rare offering that places your yacht steps from your front door.',
    ],
    amenities: [
      { icon: 'pool', label: 'Rooftop Plunge Pool' },
      { icon: 'view', label: 'Marina & Gulf View' },
      { icon: 'parking', label: 'Private Mooring' },
      { icon: 'smart', label: 'Smart Home System' },
      { icon: 'concierge', label: 'Marina Concierge' },
      { icon: 'garden', label: 'Outdoor Kitchen' },
      { icon: 'terrace', label: 'Rooftop Terrace' },
      { icon: 'security', label: 'Gated Waterfront' },
    ],
    floorPlan: {
      totalArea: '9,800 sq ft (910 sq m)',
      internalArea: '7,600 sq ft',
      terraceArea: '2,200 sq ft',
      levels: 'Ground + First + Private Rooftop Plunge',
      rooms: [
        { name: 'Double-Height Marina Reception', size: '1,950 sq ft' },
        { name: 'Master Harbor Retreat & Terrace', size: '1,100 sq ft' },
        { name: 'Rooftop Lounge, Plunge Pool & Outdoor Kitchen', size: '1,650 sq ft' },
        { name: 'Private Deep-Water Yacht Mooring', size: 'Berth up to 55ft' },
        { name: '3 En-Suite Waterfront Bedrooms', size: '1,900 sq ft' },
        { name: 'Staff Quarters, Tech Room & 3-Car Garage', size: '1,200 sq ft' },
      ],
    },
    landmarks: [
      { name: 'Al Raha Beach Marina & Boardwalk', dist: '1 min walk' },
      { name: 'Yas Island (Ferrari World & Yas Marina)', dist: '8 mins drive' },
      { name: 'Saadiyat Island Cultural District (Louvre)', dist: '18 mins drive' },
      { name: 'Abu Dhabi Global Market (ADGM)', dist: '20 mins drive' },
      { name: 'Zayed International Airport (AUH)', dist: '10 mins drive' },
    ],
    areaDescription: 'Al Raha Beach is Abu Dhabi\'s premier waterfront community — a master-planned neighbourhood combining residential, retail, and leisure within a pedestrian-friendly marina setting. Just fifteen minutes from Abu Dhabi International Airport and Saadiyat Island\'s cultural district, it offers island tranquillity with capital-city connectivity.',
    agent: { name: 'Sara Al-Neyadi', title: 'Senior Director, Abu Dhabi Estates', phone: '+92 306 2320099' },
    gallery: [
      {
        url: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&w=300&q=70',
        label: 'Waterfront Reception',
        alt: 'Pivoting glass doors opening to waterfront canal and marina'
      },
      {
        url: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=300&q=70',
        label: 'Architectural Lounge',
        alt: 'Polished concrete and teak interior with sculptural lighting'
      },
      {
        url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=300&q=70',
        label: 'Master Harbor Retreat',
        alt: 'Master suite with private balcony and direct marina views'
      },
      {
        url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=300&q=70',
        label: 'Rooftop Plunge & Terrace',
        alt: 'Rooftop plunge pool and sunset entertaining terrace'
      },
      {
        url: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=1200&q=80',
        thumb: 'https://images.unsplash.com/photo-1567496898669-ee935f5f647a?auto=format&fit=crop&w=300&q=70',
        label: 'Private Mooring',
        alt: 'Private yacht mooring and dusk estate illumination'
      },
    ],
  },
];

// ============================================================
//  GCC Locations / Markets Data
// ============================================================

export const LOCATIONS = {
  dubai: {
    key: 'dubai',
    name: 'Dubai',
    tagline: 'The Global Nexus of Ultra-Prime Capital & Innovation',
    heroImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80',
    intro: 'Dubai represents one of the world’s most resilient and dynamic luxury real estate markets. Combining 0% personal tax, world-class aviation connectivity, 100% foreign freehold ownership, and seamless 10-year Golden Visa issuance, Dubai continues to lead global capital inflows with exceptional rental yields averaging 7% to 9.5% p.a.',
    stats: [
      { label: 'Prime Rental Yield', value: '7.4% p.a.' },
      { label: 'Capital Appreciation (2024)', value: '+14.2%' },
      { label: 'Foreign Ownership', value: '100% Freehold' },
      { label: 'Golden Visa Qualifying', value: 'AED 2.0M+' },
    ],
  },
  'abu-dhabi': {
    key: 'abu-dhabi',
    name: 'Abu Dhabi',
    tagline: 'Sovereign Prestige, Cultural Heritage & Island Sanctuaries',
    heroImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80',
    intro: 'As the sovereign capital of the UAE, Abu Dhabi marries robust institutional stability with refined island living. From Saadiyat Island’s museum district (Louvre & Guggenheim) to the prestigious waterfronts of Al Raha Beach and Yas Island, Abu Dhabi offers enduring capital security and exclusive private estates.',
    stats: [
      { label: 'Average Prime Yield', value: '6.8% p.a.' },
      { label: 'Capital Growth YoY', value: '+9.8%' },
      { label: 'Cultural Districts', value: 'Saadiyat Cultural' },
      { label: 'Freehold Zones', value: 'Designated Zones' },
    ],
  },
  doha: {
    key: 'doha',
    name: 'Doha',
    tagline: 'Arabian Gulf Distinction & Sovereign Architecture',
    heroImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80',
    intro: 'Doha stands as a global hub of diplomatic prestige, sovereign wealth, and bespoke waterfront architecture. From the sweeping Doha Corniche to the Venetian waterways of The Pearl-Qatar and Lusail Marina, Doha delivers privacy, architectural pedigree, and exceptional capital preservation.',
    stats: [
      { label: 'Prime Rental Yield', value: '6.5% – 8.0%' },
      { label: 'Residency Eligible', value: 'Permanent Title' },
      { label: 'Tax Advisory Note', value: 'Jurisdiction Dependent' },
      { label: 'Infrastructure', value: 'Tier-1 Metro & DOH' },
    ],
  },
};

// ============================================================
//  Client Testimonials (Illustrative Demo Profiles)
// ============================================================

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Tariq Al-Hashemi',
    role: 'Private Family Office, UAE',
    quote: 'GCC Luxury executed our family office acquisition on Palm Jumeirah with absolute discretion, rigorous market intelligence, and flawless precision.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Arthur Sterling',
    role: 'International Portfolio Client, London',
    quote: 'Their insight into prime Downtown Dubai and Doha waterfront assets consistently outperformed our expectations on net rental yield and capital growth.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Dr. Layla Al-Sabah',
    role: 'Managing Director, Doha',
    quote: 'The bespoke advisory and direct access to off-market penthouses made our transaction seamless. A true benchmark for Gulf real estate representation.',
    rating: 5,
  },
];

// ============================================================
//  Master Developer Partners (Fictional Demo Portfolios)
// ============================================================

export const DEVELOPERS = [
  { name: 'Meridian Developments', title: 'Downtown & Waterfront Portfolios' },
  { name: 'Zenith Group', title: 'Abu Dhabi Prime Developments' },
  { name: 'Coastline Estates', title: 'Luxury Architectural Towers' },
  { name: 'Horizon Properties', title: 'Ultra-Prime Bespoke Residences' },
  { name: 'Aurelia Developments', title: 'Beachfront & Island Destinations' },
];

// ============================================================
//  Helper Functions
// ============================================================

export function getPropertyBySlug(slug) {
  return PROPERTIES.find(p => p.slug === slug) || null;
}

export function getPropertiesByLocation(locationKey) {
  return PROPERTIES.filter(p => p.locationKey === locationKey);
}

export function getRelatedProperties(currentSlug, count = 3) {
  return PROPERTIES.filter(p => p.slug !== currentSlug).slice(0, count);
}

export const USD_TO_AED_RATE = 3.67;

export function getPropertyPricing(propertyOrPrice) {
  if (typeof propertyOrPrice === 'object' && propertyOrPrice !== null) {
    const usd = propertyOrPrice.priceUSD || propertyOrPrice.price || 0;
    const aed = propertyOrPrice.priceAED || Math.round(usd * USD_TO_AED_RATE);
    const qar = propertyOrPrice.priceQAR || (propertyOrPrice.locationKey === 'doha' ? aed : null);
    return { usd, aed, qar, isDoha: propertyOrPrice.locationKey === 'doha' || !!propertyOrPrice.priceQAR };
  }
  const usd = typeof propertyOrPrice === 'number' ? propertyOrPrice : 0;
  const aed = Math.round(usd * USD_TO_AED_RATE);
  return { usd, aed, qar: null, isDoha: false };
}

export function formatPriceAED(propertyOrPrice) {
  const { aed, qar, isDoha } = getPropertyPricing(propertyOrPrice);
  if (isDoha && qar) {
    return `QAR ${qar.toLocaleString()} (AED ${aed.toLocaleString()})`;
  }
  return `AED ${aed.toLocaleString()}`;
}

export function formatPriceUSD(propertyOrPrice) {
  const { usd } = getPropertyPricing(propertyOrPrice);
  return `Approx. USD $${usd.toLocaleString()}`;
}

export function formatDualPriceHtml(propertyOrPrice, opts = {}) {
  const { usd, aed, qar, isDoha } = getPropertyPricing(propertyOrPrice);
  const isCompact = opts.compact || false;
  const customClass = opts.className || '';

  if (isDoha && qar) {
    return `
      <div class="price-dual-box ${isCompact ? 'price-dual-compact' : ''} ${customClass}">
        <span class="price-aed-primary">QAR ${qar.toLocaleString()} <span style="font-size: 0.72rem; color: var(--sandstone); font-weight: normal;">(AED ${aed.toLocaleString()})</span></span>
        <span class="price-usd-secondary">Approx. USD $${usd.toLocaleString()}</span>
      </div>
    `;
  }

  return `
    <div class="price-dual-box ${isCompact ? 'price-dual-compact' : ''} ${customClass}">
      <span class="price-aed-primary">AED ${aed.toLocaleString()}</span>
      <span class="price-usd-secondary">Approx. USD $${usd.toLocaleString()}</span>
    </div>
  `;
}

export function formatPrice(price) {
  const { aed, qar, isDoha } = getPropertyPricing(price);
  if (isDoha && qar) {
    const m = qar / 1_000_000;
    return `QAR ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  if (aed >= 1_000_000) {
    const m = aed / 1_000_000;
    return `AED ${m % 1 === 0 ? m.toFixed(0) : m.toFixed(1)}M`;
  }
  return `AED ${aed.toLocaleString()}`;
}

export function formatPriceFull(price) {
  return formatDualPriceHtml(price);
}
