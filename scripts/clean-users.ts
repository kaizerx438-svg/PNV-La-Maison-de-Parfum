const { PrismaClient: PC } = require('@prisma/client');
const db = new PC();

async function main() {
  await db.ticket.deleteMany({});
  await db.wishlist.deleteMany({});
  await db.orderItem.deleteMany({});
  await db.payment.deleteMany({});
  await db.order.deleteMany({});
  await db.product.deleteMany({});
  await db.category.deleteMany({});
  await db.session.deleteMany({});
  await db.account.deleteMany({});
  await db.user.deleteMany({});

  console.log('Toutes les donnees supprimees');
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());