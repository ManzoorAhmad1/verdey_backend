const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Page = require('./models/Page');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB Error: ${error.message}`);
        process.exit(1);
    }
};

const seedRestaurantComplete = async () => {
    await connectDB();

    const pageData = {
        title: "Restaurant - Verde NYC",
        slug: "restaurant",
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
                content: "From the glamorous avenues of Paris to the sun-kissed shores of Saint-Tropez, from the sophisticated skyline of Dubai to the vibrant pulse of Manhattan—the Yeeels Group has redefined festive dining across four continents. At Verde NYC, this legacy of excellence finds its newest expression in an unforgettable culinary journey through Mediterranean and Asian flavors.\\n\\nOur award-winning culinary team sources the finest ingredients from trusted purveyors across the globe—line-caught fish from Japanese waters, premium wagyu from Kagoshima Prefecture, seasonal vegetables from local farms, and artisanal products from the Mediterranean coast. Each dish is a masterpiece of technique and creativity, honoring tradition while embracing innovation.\\n\\nWhether you join us for an intimate lunch overlooking the Meatpacking District or an electrifying evening of dining and entertainment, Verde NYC transforms every meal into a celebration. Dishes are designed for sharing, encouraging connection and conversation in an atmosphere that evolves from refined sophistication to vibrant festivity as the night unfolds.",
                images: ["https://images.squarespace-cdn.com/content/v1/61d2ccabbc553c1fec7c16e9/0c14fc2a-88f5-46a4-996e-8e0175295970/mila-miami-texture.png"],
                ctaLink: "https://www.sevenrooms.com/explore/verdenyc/reservations/create/search",
                ctaText: "RESERVE YOUR TABLE",
                order: 2
            },

            // Section 3: DINNER Menu Tab
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

            // Section 4: COCKTAIL Menu Tab
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

            // Section 6: DESSERT Menu Tab
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

            // Section 7: SUNDAY BRUNCH Menu Tab
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

    try {
        await Page.findOneAndUpdate(
            { slug: 'restaurant' },
            pageData,
            { upsert: true, new: true }
        );
        console.log('✅ Restaurant page seeded successfully with ALL menu categories!');
        console.log('📊 Total sections: 9');
        console.log('   - 1 Hero Image');
        console.log('   - 1 Philosophy Section');
        console.log('   - 5 Menu Categories (Dinner, Cocktail, Wine, Dessert, Brunch)');
        console.log('   - 1 Disclaimer');
        console.log('   - 1 Food Gallery');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding restaurant page:', error);
        process.exit(1);
    }
};

seedRestaurantComplete();
