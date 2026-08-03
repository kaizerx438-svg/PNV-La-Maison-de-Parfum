const { createAuthClient } = require('better-auth/client');

const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
});

async function main() {
  const { data, error } = await authClient.signUp.email({
    email: 'contact.nvparfums@gmail.com',
    password: 'gh3p7CZk6*jnTmaj52$g ',
    name: 'Admin_Naomi',
  });

  if (error) {
    console.log('Erreur:', error);
    return;
  }

  console.log('Compte cree:', data);
}

main().catch(console.error);