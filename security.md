# Sécurité — vulnérabilités connues

## postcss < 8.5.10 (MODERATE)
- Affecte : Next.js 15 (dépendance interne non contrôlable)
- CVE : GHSA-qx2v-qp2m-jg93
- Impact : XSS potentiel via CSS stringify
- Statut : en attente d'un patch officiel Next.js
- Mitigation : non exploitable sans accès direct au CSS généré côté serveur
- Correctif forcé rejeté : downgraderait Next.js vers 9.3.3 (incompatible App Router)