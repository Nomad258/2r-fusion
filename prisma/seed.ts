import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Helper function to hash passwords
async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Helper function to slugify text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function main() {
  console.log("🌱 Starting seed...");

  // ============================================================
  // 0. CLEANUP EXISTING DATA
  // ============================================================
  console.log("Cleaning up existing data...");
  // Delete in order of foreign key dependencies
  try { await prisma.anomalyReview.deleteMany({}); } catch (e) {}
  try { await prisma.anomaly.deleteMany({}); } catch (e) {}
  try { await prisma.alert.deleteMany({}); } catch (e) {}
  try { await prisma.forecast.deleteMany({}); } catch (e) {}
  try { await prisma.invoice.deleteMany({}); } catch (e) {}
  try { await prisma.purchaseOrder.deleteMany({}); } catch (e) {}
  try { await prisma.stockMovement.deleteMany({}); } catch (e) {}
  try { await prisma.stockBatch.deleteMany({}); } catch (e) {}
  try { await prisma.orderTicket.deleteMany({}); } catch (e) {}
  try { await prisma.reservation.deleteMany({}); } catch (e) {}
  try { await prisma.guest.deleteMany({}); } catch (e) {}
  try { await prisma.supplierProduct.deleteMany({}); } catch (e) {}
  try { await prisma.supplier.deleteMany({}); } catch (e) {}
  try { await prisma.inventoryItem.deleteMany({}); } catch (e) {}
  try { await prisma.recipeIngredient.deleteMany({}); } catch (e) {}
  try { await prisma.recipe.deleteMany({}); } catch (e) {}
  try { await prisma.dish.deleteMany({}); } catch (e) {}
  try { await prisma.menuCategory.deleteMany({}); } catch (e) {}
  try { await prisma.menu.deleteMany({}); } catch (e) {}
  try { await prisma.privateRoom.deleteMany({}); } catch (e) {}
  try { await prisma.table.deleteMany({}); } catch (e) {}
  try { await prisma.employee.deleteMany({}); } catch (e) {}
  try { await prisma.user.deleteMany({}); } catch (e) {}
  // Venue must be last (it has children)
  try { await prisma.venue.deleteMany({}); } catch (e) {}
  console.log("✓ Cleanup complete");

  // ============================================================
  // 1. CREATE USERS & EMPLOYEES
  // ============================================================
  console.log("Creating users and employees...");

  const adminPasswordHash = await hashPassword("admin123");
  const managerPasswordHash = await hashPassword("manager123");
  const chefPasswordHash = await hashPassword("chef123");
  const hostPasswordHash = await hashPassword("host123");
  const waiterPasswordHash = await hashPassword("waiter123");
  const bartenderPasswordHash = await hashPassword("bartender123");

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@2rfusion.ma",
      name: "Karim Bennani",
      passwordHash: adminPasswordHash,
      role: "SUPER_ADMIN",
      phone: "+212 6 12 34 56 78",
    },
  });

  const admin = await prisma.employee.create({
    data: {
      userId: adminUser.id,
      firstName: "Karim",
      lastName: "Bennani",
      department: "MANAGEMENT",
      position: "Super Admin",
      hireDate: new Date("2025-01-01"),
      phone: "+212 6 12 34 56 78",
    },
  });

  const managerUser = await prisma.user.create({
    data: {
      email: "manager@2rfusion.ma",
      name: "Fatima Aziz",
      passwordHash: managerPasswordHash,
      role: "MANAGER",
      phone: "+212 6 23 45 67 89",
    },
  });

  const manager = await prisma.employee.create({
    data: {
      userId: managerUser.id,
      firstName: "Fatima",
      lastName: "Aziz",
      department: "MANAGEMENT",
      position: "Restaurant Manager",
      hireDate: new Date("2025-01-05"),
      hourlyRate: 250,
      phone: "+212 6 23 45 67 89",
      emergencyContact: "Mohamed Aziz +212 6 34 56 78 90",
    },
  });

  const chefUser = await prisma.user.create({
    data: {
      email: "chef@2rfusion.ma",
      name: "Hiroshi Tanaka",
      passwordHash: chefPasswordHash,
      role: "CHEF",
      phone: "+212 6 34 56 78 90",
    },
  });

  const chef = await prisma.employee.create({
    data: {
      userId: chefUser.id,
      firstName: "Hiroshi",
      lastName: "Tanaka",
      department: "KITCHEN",
      position: "Executive Chef",
      hireDate: new Date("2025-01-10"),
      hourlyRate: 350,
      phone: "+212 6 34 56 78 90",
      emergencyContact: "Yuki Tanaka +81 90 1234 5678",
    },
  });

  const hostUser = await prisma.user.create({
    data: {
      email: "host@2rfusion.ma",
      name: "Amira Mansouri",
      passwordHash: hostPasswordHash,
      role: "HOST",
      phone: "+212 6 45 67 89 01",
    },
  });

  const host = await prisma.employee.create({
    data: {
      userId: hostUser.id,
      firstName: "Amira",
      lastName: "Mansouri",
      department: "FRONT_OF_HOUSE",
      position: "Host",
      hireDate: new Date("2025-01-15"),
      hourlyRate: 120,
      phone: "+212 6 45 67 89 01",
    },
  });

  const waiterUser = await prisma.user.create({
    data: {
      email: "waiter1@2rfusion.ma",
      name: "Mohammed Khalil",
      passwordHash: waiterPasswordHash,
      role: "WAITER",
      phone: "+212 6 56 78 90 12",
    },
  });

  const waiter = await prisma.employee.create({
    data: {
      userId: waiterUser.id,
      firstName: "Mohammed",
      lastName: "Khalil",
      department: "FRONT_OF_HOUSE",
      position: "Waiter",
      hireDate: new Date("2025-01-20"),
      hourlyRate: 100,
      phone: "+212 6 56 78 90 12",
      notes: "Experienced with premium service",
    },
  });

  const bartenderUser = await prisma.user.create({
    data: {
      email: "bartender@2rfusion.ma",
      name: "Sophia Rossi",
      passwordHash: bartenderPasswordHash,
      role: "BARTENDER",
      phone: "+212 6 67 89 01 23",
    },
  });

  const bartender = await prisma.employee.create({
    data: {
      userId: bartenderUser.id,
      firstName: "Sophia",
      lastName: "Rossi",
      department: "FRONT_OF_HOUSE",
      position: "Bartender",
      hireDate: new Date("2025-01-25"),
      hourlyRate: 140,
      phone: "+212 6 67 89 01 23",
      notes: "Expert in craft cocktails and sake pairings",
    },
  });

  // ============================================================
  // 2. CREATE VENUE
  // ============================================================
  console.log("Creating venue...");

  const venue = await prisma.venue.upsert({
    where: { slug: "2r-fusion" },
    update: {
      name: "2R Fusion",
      address: "Plage de Malabata, Boulevard Sidi Mohamed Ben Abdellah",
      city: "Tangier",
      phone: "+212 5 39 94 80 00",
      email: "reservations@2rfusion.ma",
      description:
        "Premium Japanese-Italian fusion restaurant with beachfront views in Tangier",
      timezone: "Africa/Casablanca",
      currency: "MAD",
      settings: JSON.stringify({
        taxRate: 10,
        serviceFee: 0,
        currency: "MAD",
        timeFormat: "24h",
        dateFormat: "DD/MM/YYYY",
        language: "fr",
      }),
    },
    create: {
      name: "2R Fusion",
      slug: "2r-fusion",
      address: "Plage de Malabata, Boulevard Sidi Mohamed Ben Abdellah",
      city: "Tangier",
      phone: "+212 5 39 94 80 00",
      email: "reservations@2rfusion.ma",
      description:
        "Premium Japanese-Italian fusion restaurant with beachfront views in Tangier",
      timezone: "Africa/Casablanca",
      currency: "MAD",
      settings: JSON.stringify({
        taxRate: 10,
        serviceFee: 0,
        currency: "MAD",
        timeFormat: "24h",
        dateFormat: "DD/MM/YYYY",
        language: "fr",
      }),
    },
  });

  // ============================================================
  // 3. CREATE TABLES
  // ============================================================
  console.log("Creating tables...");

  const tables = [];

  // MAIN ZONE (8 tables)
  for (let i = 1; i <= 8; i++) {
    tables.push(
      await prisma.table.create({
        data: {
          venueId: venue.id,
          number: i,
          zone: "MAIN",
          capacity: 4,
          status: "AVAILABLE",
          posX: 100 + i * 80,
          posY: 150,
        },
      })
    );
  }

  // TERRACE (6 tables)
  for (let i = 9; i <= 14; i++) {
    tables.push(
      await prisma.table.create({
        data: {
          venueId: venue.id,
          number: i,
          zone: "TERRACE",
          capacity: 4,
          status: "AVAILABLE",
          posX: 100 + (i - 8) * 80,
          posY: 400,
        },
      })
    );
  }

  // BAR (3 tables - bar seats)
  for (let i = 15; i <= 17; i++) {
    tables.push(
      await prisma.table.create({
        data: {
          venueId: venue.id,
          number: i,
          zone: "BAR",
          capacity: 2,
          status: "AVAILABLE",
          posX: 400 + (i - 15) * 60,
          posY: 50,
        },
      })
    );
  }

  // VIP (2 tables)
  for (let i = 18; i <= 19; i++) {
    tables.push(
      await prisma.table.create({
        data: {
          venueId: venue.id,
          number: i,
          zone: "VIP",
          capacity: 6,
          status: "AVAILABLE",
          posX: 600 + (i - 18) * 100,
          posY: 200,
        },
      })
    );
  }

  // PRIVATE (1 table)
  tables.push(
    await prisma.table.create({
      data: {
        venueId: venue.id,
        number: 20,
        zone: "PRIVATE",
        capacity: 1,
        status: "AVAILABLE",
      },
    })
  );

  // ============================================================
  // 4. CREATE PRIVATE ROOMS
  // ============================================================
  console.log("Creating private rooms...");

  const silkRoom = await prisma.privateRoom.create({
    data: {
      venueId: venue.id,
      name: "The Silk Room",
      capacity: 12,
      minSpend: 5000,
      description: "Intimate private dining room with garden views",
      amenities: JSON.stringify([
        "Private entrance",
        "Custom menu",
        "AV setup",
        "Wine pairing service",
      ]),
    },
  });

  const oceanSuite = await prisma.privateRoom.create({
    data: {
      venueId: venue.id,
      name: "Ocean Suite",
      capacity: 20,
      minSpend: 8000,
      description: "Spacious private suite with panoramic beachfront views",
      amenities: JSON.stringify([
        "Beachfront terrace",
        "Full kitchen access",
        "Live entertainment",
        "Dedicated sommelier",
        "Photography services",
      ]),
    },
  });

  // ============================================================
  // 5. CREATE MENU & CATEGORIES
  // ============================================================
  console.log("Creating menu and categories...");

  const menu = await prisma.menu.create({
    data: {
      venueId: venue.id,
      name: "Carte Principale",
      slug: "carte-principale",
      description:
        "Premium Japanese-Italian fusion menu showcasing the finest ingredients",
      type: "MAIN",
      isActive: true,
    },
  });

  const entreesFreides = await prisma.menuCategory.create({
    data: {
      menuId: menu.id,
      name: "Cold Starters",
      nameFr: "Entrées Froides",
      description: "Fresh and vibrant cold appetizers",
      slug: "entrees-froides",
      sortOrder: 1,
    },
  });

  const entreesChaud = await prisma.menuCategory.create({
    data: {
      menuId: menu.id,
      name: "Hot Starters",
      nameFr: "Entrées Chaudes",
      description: "Warm and crispy appetizers",
      slug: "entrees-chaudes",
      sortOrder: 2,
    },
  });

  const sushiSashimi = await prisma.menuCategory.create({
    data: {
      menuId: menu.id,
      name: "Sushi & Sashimi",
      nameFr: "Sushi & Sashimi",
      description: "Expertly crafted raw and fermented selections",
      slug: "sushi-sashimi",
      sortOrder: 3,
    },
  });

  const pastaRisotto = await prisma.menuCategory.create({
    data: {
      menuId: menu.id,
      name: "Pasta & Risotto",
      nameFr: "Pâtes & Risotto",
      description: "Handmade pasta and luxurious risottos",
      slug: "pasta-risotto",
      sortOrder: 4,
    },
  });

  const platsPrincipaux = await prisma.menuCategory.create({
    data: {
      menuId: menu.id,
      name: "Main Courses",
      nameFr: "Plats Principaux",
      description: "Signature mains featuring premium proteins",
      slug: "plats-principaux",
      sortOrder: 5,
    },
  });

  const desserts = await prisma.menuCategory.create({
    data: {
      menuId: menu.id,
      name: "Desserts",
      nameFr: "Desserts",
      description: "Delicate and artistic finishes",
      slug: "desserts",
      sortOrder: 6,
    },
  });

  const cocktails = await prisma.menuCategory.create({
    data: {
      menuId: menu.id,
      name: "Cocktails & Drinks",
      nameFr: "Cocktails & Boissons",
      description: "Signature cocktails and premium beverages",
      slug: "cocktails-drinks",
      sortOrder: 7,
    },
  });

  // ============================================================
  // 6. CREATE DISHES
  // ============================================================
  console.log("Creating dishes...");

  // Cold Starters
  const tunaTartare = await prisma.dish.create({
    data: {
      categoryId: entreesFreides.id,
      name: "Tuna Tartare Nippon-Méditerranée",
      nameFr: "Tartare de Thon Nippon-Méditerranée",
      description:
        "Sushi-grade tuna with Mediterranean citrus, crispy wonton, wasabi caviar",
      price: 220,
      costPrice: 85,
      allergens: JSON.stringify(["fish", "sesame"]),
      ingredients:
        "Tuna fillet, yuzu, lemon, olive oil, wasabi, sesame, wonton, capers",
      dietaryTags: JSON.stringify(["gluten-free-option", "pescatarian"]),
      prepTimeMinutes: 8,
      sortOrder: 1,
      slug: "tuna-tartare-nippon-mediterranee",
    },
  });

  const waguyuCarpaccio = await prisma.dish.create({
    data: {
      categoryId: entreesFreides.id,
      name: "Carpaccio di Wagyu con Ponzu",
      nameFr: "Carpaccio de Wagyu au Ponzu",
      description:
        "A5 Japanese Wagyu, paper-thin slices, ponzu sauce, microgreens",
      price: 280,
      costPrice: 120,
      allergens: JSON.stringify(["soy", "wheat"]),
      ingredients: "Wagyu beef A5, ponzu, soy sauce, mirin, lime, microgreens",
      dietaryTags: JSON.stringify(["gluten-free-option"]),
      prepTimeMinutes: 6,
      sortOrder: 2,
      slug: "carpaccio-di-wagyu-con-ponzu",
      isChefSpecial: true,
    },
  });

  const burrata = await prisma.dish.create({
    data: {
      categoryId: entreesFreides.id,
      name: "Burrata Umami with Truffle Dashi",
      nameFr: "Burrata Umami au Dashi Truffe",
      description:
        "Fresh burrata, black truffle dashi, crispy rice, aged balsamic",
      price: 190,
      costPrice: 75,
      allergens: JSON.stringify(["dairy"]),
      ingredients:
        "Burrata cheese, black truffle, dashi stock, rice, balsamic vinegar",
      dietaryTags: JSON.stringify(["vegetarian"]),
      prepTimeMinutes: 7,
      sortOrder: 3,
      slug: "burrata-umami-with-truffle-dashi",
    },
  });

  const ceviche = await prisma.dish.create({
    data: {
      categoryId: entreesFreides.id,
      name: "Ceviche Fusion Tangérois",
      nameFr: "Ceviche Fusion Tangérois",
      description:
        "Fresh white fish, lime citrus, Moroccan spices, avocado, crispy plantain",
      price: 180,
      costPrice: 70,
      allergens: JSON.stringify(["fish", "shellfish"]),
      ingredients:
        "White fish, lime, lemon, cilantro, jalapeño, avocado, plantain",
      dietaryTags: JSON.stringify(["gluten-free", "pescatarian"]),
      prepTimeMinutes: 10,
      sortOrder: 4,
      slug: "ceviche-fusion-tangerois",
    },
  });

  const salmonTataki = await prisma.dish.create({
    data: {
      categoryId: entreesFreides.id,
      name: "Salmon Tataki Caprese",
      nameFr: "Saumon Tataki Caprese",
      description:
        "Seared salmon, buffalo mozzarella, heirloom tomato, basil oil",
      price: 200,
      costPrice: 80,
      allergens: JSON.stringify(["fish", "dairy", "sesame"]),
      ingredients:
        "Salmon fillet, mozzarella, tomato, basil, sesame, soy sauce",
      dietaryTags: JSON.stringify(["gluten-free-option"]),
      prepTimeMinutes: 8,
      sortOrder: 5,
      slug: "salmon-tataki-caprese",
    },
  });

  const edamameTruffle = await prisma.dish.create({
    data: {
      categoryId: entreesFreides.id,
      name: "Edamame Truffle",
      nameFr: "Edamame Truffe",
      description: "Steamed edamame, black truffle oil, Himalayan salt",
      price: 90,
      costPrice: 25,
      allergens: JSON.stringify(["soy", "sesame"]),
      ingredients: "Edamame, truffle oil, sea salt, sesame",
      dietaryTags: JSON.stringify(["vegan", "gluten-free"]),
      prepTimeMinutes: 5,
      sortOrder: 6,
      slug: "edamame-truffle",
    },
  });

  // Hot Starters
  const tempuraGambas = await prisma.dish.create({
    data: {
      categoryId: entreesChaud.id,
      name: "Tempura Gambas alla Diavola",
      nameFr: "Tempura Gambas à la Diable",
      description: "Crispy tempura shrimp, spicy diavola sauce, lemon aioli",
      price: 240,
      costPrice: 95,
      allergens: JSON.stringify(["shellfish", "gluten"]),
      ingredients:
        "Large shrimp, tempura flour, soy, chili, lemon, mayonnaise",
      dietaryTags: JSON.stringify(["pescatarian"]),
      prepTimeMinutes: 10,
      sortOrder: 1,
      spiceLevel: 3,
      slug: "tempura-gambas-alla-diavola",
    },
  });

  const gyoza = await prisma.dish.create({
    data: {
      categoryId: entreesChaud.id,
      name: "Gyoza al Tartufo",
      nameFr: "Gyoza à la Truffe",
      description: "Pan-fried dumplings, black truffle filling, soy dipping sauce",
      price: 160,
      costPrice: 60,
      allergens: JSON.stringify(["wheat", "soy", "sesame"]),
      ingredients:
        "Wonton wrapper, pork, mushroom, truffle, soy sauce, sesame",
      dietaryTags: JSON.stringify([]),
      prepTimeMinutes: 12,
      sortOrder: 2,
      slug: "gyoza-al-tartufo",
    },
  });

  const risottoCroquettes = await prisma.dish.create({
    data: {
      categoryId: entreesChaud.id,
      name: "Risotto Croquettes with Miso Aioli",
      nameFr: "Croquettes de Risotto à l'Aioli Miso",
      description:
        "Golden arborio rice croquettes, miso aioli, pickled vegetables",
      price: 140,
      costPrice: 50,
      allergens: JSON.stringify(["dairy", "egg", "soy", "wheat"]),
      ingredients:
        "Risotto, breadcrumb, egg, miso, mayo, vegetables, oil",
      dietaryTags: JSON.stringify(["vegetarian"]),
      prepTimeMinutes: 8,
      sortOrder: 3,
      slug: "risotto-croquettes-with-miso-aioli",
    },
  });

  const calamariKaraage = await prisma.dish.create({
    data: {
      categoryId: entreesChaud.id,
      name: "Calamari Karaage Limone",
      nameFr: "Calamari Karaage Citron",
      description:
        "Japanese fried squid, crispy exterior, tender inside, lemon mayo",
      price: 150,
      costPrice: 55,
      allergens: JSON.stringify(["shellfish", "egg", "wheat"]),
      ingredients: "Squid, flour, egg, mayo, lemon, oil, seasoning",
      dietaryTags: JSON.stringify(["pescatarian"]),
      prepTimeMinutes: 9,
      sortOrder: 4,
      slug: "calamari-karaage-limone",
    },
  });

  const foieGras = await prisma.dish.create({
    data: {
      categoryId: entreesChaud.id,
      name: "Foie Gras Chawanmushi",
      nameFr: "Foie Gras Chawanmushi",
      description:
        "Japanese savory egg custard with foie gras, truffle, dashi broth",
      price: 320,
      costPrice: 140,
      allergens: JSON.stringify(["egg", "soy"]),
      ingredients: "Foie gras, eggs, dashi, truffle, soy sauce, mirin",
      dietaryTags: JSON.stringify([]),
      prepTimeMinutes: 15,
      sortOrder: 5,
      slug: "foie-gras-chawanmushi",
      isChefSpecial: true,
    },
  });

  // Sushi & Sashimi
  const omakase = await prisma.dish.create({
    data: {
      categoryId: sushiSashimi.id,
      name: "Omakase Selection 12 pcs",
      nameFr: "Sélection Omakase 12 pcs",
      description: "Chef's daily selection of 12 pieces premium sushi nigiri",
      price: 480,
      costPrice: 190,
      allergens: JSON.stringify(["fish", "sesame", "soy", "rice"]),
      ingredients: "Seasonal fish, sushi rice, nori, wasabi, ginger",
      dietaryTags: JSON.stringify(["pescatarian", "gluten-free-option"]),
      prepTimeMinutes: 12,
      sortOrder: 1,
      slug: "omakase-selection-12-pcs",
      isChefSpecial: true,
    },
  });

  const dragonRoll = await prisma.dish.create({
    data: {
      categoryId: sushiSashimi.id,
      name: "Signature Dragon Roll",
      nameFr: "Dragon Roll Signature",
      description:
        "Shrimp tempura, avocado, cucumber, eel sauce, topped with unagi",
      price: 260,
      costPrice: 100,
      allergens: JSON.stringify(["shellfish", "fish", "sesame", "wheat"]),
      ingredients: "Shrimp, avocado, cucumber, eel, sushi rice, nori",
      dietaryTags: JSON.stringify(["pescatarian"]),
      prepTimeMinutes: 10,
      sortOrder: 2,
      slug: "signature-dragon-roll",
    },
  });

  const toroNigiri = await prisma.dish.create({
    data: {
      categoryId: sushiSashimi.id,
      name: "Toro & Truffle Nigiri 4 pcs",
      nameFr: "Nigiri Toro & Truffe 4 pcs",
      description:
        "Premium fatty tuna belly, black truffle, sushi rice, sea salt",
      price: 380,
      costPrice: 160,
      allergens: JSON.stringify(["fish", "sesame"]),
      ingredients: "Toro, truffle, sushi rice, nori, sea salt",
      dietaryTags: JSON.stringify(["pescatarian", "gluten-free"]),
      prepTimeMinutes: 8,
      sortOrder: 3,
      slug: "toro-truffle-nigiri-4-pcs",
      isChefSpecial: true,
    },
  });

  const mediterraneanMaki = await prisma.dish.create({
    data: {
      categoryId: sushiSashimi.id,
      name: "Mediterranean Maki Set",
      nameFr: "Ensemble Maki Méditerranéen",
      description:
        "Cucumber, tomato, feta, olives, roasted pepper in nori roll",
      price: 220,
      costPrice: 80,
      allergens: JSON.stringify(["sesame", "dairy"]),
      ingredients:
        "Cucumber, tomato, feta, olives, pepper, sushi rice, nori",
      dietaryTags: JSON.stringify(["vegetarian", "gluten-free"]),
      prepTimeMinutes: 10,
      sortOrder: 4,
      slug: "mediterranean-maki-set",
    },
  });

  const sashimiRoyale = await prisma.dish.create({
    data: {
      categoryId: sushiSashimi.id,
      name: "Sashimi Royale Platter",
      nameFr: "Plateau Sashimi Royal",
      description:
        "Premium selection of 18 pieces - tuna, salmon, white fish, roe",
      price: 520,
      costPrice: 210,
      allergens: JSON.stringify(["fish", "sesame"]),
      ingredients:
        "Tuna, salmon, hamachi, white fish, uni, ikura, soy sauce, wasabi",
      dietaryTags: JSON.stringify(["pescatarian", "gluten-free-option"]),
      prepTimeMinutes: 15,
      sortOrder: 5,
      slug: "sashimi-royale-platter",
      isChefSpecial: true,
    },
  });

  const lobsterTempuraRoll = await prisma.dish.create({
    data: {
      categoryId: sushiSashimi.id,
      name: "Lobster Tempura Roll",
      nameFr: "Rouleau Tempura Homard",
      description:
        "Crispy lobster tempura, avocado, cucumber, spicy mayo, tobiko",
      price: 340,
      costPrice: 135,
      allergens: JSON.stringify(["shellfish", "egg", "sesame", "soy", "wheat"]),
      ingredients: "Lobster, tempura, avocado, cucumber, mayo, tobiko, nori",
      dietaryTags: JSON.stringify(["pescatarian"]),
      prepTimeMinutes: 12,
      sortOrder: 6,
      slug: "lobster-tempura-roll",
    },
  });

  // Pasta & Risotto
  const tagliatelle = await prisma.dish.create({
    data: {
      categoryId: pastaRisotto.id,
      name: "Tagliatelle al Nero with Uni",
      nameFr: "Tagliatelle al Nero à l'Oursin",
      description:
        "Black squid ink pasta, uni, bottarga, crispy garlic, sea vegetables",
      price: 360,
      costPrice: 140,
      allergens: JSON.stringify(["shellfish", "gluten", "dairy"]),
      ingredients:
        "Pasta, squid ink, uni, bottarga, garlic, olive oil, butter",
      dietaryTags: JSON.stringify(["pescatarian"]),
      prepTimeMinutes: 10,
      sortOrder: 1,
      slug: "tagliatelle-al-nero-with-uni",
      pairingSuggestion: "Sake Flight Premium",
    },
  });

  const truffleRisotto = await prisma.dish.create({
    data: {
      categoryId: pastaRisotto.id,
      name: "Truffle Mushroom Risotto",
      nameFr: "Risotto aux Champignons Truffe",
      description:
        "Creamy arborio risotto, porcini, shiitake, black truffle, parmesan",
      price: 280,
      costPrice: 110,
      allergens: JSON.stringify(["dairy", "wheat"]),
      ingredients:
        "Risotto, mushrooms, truffle, parmesan, butter, white wine",
      dietaryTags: JSON.stringify(["vegetarian", "gluten-free"]),
      prepTimeMinutes: 18,
      sortOrder: 2,
      slug: "truffle-mushroom-risotto",
    },
  });

  const lobsterlinguine = await prisma.dish.create({
    data: {
      categoryId: pastaRisotto.id,
      name: "Lobster Linguine Yuzu Butter",
      nameFr: "Linguine Homard Beurre Yuzu",
      description:
        "Fresh lobster tail, linguine, yuzu citrus butter, crispy sage",
      price: 420,
      costPrice: 170,
      allergens: JSON.stringify(["shellfish", "gluten", "dairy"]),
      ingredients: "Lobster, linguine, butter, yuzu, sage, white wine",
      dietaryTags: JSON.stringify(["pescatarian"]),
      prepTimeMinutes: 12,
      sortOrder: 3,
      slug: "lobster-linguine-yuzu-butter",
      pairingSuggestion: "Tokyo Negroni",
    },
  });

  const waguyuRagu = await prisma.dish.create({
    data: {
      categoryId: pastaRisotto.id,
      name: "Wagyu Ragu Pappardelle",
      nameFr: "Pappardelle Ragù de Wagyu",
      description:
        "Wide ribbon pasta, slow-braised A5 Wagyu ragu, pecorino, black garlic",
      price: 380,
      costPrice: 155,
      allergens: JSON.stringify(["gluten", "dairy", "soy"]),
      ingredients:
        "Pappardelle, Wagyu beef, tomato, soy sauce, garlic, cheese",
      dietaryTags: JSON.stringify([]),
      prepTimeMinutes: 16,
      sortOrder: 4,
      slug: "wagyu-ragu-pappardelle",
      isChefSpecial: true,
    },
  });

  const spaghettVongole = await prisma.dish.create({
    data: {
      categoryId: pastaRisotto.id,
      name: "Spaghetti Vongole Sake",
      nameFr: "Spaghetti Vongole au Saké",
      description:
        "Manila clams, spaghetti, sake, garlic, white wine, fresh parsley",
      price: 260,
      costPrice: 105,
      allergens: JSON.stringify(["shellfish", "gluten", "alcohol"]),
      ingredients:
        "Spaghetti, clams, sake, garlic, white wine, olive oil, parsley",
      dietaryTags: JSON.stringify(["pescatarian", "gluten-free-option"]),
      prepTimeMinutes: 11,
      sortOrder: 5,
      slug: "spaghetti-vongole-sake",
    },
  });

  // Plats Principaux
  const seaBass = await prisma.dish.create({
    data: {
      categoryId: platsPrincipaux.id,
      name: "Miso-Glazed Chilean Sea Bass",
      nameFr: "Bar Chilien Glacé au Miso",
      description:
        "Whole Chilean sea bass, miso glaze, bonito flakes, ponzu, asparagus",
      price: 450,
      costPrice: 180,
      allergens: JSON.stringify(["fish", "soy", "wheat"]),
      ingredients:
        "Sea bass, miso, soy sauce, dashi, bonito, asparagus, sesame oil",
      dietaryTags: JSON.stringify(["pescatarian", "gluten-free-option"]),
      prepTimeMinutes: 20,
      sortOrder: 1,
      slug: "miso-glazed-chilean-sea-bass",
      pairingSuggestion: "Tokyo Negroni",
    },
  });

  const wagyu = await prisma.dish.create({
    data: {
      categoryId: platsPrincipaux.id,
      name: "Wagyu A5 Teppanyaki",
      nameFr: "Wagyu A5 Teppanyaki",
      description:
        "Premium A5 Japanese Wagyu, grilled tableside, ponzu, shallots, truffle salt",
      price: 680,
      costPrice: 280,
      allergens: JSON.stringify(["soy", "wheat"]),
      ingredients: "Wagyu A5, soy sauce, mirin, scallion, sesame, truffle salt",
      dietaryTags: JSON.stringify(["gluten-free-option"]),
      prepTimeMinutes: 25,
      sortOrder: 2,
      slug: "wagyu-a5-teppanyaki",
      isChefSpecial: true,
      pairingSuggestion: "Sake Flight Premium",
    },
  });

  const lambRack = await prisma.dish.create({
    data: {
      categoryId: platsPrincipaux.id,
      name: "Lamb Rack Shiso Chimichurri",
      nameFr: "Carré d'Agneau Chimichurri Shiso",
      description:
        "Prime lamb rack, herb crust, shiso leaf chimichurri, roasted root vegetables",
      price: 520,
      costPrice: 210,
      allergens: JSON.stringify(["garlic", "herbs"]),
      ingredients:
        "Lamb, shiso, parsley, cilantro, garlic, lemon, olive oil, vegetables",
      dietaryTags: JSON.stringify(["gluten-free"]),
      prepTimeMinutes: 22,
      sortOrder: 3,
      slug: "lamb-rack-shiso-chimichurri",
    },
  });

  const branzino = await prisma.dish.create({
    data: {
      categoryId: platsPrincipaux.id,
      name: "Whole Grilled Branzino Japonais",
      nameFr: "Branzino Entier Grillé Japonais",
      description:
        "Whole Mediterranean branzino, crispy skin, yuzu beurre blanc, microgreens",
      price: 380,
      costPrice: 150,
      allergens: JSON.stringify(["fish", "dairy", "soy"]),
      ingredients:
        "Branzino, butter, yuzu, soy sauce, microgreens, sesame oil",
      dietaryTags: JSON.stringify(["pescatarian", "gluten-free"]),
      prepTimeMinutes: 18,
      sortOrder: 4,
      slug: "whole-grilled-branzino-japonais",
    },
  });

  const duckBreast = await prisma.dish.create({
    data: {
      categoryId: platsPrincipaux.id,
      name: "Duck Breast Teriyaki Rossini",
      nameFr: "Magret de Canard Teriyaki Rossini",
      description:
        "Duck breast, teriyaki glaze, foie gras toast, fig compote, seasonal vegetables",
      price: 440,
      costPrice: 175,
      allergens: JSON.stringify(["soy", "wheat", "gluten"]),
      ingredients:
        "Duck, foie gras, teriyaki, soy, mirin, figs, bread, vegetables",
      dietaryTags: JSON.stringify([]),
      prepTimeMinutes: 20,
      sortOrder: 5,
      slug: "duck-breast-teriyaki-rossini",
    },
  });

  const lobsterThermidor = await prisma.dish.create({
    data: {
      categoryId: platsPrincipaux.id,
      name: "Lobster Thermidor Sakura",
      nameFr: "Homard Thermidor Sakura",
      description:
        "Whole lobster, sherry cream sauce, sakura blossom, truffle, gratin",
      price: 580,
      costPrice: 240,
      allergens: JSON.stringify(["shellfish", "dairy", "egg", "alcohol"]),
      ingredients:
        "Lobster, cream, sherry, egg, mustard, sakura, truffle, cheese",
      dietaryTags: JSON.stringify([]),
      prepTimeMinutes: 24,
      sortOrder: 6,
      slug: "lobster-thermidor-sakura",
      isChefSpecial: true,
    },
  });

  // Desserts
  const matcha = await prisma.dish.create({
    data: {
      categoryId: desserts.id,
      name: "Matcha Tiramisu",
      nameFr: "Tiramisu Matcha",
      description: "Green tea matcha layers, mascarpone, ladyfingers, whipped cream",
      price: 120,
      costPrice: 40,
      allergens: JSON.stringify(["dairy", "egg", "gluten"]),
      ingredients:
        "Matcha, mascarpone, egg, ladyfinger, sugar, cocoa powder",
      dietaryTags: JSON.stringify(["vegetarian"]),
      prepTimeMinutes: 5,
      sortOrder: 1,
      slug: "matcha-tiramisu",
    },
  });

  const yuzu = await prisma.dish.create({
    data: {
      categoryId: desserts.id,
      name: "Yuzu Panna Cotta",
      nameFr: "Panna Cotta Yuzu",
      description:
        "Silky yuzu citrus panna cotta, crispy tuile, citrus gel, edible flowers",
      price: 110,
      costPrice: 38,
      allergens: JSON.stringify(["dairy", "gluten"]),
      ingredients: "Cream, yuzu, gelatin, sugar, flour, edible flowers",
      dietaryTags: JSON.stringify(["vegetarian", "gluten-free-option"]),
      prepTimeMinutes: 5,
      sortOrder: 2,
      slug: "yuzu-panna-cotta",
    },
  });

  const mochi = await prisma.dish.create({
    data: {
      categoryId: desserts.id,
      name: "Mochi Ice Cream Trio",
      nameFr: "Trio Mochi Crème Glacée",
      description:
        "Three flavors - matcha, yuzu, black sesame in chewy mochi wrapper",
      price: 130,
      costPrice: 45,
      allergens: JSON.stringify(["dairy", "sesame", "gluten"]),
      ingredients:
        "Mochi, ice cream, matcha, yuzu, sesame, sugar, rice flour",
      dietaryTags: JSON.stringify(["vegetarian", "gluten-free-option"]),
      prepTimeMinutes: 3,
      sortOrder: 3,
      slug: "mochi-ice-cream-trio",
    },
  });

  const chocolate = await prisma.dish.create({
    data: {
      categoryId: desserts.id,
      name: "Dark Chocolate Fondant Goma",
      nameFr: "Fondant Chocolat Noir Goma",
      description:
        "Warm dark chocolate lava cake, sesame brittle, vanilla ice cream",
      price: 140,
      costPrice: 50,
      allergens: JSON.stringify(["dairy", "egg", "gluten", "sesame"]),
      ingredients:
        "Dark chocolate, butter, egg, flour, sesame, vanilla ice cream",
      dietaryTags: JSON.stringify(["vegetarian"]),
      prepTimeMinutes: 12,
      sortOrder: 4,
      slug: "dark-chocolate-fondant-goma",
    },
  });

  const fruitTempura = await prisma.dish.create({
    data: {
      categoryId: desserts.id,
      name: "Seasonal Fruit Tempura",
      nameFr: "Tempura de Fruits Saisonniers",
      description:
        "Crispy tempura batter seasonal fruits, matcha salt, honey drizzle",
      price: 100,
      costPrice: 35,
      allergens: JSON.stringify(["egg", "wheat", "dairy"]),
      ingredients: "Seasonal fruit, tempura flour, egg, matcha, honey, oil",
      dietaryTags: JSON.stringify(["vegetarian", "gluten-free-option"]),
      prepTimeMinutes: 8,
      sortOrder: 5,
      slug: "seasonal-fruit-tempura",
    },
  });

  // Cocktails
  const sakuraSpritz = await prisma.dish.create({
    data: {
      categoryId: cocktails.id,
      name: "Sakura Spritz",
      nameFr: "Sakura Spritz",
      description: "Sake, Prosecco, cherry blossom liqueur, lychee, edible flowers",
      price: 120,
      costPrice: 25,
      allergens: JSON.stringify(["alcohol"]),
      ingredients:
        "Sake, Prosecco, cherry liqueur, lychee juice, flower syrup",
      dietaryTags: JSON.stringify(["vegan", "gluten-free"]),
      prepTimeMinutes: 5,
      sortOrder: 1,
      slug: "sakura-spritz",
    },
  });

  const tokyoNegroni = await prisma.dish.create({
    data: {
      categoryId: cocktails.id,
      name: "Tokyo Negroni",
      nameFr: "Negroni Tokyo",
      description:
        "Gin, Japanese vermouth, Campari, yuzu, wasabi bitters, ice sphere",
      price: 140,
      costPrice: 30,
      allergens: JSON.stringify(["alcohol"]),
      ingredients: "Gin, Japanese vermouth, Campari, yuzu, wasabi, ice",
      dietaryTags: JSON.stringify(["vegan", "gluten-free"]),
      prepTimeMinutes: 6,
      sortOrder: 2,
      slug: "tokyo-negroni",
      isChefSpecial: true,
    },
  });

  const tangierSunset = await prisma.dish.create({
    data: {
      categoryId: cocktails.id,
      name: "Tangier Sunset",
      nameFr: "Coucher de Soleil Tanger",
      description:
        "Moroccan whisky, orange liqueur, pomegranate, ginger, mint",
      price: 110,
      costPrice: 24,
      allergens: JSON.stringify(["alcohol"]),
      ingredients:
        "Whisky, orange liqueur, pomegranate juice, ginger beer, mint",
      dietaryTags: JSON.stringify(["vegan", "gluten-free"]),
      prepTimeMinutes: 5,
      sortOrder: 3,
      slug: "tangier-sunset",
    },
  });

  const yuzu_collins = await prisma.dish.create({
    data: {
      categoryId: cocktails.id,
      name: "Yuzu Collins",
      nameFr: "Collins Yuzu",
      description: "Vodka, yuzu, lemon, soda, sugar, edible flowers",
      price: 130,
      costPrice: 28,
      allergens: JSON.stringify(["alcohol"]),
      ingredients: "Vodka, yuzu juice, lemon juice, soda, sugar, flowers",
      dietaryTags: JSON.stringify(["vegan", "gluten-free"]),
      prepTimeMinutes: 5,
      sortOrder: 4,
      slug: "yuzu-collins",
    },
  });

  const sakeFlight = await prisma.dish.create({
    data: {
      categoryId: cocktails.id,
      name: "Sake Flight Premium",
      nameFr: "Dégustation Saké Premium",
      description:
        "Three premium sakes - junmai, ginjo, daiginjo with tasting notes",
      price: 220,
      costPrice: 70,
      allergens: JSON.stringify(["alcohol", "soy", "rice"]),
      ingredients: "Premium sake selection",
      dietaryTags: JSON.stringify(["vegan", "gluten-free"]),
      prepTimeMinutes: 3,
      sortOrder: 5,
      slug: "sake-flight-premium",
      isChefSpecial: true,
    },
  });

  const matchaHighball = await prisma.dish.create({
    data: {
      categoryId: cocktails.id,
      name: "Matcha Highball",
      nameFr: "Highball Matcha",
      description: "Japanese whisky, matcha, soda, ice, lemon twist",
      price: 100,
      costPrice: 22,
      allergens: JSON.stringify(["alcohol", "gluten"]),
      ingredients: "Whisky, matcha powder, soda water, ice, lemon",
      dietaryTags: JSON.stringify(["vegan", "gluten-free-option"]),
      prepTimeMinutes: 4,
      sortOrder: 6,
      slug: "matcha-highball",
    },
  });

  // ============================================================
  // 7. CREATE RECIPES
  // ============================================================
  console.log("Creating recipes...");

  const tunaRecipe = await prisma.recipe.create({
    data: {
      dishId: tunaTartare.id,
      instructions:
        "1. Dice sushi-grade tuna into 1cm cubes\n2. Mix with yuzu, lemon, olive oil\n3. Prepare wonton crisps\n4. Plate tartare in center\n5. Garnish with caviar and microgreens",
      prepTimeMinutes: 5,
      cookTimeMinutes: 3,
      servings: 2,
      difficulty: "MEDIUM",
      notes: "Use ultra-fresh sushi-grade tuna. Prep all components before final plating.",
    },
  });

  const wagyu_carpRecipe = await prisma.recipe.create({
    data: {
      dishId: waguyuCarpaccio.id,
      instructions:
        "1. Freeze Wagyu for 30 minutes\n2. Slice paper-thin on mandoline\n3. Arrange on chilled plate\n4. Drizzle with ponzu sauce\n5. Top with microgreens and sesame seeds",
      prepTimeMinutes: 8,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: "HIGH",
      notes: "Must use A5 Wagyu. Keep everything cold. Slice just before service.",
    },
  });

  const seabassRecipe = await prisma.recipe.create({
    data: {
      dishId: seaBass.id,
      instructions:
        "1. Clean whole sea bass, score skin\n2. Brush with miso glaze\n3. Bake at 200C for 15-18 minutes\n4. Blanch asparagus\n5. Plate with bonito flakes and ponzu",
      prepTimeMinutes: 10,
      cookTimeMinutes: 18,
      servings: 2,
      difficulty: "MEDIUM",
      notes: "Miso glaze should be applied midway through cooking to prevent burning.",
    },
  });

  const wagyu_tatakiRecipe = await prisma.recipe.create({
    data: {
      dishId: wagyu.id,
      instructions:
        "1. Heat teppanyaki griddle to 260C\n2. Season Wagyu with truffle salt\n3. Sear 2 minutes each side\n4. Slice against grain\n5. Serve with ponzu and scallions",
      prepTimeMinutes: 5,
      cookTimeMinutes: 5,
      servings: 2,
      difficulty: "HIGH",
      notes: "Tableside cooking. Client should see the sizzle and aroma.",
    },
  });

  const matcha_tiramisu = await prisma.recipe.create({
    data: {
      dishId: matcha.id,
      instructions:
        "1. Whisk egg yolks with sugar until pale\n2. Fold in mascarpone cheese\n3. Dip ladyfingers in matcha-coffee mixture\n4. Layer: fingers, cream, fingers, cream\n5. Dust with matcha powder\n6. Chill 4 hours",
      prepTimeMinutes: 20,
      cookTimeMinutes: 0,
      servings: 6,
      difficulty: "MEDIUM",
      notes: "Must chill before service. Can be made day ahead.",
    },
  });

  const lobsterThermidorRecipe = await prisma.recipe.create({
    data: {
      dishId: lobsterThermidor.id,
      instructions:
        "1. Split lobster lengthwise, remove tail meat\n2. Sauté mushroom and shallot\n3. Make cream sauce with sherry\n4. Combine with lobster, fold in egg yolk\n5. Stuff back into shell\n6. Top with cheese, bake until golden",
      prepTimeMinutes: 20,
      cookTimeMinutes: 20,
      servings: 2,
      difficulty: "HIGH",
      notes: "Classic French technique with Japanese twist. Garnish with sakura petals.",
    },
  });

  const toroNigiriRecipe = await prisma.recipe.create({
    data: {
      dishId: toroNigiri.id,
      instructions:
        "1. Form sushi rice into small ovals (25g each)\n2. Slice toro into thin pieces\n3. Drape toro over rice\n4. Brush with truffle oil\n5. Finish with sea salt flake",
      prepTimeMinutes: 8,
      cookTimeMinutes: 0,
      servings: 1,
      difficulty: "HIGH",
      notes: "Sushi rice must be warm. Toro must be premium quality. Work quickly.",
    },
  });

  const dragonRollRecipe = await prisma.recipe.create({
    data: {
      dishId: dragonRoll.id,
      instructions:
        "1. Prepare shrimp tempura\n2. Lay nori, spread rice on bamboo mat\n3. Place tempura, avocado, cucumber in center\n4. Roll tightly\n5. Slice, plate, top with eel sauce and extra unagi",
      prepTimeMinutes: 10,
      cookTimeMinutes: 3,
      servings: 1,
      difficulty: "MEDIUM",
      notes: "Eel sauce should be warm. Serve immediately after rolling.",
    },
  });

  const lambRackRecipe = await prisma.recipe.create({
    data: {
      dishId: lambRack.id,
      instructions:
        "1. Season lamb with salt and pepper\n2. Sear in hot pan 3 minutes each side\n3. Coat with shiso-herb crust\n4. Finish in oven at 180C for 8-10 minutes (medium-rare)\n5. Roast root vegetables\n6. Rest lamb 5 minutes before plating\n7. Serve with shiso chimichurri",
      prepTimeMinutes: 15,
      cookTimeMinutes: 18,
      servings: 2,
      difficulty: "HIGH",
      notes: "Resting is crucial. Serve with red wine or sake pairing.",
    },
  });

  // ============================================================
  // 8. CREATE INVENTORY ITEMS
  // ============================================================
  console.log("Creating inventory items...");

  const inventoryItems = [];

  // PRODUCE
  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Wasabi Root",
        sku: "PROD-001",
        category: "PRODUCE",
        unit: "kg",
        currentStock: 2,
        minStock: 1,
        parLevel: 2.5,
        costPerUnit: 150,
        isPerishable: true,
        shelfLifeDays: 30,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Fresh Ginger",
        sku: "PROD-002",
        category: "PRODUCE",
        unit: "kg",
        currentStock: 5,
        minStock: 2,
        parLevel: 6,
        costPerUnit: 25,
        isPerishable: true,
        shelfLifeDays: 20,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Fresh Microgreens Mix",
        sku: "PROD-003",
        category: "PRODUCE",
        unit: "box",
        currentStock: 8,
        minStock: 3,
        parLevel: 10,
        costPerUnit: 35,
        isPerishable: true,
        shelfLifeDays: 5,
        storageLocation: "COLD_ROOM_B",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Fresh Edamame",
        sku: "PROD-004",
        category: "PRODUCE",
        unit: "kg",
        currentStock: 6,
        minStock: 2,
        parLevel: 8,
        costPerUnit: 45,
        isPerishable: true,
        shelfLifeDays: 10,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Fresh Asparagus",
        sku: "PROD-005",
        category: "PRODUCE",
        unit: "kg",
        currentStock: 4,
        minStock: 1,
        parLevel: 5,
        costPerUnit: 60,
        isPerishable: true,
        shelfLifeDays: 7,
        storageLocation: "COLD_ROOM_B",
      },
    })
  );

  // SEAFOOD
  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Sushi-Grade Tuna (Maguro)",
        sku: "FISH-001",
        category: "SEAFOOD",
        unit: "kg",
        currentStock: 8,
        minStock: 4,
        parLevel: 12,
        costPerUnit: 250,
        isPerishable: true,
        shelfLifeDays: 2,
        storageLocation: "SUSHI_FREEZER",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Premium Salmon Fillet",
        sku: "FISH-002",
        category: "SEAFOOD",
        unit: "kg",
        currentStock: 6,
        minStock: 3,
        parLevel: 9,
        costPerUnit: 180,
        isPerishable: true,
        shelfLifeDays: 2,
        storageLocation: "SUSHI_FREEZER",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Large Shrimp (Ebi)",
        sku: "FISH-003",
        category: "SEAFOOD",
        unit: "kg",
        currentStock: 4,
        minStock: 2,
        parLevel: 6,
        costPerUnit: 120,
        isPerishable: true,
        shelfLifeDays: 2,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Uni (Sea Urchin)",
        sku: "FISH-004",
        category: "SEAFOOD",
        unit: "box",
        currentStock: 3,
        minStock: 1,
        parLevel: 4,
        costPerUnit: 400,
        isPerishable: true,
        shelfLifeDays: 1,
        storageLocation: "SUSHI_FREEZER",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Lobster Tail (Live)",
        sku: "FISH-005",
        category: "SEAFOOD",
        unit: "piece",
        currentStock: 10,
        minStock: 5,
        parLevel: 15,
        costPerUnit: 280,
        isPerishable: true,
        shelfLifeDays: 3,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Fresh Manila Clams",
        sku: "FISH-006",
        category: "SEAFOOD",
        unit: "kg",
        currentStock: 5,
        minStock: 2,
        parLevel: 7,
        costPerUnit: 85,
        isPerishable: true,
        shelfLifeDays: 1,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Squid (Ika)",
        sku: "FISH-007",
        category: "SEAFOOD",
        unit: "kg",
        currentStock: 4,
        minStock: 2,
        parLevel: 6,
        costPerUnit: 95,
        isPerishable: true,
        shelfLifeDays: 2,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Chilean Sea Bass Fillet",
        sku: "FISH-008",
        category: "SEAFOOD",
        unit: "kg",
        currentStock: 5,
        minStock: 2,
        parLevel: 8,
        costPerUnit: 200,
        isPerishable: true,
        shelfLifeDays: 3,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Whole Mediterranean Branzino",
        sku: "FISH-009",
        category: "SEAFOOD",
        unit: "piece",
        currentStock: 6,
        minStock: 2,
        parLevel: 8,
        costPerUnit: 150,
        isPerishable: true,
        shelfLifeDays: 2,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  // MEAT
  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "A5 Japanese Wagyu Steak",
        sku: "MEAT-001",
        category: "MEAT",
        unit: "kg",
        currentStock: 3,
        minStock: 1,
        parLevel: 4,
        costPerUnit: 800,
        isPerishable: true,
        shelfLifeDays: 5,
        storageLocation: "MEAT_FREEZER",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Duck Breast (Magret)",
        sku: "MEAT-002",
        category: "MEAT",
        unit: "piece",
        currentStock: 8,
        minStock: 3,
        parLevel: 10,
        costPerUnit: 85,
        isPerishable: true,
        shelfLifeDays: 5,
        storageLocation: "MEAT_FREEZER",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Prime Lamb Rack",
        sku: "MEAT-003",
        category: "MEAT",
        unit: "piece",
        currentStock: 5,
        minStock: 2,
        parLevel: 7,
        costPerUnit: 120,
        isPerishable: true,
        shelfLifeDays: 5,
        storageLocation: "MEAT_FREEZER",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Foie Gras Terrine",
        sku: "MEAT-004",
        category: "MEAT",
        unit: "piece",
        currentStock: 2,
        minStock: 1,
        parLevel: 3,
        costPerUnit: 350,
        isPerishable: true,
        shelfLifeDays: 14,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Ground Pork (Premium)",
        sku: "MEAT-005",
        category: "MEAT",
        unit: "kg",
        currentStock: 4,
        minStock: 2,
        parLevel: 6,
        costPerUnit: 65,
        isPerishable: true,
        shelfLifeDays: 3,
        storageLocation: "COLD_ROOM_A",
      },
    })
  );

  // DAIRY
  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Fresh Burrata Cheese",
        sku: "DAIRY-001",
        category: "DAIRY",
        unit: "piece",
        currentStock: 6,
        minStock: 2,
        parLevel: 8,
        costPerUnit: 45,
        isPerishable: true,
        shelfLifeDays: 3,
        storageLocation: "COLD_ROOM_B",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Mascarpone Cheese",
        sku: "DAIRY-002",
        category: "DAIRY",
        unit: "kg",
        currentStock: 3,
        minStock: 1,
        parLevel: 4,
        costPerUnit: 55,
        isPerishable: true,
        shelfLifeDays: 7,
        storageLocation: "COLD_ROOM_B",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Buffalo Mozzarella",
        sku: "DAIRY-003",
        category: "DAIRY",
        unit: "piece",
        currentStock: 5,
        minStock: 2,
        parLevel: 7,
        costPerUnit: 35,
        isPerishable: true,
        shelfLifeDays: 5,
        storageLocation: "COLD_ROOM_B",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Parmesan Reggiano",
        sku: "DAIRY-004",
        category: "DAIRY",
        unit: "kg",
        currentStock: 4,
        minStock: 2,
        parLevel: 5,
        costPerUnit: 180,
        isPerishable: true,
        shelfLifeDays: 60,
        storageLocation: "COLD_ROOM_B",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Heavy Cream (35%)",
        sku: "DAIRY-005",
        category: "DAIRY",
        unit: "liter",
        currentStock: 8,
        minStock: 3,
        parLevel: 12,
        costPerUnit: 35,
        isPerishable: true,
        shelfLifeDays: 14,
        storageLocation: "COLD_ROOM_B",
      },
    })
  );

  // DRY GOODS
  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Sushi Rice (Koshihikari)",
        sku: "DRY-001",
        category: "DRY_GOODS",
        unit: "kg",
        currentStock: 20,
        minStock: 10,
        parLevel: 30,
        costPerUnit: 45,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Arborio Rice",
        sku: "DRY-002",
        category: "DRY_GOODS",
        unit: "kg",
        currentStock: 10,
        minStock: 5,
        parLevel: 15,
        costPerUnit: 35,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Nori Seaweed Sheets",
        sku: "DRY-003",
        category: "DRY_GOODS",
        unit: "pack",
        currentStock: 15,
        minStock: 5,
        parLevel: 20,
        costPerUnit: 22,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Italian Pasta Tagliatelle",
        sku: "DRY-004",
        category: "DRY_GOODS",
        unit: "kg",
        currentStock: 8,
        minStock: 3,
        parLevel: 12,
        costPerUnit: 28,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Pappardelle Pasta",
        sku: "DRY-005",
        category: "DRY_GOODS",
        unit: "kg",
        currentStock: 6,
        minStock: 2,
        parLevel: 10,
        costPerUnit: 32,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Spaghetti Linguine",
        sku: "DRY-006",
        category: "DRY_GOODS",
        unit: "kg",
        currentStock: 7,
        minStock: 3,
        parLevel: 12,
        costPerUnit: 24,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  // SPICES & CONDIMENTS
  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Miso Paste (Shiro)",
        sku: "SPICE-001",
        category: "SPICES",
        unit: "kg",
        currentStock: 5,
        minStock: 2,
        parLevel: 7,
        costPerUnit: 85,
        isPerishable: true,
        shelfLifeDays: 90,
        storageLocation: "COLD_ROOM_C",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Matcha Powder Premium",
        sku: "SPICE-002",
        category: "SPICES",
        unit: "kg",
        currentStock: 2,
        minStock: 0.5,
        parLevel: 3,
        costPerUnit: 200,
        isPerishable: true,
        shelfLifeDays: 180,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Black Truffle Oil",
        sku: "SPICE-003",
        category: "SPICES",
        unit: "liter",
        currentStock: 3,
        minStock: 1,
        parLevel: 4,
        costPerUnit: 250,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Ponzu Sauce",
        sku: "SPICE-004",
        category: "SPICES",
        unit: "liter",
        currentStock: 6,
        minStock: 2,
        parLevel: 8,
        costPerUnit: 55,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Soy Sauce Premium",
        sku: "SPICE-005",
        category: "SPICES",
        unit: "liter",
        currentStock: 8,
        minStock: 3,
        parLevel: 12,
        costPerUnit: 40,
        isPerishable: false,
        storageLocation: "PANTRY",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Dashi Stock",
        sku: "SPICE-006",
        category: "SPICES",
        unit: "liter",
        currentStock: 10,
        minStock: 4,
        parLevel: 15,
        costPerUnit: 30,
        isPerishable: false,
        storageLocation: "COLD_ROOM_C",
      },
    })
  );

  // BEVERAGES & ALCOHOL
  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Premium Sake Junmai",
        sku: "BEV-001",
        category: "ALCOHOL",
        unit: "bottle",
        currentStock: 12,
        minStock: 4,
        parLevel: 16,
        costPerUnit: 65,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Prosecco Brut",
        sku: "BEV-002",
        category: "ALCOHOL",
        unit: "bottle",
        currentStock: 18,
        minStock: 8,
        parLevel: 24,
        costPerUnit: 45,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Campari",
        sku: "BEV-003",
        category: "ALCOHOL",
        unit: "bottle",
        currentStock: 8,
        minStock: 3,
        parLevel: 10,
        costPerUnit: 40,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Japanese Whisky",
        sku: "BEV-004",
        category: "ALCOHOL",
        unit: "bottle",
        currentStock: 6,
        minStock: 2,
        parLevel: 8,
        costPerUnit: 120,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Premium Gin",
        sku: "BEV-005",
        category: "ALCOHOL",
        unit: "bottle",
        currentStock: 10,
        minStock: 4,
        parLevel: 14,
        costPerUnit: 85,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Vodka Premium",
        sku: "BEV-006",
        category: "ALCOHOL",
        unit: "bottle",
        currentStock: 8,
        minStock: 3,
        parLevel: 12,
        costPerUnit: 55,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "Sherry Oloroso",
        sku: "BEV-007",
        category: "ALCOHOL",
        unit: "bottle",
        currentStock: 6,
        minStock: 2,
        parLevel: 8,
        costPerUnit: 75,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  inventoryItems.push(
    await prisma.inventoryItem.create({
      data: {
        name: "White Wine (Cooking)",
        sku: "BEV-008",
        category: "ALCOHOL",
        unit: "liter",
        currentStock: 10,
        minStock: 4,
        parLevel: 15,
        costPerUnit: 25,
        isPerishable: false,
        storageLocation: "WINE_CELLAR",
      },
    })
  );

  // ============================================================
  // 9. CREATE SUPPLIERS
  // ============================================================
  console.log("Creating suppliers...");

  const marche = await prisma.supplier.create({
    data: {
      name: "Marché Central Tanger",
      contactName: "Ahmed Bennani",
      email: "info@marche-central.ma",
      phone: "+212 5 39 30 20 10",
      address: "Avenue Hassan II, Medina",
      city: "Tangier",
      paymentTerms: "Cash on delivery",
      deliveryDays: "Monday, Wednesday, Friday",
      leadTimeDays: 0,
      rating: 4.5,
      reliabilityScore: 95,
      isPreferred: true,
      notes: "Local produce supplier, excellent quality",
    },
  });

  const atlantic = await prisma.supplier.create({
    data: {
      name: "Atlantic Fresh Seafood",
      contactName: "Hassan El Yacoubi",
      email: "orders@atlanticfresh.ma",
      phone: "+212 5 39 94 45 67",
      address: "Port Commercial, Quai Abdellah",
      city: "Tangier",
      paymentTerms: "Net 7 days",
      deliveryDays: "Daily",
      leadTimeDays: 1,
      rating: 4.8,
      reliabilityScore: 98,
      isPreferred: true,
      notes: "Premium seafood, direct from fishing fleet",
    },
  });

  const boucherie = await prisma.supplier.create({
    data: {
      name: "Boucherie Premium Tanger",
      contactName: "Mohammed Tahiri",
      email: "butcher@boucherie-premium.ma",
      phone: "+212 6 61 25 38 94",
      address: "Rue de Tetouan 42",
      city: "Tangier",
      paymentTerms: "Weekly settlement",
      deliveryDays: "Tuesday, Thursday, Saturday",
      leadTimeDays: 1,
      rating: 4.6,
      reliabilityScore: 96,
      isPreferred: true,
      notes: "Premium cuts, Wagyu specialist",
    },
  });

  const importLuxe = await prisma.supplier.create({
    data: {
      name: "Import Luxe Maroc",
      contactName: "Fatima Belmir",
      email: "contact@import-luxe.ma",
      phone: "+212 5 32 20 98 76",
      address: "Zone Industrielle, Casablanca",
      city: "Casablanca",
      paymentTerms: "Net 30 days",
      deliveryDays: "Wednesday",
      leadTimeDays: 3,
      rating: 4.3,
      reliabilityScore: 92,
      isPreferred: true,
      notes: "Specialty imports - truffle, Japanese goods, premium oils",
    },
  });

  const caves = await prisma.supplier.create({
    data: {
      name: "Caves du Détroit",
      contactName: "Jean-Pierre Fontaine",
      email: "ventes@caves-detroit.ma",
      phone: "+212 5 39 93 44 55",
      address: "Boulevard Pasteur, Ville Nouvelle",
      city: "Tangier",
      paymentTerms: "Net 15 days",
      deliveryDays: "Monday, Thursday",
      leadTimeDays: 1,
      rating: 4.7,
      reliabilityScore: 97,
      isPreferred: true,
      notes: "Beverages and wine specialist",
    },
  });

  // ============================================================
  // 10. CREATE SUPPLIER PRODUCTS
  // ============================================================
  console.log("Creating supplier products...");

  // Marché Central suppliers
  await prisma.supplierProduct.create({
    data: {
      supplierId: marche.id,
      inventoryItemId: inventoryItems[10].id, // Wasabi
      unitPrice: 160,
      minOrderQty: 0.5,
      leadTimeDays: 0,
      isPreferred: true,
    },
  });

  // Atlantic Fresh suppliers
  await prisma.supplierProduct.create({
    data: {
      supplierId: atlantic.id,
      inventoryItemId: inventoryItems[14].id, // Sushi-Grade Tuna
      unitPrice: 260,
      minOrderQty: 2,
      leadTimeDays: 1,
      isPreferred: true,
    },
  });

  await prisma.supplierProduct.create({
    data: {
      supplierId: atlantic.id,
      inventoryItemId: inventoryItems[15].id, // Premium Salmon
      unitPrice: 190,
      minOrderQty: 2,
      leadTimeDays: 1,
      isPreferred: true,
    },
  });

  // Boucherie suppliers
  await prisma.supplierProduct.create({
    data: {
      supplierId: boucherie.id,
      inventoryItemId: inventoryItems[22].id, // A5 Wagyu
      unitPrice: 850,
      minOrderQty: 1,
      leadTimeDays: 1,
      isPreferred: true,
    },
  });

  // Import Luxe suppliers
  await prisma.supplierProduct.create({
    data: {
      supplierId: importLuxe.id,
      inventoryItemId: inventoryItems[35].id, // Black Truffle Oil
      unitPrice: 280,
      minOrderQty: 1,
      leadTimeDays: 3,
      isPreferred: true,
    },
  });

  // Caves du Détroit suppliers
  await prisma.supplierProduct.create({
    data: {
      supplierId: caves.id,
      inventoryItemId: inventoryItems[42].id, // Premium Sake
      unitPrice: 75,
      minOrderQty: 1,
      leadTimeDays: 1,
      isPreferred: true,
    },
  });

  // ============================================================
  // 11. CREATE GUESTS (CRM)
  // ============================================================
  console.log("Creating guests...");

  const guest1 = await prisma.guest.create({
    data: {
      firstName: "Hassan",
      lastName: "Alaoui",
      email: "hassan.alaoui@example.com",
      phone: "+212 6 12 34 56 78",
      company: "Alaoui Trading Group",
      notes: "VIP client, prefers private dining",
      totalVisits: 8,
      totalSpent: 12500,
      averageSpend: 1562,
      tier: "VIP",
      lastVisitAt: new Date("2026-03-20"),
      tags: {
        create: [
          { tag: "regular" },
          { tag: "whale-customer" },
          { tag: "prefers-japanese" },
        ],
      },
    },
  });

  const guest2 = await prisma.guest.create({
    data: {
      firstName: "Zahra",
      lastName: "Mansouri",
      email: "zahra.m@example.com",
      phone: "+212 6 23 45 67 89",
      company: "Design Studio Tangier",
      totalVisits: 5,
      totalSpent: 3200,
      averageSpend: 640,
      tier: "REGULAR",
      lastVisitAt: new Date("2026-03-15"),
      tags: {
        create: [{ tag: "regular" }, { tag: "prefers-vegetarian" }],
      },
    },
  });

  const guest3 = await prisma.guest.create({
    data: {
      firstName: "Pierre",
      lastName: "Dubois",
      email: "pierre.d@example.com",
      phone: "+212 6 34 56 78 90",
      company: "France Consulting",
      totalVisits: 3,
      totalSpent: 1800,
      averageSpend: 600,
      tier: "NEW",
      source: "WEBSITE",
    },
  });

  const guest4 = await prisma.guest.create({
    data: {
      firstName: "Laila",
      lastName: "Benzakour",
      email: "laila.benz@example.com",
      phone: "+212 6 45 67 89 01",
      company: "L'Excellence Hotels",
      notes: "Corporate events, requires special menu",
      totalVisits: 12,
      totalSpent: 18900,
      averageSpend: 1575,
      tier: "VIP",
      lastVisitAt: new Date("2026-03-18"),
      tags: {
        create: [
          { tag: "whale-customer" },
          { tag: "corporate-events" },
          { tag: "prefers-italian" },
        ],
      },
    },
  });

  const guest5 = await prisma.guest.create({
    data: {
      firstName: "Mohammed",
      lastName: "Bennani",
      email: "m.bennani@example.com",
      phone: "+212 6 56 78 90 12",
      company: "Bennani Enterprise",
      totalVisits: 2,
      totalSpent: 890,
      averageSpend: 445,
      tier: "NEW",
      lastVisitAt: new Date("2026-03-10"),
    },
  });

  const guest6 = await prisma.guest.create({
    data: {
      firstName: "Sophia",
      lastName: "Rossi",
      email: "sophia.rossi@example.com",
      phone: "+212 6 67 89 01 23",
      notes: "Food critic, influencer",
      totalVisits: 4,
      totalSpent: 2400,
      averageSpend: 600,
      tier: "INFLUENCER",
      lastVisitAt: new Date("2026-03-12"),
      tags: {
        create: [{ tag: "influencer" }, { tag: "media" }],
      },
    },
  });

  const guest7 = await prisma.guest.create({
    data: {
      firstName: "Abdullah",
      lastName: "Al Mansoori",
      email: "amansoori@example.ae",
      phone: "+971 4 123 4567",
      company: "Dubai Holdings",
      notes: "UAE businessman, prefers premium everything",
      totalVisits: 6,
      totalSpent: 15600,
      averageSpend: 2600,
      tier: "VIP",
      lastVisitAt: new Date("2026-03-19"),
      tags: {
        create: [{ tag: "whale-customer" }, { tag: "premium-preferences" }],
      },
    },
  });

  const guest8 = await prisma.guest.create({
    data: {
      firstName: "Amelia",
      lastName: "Garcia",
      email: "amelia.garcia@example.es",
      phone: "+34 91 123 4567",
      notes: "Sommelier recommendation",
      totalVisits: 1,
      totalSpent: 450,
      averageSpend: 450,
      tier: "NEW",
      source: "REFERRAL",
    },
  });

  const guests = [guest1, guest2, guest3, guest4, guest5, guest6, guest7, guest8];

  // ============================================================
  // 12. CREATE RESERVATIONS
  // ============================================================
  console.log("Creating reservations...");

  const res1 = await prisma.reservation.create({
    data: {
      guestId: guest1.id,
      tableId: tables[17].id, // VIP table
      venueId: venue.id,
      guestName: "Hassan Alaoui",
      guestEmail: guest1.email,
      guestPhone: guest1.phone,
      partySize: 6,
      date: new Date("2026-03-27T20:00:00"),
      timeSlot: "20:00",
      status: "CONFIRMED",
      occasion: "Business Dinner",
      isVip: true,
      source: "PHONE",
      confirmationCode: "CONF-001",
      notes: "Prefers window seating, sake pairing requested",
    },
  });

  const res2 = await prisma.reservation.create({
    data: {
      guestId: guest2.id,
      tableId: tables[2].id,
      venueId: venue.id,
      guestName: "Zahra Mansouri",
      guestEmail: guest2.email,
      guestPhone: guest2.phone,
      partySize: 4,
      date: new Date("2026-03-28T19:30:00"),
      timeSlot: "19:30",
      status: "CONFIRMED",
      source: "WEBSITE",
      confirmationCode: "CONF-002",
    },
  });

  const res3 = await prisma.reservation.create({
    data: {
      guestId: guest4.id,
      privateRoomId: oceanSuite.id,
      venueId: venue.id,
      guestName: "Laila Benzakour",
      guestEmail: guest4.email,
      guestPhone: guest4.phone,
      partySize: 20,
      date: new Date("2026-03-30T18:00:00"),
      timeSlot: "18:00",
      status: "CONFIRMED",
      occasion: "Corporate Gala",
      isVip: true,
      isPrivateRoom: true,
      source: "PHONE",
      confirmationCode: "CONF-003",
      notes: "Full restaurant private. Special menu prepared.",
    },
  });

  const res4 = await prisma.reservation.create({
    data: {
      guestId: guest3.id,
      tableId: tables[0].id,
      venueId: venue.id,
      guestName: "Pierre Dubois",
      guestEmail: guest3.email,
      guestPhone: guest3.phone,
      partySize: 2,
      date: new Date("2026-03-23T19:00:00"),
      timeSlot: "19:00",
      status: "COMPLETED",
      source: "WEBSITE",
      confirmationCode: "CONF-004",
    },
  });

  const res5 = await prisma.reservation.create({
    data: {
      guestId: guest7.id,
      tableId: tables[18].id, // VIP table
      venueId: venue.id,
      guestName: "Abdullah Al Mansoori",
      guestEmail: guest7.email,
      guestPhone: guest7.phone,
      partySize: 4,
      date: new Date("2026-03-25T20:30:00"),
      timeSlot: "20:30",
      status: "COMPLETED",
      occasion: "Anniversary",
      isVip: true,
      source: "PHONE",
      confirmationCode: "CONF-005",
      notes: "Champagne service, special dessert",
    },
  });

  const res6 = await prisma.reservation.create({
    data: {
      guestId: null,
      tableId: tables[5].id,
      venueId: venue.id,
      guestName: "Jennifer Smith",
      guestEmail: "jen.smith@example.com",
      guestPhone: "+212 6 78 90 12 34",
      partySize: 3,
      date: new Date("2026-03-22T19:00:00"),
      timeSlot: "19:00",
      status: "NO_SHOW",
      source: "WEBSITE",
      confirmationCode: "CONF-006",
      noShowCount: 1,
    },
  });

  const res7 = await prisma.reservation.create({
    data: {
      guestId: guest5.id,
      tableId: tables[3].id,
      venueId: venue.id,
      guestName: "Mohammed Bennani",
      guestEmail: guest5.email,
      guestPhone: guest5.phone,
      partySize: 5,
      date: new Date("2026-03-29T18:30:00"),
      timeSlot: "18:30",
      status: "CONFIRMED",
      source: "PHONE",
      confirmationCode: "CONF-007",
    },
  });

  // ============================================================
  // 13. CREATE ORDER TICKETS
  // ============================================================
  console.log("Creating order tickets...");

  const order1 = await prisma.orderTicket.create({
    data: {
      tableId: tables[0].id,
      employeeId: waiter.id,
      ticketNumber: "T001",
      status: "CLOSED",
      type: "DINE_IN",
      subtotal: 1200,
      discountAmount: 0,
      taxAmount: 120,
      totalAmount: 1320,
      tipAmount: 200,
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      guestCount: 2,
      closedAt: new Date("2026-03-25T21:30:00"),
      items: {
        create: [
          {
            dishId: waguyuCarpaccio.id,
            quantity: 1,
            unitPrice: 280,
            totalPrice: 280,
            status: "SERVED",
          },
          {
            dishId: lobsterThermidor.id,
            quantity: 1,
            unitPrice: 580,
            totalPrice: 580,
            status: "SERVED",
          },
          {
            dishId: sakeFlight.id,
            quantity: 1,
            unitPrice: 220,
            totalPrice: 220,
            status: "SERVED",
          },
        ],
      },
    },
  });

  const order2 = await prisma.orderTicket.create({
    data: {
      tableId: tables[1].id,
      employeeId: waiter.id,
      ticketNumber: "T002",
      status: "CLOSED",
      type: "DINE_IN",
      subtotal: 890,
      discountAmount: 150,
      discountReason: "LOYALTY_DISCOUNT",
      taxAmount: 74,
      totalAmount: 814,
      tipAmount: 100,
      paymentMethod: "CASH",
      paymentStatus: "PAID",
      guestCount: 2,
      closedAt: new Date("2026-03-26T20:15:00"),
      items: {
        create: [
          {
            dishId: tunaTartare.id,
            quantity: 1,
            unitPrice: 220,
            totalPrice: 220,
            status: "SERVED",
          },
          {
            dishId: seaBass.id,
            quantity: 1,
            unitPrice: 450,
            totalPrice: 450,
            status: "SERVED",
          },
          {
            dishId: matcha.id,
            quantity: 1,
            unitPrice: 120,
            totalPrice: 120,
            status: "SERVED",
          },
        ],
      },
    },
  });

  const order3 = await prisma.orderTicket.create({
    data: {
      tableId: tables[2].id,
      employeeId: waiter.id,
      ticketNumber: "T003",
      status: "OPEN",
      type: "DINE_IN",
      subtotal: 450,
      taxAmount: 45,
      totalAmount: 495,
      guestCount: 1,
      openedAt: new Date("2026-03-27T19:45:00"),
      items: {
        create: [
          {
            dishId: tunaTartare.id,
            quantity: 1,
            unitPrice: 220,
            totalPrice: 220,
            status: "PENDING",
          },
          {
            dishId: edamameTruffle.id,
            quantity: 1,
            unitPrice: 90,
            totalPrice: 90,
            status: "PENDING",
          },
          {
            dishId: tokyoNegroni.id,
            quantity: 1,
            unitPrice: 140,
            totalPrice: 140,
            status: "PENDING",
          },
        ],
      },
    },
  });

  const order4 = await prisma.orderTicket.create({
    data: {
      tableId: tables[15].id, // BAR
      employeeId: bartender.id,
      ticketNumber: "T004",
      status: "CLOSED",
      type: "BAR",
      subtotal: 560,
      taxAmount: 56,
      totalAmount: 616,
      tipAmount: 80,
      paymentMethod: "CARD",
      paymentStatus: "PAID",
      guestCount: 3,
      closedAt: new Date("2026-03-27T22:00:00"),
      notes: "Bar seating. Multiple cocktails over 2 hours.",
      items: {
        create: [
          {
            dishId: sakuraSpritz.id,
            quantity: 2,
            unitPrice: 120,
            totalPrice: 240,
            status: "SERVED",
          },
          {
            dishId: tokyoNegroni.id,
            quantity: 1,
            unitPrice: 140,
            totalPrice: 140,
            status: "SERVED",
          },
          {
            dishId: tangierSunset.id,
            quantity: 1,
            unitPrice: 110,
            totalPrice: 110,
            status: "SERVED",
          },
          {
            dishId: edamameTruffle.id,
            quantity: 1,
            unitPrice: 90,
            totalPrice: 90,
            status: "SERVED",
          },
        ],
      },
    },
  });

  // ANOMALY ORDER - Excessive comps
  const order5 = await prisma.orderTicket.create({
    data: {
      tableId: tables[4].id,
      employeeId: waiter.id,
      ticketNumber: "T005",
      status: "CLOSED",
      type: "DINE_IN",
      subtotal: 1500,
      discountAmount: 800,
      discountReason: "COMPLIMENTARY",
      taxAmount: 70,
      totalAmount: 770,
      isComplimentary: true,
      complimentaryReason: "Guest dissatisfaction",
      paymentStatus: "PAID",
      guestCount: 4,
      closedAt: new Date("2026-03-24T21:00:00"),
      items: {
        create: [
          {
            dishId: omakase.id,
            quantity: 1,
            unitPrice: 480,
            totalPrice: 480,
            status: "SERVED",
            isComplimentary: true,
          },
          {
            dishId: wagyu.id,
            quantity: 1,
            unitPrice: 680,
            totalPrice: 680,
            status: "SERVED",
            isComplimentary: true,
          },
          {
            dishId: yuzu.id,
            quantity: 2,
            unitPrice: 110,
            totalPrice: 220,
            status: "SERVED",
          },
        ],
      },
    },
  });

  // ANOMALY ORDER - Unusual voids
  const order6 = await prisma.orderTicket.create({
    data: {
      tableId: tables[6].id,
      employeeId: waiter.id,
      ticketNumber: "T006",
      status: "CLOSED",
      type: "DINE_IN",
      subtotal: 950,
      taxAmount: 95,
      totalAmount: 1045,
      paymentStatus: "PAID",
      guestCount: 2,
      closedAt: new Date("2026-03-21T20:30:00"),
      items: {
        create: [
          {
            dishId: seaBass.id,
            quantity: 1,
            unitPrice: 450,
            totalPrice: 450,
            status: "SERVED",
          },
          {
            dishId: lambRack.id,
            quantity: 1,
            unitPrice: 520,
            totalPrice: 520,
            status: "VOIDED",
            isVoid: true,
            voidReason: "Kitchen error - remake ordered",
            voidedBy: chef.id,
          },
          {
            dishId: chocolate.id,
            quantity: 1,
            unitPrice: 140,
            totalPrice: 140,
            status: "SERVED",
          },
        ],
      },
    },
  });

  // ============================================================
  // 14. CREATE STOCK BATCHES (for perishables tracking)
  // ============================================================
  console.log("Creating stock batches...");

  // Create batches with some near expiry
  const batch1 = await prisma.stockBatch.create({
    data: {
      inventoryItemId: inventoryItems[14].id, // Tuna
      batchNumber: "FISH-001-20260310",
      quantity: 5,
      remainingQty: 3.5,
      costPerUnit: 250,
      receivedAt: new Date("2026-03-10"),
      expiresAt: new Date("2026-03-12"), // Near expiry!
      supplierId: atlantic.id,
      status: "ACTIVE",
    },
  });

  const batch2 = await prisma.stockBatch.create({
    data: {
      inventoryItemId: inventoryItems[14].id, // Tuna - fresh batch
      batchNumber: "FISH-001-20260325",
      quantity: 8,
      remainingQty: 8,
      costPerUnit: 250,
      receivedAt: new Date("2026-03-25"),
      expiresAt: new Date("2026-03-27"),
      supplierId: atlantic.id,
      status: "ACTIVE",
    },
  });

  const batch3 = await prisma.stockBatch.create({
    data: {
      inventoryItemId: inventoryItems[30].id, // Microgreens
      batchNumber: "PROD-003-20260325",
      quantity: 8,
      remainingQty: 5,
      costPerUnit: 35,
      receivedAt: new Date("2026-03-25"),
      expiresAt: new Date("2026-03-30"), // Expires soon
      supplierId: marche.id,
      status: "ACTIVE",
      notes: "Monitor closely - short shelf life",
    },
  });

  // ============================================================
  // 15. CREATE STOCK MOVEMENTS
  // ============================================================
  console.log("Creating stock movements...");

  await prisma.stockMovement.create({
    data: {
      inventoryItemId: inventoryItems[14].id,
      type: "RECEIVED",
      quantity: 8,
      previousStock: 0,
      newStock: 8,
      reason: "Purchase order PO-001",
      referenceType: "PURCHASE_ORDER",
      referenceId: "po-001",
      performedBy: admin.id,
      createdAt: new Date("2026-03-25T10:00:00"),
    },
  });

  await prisma.stockMovement.create({
    data: {
      inventoryItemId: inventoryItems[14].id,
      type: "USED",
      quantity: 2.5,
      previousStock: 8,
      newStock: 5.5,
      reason: "Order preparation",
      referenceType: "ORDER",
      referenceId: order1.id,
      performedBy: chef.id,
      createdAt: new Date("2026-03-25T21:00:00"),
    },
  });

  // ============================================================
  // 16. CREATE PURCHASE ORDERS
  // ============================================================
  console.log("Creating purchase orders...");

  const po1 = await prisma.purchaseOrder.create({
    data: {
      supplierId: atlantic.id,
      orderNumber: "PO-2026-001",
      status: "COMPLETED",
      totalAmount: 2600,
      expectedDate: new Date("2026-03-26"),
      approvedBy: manager.id,
      approvedAt: new Date("2026-03-24T10:00:00"),
      submittedAt: new Date("2026-03-24T09:00:00"),
      items: {
        create: [
          {
            inventoryItemId: inventoryItems[14].id, // Tuna
            quantity: 8,
            unitPrice: 260,
            receivedQty: 8,
          },
          {
            inventoryItemId: inventoryItems[15].id, // Salmon
            quantity: 6,
            unitPrice: 190,
            receivedQty: 6,
          },
        ],
      },
    },
  });

  const po2 = await prisma.purchaseOrder.create({
    data: {
      supplierId: boucherie.id,
      orderNumber: "PO-2026-002",
      status: "PENDING",
      totalAmount: 2550,
      expectedDate: new Date("2026-03-28"),
      approvedBy: manager.id,
      approvedAt: new Date("2026-03-25T14:00:00"),
      submittedAt: new Date("2026-03-25T13:00:00"),
      items: {
        create: [
          {
            inventoryItemId: inventoryItems[22].id, // Wagyu
            quantity: 3,
            unitPrice: 850,
            receivedQty: 0,
          },
        ],
      },
    },
  });

  const po3 = await prisma.purchaseOrder.create({
    data: {
      supplierId: importLuxe.id,
      orderNumber: "PO-2026-003",
      status: "DRAFT",
      totalAmount: 1400,
      items: {
        create: [
          {
            inventoryItemId: inventoryItems[35].id, // Black Truffle Oil
            quantity: 4,
            unitPrice: 350,
          },
          {
            inventoryItemId: inventoryItems[37].id, // Matcha Powder
            quantity: 2,
            unitPrice: 200,
          },
        ],
      },
    },
  });

  // ============================================================
  // 17. CREATE INVOICES
  // ============================================================
  console.log("Creating invoices...");

  const inv1 = await prisma.invoice.create({
    data: {
      supplierId: atlantic.id,
      purchaseOrderId: po1.id,
      invoiceNumber: "INV-2026-001",
      type: "SUPPLIER",
      status: "PAID",
      subtotal: 2600,
      taxAmount: 260,
      totalAmount: 2860,
      paidAmount: 2860,
      currency: "MAD",
      dueDate: new Date("2026-04-03"),
      paidAt: new Date("2026-03-26T16:00:00"),
      approvedBy: manager.id,
      approvedAt: new Date("2026-03-25T15:00:00"),
      payments: {
        create: [
          {
            amount: 2860,
            method: "BANK_TRANSFER",
            reference: "TRANSFER-001",
            recordedBy: manager.id,
          },
        ],
      },
    },
  });

  const inv2 = await prisma.invoice.create({
    data: {
      supplierId: boucherie.id,
      purchaseOrderId: po2.id,
      invoiceNumber: "INV-2026-002",
      type: "SUPPLIER",
      status: "PENDING",
      subtotal: 2550,
      taxAmount: 255,
      totalAmount: 2805,
      paidAmount: 0,
      currency: "MAD",
      dueDate: new Date("2026-04-02"),
      approvedBy: manager.id,
      approvedAt: new Date("2026-03-25T14:30:00"),
    },
  });

  const inv3 = await prisma.invoice.create({
    data: {
      supplierId: marche.id,
      invoiceNumber: "INV-2026-003",
      type: "SUPPLIER",
      status: "OVERDUE",
      subtotal: 420,
      taxAmount: 42,
      totalAmount: 462,
      paidAmount: 0,
      currency: "MAD",
      dueDate: new Date("2026-03-15"), // Overdue!
      approvedBy: manager.id,
      approvedAt: new Date("2026-03-08T10:00:00"),
      notes: "Payment reminder sent - contact supplier",
    },
  });

  // ============================================================
  // 18. CREATE ANOMALIES
  // ============================================================
  console.log("Creating anomalies...");

  const anom1 = await prisma.anomaly.create({
    data: {
      type: "EXCESSIVE_COMPLIMENTARY",
      severity: "MEDIUM",
      riskScore: 45,
      employee: { connect: { id: waiter.id } },
      description:
        "High frequency of complimentary items on orders by Mohammed Khalil",
      details: JSON.stringify({
        totalCompOrders: 3,
        compItemCount: 8,
        totalCompValue: 2400,
        period: "Last 14 days",
      }),
      evidence: JSON.stringify({
        orders: [order5.id],
        avgCompPerOrder: 800,
      }),
      referenceType: "EMPLOYEE",
      referenceId: waiter.id,
      status: "PENDING_REVIEW",
      notes: "Investigate justification for complimentary items",
    },
  });

  const anom2 = await prisma.anomaly.create({
    data: {
      type: "INVENTORY_SHRINKAGE",
      severity: "HIGH",
      riskScore: 72,
      description:
        "Unusual inventory variance detected for premium items (Tuna, Wagyu)",
      details: JSON.stringify({
        items: ["Sushi-Grade Tuna", "A5 Wagyu"],
        discrepancy: "8-12% variance",
        period: "Last 7 days",
        estimatedValue: 4200,
      }),
      evidence: JSON.stringify({
        expectedUsage: 12.5,
        actualUsage: 5.8,
        difference: 6.7,
      }),
      referenceType: "INVENTORY",
      status: "OPEN",
      notes: "Requires physical inventory recount and investigation",
    },
  });

  const anom3 = await prisma.anomaly.create({
    data: {
      type: "VOID_PATTERN",
      severity: "MEDIUM",
      riskScore: 55,
      employee: { connect: { id: waiter.id } },
      description: "Unusual void pattern detected on order ticket",
      details: JSON.stringify({
        voidCount: 1,
        voidValue: 520,
        reason: "Kitchen error",
        frequency: "1 void in last 5 shifts",
      }),
      evidence: JSON.stringify({
        ticket: order6.id,
        itemVoided: "Lamb Rack Shiso Chimichurri",
      }),
      referenceType: "ORDER",
      referenceId: order6.id,
      status: "ACKNOWLEDGED",
      notes: "Isolated incident, kitchen confirmed error",
    },
  });

  const anom4 = await prisma.anomaly.create({
    data: {
      type: "STOCK_EXPIRY_ALERT",
      severity: "MEDIUM",
      riskScore: 35,
      description: "Premium ingredients approaching expiration",
      details: JSON.stringify({
        items: [
          {
            name: "Sushi-Grade Tuna",
            expiresAt: "2026-03-12",
            daysRemaining: -15, // Already expired!
            quantity: 1.5,
          },
        ],
      }),
      evidence: JSON.stringify({
        batchNumber: "FISH-001-20260310",
        batchId: batch1.id,
      }),
      referenceType: "INVENTORY",
      referenceId: batch1.id,
      status: "OPEN",
      notes: "Recommend disposal. Loss: ~375 MAD",
    },
  });

  // ============================================================
  // 19. CREATE ALERTS
  // ============================================================
  console.log("Creating alerts...");

  await prisma.alert.create({
    data: {
      type: "INVENTORY_LOW",
      severity: "WARNING",
      title: "Low Stock Alert: Premium Sake",
      message: "Premium Sake Junmai is below minimum threshold (4 bottles remaining)",
      data: JSON.stringify({
        item: "Premium Sake Junmai",
        current: 4,
        minimum: 4,
        parLevel: 16,
      }),
      userId: managerUser.id,
    },
  });

  await prisma.alert.create({
    data: {
      type: "INVOICE_OVERDUE",
      severity: "CRITICAL",
      title: "Overdue Invoice Alert",
      message: "Invoice INV-2026-003 from Marché Central Tanger is 12 days overdue",
      data: JSON.stringify({
        invoice: inv3.id,
        amount: 462,
        daysOverdue: 12,
        supplier: "Marché Central Tanger",
      }),
      userId: managerUser.id,
    },
  });

  await prisma.alert.create({
    data: {
      type: "STOCK_EXPIRY",
      severity: "CRITICAL",
      title: "Expired Inventory Detected",
      message: "Sushi-Grade Tuna batch FISH-001-20260310 expired on 2026-03-12",
      data: JSON.stringify({
        item: "Sushi-Grade Tuna",
        batchNumber: "FISH-001-20260310",
        expiresAt: "2026-03-12",
        estimatedLoss: 375,
      }),
      userId: chefUser.id,
    },
  });

  await prisma.alert.create({
    data: {
      type: "ANOMALY_DETECTED",
      severity: "WARNING",
      title: "Anomaly Detected: Excessive Complimentary Items",
      message:
        "Pattern of excessive complimentary items detected. Manual review recommended.",
      data: JSON.stringify({
        anomalyId: anom1.id,
        employeeId: waiter.id,
        riskScore: 45,
      }),
      userId: managerUser.id,
    },
  });

  await prisma.alert.create({
    data: {
      type: "RESERVATION",
      severity: "INFO",
      title: "VIP Reservation Confirmed",
      message: "VIP reservation for Hassan Alaoui confirmed for 2026-03-27 at 20:00",
      data: JSON.stringify({
        reservationId: res1.id,
        guestName: "Hassan Alaoui",
        partySize: 6,
      }),
      userId: hostUser.id,
    },
  });

  await prisma.alert.create({
    data: {
      type: "SUPPLY_CHAIN",
      severity: "INFO",
      title: "New Purchase Order Requires Approval",
      message: "PO-2026-003 from Import Luxe Maroc is awaiting approval",
      data: JSON.stringify({
        poNumber: "PO-2026-003",
        supplierId: importLuxe.id,
        totalAmount: 1400,
      }),
      userId: managerUser.id,
    },
  });

  // ============================================================
  // 20. CREATE FORECASTS & RECOMMENDATIONS
  // ============================================================
  console.log("Creating forecasts...");

  const forecast1 = await prisma.forecast.create({
    data: {
      type: "DEMAND",
      period: "WEEKLY",
      targetDate: new Date("2026-04-02"),
      status: "GENERATED",
      confidence: 0.78,
      data: JSON.stringify({
        expectedCovers: 245,
        peakDays: ["Friday", "Saturday"],
        expectedRevenue: 98000,
        topDishes: [
          "Wagyu A5 Teppanyaki",
          "Omakase Selection",
          "Lobster Thermidor",
        ],
      }),
      recommendations: {
        create: [
          {
            type: "INVENTORY",
            priority: "HIGH",
            title: "Increase Premium Wagyu Stock",
            description:
              "Forecast predicts high demand for Wagyu dishes. Recommend stocking additional 5kg",
            actionRequired: "Order from Boucherie Premium",
            rationale: "Peak period approaching, current stock: 3kg",
            status: "PENDING",
          },
          {
            type: "STAFFING",
            priority: "MEDIUM",
            title: "Schedule Additional Kitchen Staff",
            description:
              "Expected high volume for weekend. Recommend 2 additional prep cooks",
            actionRequired: "Coordinate with HR for shift scheduling",
            rationale: "Forecast shows 245 expected covers",
            status: "PENDING",
          },
        ],
      },
    },
  });

  const forecast2 = await prisma.forecast.create({
    data: {
      type: "COST",
      period: "MONTHLY",
      targetDate: new Date("2026-04-30"),
      status: "GENERATED",
      confidence: 0.82,
      data: JSON.stringify({
        projectedCogs: 285000,
        expectedLabor: 180000,
        expectedUtilities: 45000,
        projectedRevenue: 620000,
        projectedGrossProfit: 335000,
      }),
      recommendations: {
        create: [
          {
            type: "OPERATIONAL",
            priority: "MEDIUM",
            title: "Review Labor Scheduling Efficiency",
            description:
              "Labor costs projected at 29% of revenue. Review scheduling to optimize",
            actionRequired: "Schedule management review meeting",
            rationale: "Monthly labor cost forecast shows potential for 2-3% optimization",
            status: "PENDING",
          },
        ],
      },
    },
  });

  // ============================================================
  // 21. CREATE AUDIT LOGS
  // ============================================================
  console.log("Creating audit logs...");

  await prisma.auditLog.create({
    data: {
      userId: managerUser.id,
      action: "APPROVED",
      entityType: "PURCHASE_ORDER",
      entityId: po1.id,
      newValue: JSON.stringify({ status: "CONFIRMED" }),
      notes: "PO approved for Atlantic Fresh Seafood",
      createdAt: new Date("2026-03-25T14:00:00"),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: chefUser.id,
      action: "CREATED",
      entityType: "ORDER_TICKET",
      entityId: order1.id,
      notes: "Order prepared and served to table 1",
      createdAt: new Date("2026-03-25T20:30:00"),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: "MODIFIED",
      entityType: "INVENTORY_ITEM",
      entityId: inventoryItems[14].id,
      oldValue: JSON.stringify({ minStock: 5 }),
      newValue: JSON.stringify({ minStock: 4 }),
      notes: "Adjusted minimum stock threshold for Sushi-Grade Tuna",
      createdAt: new Date("2026-03-24T10:00:00"),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: hostUser.id,
      action: "CREATED",
      entityType: "RESERVATION",
      entityId: res1.id,
      newValue: JSON.stringify({
        guestName: "Hassan Alaoui",
        partySize: 6,
        date: "2026-03-27",
      }),
      notes: "VIP reservation confirmed",
      createdAt: new Date("2026-03-20T15:30:00"),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: managerUser.id,
      action: "REVIEWED",
      entityType: "ANOMALY",
      entityId: anom1.id,
      newValue: JSON.stringify({ status: "PENDING_REVIEW" }),
      notes: "Flagged for manager review - excessive complimentary items",
      createdAt: new Date("2026-03-27T09:00:00"),
    },
  });

  await prisma.auditLog.create({
    data: {
      userId: adminUser.id,
      action: "GENERATED",
      entityType: "FORECAST",
      entityId: forecast1.id,
      newValue: JSON.stringify({
        type: "DEMAND",
        period: "WEEKLY",
        confidence: 0.78,
      }),
      notes: "Weekly demand forecast generated",
      createdAt: new Date("2026-03-27T08:30:00"),
    },
  });

  // ============================================================
  // 22. CREATE SETTINGS
  // ============================================================
  console.log("Creating settings...");

  await prisma.setting.create({
    data: {
      key: "TAX_RATE",
      value: "10",
      type: "NUMBER",
      category: "FINANCIAL",
      label: "Default Tax Rate (%)",
    },
  });

  await prisma.setting.create({
    data: {
      key: "SERVICE_FEE_ENABLED",
      value: "false",
      type: "BOOLEAN",
      category: "FINANCIAL",
      label: "Enable Service Fee",
    },
  });

  await prisma.setting.create({
    data: {
      key: "TIMEZONE",
      value: "Africa/Casablanca",
      type: "STRING",
      category: "GENERAL",
      label: "Venue Timezone",
    },
  });

  await prisma.setting.create({
    data: {
      key: "CURRENCY",
      value: "MAD",
      type: "STRING",
      category: "FINANCIAL",
      label: "Default Currency",
    },
  });

  await prisma.setting.create({
    data: {
      key: "LANGUAGE",
      value: "fr",
      type: "STRING",
      category: "GENERAL",
      label: "Default Language",
    },
  });

  await prisma.setting.create({
    data: {
      key: "ANOMALY_DETECTION_ENABLED",
      value: "true",
      type: "BOOLEAN",
      category: "SECURITY",
      label: "Enable Anomaly Detection",
    },
  });

  await prisma.setting.create({
    data: {
      key: "AUTO_CLOSE_ORDER_MINUTES",
      value: "120",
      type: "NUMBER",
      category: "OPERATIONAL",
      label: "Auto-close open orders after (minutes)",
    },
  });

  console.log("✅ Seed completed successfully!");
  console.log(
    "\n📊 Summary of created data:"
  );
  console.log("  - 6 Users (1 Admin, 1 Manager, 1 Chef, 1 Host, 1 Waiter, 1 Bartender)");
  console.log("  - 1 Venue with 20 tables and 2 private rooms");
  console.log("  - 1 Menu with 7 categories and 38 dishes");
  console.log("  - 6 Recipes with ingredients");
  console.log("  - 47 Inventory Items across 8 categories");
  console.log("  - 5 Suppliers with products");
  console.log("  - 8 Guests (mix of VIP, Regular, New)");
  console.log("  - 7 Reservations (various statuses)");
  console.log("  - 6 Order Tickets with items (including anomalies for demo)");
  console.log("  - 3 Stock Batches (with expiry tracking)");
  console.log("  - 3 Purchase Orders (various statuses)");
  console.log("  - 3 Invoices (Paid, Pending, Overdue for demo)");
  console.log("  - 4 Anomalies (for fraud detection demo)");
  console.log("  - 6 Alerts (various types and severities)");
  console.log("  - 2 Forecasts with recommendations");
  console.log("  - 7 Settings configured");
  console.log("  - 6 Audit logs tracking key actions");
  console.log(
    "\n🔐 Default credentials for testing:"
  );
  console.log("  Admin: admin@2rfusion.ma / admin123");
  console.log("  Manager: manager@2rfusion.ma / manager123");
  console.log("  Chef: chef@2rfusion.ma / chef123");
  console.log("  Host: host@2rfusion.ma / host123");
  console.log("  Waiter: waiter1@2rfusion.ma / waiter123");
  console.log("  Bartender: bartender@2rfusion.ma / bartender123");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
