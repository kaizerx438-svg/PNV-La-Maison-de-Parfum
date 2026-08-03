import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0D0D" }}>
      <ShopHeader />

      <div className="py-20 text-center">
        <p className="text-[10px] tracking-[0.6em] uppercase mb-4" style={{ color: "#C9A96E" }}>
          Legal
        </p>
        <h1
          className="text-4xl font-light"
          style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          Mentions Legales
        </h1>
        <div
          className="mx-auto mt-6"
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 space-y-6">
        {[
          {
            title: "Editeur du site",
            content: [
              "Denomination : PNV — La Maison du Parfum",
              "Fondatrice : Naomie Vanina Moussonda Ndombi",
              "Email : contact@maison-du-parfum.fr",
              "Site web : www.maison-du-parfum.fr",
            ],
          },
          {
            title: "Hebergement",
            content: [
              "Hebergeur : Vercel Inc.",
              "Adresse : 340 Pine Street, Suite 701, San Francisco, CA 94104, USA",
              "Site : vercel.com",
            ],
          },
          {
            title: "Propriete intellectuelle",
            content: [
              "L'ensemble du contenu de ce site (textes, images, visuels, logos, noms de parfums) est la propriete exclusive de PNV — La Maison du Parfum.",
              "Toute reproduction, representation, modification ou exploitation, totale ou partielle, de ce contenu est strictement interdite sans autorisation prealable ecrite.",
            ],
          },
          {
            title: "Donnees personnelles (RGPD)",
            content: [
              "Les donnees collectees sur ce site (nom, email, adresse) sont utilisees uniquement pour le traitement de vos commandes et l'amelioration de votre experience.",
              "Conformement au Reglement General sur la Protection des Donnees (RGPD — UE 2016/679), vous disposez des droits suivants :",
              "— Droit d'acces : obtenir une copie de vos donnees personnelles.",
              "— Droit de rectification : corriger vos donnees inexactes ou incompletes.",
              "— Droit a l'effacement : demander la suppression de vos donnees.",
              "— Droit a la portabilite : recevoir vos donnees dans un format lisible.",
              "— Droit d'opposition : vous opposer au traitement de vos donnees.",
              "Pour exercer ces droits, contactez-nous a : contact@maison-du-parfum.fr. Nous nous engageons a repondre dans un delai de 30 jours.",
              "Vos donnees ne sont jamais vendues ou transmises a des tiers a des fins commerciales.",
            ],
          },
          {
            title: "Securite des donnees",
            content: [
              "PNV met en oeuvre des mesures techniques et organisationnelles pour proteger vos donnees personnelles contre tout acces non autorise, perte ou divulgation.",
              "Les transactions de paiement sont securisees par Stripe (certifie PCI DSS). Aucune donnee bancaire n'est stockee sur nos serveurs.",
            ],
          },
          {
            title: "Cookies",
            content: [
              "Ce site utilise uniquement des cookies techniques necessaires a son fonctionnement (session utilisateur, panier).",
              "Aucun cookie publicitaire ou de tracking tiers n'est utilise sans votre consentement explicite.",
              "Vous pouvez configurer votre navigateur pour refuser les cookies, ce qui peut affecter certaines fonctionnalites du site.",
            ],
          },
          {
            title: "Responsabilite",
            content: [
              "PNV s'efforce d'assurer l'exactitude des informations diffusees sur ce site mais ne peut garantir leur exhaustivite.",
              "PNV ne saurait etre tenu responsable des dommages directs ou indirects resultant de l'utilisation de ce site ou de l'impossibilite d'y acceder.",
            ],
          },
          {
            title: "Droit applicable",
            content: [
              "Les presentes mentions legales sont soumises au droit francais.",
              "En cas de litige, les tribunaux competents seront ceux de Lyon, France.",
              "Pour toute reclamation, vous pouvez egalement contacter la CNIL : www.cnil.fr",
            ],
          },
        ].map((section) => (
          <section
            key={section.title}
            className="p-6"
            style={{ border: "1px solid rgba(201,169,110,0.15)" }}
          >
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {section.title}
            </h2>
            <div className="space-y-2">
              {section.content.map((line, i) => (
                <p
                  key={i}
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(245,239,230,0.5)", fontFamily: "Georgia, serif" }}
                >
                  {line}
                </p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}