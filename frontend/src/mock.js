// Mock data for Pankaj Furniture

export const collections = [
  {
    id: 'heritage',
    name: 'Heritage Collection',
    description: 'Timeless pieces that celebrate traditional craftsmanship with modern functionality',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
    featured: true
  },
  {
    id: 'contemporary',
    name: 'Contemporary Living',
    description: 'Clean lines and minimalist aesthetics for the modern home',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
    featured: true
  },
  {
    id: 'artisan',
    name: 'Artisan Series',
    description: 'Handcrafted masterpieces showcasing exceptional woodworking artistry',
    image: 'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=800&fit=crop',
    featured: true
  },
  {
    id: 'outdoor',
    name: 'Outdoor Elegance',
    description: 'Weather-resistant luxury for your outdoor living spaces',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
    featured: false
  }
];

export const products = [
  {
    id: 'p1',
    name: 'Copenhagen Sofa',
    collection: 'contemporary',
    category: 'sofa',
    room: 'living',
    style: 'mid-century',
    price: 125000,
    description: 'The Copenhagen Sofa embodies Scandinavian design philosophy with its clean lines and exceptional comfort. Each piece is meticulously crafted from sustainably sourced teak, featuring hand-stitched premium Italian leather cushions. The subtle taper of the legs and perfectly proportioned armrests create a sense of lightness, while the deep seating ensures hours of comfort.',
    materials: ['Solid Teak Wood', 'Premium Italian Leather', 'High-Density Foam'],
    dimensions: { width: 220, depth: 95, height: 85 },
    designer: 'Rajesh Kumar',
    designerNote: 'I designed the Copenhagen to be a statement of restraint—where every line serves a purpose, and comfort is never compromised for aesthetics.',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=1200&h=800&fit=crop'
    ],
    customizations: {
      fabric: ['Charcoal Leather', 'Caramel Leather', 'Olive Velvet', 'Navy Linen'],
      wood: ['Teak', 'Walnut', 'Oak']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'p2',
    name: 'Maharaja Dining Table',
    collection: 'heritage',
    category: 'table',
    room: 'dining',
    style: 'traditional',
    price: 185000,
    description: 'A masterpiece of traditional Indian craftsmanship, the Maharaja Dining Table features intricate hand-carved details inspired by palace architecture. The solid rosewood construction ensures this heirloom piece will grace your dining room for generations. The expansive surface comfortably seats eight, with extension leaves available for larger gatherings.',
    materials: ['Solid Rosewood', 'Natural Oil Finish', 'Brass Inlays'],
    dimensions: { width: 240, depth: 110, height: 76 },
    designer: 'Anita Sharma',
    designerNote: 'This table tells the story of royal banquets and family gatherings. Each carving is a tribute to our rich heritage.',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&h=800&fit=crop'
    ],
    customizations: {
      wood: ['Rosewood', 'Teak', 'Sheesham'],
      size: ['6-Seater', '8-Seater', '10-Seater']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'p3',
    name: 'Zen Armchair',
    collection: 'contemporary',
    category: 'chair',
    room: 'living',
    style: 'minimalist',
    price: 45000,
    description: 'The Zen Armchair is a meditation on simplicity. Its curved backrest follows the natural contour of the spine, while the wide seat invites you to settle in with a book or morning coffee. Crafted from solid oak with a natural finish, this chair ages beautifully, developing a rich patina over time.',
    materials: ['Solid Oak', 'Natural Linen', 'Jute Webbing'],
    dimensions: { width: 75, depth: 80, height: 82 },
    designer: 'Vikram Patel',
    designerNote: 'Less is more. The Zen chair eliminates everything unnecessary, leaving only what brings joy and comfort.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&h=800&fit=crop'
    ],
    customizations: {
      fabric: ['Natural Linen', 'Grey Wool', 'Beige Cotton'],
      wood: ['Oak', 'Ash', 'Birch']
    },
    inStock: true,
    featured: false
  },
  {
    id: 'p4',
    name: 'Heritage Bookshelf',
    collection: 'artisan',
    category: 'storage',
    room: 'study',
    style: 'traditional',
    price: 95000,
    description: 'This magnificent bookshelf showcases the pinnacle of woodworking artistry. Hand-carved floral motifs adorn the frame, while adjustable shelves accommodate everything from leather-bound classics to modern art books. The rich walnut finish develops character with age, making this piece truly timeless.',
    materials: ['Solid Walnut', 'Brass Hardware', 'Natural Wax Finish'],
    dimensions: { width: 180, depth: 40, height: 220 },
    designer: 'Suresh Verma',
    designerNote: 'Books deserve a throne. This shelf is both a sanctuary for knowledge and a work of art in itself.',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&h=800&fit=crop'
    ],
    customizations: {
      wood: ['Walnut', 'Mahogany', 'Teak'],
      size: ['Standard', 'Large', 'Extra Large']
    },
    inStock: true,
    featured: false
  },
  {
    id: 'p5',
    name: 'Lotus Coffee Table',
    collection: 'contemporary',
    category: 'table',
    room: 'living',
    style: 'modern',
    price: 55000,
    description: 'Inspired by the lotus flower floating on water, this coffee table features a sculptural base that seems to defy gravity. The tempered glass top provides an airy feel, while the solid teak base adds warmth and organic beauty. A perfect centerpiece for contemporary living spaces.',
    materials: ['Solid Teak', 'Tempered Glass', 'Natural Oil Finish'],
    dimensions: { width: 120, depth: 80, height: 45 },
    designer: 'Priya Menon',
    designerNote: 'Like the lotus rising from water, this table brings serenity and natural beauty to any space.',
    images: [
      'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=1200&h=800&fit=crop'
    ],
    customizations: {
      wood: ['Teak', 'Oak', 'Walnut'],
      top: ['Clear Glass', 'Smoked Glass', 'Marble']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'p6',
    name: 'Royal Bed Frame',
    collection: 'heritage',
    category: 'bed',
    room: 'bedroom',
    style: 'traditional',
    price: 165000,
    description: 'Sleep like royalty in this majestic bed frame featuring hand-carved headboard with intricate jali work. The solid sheesham construction ensures durability, while the elevated platform design with subtle curves adds grandeur. Optional storage drawers integrate seamlessly into the base.',
    materials: ['Solid Sheesham', 'Brass Accents', 'Natural Lacquer'],
    dimensions: { width: 200, depth: 220, height: 140 },
    designer: 'Karan Singh',
    designerNote: 'A bed should be a sanctuary—a place where heritage meets comfort, inviting peaceful slumber.',
    images: [
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1560185127-6d2de4a13992?w=1200&h=800&fit=crop'
    ],
    customizations: {
      wood: ['Sheesham', 'Rosewood', 'Teak'],
      size: ['Queen', 'King'],
      storage: ['With Storage', 'Without Storage']
    },
    inStock: true,
    featured: false
  },
  {
    id: 'p7',
    name: 'Executive Office Desk',
    collection: 'contemporary',
    category: 'table',
    room: 'study',
    style: 'modern',
    price: 78000,
    description: 'A sophisticated workspace solution combining functionality with elegant design. Features built-in cable management, spacious drawers, and a premium leather writing surface.',
    materials: ['Solid Oak', 'Leather Top', 'Metal Hardware'],
    dimensions: { width: 160, depth: 80, height: 75 },
    designer: 'Amit Desai',
    designerNote: 'Designed for the modern professional who values both style and productivity.',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&h=800&fit=crop'
    ],
    customizations: {
      wood: ['Oak', 'Walnut', 'Mahogany'],
      finish: ['Natural', 'Dark Stain', 'White Wash']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'p8',
    name: 'Comfort Recliner',
    collection: 'contemporary',
    category: 'chair',
    room: 'living',
    style: 'modern',
    price: 68000,
    description: 'Ultimate relaxation meets contemporary design. This recliner features premium cushioning, adjustable positions, and a sleek silhouette that complements any living space.',
    materials: ['Genuine Leather', 'Steel Frame', 'Memory Foam'],
    dimensions: { width: 85, depth: 95, height: 105 },
    designer: 'Neha Kapoor',
    designerNote: 'Comfort should never compromise style. This recliner proves both are possible.',
    images: [
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1200&h=800&fit=crop'
    ],
    customizations: {
      fabric: ['Black Leather', 'Brown Leather', 'Grey Fabric'],
      features: ['Manual Recline', 'Power Recline', 'Massage Function']
    },
    inStock: true,
    featured: false
  },
  {
    id: 'p9',
    name: 'Vintage Sideboard',
    collection: 'heritage',
    category: 'storage',
    room: 'dining',
    style: 'traditional',
    price: 115000,
    description: 'A stunning storage solution with hand-carved doors and brass fittings. Perfect for displaying fine china or storing dining essentials with timeless elegance.',
    materials: ['Solid Rosewood', 'Brass Handles', 'Velvet Lining'],
    dimensions: { width: 180, depth: 50, height: 90 },
    designer: 'Anita Sharma',
    designerNote: 'Every meal becomes special when surrounded by pieces that honor our heritage.',
    images: [
      'https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1200&h=800&fit=crop'
    ],
    customizations: {
      wood: ['Rosewood', 'Teak', 'Mahogany'],
      hardware: ['Brass', 'Antique Bronze', 'Silver']
    },
    inStock: true,
    featured: false
  },
  {
    id: 'p10',
    name: 'Modern Console Table',
    collection: 'contemporary',
    category: 'table',
    room: 'living',
    style: 'minimalist',
    price: 42000,
    description: 'Sleek and functional, this console table features a slim profile perfect for entryways or behind sofas. The geometric metal base adds an artistic touch.',
    materials: ['Marble Top', 'Steel Base', 'Powder Coating'],
    dimensions: { width: 120, depth: 35, height: 80 },
    designer: 'Vikram Patel',
    designerNote: 'Sometimes the smallest pieces make the biggest impact.',
    images: [
      'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop'
    ],
    customizations: {
      top: ['White Marble', 'Black Marble', 'Wood'],
      base: ['Matte Black', 'Gold', 'Chrome']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'p11',
    name: 'Garden Lounge Set',
    collection: 'outdoor',
    category: 'sofa',
    room: 'outdoor',
    style: 'modern',
    price: 145000,
    description: 'Weather-resistant luxury for your outdoor space. This 4-piece set includes a sofa, two chairs, and a coffee table, all crafted from premium teak with UV-resistant cushions.',
    materials: ['Teak Wood', 'Outdoor Fabric', 'Stainless Steel'],
    dimensions: { width: 200, depth: 85, height: 75 },
    designer: 'Priya Menon',
    designerNote: 'Bring the comfort of indoor living to your outdoor oasis.',
    images: [
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=1200&h=800&fit=crop'
    ],
    customizations: {
      cushion: ['Beige', 'Navy', 'Grey', 'Terracotta'],
      configuration: ['4-Piece', '6-Piece', '8-Piece']
    },
    inStock: true,
    featured: true
  },
  {
    id: 'p12',
    name: 'Artisan Wardrobe',
    collection: 'artisan',
    category: 'storage',
    room: 'bedroom',
    style: 'traditional',
    price: 195000,
    description: 'A magnificent wardrobe featuring intricate hand-carved panels and spacious interior with multiple compartments. Includes soft-close hinges and premium velvet lining.',
    materials: ['Solid Walnut', 'Mirror Glass', 'Velvet Interior'],
    dimensions: { width: 220, depth: 60, height: 240 },
    designer: 'Suresh Verma',
    designerNote: 'Your clothes deserve a home as beautiful as they are.',
    images: [
      'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1200&h=800&fit=crop'
    ],
    customizations: {
      wood: ['Walnut', 'Rosewood', 'Teak'],
      doors: ['2-Door', '3-Door', '4-Door'],
      mirror: ['With Mirror', 'Without Mirror']
    },
    inStock: true,
    featured: false
  }
];

export const rooms = [
  { id: 'living', name: 'Living Room', image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800&h=600&fit=crop' },
  { id: 'dining', name: 'Dining Room', image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop' },
  { id: 'bedroom', name: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=800&h=600&fit=crop' },
  { id: 'study', name: 'Study', image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop' },
  { id: 'outdoor', name: 'Outdoor', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop' }
];

export const lookbookScenes = [
  {
    id: 'scene1',
    title: 'Contemporary Living Oasis',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=1600&h=1000&fit=crop',
    products: [
      { productId: 'p1', x: 35, y: 50 },
      { productId: 'p5', x: 50, y: 65 },
      { productId: 'p3', x: 70, y: 45 }
    ]
  },
  {
    id: 'scene2',
    title: 'Heritage Dining Experience',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=1600&h=1000&fit=crop',
    products: [
      { productId: 'p2', x: 50, y: 55 }
    ]
  },
  {
    id: 'scene3',
    title: 'Serene Bedroom Retreat',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?w=1600&h=1000&fit=crop',
    products: [
      { productId: 'p6', x: 45, y: 50 }
    ]
  }
];

export const journalPosts = [
  {
    id: 'j1',
    title: 'The Art of Hand-Carved Furniture',
    excerpt: 'Discover how our master artisans transform raw wood into timeless masterpieces through centuries-old techniques.',
    image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=600&fit=crop',
    date: '2024-03-15',
    category: 'Craftsmanship'
  },
  {
    id: 'j2',
    title: 'Sustainable Sourcing: Our Commitment',
    excerpt: 'Learn about our journey to ensure every piece of wood comes from responsibly managed forests.',
    image: 'https://images.unsplash.com/photo-1542435503-956c469947f6?w=800&h=600&fit=crop',
    date: '2024-03-10',
    category: 'Sustainability'
  },
  {
    id: 'j3',
    title: 'Mixing Heritage with Modern Design',
    excerpt: 'Interior designer tips on blending traditional Indian furniture with contemporary aesthetics.',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
    date: '2024-03-05',
    category: 'Design Inspiration'
  }
];

export const testimonials = [
  {
    id: 't1',
    name: 'Arjun Mehta',
    role: 'Interior Designer',
    content: 'Pankaj Furniture has been my go-to for heritage pieces. The craftsmanship is unparalleled, and my clients are always thrilled.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop'
  },
  {
    id: 't2',
    name: 'Sneha Patel',
    role: 'Homeowner',
    content: 'We furnished our entire home with pieces from Pankaj Furniture. Each item is a work of art that tells a story.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  },
  {
    id: 't3',
    name: 'Ravi Kumar',
    role: 'Architect',
    content: 'The attention to detail and quality of materials is exceptional. These pieces will last for generations.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop'
  }
];

export const storeLocation = {
  address: 'Plot No-97, 7th St, Bapuji Nagar, Bhubaneswar, Odisha 751009',
  phone: '+91 98765 43210',
  email: 'debipanda27@gmail.com',
  hours: {
    weekday: '10:00 AM - 8:00 PM',
    weekend: '10:00 AM - 9:00 PM'
  },
  coordinates: {
    lat: 20.2961,
    lng: 85.8245
  }
};

export const brandStory = {
  title: 'Three Generations of Craftsmanship',
  subtitle: 'Where Heritage Meets Modern Living',
  story: `Founded in 1965 by Master Craftsman Pankaj Das, Pankaj Furniture began as a small workshop in Bhubaneswar, dedicated to preserving traditional Indian woodworking techniques. What started with a single artisan and a dream has grown into a celebrated furniture house, now spanning three generations of master craftspeople.

Our philosophy is simple: create furniture that tells a story, honors our heritage, and serves modern life. Each piece that leaves our workshop carries the soul of the artisan who crafted it, the history of techniques passed down through centuries, and the promise of quality that lasts for generations.

Today, under the leadership of third-generation craftsman Rahul Das, we blend time-honored joinery techniques with contemporary design sensibilities. Our workshop employs over 50 skilled artisans, each specializing in specific crafts—from intricate hand-carving to precision joinery. We source our wood exclusively from sustainably managed forests, ensuring that our craft honors not just tradition, but also our responsibility to the environment.

Every curve, every joint, every finish is executed with the same attention to detail that our founder demanded. Because at Pankaj Furniture, we don't just make furniture—we create heirlooms.`
};