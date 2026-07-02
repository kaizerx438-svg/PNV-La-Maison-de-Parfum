import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SUPABASE = "https://zdxbevleazcwgzqkeggs.supabase.co/storage/v1/object/public/Produits";

async function main() {

  // Admin user
  const admin = await prisma.user.upsert({
    where: { email: "admin@pnv.fr" },
    update: {},
    create: {
      email: "admin@pnv.fr",
      name: "Admin PNV",
      role: "ADMIN",
      emailVerified: true,
    },
  });

  // Supprimer les produits non officiels
  await prisma.product.deleteMany({
    where: {
      id: {
        notIn: ["seed-sala", "seed-nala", "seed-yacine", "seed-intense", "seed-luxure", "seed-charisme"],
      },
    },
  });

  // Supprimer la categorie mixte si elle existe
  await prisma.category.deleteMany({
    where: { slug: "parfums-mixte" },
  });

  // Categories
  const femme = await prisma.category.upsert({
    where: { slug: "parfums-femme" },
    update: { imageUrl: `${SUPABASE}/sala.jpeg` },
    create: {
      slug: "parfums-femme",
      name: "Parfums Femme",
      description: "Fragrances feminines",
      imageUrl: `${SUPABASE}/sala.jpeg`,
    },
  });

  const homme = await prisma.category.upsert({
    where: { slug: "parfums-homme" },
    update: { imageUrl: `${SUPABASE}/intense.jpeg` },
    create: {
      slug: "parfums-homme",
      name: "Parfums Homme",
      description: "Fragrances masculines",
      imageUrl: `${SUPABASE}/intense.jpeg`,
    },
  });

  // ─── GAMME FEMME ───────────────────────────────────────

  await prisma.product.upsert({
    where: { id: "seed-sala" },
    update: { imageUrl: `${SUPABASE}/sala.jpeg` },
    create: {
      id: "seed-sala",
      name: "Sala",
      description: "Une feminite florale affirmee. Sala s'ouvre sur la rose et le jasmin, portes par des aldehydes lumineux avant de se poser sur un fond musque et patchouli. Un parfum pour celle qui sait exactement qui elle est.",
      price: 89,
      concentration: "EAU_DE_PARFUM",
      volumeMl: 50,
      notesTete: "Rose · Jasmin · Aldehydes",
      notesCoeur: "Musc",
      notesFond: "Patchouli leger",
      stock: 25,
      status: "ACTIVE",
      featured: true,
      discountPercent: 0,
      imageUrl: `${SUPABASE}/sala.jpeg`,
      categoryId: femme.id,
      createdById: admin.id,
    },
  });

  await prisma.product.upsert({
    where: { id: "seed-nala" },
    update: { imageUrl: `${SUPABASE}/nala.jpeg` },
    create: {
      id: "seed-nala",
      name: "Nala",
      description: "Douce, gourmande, inoubliable. Nala mele la vanille et la noix de coco dans des notes cremeuses posees sur un musc doux. Un sillage chaleureux pour celles que l'on n'oublie pas facilement.",
      price: 85,
      concentration: "EAU_DE_PARFUM",
      volumeMl: 50,
      notesTete: "Noix de coco",
      notesCoeur: "Vanille · Notes cremeuses",
      notesFond: "Musc doux",
      stock: 30,
      status: "ACTIVE",
      featured: false,
      discountPercent: 0,
      imageUrl: `${SUPABASE}/nala.jpeg`,
      categoryId: femme.id,
      createdById: admin.id,
    },
  });

  await prisma.product.upsert({
    where: { id: "seed-yacine" },
    update: { imageUrl: `${SUPABASE}/yacine.jpeg` },
    create: {
      id: "seed-yacine",
      name: "Yacine",
      description: "Intense et envoutante. Yacine ouvre sur des fruits noirs profonds et le jasmin, avant de reveler la vanille, la feve tonka et le bois. Un parfum pour celles qui transforment chaque piece qu'elles traversent.",
      price: 95,
      concentration: "EAU_DE_PARFUM",
      volumeMl: 50,
      notesTete: "Fruits noirs · Jasmin",
      notesCoeur: "Vanille · Feve tonka",
      notesFond: "Bois",
      stock: 20,
      status: "ACTIVE",
      featured: true,
      discountPercent: 0,
      imageUrl: `${SUPABASE}/yacine.jpeg`,
      categoryId: femme.id,
      createdById: admin.id,
    },
  });

  // ─── GAMME HOMME ───────────────────────────────────────

  await prisma.product.upsert({
    where: { id: "seed-intense" },
    update: { imageUrl: `${SUPABASE}/intense.jpeg` },
    create: {
      id: "seed-intense",
      name: "Intense",
      description: "Puissant et maitrise. Intense s'ouvre sur la bergamote et le poivre leger avant de reveler l'encens, le bois de santal et l'ambroxan. Une signature olfactive pour l'homme qui marque sans avoir besoin d'elever la voix.",
      price: 92,
      concentration: "EAU_DE_PARFUM",
      volumeMl: 50,
      notesTete: "Bergamote · Agrumes · Poivre leger",
      notesCoeur: "Encens · Bois de santal",
      notesFond: "Ambroxan",
      stock: 28,
      status: "ACTIVE",
      featured: true,
      discountPercent: 0,
      imageUrl: `${SUPABASE}/intense.jpeg`,
      categoryId: homme.id,
      createdById: admin.id,
    },
  });

  await prisma.product.upsert({
    where: { id: "seed-luxure" },
    update: { imageUrl: `${SUPABASE}/luxure.jpeg` },
    create: {
      id: "seed-luxure",
      name: "Luxure",
      description: "Raffine et enveloppant. Luxure s'ouvre sur la pomme et la sauge avant de devoiler la vanille, la cannelle et la feve tonka. Un parfum gourmand et sophistique pour celui qui assume pleinement son gout pour les belles choses.",
      price: 88,
      concentration: "EAU_DE_PARFUM",
      volumeMl: 50,
      notesTete: "Pomme · Sauge",
      notesCoeur: "Vanille · Cannelle",
      notesFond: "Feve tonka",
      stock: 22,
      status: "ACTIVE",
      featured: false,
      discountPercent: 0,
      imageUrl: `${SUPABASE}/luxure.jpeg`,
      categoryId: homme.id,
      createdById: admin.id,
    },
  });

  await prisma.product.upsert({
    where: { id: "seed-charisme" },
    update: { imageUrl: `${SUPABASE}/charisme.jpeg` },
    create: {
      id: "seed-charisme",
      name: "Charisme",
      description: "Frais, original, inattendu. Charisme s'ouvre sur l'ananas et l'iris avant que le bouleau fume, le musc et le cacao leger ne viennent lui donner du caractere. Pour l'homme dont la presence naturelle ne passe jamais inapercue.",
      price: 90,
      concentration: "EAU_DE_PARFUM",
      volumeMl: 50,
      notesTete: "Ananas · Iris",
      notesCoeur: "Bouleau fume · Musc",
      notesFond: "Cacao leger",
      stock: 18,
      status: "ACTIVE",
      featured: true,
      discountPercent: 0,
      imageUrl: `${SUPABASE}/charisme.jpeg`,
      categoryId: homme.id,
      createdById: admin.id,
    },
  });

  console.log("Seed termine : 2 categories + 6 produits avec vraies photos Supabase");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());