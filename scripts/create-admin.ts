const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Supprimer l'ancien compte admin si existant
  const existingUser = await prisma.user.findUnique({
    where: { email: 'admin@pnv.fr' }
  });

  if (existingUser) {
    await prisma.account.deleteMany({ where: { userId: existingUser.id } });
    await prisma.session.deleteMany({ where: { userId: existingUser.id } });
    await prisma.user.delete({ where: { email: 'admin@pnv.fr' } });
    console.log('Ancien admin supprime');
  }

  console.log('Cree le nouveau compte admin via Better Auth...');
  console.log('Va sur /register et crée un compte avec admin@pnv.fr');
  console.log('Ensuite lance: npx ts-node scripts/set-admin-role.ts');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());