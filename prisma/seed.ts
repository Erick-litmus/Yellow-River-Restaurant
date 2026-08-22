import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Clear existing items
  await prisma.menuItem.deleteMany({});

  // Seed Menu Items
  const items = [
    {
      name: "Authentic Lanzhou Beef Noodles",
      chineseName: "兰州牛肉面",
      description: "Signature hand-pulled noodles in a rich clear beef broth, topped with tender beef slices, chili oil, radish, and fresh cilantro.",
      price: 1200,
      category: "Noodles",
      imageUrl: "/images/lanzhou_beef_noodles.png",
      isAvailable: true,
    },
    {
      name: "Hand-Crafted Steamed Dumplings",
      chineseName: "手工猪肉水饺",
      description: "Delicate steamed dumplings stuffed with seasoned pork and fresh chives, served with savory garlic-soy sauce.",
      price: 950,
      category: "Dim Sum & Appetizers",
      imageUrl: "/images/chinese_dumplings.png",
      isAvailable: true,
    },
    {
      name: "Sizzling Kung Pao Chicken",
      chineseName: "宫保鸡丁",
      description: "Wok-tossed chicken cubes with crispy roasted peanuts, chili peppers, and sweet & tangy Sichuan sauce.",
      price: 1100,
      category: "Main Dishes",
      imageUrl: "/images/kung_pao_chicken.png",
      isAvailable: true,
    },
    {
      name: "Stir-Fried Beef Pull Noodles",
      chineseName: "干炒牛肉拉面",
      description: "Fresh hand-pulled noodles stir-fried on high flame with marinated sliced beef, scallions, and soy sauce.",
      price: 1250,
      category: "Noodles",
      imageUrl: "/images/lanzhou_beef_noodles.png",
      isAvailable: true,
    },
    {
      name: "Signature Cumin Lamb Skewers (4pcs)",
      chineseName: "新疆烤羊肉串",
      description: "Tender, juicy lamb leg chunks threaded on metal skewers, heavily seasoned with aromatic toasted cumin seeds, spicy red chili flakes, and Sichuan pepper, then grilled over open flame.",
      price: 850,
      category: "Barbecue",
      imageUrl: "/images/lamb_skewers.png",
      isAvailable: true,
    },
    {
      name: "Grilled Chicken Wings (3pcs)",
      chineseName: "烤鸡翅",
      description: "Plump chicken wings marinated in dark soy sauce, honey, ginger, and garlic, then slow-grilled until the skin is caramelized and crispy.",
      price: 650,
      category: "Barbecue",
      imageUrl: "/images/lamb_skewers.png",
      isAvailable: true,
    },
  ];

  for (const item of items) {
    await prisma.menuItem.create({ data: item });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
