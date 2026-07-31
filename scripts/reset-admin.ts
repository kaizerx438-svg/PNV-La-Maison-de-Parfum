const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hash = await bcrypt.hash('AdminPNV2026!', 10);
  
  // Trouver le compte admin dans la table Account de Better Auth
  const account = await prisma.account.findFirst({
    where: {
      user: { email: 'admin@pnv.fr' }
    }
  });

  if (account) {
    await prisma.account.update({
      where: { id: account.id },
      data: { password: hash }
    });
    console.log('Mot de passe admin mis à jour');
  } else {
    console.log('Compte admin non trouvé - creation...');
    const user = await prisma.user.findUnique({
      where: { email: 'admin@pnv.fr' }
    });
    if (user) {
      await prisma.account.create({
        data: {
          accountId: user.id,
          providerId: 'credential',
          userId: user.id,
          password: hash,
        }
      });
      console.log('Compte admin créé');
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());