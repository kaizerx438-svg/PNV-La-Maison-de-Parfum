const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.update({
    where: { email: 'contact.nvparfums@gmail.com' },
    data: { role: 'ADMIN' },
  });
  console.log('Role ADMIN assigne a:', user.email);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());