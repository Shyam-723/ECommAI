import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const homeDecorProducts = [
  { title: 'Premium Matte Interior Paint - Eggshell White 1 Gallon', description: 'Low-VOC, highly durable interior paint covering up to 400 sq. ft.', price: 45.99, tags: 'decor,paint,wall,home,white' },
  { title: 'Premium Matte Interior Paint - Ocean Blue 1 Gallon', description: 'Low-VOC interior paint.', price: 47.50, tags: 'decor,paint,wall,home,blue' },
  { title: 'Assorted Steel Nails Set (500 Pieces)', description: 'Variety pack of anti-rust nails for framing and finishing.', price: 14.99, tags: 'decor,hardware,nails,construction' },
  { title: 'L-Shaped Modern Corner Desk', description: 'Spacious desk with wooden finish and metal frame.', price: 189.99, tags: 'decor,furniture,desk,office' },
  { title: 'Adjustable Standing Desk (Black)', description: 'Dual-motor sit-to-stand desk.', price: 349.00, tags: 'decor,furniture,desk,office' },
  { title: 'Floating Wall Shelves (Set of 3)', description: 'Rustic wood shelves including mounting hardware.', price: 39.99, tags: 'decor,furniture,shelf,wall' },
  { title: 'Heavy Duty Storage Shelving Unit', description: '5-tier adjustable wire shelving rack.', price: 79.99, tags: 'decor,furniture,shelf,storage' },
  { title: 'Convertible Wooden Baby Crib', description: '4-in-1 design transitioning from crib to toddler bed.', price: 299.50, tags: 'decor,furniture,crib,nursery' },
  { title: 'Minimalist Floor Lamp with Shelves', description: 'Ambient lighting combined with 3-tier display shelves.', price: 54.00, tags: 'decor,lighting,lamp,home' },
  { title: 'Vintage Persian Area Rug 5x8', description: 'Stain-resistant and easy to clean.', price: 120.00, tags: 'decor,rug,home,floor' },
  { title: 'Modern Shag Rug 8x10', description: 'Plush gray area rug.', price: 199.99, tags: 'decor,rug,home,floor' },
  { title: 'Ceramic Table Lamp with Linen Shade', description: 'Elegant bedroom nightstand lamp.', price: 42.50, tags: 'decor,lighting,lamp,bedroom' },
  { title: 'Blackout Curtains (Set of 2 Panels)', description: 'Thermal insulated window drapes.', price: 29.99, tags: 'decor,curtains,window,home' },
  { title: 'Sheer White Curtains 84" Long', description: 'Light filtering window treatments.', price: 19.99, tags: 'decor,curtains,window,home' },
  { title: 'Brass Finish Cabinet Knobs (10 Pack)', description: 'Hardware upgrade for kitchen cabinets.', price: 24.99, tags: 'decor,hardware,kitchen,knobs' },
  { title: 'Matte Black Door Handle', description: 'Keyless entry door lever passage style.', price: 34.50, tags: 'decor,hardware,door,home' },
  { title: 'Wall-Mounted Coat Rack', description: 'Wooden base with 5 metal hooks.', price: 22.00, tags: 'decor,furniture,wall,organization' },
  { title: 'Decorative Throw Pillows (Set of 2)', description: 'Velvet cushion covers 18x18.', price: 18.99, tags: 'decor,living,pillows,home' },
  { title: 'Faux Potted Aloe Vera Plant', description: 'Realistic artificial desk plant.', price: 15.50, tags: 'decor,plant,artificial,home' },
  { title: 'Large Rectangular Wall Mirror', description: 'Modern black frame mirror 24x36.', price: 89.00, tags: 'decor,mirror,wall,home' },
  { title: 'Round Gold Wall Mirror 30"', description: 'Contemporary circular mirror.', price: 110.00, tags: 'decor,mirror,wall,home' },
  { title: 'Hand-Woven Wicker Storage Basket', description: 'Large capacity basket for blankets or toys.', price: 35.00, tags: 'decor,storage,basket,home' },
  { title: 'Entryway Shoe Bench Organizer', description: 'Bamboo shoe rack with seating cushion.', price: 65.99, tags: 'decor,furniture,entryway,shoe' },
  { title: 'Abstract Canvas Wall Art 3-Piece', description: 'Large contemporary painting prints.', price: 75.00, tags: 'decor,art,wall,home' },
  { title: 'Desktop Picture Frame 5x7', description: 'Solid wood frame with glass front.', price: 12.99, tags: 'decor,art,frame,home' },
  { title: 'Premium Chalkboard Paint 1 Quart', description: 'Transform any wall into a chalkboard.', price: 18.50, tags: 'decor,paint,wall,diy' },
  { title: 'Nursery Wallpaper Roll - Stars Pattern', description: 'Peel and stick removable wallpaper.', price: 45.00, tags: 'decor,wall,wallpaper,nursery' },
  { title: 'Memory Foam Mattress Topper (Queen)', description: '3-inch cooling gel topper.', price: 99.99, tags: 'decor,bedding,bedroom,mattress' },
  { title: 'Egyptian Cotton Sheets (Queen)', description: '1000 thread count 4-piece set.', price: 115.00, tags: 'decor,bedding,bedroom,sheets' },
  { title: 'Soft Cotton Blanket (King)', description: 'Breathable waffle weave blanket.', price: 45.99, tags: 'decor,bedding,bedroom,blanket' },
  { title: 'Small Desktop Bookshelf', description: 'Expandable wood organizer for desk.', price: 25.00, tags: 'decor,furniture,desk,organization' },
  { title: 'Rolling Kitchen Island Cart', description: 'Solid wood top with storage drawers.', price: 149.50, tags: 'decor,furniture,kitchen,cart' },
  { title: 'Wall Sconce Lighting Fixture', description: 'Industrial vintage style black sconce.', price: 38.00, tags: 'decor,lighting,wall,home' },
  { title: 'Frameless Glass Shower Door Hardware', description: 'Brushed nickel hinges and handles.', price: 85.00, tags: 'decor,hardware,bathroom,shower' }
];

const hardwareProducts = [
  { title: 'NVIDIA GeForce RTX 4090 24GB', description: 'Flagship enthusiast GPU for extreme 4K gaming and AI workloads.', price: 1599.99, tags: 'electronics,hardware,gpu,graphics' },
  { title: 'NVIDIA GeForce RTX 4080 Super 16GB', description: 'High-end GPU for 4K gaming.', price: 999.99, tags: 'electronics,hardware,gpu,graphics' },
  { title: 'NVIDIA GeForce RTX 4070 Ti 12GB', description: 'Excellent 1440p and 4K entry GPU.', price: 799.00, tags: 'electronics,hardware,gpu,graphics' },
  { title: 'AMD Radeon RX 7900 XTX 24GB', description: 'Top tier AMD RDNA3 graphics card.', price: 949.99, tags: 'electronics,hardware,gpu,graphics' },
  { title: 'AMD Radeon RX 7800 XT 16GB', description: 'Unbeatable value for 1440p gaming.', price: 499.99, tags: 'electronics,hardware,gpu,graphics' },
  { title: 'Intel Core i9-14900K', description: '24-Core, 32-Thread Unlocked Desktop Processor.', price: 589.99, tags: 'electronics,hardware,cpu,processor' },
  { title: 'Intel Core i7-14700K', description: '20-Core Unlocked Desktop Processor.', price: 409.50, tags: 'electronics,hardware,cpu,processor' },
  { title: 'Intel Core i5-13600K', description: '14-Core Desktop Processor.', price: 295.00, tags: 'electronics,hardware,cpu,processor' },
  { title: 'AMD Ryzen 9 7950X3D', description: '16-Core, 32-Thread with 3D V-Cache Technology.', price: 649.00, tags: 'electronics,hardware,cpu,processor' },
  { title: 'AMD Ryzen 7 7800X3D', description: 'The absolute best gaming CPU on the market.', price: 399.99, tags: 'electronics,hardware,cpu,processor' },
  { title: 'AMD Ryzen 5 7600X', description: '6-Core, 12-Thread Unlocked Desktop Processor.', price: 229.00, tags: 'electronics,hardware,cpu,processor' },
  { title: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz', description: 'High-speed DDR5 memory kit with dynamic RGB.', price: 115.99, tags: 'electronics,hardware,ram,memory' },
  { title: 'G.Skill Trident Z5 64GB (2x32GB) DDR5 6400MHz', description: 'Extreme performance DDR5 RAM.', price: 210.00, tags: 'electronics,hardware,ram,memory' },
  { title: 'Crucial 16GB (2x8GB) DDR4 3200MHz', description: 'Budget friendly reliable DDR4 memory.', price: 35.99, tags: 'electronics,hardware,ram,memory' },
  { title: 'Samsung 990 PRO 2TB NVMe SSD', description: 'PCIe 4.0 highly sustained read/write SSD.', price: 169.99, tags: 'electronics,hardware,ssd,storage' },
  { title: 'Samsung 980 PRO 1TB NVMe SSD', description: 'PCIe 4.0 fast storage.', price: 89.99, tags: 'electronics,hardware,ssd,storage' },
  { title: 'WD_BLACK 4TB SN850X NVMe SSD', description: 'Massive capacity enthusiast storage.', price: 309.99, tags: 'electronics,hardware,ssd,storage' },
  { title: 'Seagate IronWolf 8TB NAS HDD', description: 'Reliable hard drive for network attached storage.', price: 179.00, tags: 'electronics,hardware,hdd,storage' },
  { title: 'ASUS ROG Crosshair X670E Hero Motherboard', description: 'Enthusiast AM5 Socket Motherboard.', price: 699.99, tags: 'electronics,hardware,motherboard' },
  { title: 'MSI MAG B650 Tomahawk WiFi Motherboard', description: 'Solid mid-range AM5 motherboard.', price: 219.99, tags: 'electronics,hardware,motherboard' },
  { title: 'Gigabyte Z790 AORUS ELITE AX', description: 'High-performance LGA 1700 Motherboard.', price: 239.99, tags: 'electronics,hardware,motherboard' },
  { title: 'ASRock B760M Pro RS WiFi Motherboard', description: 'Budget Micro-ATX LGA 1700 board.', price: 129.99, tags: 'electronics,hardware,motherboard' },
  { title: 'Corsair RM850x 850W Gold PSU', description: 'Fully modular 80+ Gold power supply.', price: 144.99, tags: 'electronics,hardware,psu,power' },
  { title: 'EVGA SuperNOVA 1000G T2 1000W Titanium PSU', description: 'Ultra-efficient 80+ Titanium power supply.', price: 249.99, tags: 'electronics,hardware,psu,power' },
  { title: 'Thermaltake Smart 500W PSU', description: 'Budget non-modular power supply.', price: 39.99, tags: 'electronics,hardware,psu,power' },
  { title: 'NZXT H9 Flow Dual-Chamber ATX Case', description: 'High-airflow, beautiful glass showcase chassis.', price: 159.99, tags: 'electronics,hardware,case,tower' },
  { title: 'Fractal Design North Mid Tower Case (Charcoal)', description: 'Elegant PC case featuring a real walnut wood front.', price: 139.99, tags: 'electronics,hardware,case,tower' },
  { title: 'Lian Li O11 Dynamic EVO Case', description: 'Highly customizable dual-chamber chassis.', price: 149.99, tags: 'electronics,hardware,case,tower' },
  { title: 'Corsair 4000D Airflow ATX Case', description: 'Classic mid-tower case with excellent thermals.', price: 94.99, tags: 'electronics,hardware,case,tower' },
  { title: 'Noctua NH-D15 CPU Air Cooler', description: 'Legendary silent flagship dual-tower cooler.', price: 119.95, tags: 'electronics,hardware,cooler,cooling' },
  { title: 'Arctic Liquid Freezer III 360 AIO', description: 'Best-in-class 360mm liquid cooler.', price: 139.99, tags: 'electronics,hardware,aio,cooling' },
  { title: 'Corsair iCUE H150i Elite LCD XT AIO', description: '360mm radiator with customizable LCD screen.', price: 289.99, tags: 'electronics,hardware,aio,cooling' },
  { title: 'Thermal Grizzly Kryonaut Thermal Paste', description: 'High-performance 1g thermal grease.', price: 18.99, tags: 'electronics,hardware,paste,cooling' },
  { title: 'Lian Li UNI FAN SL-INFINITY 120 (3-Pack)', description: 'Daisy-chainable infinity mirror RGB fans.', price: 99.99, tags: 'electronics,hardware,fans,cooling' }
];

const healthProducts = [
  { title: 'Claritin 24-Hour Non-Drowsy Allergy Tablets', description: 'Loratadine 10mg, 30 tablets for indoor & outdoor allergies.', price: 19.99, tags: 'healthcare,medicine,allergy,claritin' },
  { title: 'Zyrtec 24-Hour Allergy Relief Liquid Gels', description: 'Cetirizine HCl 10mg, 40 Count.', price: 22.50, tags: 'healthcare,medicine,allergy,zyrtec' },
  { title: 'Flonase Allergy Relief Nasal Spray', description: '144 Metered Sprays, 24 hour relief.', price: 24.99, tags: 'healthcare,medicine,allergy,spray' },
  { title: 'Benadryl Ultratabs Antihistamine Tablets', description: 'Diphenhydramine HCl 25mg, 100 Count.', price: 12.99, tags: 'healthcare,medicine,allergy,benadryl' },
  { title: 'Advil Ibuprofen Tablets, 200mg', description: 'Pain Reliever and Fever Reducer, 300 Count.', price: 17.49, tags: 'healthcare,medicine,pain,advil' },
  { title: 'Tylenol Extra Strength Acetaminophen', description: '500mg, 225 Caplets.', price: 16.99, tags: 'healthcare,medicine,pain,tylenol' },
  { title: 'CeraVe Hydrating Facial Cleanser 16oz', description: 'Daily face wash for normal to dry skin with ceramides.', price: 15.99, tags: 'healthcare,skincare,cleanser,cerave' },
  { title: 'CeraVe Daily Moisturizing Lotion 19oz', description: 'Hyaluronic acid and ceramides body and face lotion.', price: 17.50, tags: 'healthcare,skincare,lotion,cerave' },
  { title: 'Neutrogena Hydro Boost Water Gel 1.7oz', description: 'Hyaluronic acid facial moisturizer.', price: 19.99, tags: 'healthcare,skincare,moisturizer,neutrogena' },
  { title: 'La Roche-Posay Pure Vitamin C Face Serum', description: 'Anti-aging serum with salicylic acid.', price: 44.99, tags: 'healthcare,skincare,serum,laroche' },
  { title: 'Premium First Aid Kit (299 Pieces)', description: 'Comprehensive emergency kit for home, car, or travel.', price: 25.00, tags: 'healthcare,firstaid,emergency,kit' },
  { title: 'Band-Aid Brand Flexible Fabric Adhesive Bandages', description: 'Assorted sizes, 100 sterile bandages.', price: 8.50, tags: 'healthcare,firstaid,bandaid,wound' },
  { title: 'Neosporin Original First Aid Antibiotic Ointment', description: '1 oz tube for infection protection.', price: 7.99, tags: 'healthcare,firstaid,ointment,wound' },
  { title: 'Omron Platinum Blood Pressure Monitor', description: 'Premium digital upper arm cuff.', price: 74.50, tags: 'healthcare,monitor,bloodpressure,health' },
  { title: 'Zacurate Pro Series Pulse Oximeter', description: 'Fingertip blood oxygen saturation monitor.', price: 21.99, tags: 'healthcare,monitor,oximeter,health' },
  { title: 'Withings Body+ Smart Scale', description: 'Wi-Fi body composition scale with app integration.', price: 99.95, tags: 'healthcare,monitor,scale,weight' },
  { title: 'Nature Made Fish Oil 1000 mg', description: 'Omega-3 supplement, 250 softgels.', price: 18.00, tags: 'healthcare,vitamins,supplements,fishoil' },
  { title: 'Optimum Nutrition Gold Standard 100% Whey', description: 'Double Rich Chocolate protein powder, 5 lbs.', price: 75.99, tags: 'healthcare,supplements,protein,fitness' },
  { title: 'Centrum Silver Men Multivitamin', description: 'Supplement for men 50+, 275 tablets.', price: 19.99, tags: 'healthcare,vitamins,supplements,centrum' },
  { title: 'Centrum Silver Women Multivitamin', description: 'Supplement for women 50+, 275 tablets.', price: 19.99, tags: 'healthcare,vitamins,supplements,centrum' },
  { title: 'Vitafusion Women\'s Gummy Vitamins', description: 'Berry flavored multivitamin, 150 count.', price: 13.50, tags: 'healthcare,vitamins,supplements,gummy' },
  { title: 'Liquid I.V. Hydration Multiplier', description: 'Electrolyte drink mix, Lemon Lime, 16 sticks.', price: 24.99, tags: 'healthcare,supplements,hydration,electrolytes' },
  { title: 'Olay Regenerist Micro-Sculpting Cream', description: 'Anti-aging face moisturizer, 1.7 oz.', price: 23.50, tags: 'healthcare,skincare,cream,olay' },
  { title: 'Aquaphor Healing Ointment 14oz', description: 'Advanced therapy for dry, cracked skin.', price: 16.49, tags: 'healthcare,skincare,ointment,aquaphor' },
  { title: 'Theragun Mini Massage Gun', description: 'Compact deep tissue muscle massager.', price: 199.00, tags: 'healthcare,fitness,massage,recovery' },
  { title: 'Waterpik Aquarius Water Flosser', description: 'Professional teeth cleaning for oral health.', price: 69.99, tags: 'healthcare,dental,hygiene,waterpik' },
  { title: 'Crest 3D Whitestrips Professional Effects', description: 'Teeth whitening kit, 44 strips.', price: 45.99, tags: 'healthcare,dental,hygiene,crest' },
  { title: 'Oral-B Pro 1000 Electric Toothbrush', description: 'Rechargeable power toothbrush.', price: 39.99, tags: 'healthcare,dental,hygiene,toothbrush' },
  { title: 'Heating Pad for Back Pain Relief', description: '3XL extra large electric heating pad.', price: 35.00, tags: 'healthcare,therapy,pain,heating' },
  { title: 'Vicks Warm Mist Humidifier', description: '1-Gallon capacity for baby room or bedroom.', price: 39.99, tags: 'healthcare,appliance,humidifier,breathing' },
  { title: 'NeilMed Sinus Rinse Starter Kit', description: '50 premixed packets and bottle.', price: 14.50, tags: 'healthcare,medicine,sinus,allergy' },
  { title: 'Bose Sleepbuds II', description: 'Clinically proven to help you fall asleep faster.', price: 249.00, tags: 'healthcare,sleep,health,audio' }
];

async function main() {
  console.log('Clearing old products...');
  await prisma.product.deleteMany({});
  
  const allProducts = [...homeDecorProducts, ...hardwareProducts, ...healthProducts];
  console.log(`Seeding ${allProducts.length} unique products...`);

  await prisma.product.createMany({
    data: allProducts.map(p => ({
      ...p,
      inventory: Math.floor(Math.random() * 200) + 10 // random inventory between 10-210
    }))
  });

  console.log('Seeded database with new items');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
