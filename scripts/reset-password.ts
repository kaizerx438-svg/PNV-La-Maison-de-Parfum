const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'contact.nvparfums@gmail.com';
  const newPassword = 'AdminPNV2026!';
  
  const hash = await bcrypt.hash(newPassword, 10);
  
  const account = await prisma.account.findFirst({
    where: { user: { email } },
  });

  if (!account) {
    console.log('Compte non trouve');
    return;
  }

  await prisma.account.update({
    where: { id: account.id },
    data: { password: hash },
  });

  console.log('Mot de passe reinitialise pour:', email);
  console.log('Nouveau mot de passe:', newPassword);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
  