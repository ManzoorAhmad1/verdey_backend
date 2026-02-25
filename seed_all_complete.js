/**
 * COMPLETE MASTER SEEDER - Seeds ALL pages with FULL content
 * Run: node seed_all_complete.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');
const Admin = require('./models/Admin');

dotenv.config();

// ============================================
// DATABASE CONNECTION
// ============================================
const connectDB = async () => {
    try {
        const isDocDB = process.env.DOCDB_TLS === 'true';
        const uri = !isDocDB && process.env.LOCAL_MONGO_URI
            ? process.env.LOCAL_MONGO_URI
            : process.env.MONGO_URI;

        const opts = isDocDB
            ? {
                retryWrites: false,
                serverSelectionTimeoutMS: 10000,
                authMechanism: 'SCRAM-SHA-1',
                authSource: 'admin',
                tls: true,
                tlsCAFile: './global-bundle.pem',
                tlsAllowInvalidCertificates: false,
              }
            : { serverSelectionTimeoutMS: 10000 };

        const conn = await mongoose.connect(uri, opts);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

// ============================================
// HOME PAGE - COMPLETE
// ============================================
const homePageData = {
  slug: 'home',
  title: 'Home Page',
  sections: [
    {
      type: 'hero',
      heading: 'VERDE NYC',
      subheading: 'MediterrAsian Rooftop Restaurant & Lounge',
      ctaText: 'RESERVE YOUR TABLE',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8442.jpg'],
      order: 1
    },
    {
      type: 'features',
      heading: 'WHERE PARISIAN CRAFT MEETS NEW YORK SOUL',
      subheading: 'A YEEELS GROUP DESTINATION — PARIS | SAINT-TROPEZ | DUBAI | SARDINIA | NEW YORK',
      content: `Verde NYC is the latest jewel in the Yeeels Group crown—an international hospitality collective celebrated for curating unforgettable culinary destinations across Europe, the Middle East, and now, in the heart of Manhattan.

Verde brings Parisian soul to New York's vibrant streets. Here, French culinary tradition is reimagined with contemporary elegance—each dish reflects precision, passion, and the art of celebration.

Step into a world of intimate charm and metropolitan energy, where every moment is crafted for connection and savor. From thoughtfully designed tasting journeys to vibrant lounge evenings and exclusive dining experiences, Verde invites you to dine beyond the expected.

Paris on the plate. New York in the room`,
      images: ['/mila-miami-texture.png'],
      items: [
        {
          name: 'VERDE RESTAURANT',
          description: 'The distinctively curated rooftop aims to take guests on a culinary journey through the shores of the Mediterranean.',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg',
          link: '/restaurant'
        },
        {
          name: "VERDE PARTY'S",
          description: "Experience world-class hospitality at VERDYPARTY'S, where bespoke private events come to life. Whether an intimate gathering or a grand celebration for up to 400 guests, each occasion is infused with timeless Mediterranean elegance and meticulous attention to detail.",
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork.jpg',
          link: '/dinner-party'
        },
        {
          name: 'VERDE Lounge',
          description: 'At VERDE lounge, intimate charm blends seamlessly with metropolitan energy. Designed for vibrant lounge evenings and thoughtfully curated experiences, this space captures the essence of Parisian artistry and the spirited soul of New York',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg-750x750.jpg',
          link: '/milalounge'
        },
        {
          name: 'VERDE BAR',
          description: 'VERDYBAR redefines Sunday Brunch. Join us on our rooftop for a festive experience featuring live music, exquisite Mediterranean fare from chef-designed stations, and an atmosphere dedicated to leisure and lively connection',
          image: 'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg.jpg',
          link: '/bar'
        }
      ],
      order: 2
    },
    {
      type: 'parallax',
      heading: 'Inspired by nature',
      content: 'Born in Paris. Celebrated in Saint-Tropez. Elevated in Dubai. Now, Verde arrives in New York—bringing two decades of Mediterranean excellence to the Meatpacking District.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8419.jpg'],
      order: 3
    },
    {
      type: 'text',
      heading: 'A Global Legacy of Culinary Excellence',
      content: "The Yeeels Group has spent over a decade perfecting the art of festive dining across Europe and the Middle East. From the sophisticated elegance of Verde Paris on Avenue George V to the sun-drenched glamour of our Saint-Tropez beach club, from the cosmopolitan energy of Verde Dubai to the timeless charm of our Italian venues—each destination embodies our commitment to exceptional experiences. Now, Verde NYC brings this celebrated legacy to America's most dynamic city. In the heart of the Meatpacking District, discover a sanctuary where Mediterranean cuisine, innovative mixology, and world-class entertainment converge to create moments that transcend the ordinary.",
      ctaText: 'RESERVE YOUR EXPERIENCE',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      images: [],
      order: 4
    },
    {
      type: 'parallax',
      heading: 'The Art of Festive Dining',
      content: "At the heart of the Yeeels Group philosophy lies a simple yet profound belief: dining should be transformative. From our flagship venues in Paris to the shores of the French Riviera, from the glittering skyline of Dubai to the vibrant energy of Manhattan, we create spaces where gastronomy becomes theatre, where every evening unfolds as a unique celebration. Verde NYC continues this tradition, offering an immersive experience where Mediterranean sophistication meets New York's electric energy. Here, exceptional cuisine, innovative cocktails, and curated entertainment converge to create memories that linger long after the evening ends.",
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8490.jpg'],
      order: 5
    },
    {
      type: 'philosophy',
      heading: 'Our Philosophy',
      images: [
        '',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8425.jpg'
      ],
      items: [
        { name: 'Philosophy Part 1', description: 'The Yeeels Group was founded on a singular vision: to become the global leader in high-end festive dining. This vision has guided our expansion from Paris to Saint-Tropez, Dubai to New York, always with the same unwavering commitment to excellence. At Verde NYC, this philosophy manifests in every detail—from the carefully sourced Mediterranean ingredients to the bespoke interior design that blends reclaimed woods, natural stone, and artisanal textiles imported from our European ateliers.' },
        { name: 'Philosophy Part 2', description: "Our three pillars—Food, Tribe, and Stories—define everything we do. Creative and passionate cuisine designed for sharing. A culture of collaboration, respect, and operational excellence. High-energy, immersive experiences that transform dining into celebration. These values have made us leaders across four countries and nine venues, and they now come to life in the heart of Manhattan's Meatpacking District." },
        { name: 'Art & Culture Title', description: 'ART & Culture' },
        { name: 'Art & Culture Part 1', description: 'The Yeeels Group has always believed that exceptional dining spaces require exceptional artistry. Across our venues in France, Italy, UAE, and the United States, we collaborate with visionary artists, sculptors, ceramists, and designers to create environments that inspire and transport.' },
        { name: 'Art & Culture Part 2', description: 'At Verde NYC, Japanese Wabi-Sabi philosophy meets Mediterranean warmth—celebrating the beauty of imperfection and the integrity of natural materials. Hand-selected artworks, bespoke installations, and carefully curated design elements create a sanctuary where every corner tells a story, every surface invites touch, and every moment becomes a memory.' },
        { name: 'Art & Culture Part 3', description: 'For collaboration inquiries, contact us at pr@yeeels.com' }
      ],
      ctaText: 'CONTACT US',
      ctaLink: '/contact',
      order: 6
    },
    {
      type: 'gallery',
      heading: 'FOLLOW US ON INSTAGRAM',
      subheading: '@VERDE_NYC',
      ctaLink: 'https://www.instagram.com/verde_nyc?igsh=MXdlN2R5NmUxdXRiaQ==',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4610-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4697-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4726-verde-newyork-750x750.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4761-verde-newyork-750x750.jpg'
      ],
      order: 7
    }
  ]
};

// ============================================
// RESTAURANT PAGE - COMPLETE WITH FULL MENUS
// ============================================
const restaurantPageData = {
  slug: 'restaurant',
  title: 'Restaurant - Verde NYC',
  sections: [
    // Section 1: Hero Image
    {
      type: "hero",
      heading: "",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8442.jpg"],
      order: 1
    },
    
    // Section 2: Philosophy
    {
      type: "philosophy",
      heading: "A Yeeels Group Signature Destination",
      subheading: "Verde NYC — Where Culinary Mastery Meets Celebration",
      content: "From the glamorous avenues of Paris to the sun-kissed shores of Saint-Tropez, from the sophisticated skyline of Dubai to the vibrant pulse of Manhattan—the Yeeels Group has redefined festive dining across four continents. At Verde NYC, this legacy of excellence finds its newest expression in an unforgettable culinary journey through Mediterranean and Asian flavors.\n\nOur award-winning culinary team sources the finest ingredients from trusted purveyors across the globe—line-caught fish from Japanese waters, premium wagyu from Kagoshima Prefecture, seasonal vegetables from local farms, and artisanal products from the Mediterranean coast. Each dish is a masterpiece of technique and creativity, honoring tradition while embracing innovation.\n\nWhether you join us for an intimate lunch overlooking the Meatpacking District or an electrifying evening of dining and entertainment, Verde NYC transforms every meal into a celebration. Dishes are designed for sharing, encouraging connection and conversation in an atmosphere that evolves from refined sophistication to vibrant festivity as the night unfolds.",
      images: ["https://images.squarespace-cdn.com/content/v1/61d2ccabbc553c1fec7c16e9/0c14fc2a-88f5-46a4-996e-8e0175295970/mila-miami-texture.png"],
      ctaLink: "https://www.sevenrooms.com/explore/verdenyc/reservations/create/search",
      ctaText: "RESERVE YOUR TABLE",
      order: 2
    },

    // Section 3: DINNER Menu Tab - COMPLETE
    {
      type: "menu",
      heading: "DINNER",
      subheading: "Menu",
      content: `<h3><strong>Discover Verde NYC Experiences</strong></h3>
<div class="menu-experiences">
<div class="experience-row">
<div class="experience-item">
  <p>VERDE SIGNATURE TASTING MENU*<br/>5-course menu, chef's selection 155 - per person requires whole table's participation</p>
</div>
<div class="experience-item">
  <p>PREMIUM CHEF'S TASTING MENU*<br/>5-course menu, chef's premium selection 225 - per person requires whole table's participation</p>
</div>
<div class="experience-item">
  <p>SEAFOOD TOWER*<br/>lobster, 1/2 dozen oysters, large prawns, madai crudo, tuna tartare, mixed sashimi 185 | add petrossian caviar 185</p>
</div>
</div>
</div>

<p style="text-align: center">PETROSSIAN KALUGA CAVIAR*<br/>california, egg à la russe, shallot, capers, crème fraîche, chives, blini 30g 185 | 50G 305 | 125g 750 | 250G 1500</p>

<hr class="menu-divider" />

<h3><strong>Tapas | Share</strong></h3>
<div class="menu-items">
<p>charred edamame, Verde spice, salt 11 <strong>(V)</strong></p>
<p>blistered shishito peppers, tosazu miso, izak spice 14</p>
<p><strong>chicken yakitori,</strong> fragrant teriyaki, spicy furikake, pickled fennel 22</p>
<p>wild fungi dumpling, duxelle mushroom, spinach, chili garlic ponzu 28 <strong>(V)</strong></p>
<p>fried eggplant and zucchini chips, shiso tzatziki 21</p>
<p>salmon crispy rice, serrano pepper, marinated ikura, katsuo furikake* 24</p>
<p>spicy tuna crispy rice smoked chili sauce, kizami wasabi, shiso* 26</p>
<p>grilled octopus skewer, romesco sauce, shiso chimichurri, fresno chili 38</p>
<p>caviar potato millefeuille, smoked wasabi, crème fraîche <strong>(GF)</strong><br/>vegan caviar 21 | brown trading royal caviar 29</p>
<p>wagyu beef tartare, bone marrow, pickled mustard seeds, gaufrette potatoes* 35 <strong>(GF)</strong></p>
</div>

<hr class="menu-divider" />

<h3><strong>Mediterrasian Raw Bar</strong></h3>
<div class="menu-items">
<p>madai sashimi, jalapeño dressing, kumquat, orange marmalade, rakyo* 28 <strong>(GF)</strong></p>
<p>hamachi crudo, avocado coulis, lime caviar* 25 <strong>(GF)</strong></p>
<p><strong>seabream carpaccio, piquillo, yuzu, capers, arbequina olive oil</strong>* 32 (GF)</p>
<p>1/2 dozen oysters, tosazu, apple serrano salsa, Japanese mignonette* 30 <strong>(GF)</strong></p>
<p>tuna tartare, roasted fennel-tofu aïoli, avocado miso* 32 <strong>(GF)</strong></p>
<p>rainbow carpaccio, zucchini, watermelon radish, beets, basil aioli, sunchoke* 25 <strong>(GF) (V)</strong></p>
</div>

<hr class="menu-divider" />

<h3><strong>Salads</strong></h3>
<div class="menu-items">
<p><strong>Verde house salad,</strong> purple ninja radish, baby golden beet, avocado, tomato, pumpkin seed 20 (V)</p>
<p>japanese seaweed salad, pickled cucumber, wakame, ponzu, nori crisp 22 (GF) (V)</p>
<p>spinach salad, spicy sesame dressing, furikake 19 (GF) (V)</p>
<p>snow crab salad, cucumber, avocado, orange, honey ponzu dressing 30</p>
<p>beetroot tartare, apple, avocado, jalapeño, sesame ponzu, lotus chips* 20 (GF) (V)</p>
</div>

<hr class="menu-divider" />

<h3><strong>Signatures</strong></h3>
<div class="menu-items">
<p>'shawarma' wagyu gyoza, shichimi ponzu 34</p>
<p>truffle cream spaghetti, parmesan cheese, chives, shaved black truffle 58 | add brown trading royal caviar 35</p>
<p>seasonal mushroom hotpot, shaved truffle, arbequina olive oil 60 <strong>(GF)</strong></p>
<p>maine lobster tempura, smoked jalapeño aioli, truffle tosazu, lettuce wraps 85</p>
</div>

<hr class="menu-divider" />

<h3><strong>Water</strong></h3>
<div class="menu-items">
<p>seared salmon, hokkaido corn purée, piquillo-shiso coulis 38</p>
<p>grilled madagascan shrimp, spicy miso butter, fennel salad* (3 pieces) 59</p>
<p>marinated chilean seabass, green curry, chili, kaffir lime, herb salad 53 (GF)</p>
<p><strong>king crab lobster rice hot pot,</strong> bouillabaisse, mushrooms, bonito, nori 90 | +2oz A5 wagyu MP | +japanese uni 25 | +ikura 10 (GF)</p>
<p>mediterrasian black cod, spicy miso, kinome 56 <strong>(GF)</strong></p>
<p>2lb grilled whole branzino, shiso chimichurri, kalamata olive, herb salad 85</p>
<p>2lb grilled whole dover sole, yuzu kosho butter, Verde spice, miso pumpkin vinegar, espelette 125 <strong>(GF)</strong></p>
</div>

<hr class="menu-divider" />

<h3><strong>Earth</strong></h3>
<div class="menu-items">
<p>spicy chipotle lamb chops, shiso yoghurt, basil, crispy furikake 42</p>
<p>free range young chicken, Mediterranean marinade, basil jalapeño sauce 42 <strong>(GF)</strong></p>
<p>wagyu skirt steak, pickled cabbage, basil crisp 80 (GF)</p>
<p><strong>7oz creekstone beef tenderloin,</strong> creamy ponzu, micro green salad 70</p>
<p>14oz prime ribeye, yuzu kosho, rosemary marinade 110</p>
<p>32oz Australian wagyu tomahawk, onion jus 275</p>
<p>Japanese A5 striploin wagyu Kagoshima Prefecture - daily selection (2oz minimum) MP</p>
<p>koji dry aged 30-day Châtel Farms Angus - 30oz USDA prime bone-in porterhouse 350 | 30oz USDA prime boneless ribeye 375</p>
</div>

<hr class="menu-divider" />

<h3><strong>Vegetables</strong></h3>
<div class="menu-items">
<p>grilled sweet corn, Verde spice, spicy feta sauce 16</p>
<p>broccolini, miso-tahini, sesame 16 <strong>(GF)</strong></p>
<p>crispy brussels sprouts, honey-soy balsamic glaze 16 (GF)</p>
<p>grilled purple artichoke, shiso verde, sunchoke crisp 24 <strong>(GF)</strong></p>
<p>seasonal wild mushrooms, truffle ponzu butter, shaved truffle 29 <strong>(GF)</strong></p>
<p>wasabi mashed potato, smoked cream, shiso, micro herbs 16 <strong>(GF)</strong></p>
<p>crispy cauliflower tempura, pickled fennel, cucumber, fresh herbs, tobanjan sauce 21 (V)</p>
</div>

<hr class="menu-divider" />

<h3><strong>Sushi</strong></h3>
<div class="menu-items">
<p>SAMPLERS<br/>nigiri sampler* (6pc) 45 | omakase* (12pc) 80<br/>sashimi sampler* 65 | tasting* 95 | omakase* 130</p>
<p>SIGNATURE NIGIRI (2PC)<br/>wagyu*, a5 kagoshima, shaved black truffle, fresh wasabi 45<br/>chu toro*, bluefin tuna, royal caviar 42<br/>o toro*, foie gras, eel sauce, gold flake 45</p>
<p>MAKI<br/>eggplant, garlic miso butter, micro shiso 16<br/>beetroot, red and gold beets, sriracha, cucumber, avocado 18 (GF) <strong>(V)</strong><br/>salmon avocado, sundried tomato relish, asparagus, evoo, micro arugula* 18 <strong>(GF)</strong><br/>spicy hamachi, avocado, serrano pepper, provence salt, yuzu aïoli* 21<br/>spicy tuna, tobiko, chili oil, avocado* 22<br/>crispy shrimp, sashimi trio, spicy mentaiko* 27<br/>truffle scallop, shaved black truffle* 31 <strong>(GF)</strong><br/>A5 wagyu 'aburi' maki, toro, foie gras, unagi sauce, orange* 45</p>
</div>`,
      order: 3
    },

    // Section 4: COCKTAIL Menu Tab - COMPLETE
    {
      type: "menu",
      heading: "COCKTAIL",
      subheading: "Menu",
      content: `<h3><strong>signature cocktails</strong></h3>

<div class="cocktail-grid">
<div class="cocktail-column">
<p>UME BLOSSOM 21<br/>bitter | herbaceous | tart<br/>roku gin, umeshu, campari, fig infused vermouth</p>
<p>SPRING IN OSAKA 21<br/>mesmerizing | floral | aromatic<br/>suntory toki japanese whisky, elderflower, lychee, cardamom, club soda</p>
<p>BEACH WALK 21<br/>tropical | transporting | vibrant<br/>e11even vodka, japanese melon, coconut, peppercorn honey, pineapple, lemon, makrut lime leaf</p>
<p>VERDE G&T 22<br/>velvety | effervescent | earthy<br/>beefeater London dry gin, almond, lime, cucumber tonic</p>
</div>
<div class="cocktail-column">
<p>VERDE PALOMA 23<br/>floral | bright | refreshing<br/>maestro dobel diamante tequila, del maguey vida mezcal, elderflower, grapefruit, sparkling water</p>
<p>MARGARITA VERDE 21<br/>botanical | citrus | spicy<br/>hornitos plata, cointreau, cilantro, peppers, passion fruit, lime juice</p>
<p>NATSU MORI 21<br/>vibrant | tart | herbaceous<br/>código tequila reposado, shiso, mint, pineapple, lemon</p>
<p>AFTER HOURS 22<br/>velvety | herbaceous | luscious<br/>jefferson's straight bourbon, hennessy vs, coffee, chocolate, cherry, almond, mint</p>
</div>
</div>

<hr class="menu-divider" />

<h3><strong>TableSide Mixology Experiences</strong></h3>
<div class="menu-items">
<p>SMOKE & MIRRORS 50<br/>elegant | stirred | smoked<br/>alfred giraud french 'heritage' whisky, hibiki harmony, demerara, black walnut bitters</p>
<p>IMPERIAL SPRITZ 60<br/>opulent | crisp | spiced<br/>belvedere 10, moët & chandon, apple & spice cordial, cardamom orange bitters</p>
</div>

<hr class="menu-divider" />

<h3><strong>Zero-Proof cocktails</strong></h3>
<div class="menu-items">
<p>LONGEVITY 16<br/>restorative | crisp | effervescent<br/>almond, lime, cucumber tonic</p>
<p>HEIR OF THE GOD 16<br/>hydrating | tropical | spicy</p>
<p>GOLDEN GROVE 21<br/>tropical | light | soothing<br/>turmeric, ginger, milk thistle, seedlip grove, root blend, pandan, coconut milk, lemon</p>
</div>`,
      order: 4
    },

    // Section 5: WINE Menu Tab
    {
      type: "menu",
      heading: "WINE",
      subheading: "Menu",
      content: "",
      ctaLink: "/s/MILA_3F-Wine-Menu-012326.pdf",
      ctaText: "download menu",
      order: 5
    },

    // Section 6: DESSERT Menu Tab - COMPLETE
    {
      type: "menu",
      heading: "DESSERT",
      subheading: "Menu",
      content: `<div class="dessert-grid">
<div class="dessert-column">
<p>MATCHA SOFT SERVE TOWER 58 (GF) (V)<br/>caramelized puff rice, candied lemon, shiso oil</p>
<p>MOLTEN CHOCOLATE LAVA CAKE 21<br/>miso ice cream</p>
<p>RASPBERRY CHEESECAKE 18<br/>black sesame opaline, almond crumble</p>
<p>TIRAMISŌ 28<br/>miso sponge, candied mikan, hazelnut, mascarpone</p>
<p>MANJARI CHOCOLATE MOUSSE PARFAIT 40<br/>salted caramel, banana coulis</p>
</div>
<div class="dessert-column">
<p>EXOTIC VACHERIN 18<br/>coconut espuma, passion fruit-mango coulis, vanilla cream</p>
<p>VEGAN CHOCOLATE MOUSSE 18 (GF) (V)<br/>orange marmalade, coconut sorbet</p>
<p>YUZU BLOSSOM PANNA COTTA 19 (GF)<br/>mango coulis, sudachi zest, mirliton</p>
<p>CHEF'S DESSERT PLATTER 100</p>
<p>HOMEMADE ICE CREAM & SORBET DAILY SELECTION 16</p>
</div>
</div>

<hr class="menu-divider" />

<h3><strong>Coffee by Illy</strong></h3>
<div class="menu-items">
<p>ESPRESSO CLASSICO - MEDIUM ROAST 7<br/>a smooth flavor with delicate notes of caramel, orange blossom, and jasmine with a sweet aftertaste</p>
<p>DECAFFEINATED ESPRESSO - DARK ROAST 7<br/>a smooth taste, with notes of caramel, chocolate and toasted bread, followed by a sweet finish</p>
</div>

<hr class="menu-divider" />

<h3><strong>Tea by palais des thés</strong></h3>
<div class="menu-items">
<p>PARIS FOR YOU - BY DAY 6<br/>floral green tea with notes of rose, raspberry, and lychee</p>
<p>GENMAICHA YAMA 6<br/>traditional japanese tea with roasted brown rice</p>
<p>EARLY GREY QUEEN BLEND 6<br/>an earl grey delicately flavored with bergamot</p>
<p>L'HERBORISTE n°74 6<br/>chamomile tea | caffeine free<br/>a calming blend of limeflower, chamomile and orange blossom</p>
<p>INFUSION DE MENTHE 6<br/>mint tea | caffeine free<br/>herbal tea made from peppermint leaves</p>
</div>`,
      order: 6
    },

    // Section 7: SUNDAY BRUNCH Menu Tab - COMPLETE
    {
      type: "menu",
      heading: "SUNDAY BRUNCH",
      subheading: "Menu",
      content: `<h2><strong>Pick Your Package</strong></h2>

<h3><strong>non-alcoholic package</strong></h3>
<div class="menu-items">
<p><strong>VIRGIN 95</strong><br/>Longevity: almond, lime, cucumber tonic<br/>Heir of the god: passionfruit, pineapple, ginger, lemon</p>
</div>

<hr class="menu-divider" />

<h3><strong>champagne & rosé packages</strong></h3>
<div class="menu-items">
<p>RÉSERVE 125<br/>Renard-Barnier, "Cuvée Spéciale", Villevenard NV<br/>Domaine des Féraud, "Prestige," Côtes de Provence</p>
<p>MILLÉSIME 170<br/>Perrier Jouet Blasón, Rosé NV<br/>Château Sainte Marguerite, "Fantastique", Côtes de Provence</p>
<p>IMPÉRIAL 320<br/>Dom Pérignon, Brut<br/>Château d'Esclans, 'Garrus' Rosé, Côtes de Provence</p>
</div>

<hr class="menu-divider" />

<h3><strong>Buffet Experience</strong></h3>
<h3><strong>stations</strong></h3>
<div class="menu-items">
<p>FRUIT & PASTRY<br/>tropical fruits | freshly baked croissants | artisanal bread & bagels | flavored yogurts</p>
<p>CHARCUTERIE & CHEESE<br/>cured meats | flavorful cheeses</p>
<p>5J JAMÓN CARVING<br/>selection of meats carved to perfection</p>
<p>SALAD<br/>greek | potato | poached tuna | chicken | tomato | caesar</p>
<p>MEZZE<br/>hummus with fried chickpeas | tzatziki | micro cilantro | eggplant caviar</p>
<p>RAW BAR<br/>fresh oysters* | octopus ceviche* | white fish ceviche* | florida pink shrimp* | sashimi*</p>
<p>MAKI<br/>spicy tuna* | salmon avocado* | spicy yellowtail* | vegetable roll</p>
<p>HOT MEAT<br/>leg of lamb | whole smoked chicken | Verde roasted salmon | new york steak</p>
<p>ORGANIC EGG<br/>customize your own omelet or savor organic eggs cooked to your preference</p>
<p>ROBATA<br/>lamb kofte | chicken kushiyaki | grilled fresh vegetables</p>
<p>DESSERT<br/>chef-selected desserts | waffles | sorbets</p>
</div>`,
      order: 7
    },

    // Section 8: Disclaimer
    {
      type: "text",
      heading: "Disclaimer",
      content: "GF - gluten free | V - vegan<br/>Ask your server which additional dishes can be adjusted to become vegan friendly.<br/><br/><strong>*Eating raw or undercooked fish, shellfish or meat increases the risk of foodborne illness especially if you have certain medical conditions. Please alert your server to any food allergies before you order. There is risk associated with consuming raw oysters. If you have chronic illness of the liver, stomach or blood or have immune disorders, you are at greater risk of serious illness from raw oysters and should eat oysters fully cooked. If unsure of your risk, consult a physician. 20% service charge will be added for your convenience. 22% service charge will be added for parties of 6 or more.</strong><br/><br/><strong>**Vegan milk alternatives available upon request.</strong>",
      order: 8
    },
    
    // Section 9: Food Gallery
    {
      type: "gallery",
      heading: "Food Gallery",
      images: [
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/verde-lifestyle-1.jpg",
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8444.jpg",
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/mixology-cocktails.jpg",
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8455.jpg",
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/Decadence-verde-dubai-0693.jpg",
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8460.jpg",
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/verde-lifestyle-8.jpg",
        "https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8527.jpg"
      ],
      order: 9
    }
  ]
};

// ============================================
// DINNER PARTY PAGE - COMPLETE
// ============================================
const dinnerPartyPageData = {
  slug: 'dinner-party',
  title: 'Dinner Party',
  sections: [
    {
      type: "hero",
      heading: "",
      subheading: "",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/verde_images/VERDE-DUBAI-VENUE_0019__40A8461.jpg.jpg"],
      order: 1
    },
    {
      type: "text",
      heading: "World-Class Private Events by Yeeels Group",
      subheading: "From Intimate Gatherings to Grand Celebrations",
      content: "The Yeeels Group has orchestrated extraordinary private events across Paris, Saint-Tropez, Dubai, and Italy for over a decade. Now, this expertise arrives in New York. Verde NYC offers bespoke event experiences that blend Mediterranean elegance with Manhattan sophistication—from intimate chef's table dinners to full venue buyouts for up to 400 guests. Our dedicated events team brings the same meticulous attention to detail that has made our venues the preferred choice for discerning hosts across Europe and the Middle East.\n\nContact our global events team to begin crafting your extraordinary occasion: events@yeeels.com",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8472.jpg"],
      ctaLink: "mailto:event@verde-nyc.com",
      ctaText: "INQUIRE ABOUT EVENTS",
      order: 2
    },
    {
      type: "text",
      heading: "Indoor Private Dining Rooms",
      content: "Drawing inspiration from our celebrated venues across France, Italy, and the UAE, Verde NYC's private dining rooms are architectural masterpieces designed to create lasting impressions. Each space reflects the Yeeels Group's signature aesthetic—where reclaimed European woods, Mediterranean textiles, and contemporary design converge to create an atmosphere of refined luxury.\n\nOur main dining room features floor-to-ceiling windows with breathtaking Meatpacking District views, while intimate private spaces throughout the venue showcase bespoke design elements imported from our Parisian ateliers. Accommodating parties from 10 to 150 guests, each space is meticulously curated with custom lighting, commissioned artworks, and furnishings that honor our Mediterranean heritage.",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8464.jpg"],
      order: 3
    },
    {
      type: "text",
      heading: "Outdoor Event Spaces",
      content: "Inspired by our legendary beach clubs in Saint-Tropez and Dubai, Verde NYC's rooftop terrace brings open-air Mediterranean glamour to the heart of Manhattan. Our outdoor spaces blend the natural elegance that defines Verde Beach destinations worldwide with sophisticated New York energy—featuring lush greenery, ambient lighting, and panoramic skyline views that create an unforgettable backdrop for any celebration.\n\nWhether you envision a sunset cocktail reception, an al fresco wedding ceremony, or a corporate gathering under the stars, our rooftop venues accommodate up to 200 guests. Climate-controlled retractable coverings ensure comfort year-round while preserving the open-air ambiance that has made our outdoor venues legendary from the French Riviera to the Arabian Gulf.",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8469.jpg"],
      order: 4
    },
    {
      type: "text",
      heading: "VERDE LOUNGE",
      content: "The Yeeels Group pioneered the concept of integrated lounge experiences across our Paris and Dubai venues, and Verde Lounge NYC represents the pinnacle of this evolution. This exclusive space channels the sophisticated nightlife energy that has made our European lounges legendary—combining warm amber lighting, plush Mediterranean-inspired seating, and design elements curated from our venues in France, Italy, and the UAE.\n\nAccommodating up to 75 guests, Verde Lounge offers an unparalleled setting for cocktail receptions, networking events, and upscale celebrations. Our internationally-trained mixology team crafts signature cocktails inspired by each of our global destinations, while resident DJs create soundscapes that transition seamlessly from sophisticated ambiance to celebratory energy.",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8470.jpg"],
      order: 5
    },
    {
      type: "text",
      heading: "Chef's Table Experience",
      content: "For the most discerning hosts, our Chef's Table offers an intimate journey into culinary artistry—a concept perfected across our Michelin-recognized kitchens in Paris and refined for the New York palate. This exclusive 10-seat private dining room places you at the heart of the action, where our executive chef presents a bespoke multi-course tasting menu showcasing techniques and ingredients sourced from our global network of premium suppliers.\n\nThe space features a dramatic marble counter, a 500-year-old hinoki wood cutting board imported from Japan, and design elements that honor both Mediterranean warmth and Japanese precision. Your personal sommelier pairs each course with exceptional wines selected from our international cellar, creating a harmonious dining experience that embodies the Yeeels Group commitment to excellence without compromise.",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8471.jpg"],
      order: 6
    },
    {
      type: "text",
      heading: "VIP Dining Experience",
      content: "Our VIP dining areas offer an elevated experience for guests seeking privacy and exclusivity. Designed with the signature Yeeels Group aesthetic, these intimate spaces feature premium furnishings, personalized service, and an ambiance that makes every gathering feel extraordinary.",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8541.jpg"],
      order: 7
    },
    {
      type: "text",
      heading: "Bar & Cocktail Lounge",
      content: "The Verde NYC bar showcases our world-class mixology program, featuring signature cocktails crafted by internationally trained bartenders. The stunning bar area serves as both a gathering point and a destination, perfect for pre-dinner drinks or late-night celebrations.",
      images: ["https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8544.jpg"],
      order: 8
    },
    {
      type: "text",
      heading: "The Yeeels Group Event Experience",
      content: "From corporate galas in Dubai to society weddings in Saint-Tropez, we have perfected the art of exceptional hospitality. Let our New York team create an unforgettable celebration tailored to your vision, with the same excellence that defines every Yeeels Group venue worldwide.",
      ctaLink: "mailto:events@yeeels.com",
      ctaText: "CONTACT GLOBAL EVENTS",
      order: 9
    },
    {
      type: "text",
      heading: "Events Hosted Across Our Global Venues",
      content: "From haute couture fashion launches in Paris to royal celebrations in Dubai, from intimate celebrity dinners in Saint-Tropez to Fortune 500 corporate gatherings across our network—the Yeeels Group has hosted the world's most discerning clientele. At Verde NYC, we bring this unparalleled expertise to every event, whether an elegant birthday soirée, a sophisticated engagement dinner, or a landmark corporate milestone.\n\nOur dedicated team crafts bespoke experiences tailored to your vision, with access to our global network of culinary talent, entertainment partnerships, and design resources. Beyond our exceptional cuisine, we offer custom décor, international branding opportunities, world-class entertainment, and state-of-the-art technical capabilities—all orchestrated with the precision that has made us leaders in four countries.",
      order: 10
    },
    {
      type: "text",
      heading: "Complete Venue Buyouts",
      content: "A private buyout of Verde NYC offers truly unparalleled exclusivity—complete access to all four of our distinctive spaces, with the freedom to customize every element to your vision. Transform our rooftop into a Parisian garden party, channel the energy of our Dubai venues for a corporate gala, or create an entirely new concept limited only by imagination. Our international events team brings expertise from across our global portfolio to ensure flawless execution.\n\nFor private event inquiries, contact our global events team at events@yeeels.com or reach Maksim Dirgela directly at +971 56 675 6965.",
      ctaLink: "mailto:events@yeeels.com",
      ctaText: "inquire about your event",
      order: 11
    }
  ]
};

// ============================================
// GALLERY PAGE - COMPLETE
// ============================================
const galleryPageData = {
  slug: 'gallery',
  title: 'Gallery',
  sections: [
    {
      type: 'hero',
      heading: 'GALLERY',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg'],
      order: 1
    },
    {
      type: 'gallery',
      heading: 'Main Gallery',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4553-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4575-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4585-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4593-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4610-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4625-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4660-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4697-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4717-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4726-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4746-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4755-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4761-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4778-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4781-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4812-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4823-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4867.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4901.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4916-06fe9f00-f32f-4d49-b4f9-20b8f8a7f72ejpeg.jpeg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4939-db5620d8-89c3-4a1b-84c2-37308543f619jpeg.jpeg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4947-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A4987-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5006-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5026-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5048-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5053-verde-newyork.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/gallery/40A5070-verde-newyork.jpg'
      ],
      order: 2
    }
  ]
};

// ============================================
// CONTACT PAGE - COMPLETE
// ============================================
const contactPageData = {
  slug: 'contact',
  title: 'Contact',
  sections: [
    {
      type: 'hero',
      heading: 'CONTACT US',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8472.jpg'],
      order: 1
    },
    {
      type: 'contact_info',
      heading: 'VERDE NYC — A YEEELS GROUP VENUE',
      items: [
        { name: 'Address', description: '85 10th Avenue, New York City, NY 10011', link: 'https://maps.app.goo.gl/JLnMD7GPo3FHgSBb7' },
        { name: 'Reservations' },
        { name: 'Online Reservations', description: 'Click Here', link: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search' },
        { name: 'Phone', description: '+16467763660' },
        { name: 'Email', description: 'contact@verde-nyc.com' },
        { name: 'Private Events & Buyouts' },
        { name: 'Events Email', description: 'events@yeeels.com' },
        { name: 'Global Events Director', description: '+971 56 675 6965' },
        { name: 'Yeeels Group Headquarters' },
        { name: 'HQ Address', description: '24 Avenue George V, Paris 75008, France' },
        { name: 'HQ Email', description: 'contact@yeeels.com' },
        { name: 'Members Club' },
        { name: 'Membership', description: 'Explore Membership Benefits', link: '/membersclub' },
        { name: 'Social Instagram', link: 'https://www.instagram.com/verdenyc' },
        { name: 'Social SoundCloud', link: 'https://soundcloud.com/user-611720735' },
        { name: 'Social Facebook', link: 'https://www.facebook.com/verdenyc' },
        { name: 'Social Spotify', link: 'https://open.spotify.com/user/31prdeupjndbgg6f3yvdhbrmbvwq' }
      ],
      order: 2
    },
    {
      type: 'text',
      heading: 'Find Us In The Heart Of Manhattan',
      content: 'Part of the Yeeels Group family — with venues in Paris, Saint-Tropez, Dubai, Italy, and New York',
      ctaLink: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9593794733634!2d-74.00893432346168!3d40.74243103514894!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf2f24f4a7%3A0x999!2s85%2010th%20Ave%2C%20New%20York%2C%20NY%2010011!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus',
      order: 3
    }
  ]
};

// ============================================
// BAR PAGE - COMPLETE
// ============================================
const barPageData = {
  slug: 'bar',
  title: 'Bar - Verde NYC',
  sections: [
    {
      type: 'hero',
      heading: 'Verde NYC brunch',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8503.jpg'],
      order: 1
    },
    {
      type: 'gallery',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8504.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8506.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8507.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8510.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8511.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8513.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8514.jpg'
      ],
      order: 2
    },
    {
      type: 'text',
      heading: 'The Yeeels Group Sunday brunch experience',
      content: 'From Saint-Tropez beach clubs to Parisian terraces, Sunday at the Yeeels Group has always been sacred. At Verde NYC, we bring this celebrated tradition to New York—a midday celebration where Mediterranean elegance meets Manhattan sophistication. From noon to 5pm in the sun-drenched splendor of our Meatpacking District rooftop, indulge in a transportive experience brought to life with live music, curated cocktails, and the festive energy that has made Yeeels Group brunches legendary across Europe and the Middle East.',
      order: 3
    },
    {
      type: 'text',
      heading: 'Chef-curated Mediterranean stations',
      content: 'Inspired by the legendary brunch formats at our Saint-Tropez and Dubai venues, guests journey through artfully designed stations curated by chefs trained across our global kitchens. Each stop offers a distinct gastronomic chapter—compose your own Mediterranean narrative over a leisurely two-hour experience.',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8515.jpg'],
      order: 4
    },
    {
      type: 'text',
      content: "Your journey begins with an exquisite bakery selection featuring freshly baked croissants from recipes perfected in our Parisian kitchens, alongside seasonal fruits sourced from Mediterranean growers and Hudson Valley farms. Continue to an artful display of Italian cured meats, French artisanal cheeses, and handcrafted breads from our in-house boulangerie.\n\nAt the heart of the experience, our 5J Jamón Ibérico carving station—a tradition from our Spanish-influenced Dubai venue—offers premium cuts carved to perfection. Explore curated salads and a vibrant Sushi and Temaki Handroll Station showcasing fish flown daily from Japan. The Raw Bar features freshly shucked oysters from both coasts, while our Mezze station highlights Verde's signature eggplant caviar and Mediterranean spreads. On our celebrated rooftop terrace, a live Robata grill and dedicated Spritz station channel the aperitivo culture of our Italian venues.\n\nThe experience concludes with an indulgent dessert display featuring creations from our pastry team trained in Paris, capped by a Gelato Station offering flavors inspired by each of our global destinations.",
      order: 5
    },
    {
      type: 'text',
      heading: 'International beverage program',
      content: "Our beverage packages reflect the Yeeels Group's expertise cultivated across Paris, Saint-Tropez, Dubai, and Italy:\n\nA thoughtfully crafted non-alcoholic program featuring mocktails developed by our international mixology team, alongside Champagne and Rosé packages showcasing selections from our French suppliers—including houses that have partnered with us since our earliest Parisian days.",
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8519.jpg'],
      order: 6
    },
    {
      type: 'text',
      heading: 'Hours & location',
      content: 'Sunday | Noon - 5:00 PM\n\nGet Directions — 85 10th Avenue, Meatpacking District, New York City\n\nPart of the Yeeels Group: Paris | Saint-Tropez | Dubai | Italy | New York',
      ctaLink: 'https://maps.app.goo.gl/fqeZH3QPWLxBZFXY7',
      ctaText: 'Get Directions',
      order: 7
    },
    {
      type: 'text',
      heading: 'Reserve Your Sunday',
      ctaLink: 'https://www.sevenrooms.com/explore/verdenyc/reservations/create/search',
      ctaText: 'RESERVE BRUNCH',
      order: 8
    },
    {
      type: 'text',
      heading: 'Sunday brunch menu',
      ctaLink: '/restaurant',
      ctaText: 'Explore Our Menus',
      order: 9
    }
  ]
};

// ============================================
// MENU PAGE - COMPLETE
// ============================================
const menuPageData = {
  slug: 'menu',
  title: 'Menu',
  sections: [
    {
      type: 'hero',
      heading: 'OUR MENUS',
      images: ['https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8416.jpg'],
      order: 1
    },
    {
      type: 'text',
      heading: 'CULINARY EXCELLENCE',
      content: 'Indulge in a symphony of flavors inspired by the elegance of Paris and the vibrant spirit of the Mediterranean. At Verde NYC, every dish is a masterpiece, crafted with creativity and precision to ignite your senses and elevate your dining journey.',
      order: 2
    },
    {
      type: 'menu-category',
      heading: 'FOOD MENU',
      content: 'Experience our curated Mediterranean and Asian fusion dishes',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8416.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Parades_DEC_page-0002.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025_Verde NYC - FINAL_DEC_page-0002.jpg'
      ],
      order: 3
    },
    {
      type: 'menu-category',
      heading: 'WINE MENU',
      content: 'Discover our exceptional selection of wines from around the world',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8417.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0002.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0003.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0004.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0005.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0006.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0007.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0008.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0009.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC_Vins_DEC_page-0010.jpg'
      ],
      order: 4
    },
    {
      type: 'menu-category',
      heading: 'BAR MENU',
      content: 'Explore our curated selection of cocktails and beverages',
      images: [
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/images/_40A8419.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0001.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0003.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0004.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0005.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0006.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0007.jpg',
        'https://verde-nyc-s3.s3.eu-north-1.amazonaws.com/menu/2025 NV FORMAT VERDE NYC - BAR livret A5_DEC_page-0008.jpg'
      ],
      order: 5
    }
  ]
};

// ============================================
// SEED FUNCTION
// ============================================
const seedAll = async () => {
  try {
    await connectDB();
    
    console.log('\n🗑️  Clearing existing data...');
    await Page.deleteMany({});
    console.log('   Pages cleared');

    console.log('\n📝 Seeding pages with COMPLETE content...\n');

    // Seed all pages
    const pages = [
      homePageData,
      restaurantPageData,
      dinnerPartyPageData,
      galleryPageData,
      contactPageData,
      barPageData,
      menuPageData
    ];

    for (const pageData of pages) {
      const page = await Page.create(pageData);
      console.log(`   ✅ ${page.title} (/${page.slug}) - ${page.sections.length} sections`);
    }

    // Check if admin exists, if not create one
    const adminExists = await Admin.findOne({});
    if (!adminExists) {
      console.log('\n👤 Creating default admin...');
      await Admin.create({
        email: 'admin@verde-nyc.com',
        password: 'verde2024'
      });
      console.log('   ✅ Admin created (admin@verde-nyc.com / verde2024)');
    } else {
      console.log('\n👤 Admin already exists');
    }

    console.log('\n✨ Database seeded successfully with ALL COMPLETE CONTENT!\n');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Total pages created:', pages.length);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
