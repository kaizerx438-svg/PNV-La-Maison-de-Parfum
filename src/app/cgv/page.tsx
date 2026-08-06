import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";

export default function CGVPage() {
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
          Conditions Generales de Vente
        </h1>
        <div
          className="mx-auto mt-6"
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
        />
        <p className="text-xs mt-4" style={{ color: "rgba(245,239,230,0.3)" }}>
          En vigueur au 1er aout 2026
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 space-y-6">
        {[
          {
            title: "Article 1 — Objet et champ d'application",
            content: "Les presentes Conditions Generales de Vente (CGV) regissent l'ensemble des ventes de parfums effectuees sur le site www.maison-du-parfum.fr par PNV — La Maison du Parfum. Elles s'appliquent a toute commande passee par un consommateur (personne physique majeure) depuis la France, le Maroc, le Gabon et tout pays de l'Union Europeenne. Toute commande implique l'acceptation sans reserve des presentes CGV.",
          },
          {
            title: "Article 2 — Produits",
            content: "Les produits proposes sont des parfums de la collection PNV, decrits avec leurs caracteristiques essentielles (notes olfactives, concentration, volume en ml). Les photographies sont non contractuelles et peuvent varier selon les ecrans. PNV se reserve le droit de modifier sa gamme de produits a tout moment sans preavis. En cas de rupture de stock, le client sera informe dans les meilleurs delais et pourra choisir entre un remboursement integral ou une precommande.",
          },
          {
            title: "Article 3 — Prix",
            content: "Les prix sont indiques en euros (EUR) toutes taxes comprises (TTC), conformement a la reglementation francaise et europeenne. Pour les livraisons hors Union Europeenne (Gabon, Maroc), des droits de douane, taxes locales ou frais d'importation peuvent s'appliquer selon la legislation du pays destinataire. Ces frais sont a la charge exclusive de l'acheteur. PNV se reserve le droit de modifier ses prix a tout moment. Les commandes sont facturees au prix en vigueur au moment de la validation.",
          },
          {
            title: "Article 4 — Commande",
            content: "La commande est validee apres confirmation du paiement par Stripe ou PayPal. Un email de confirmation est envoye avec le recapitulatif de la commande. Le contrat de vente est considere comme conclu a la reception de cet email. PNV se reserve le droit d'annuler toute commande suspecte ou frauduleuse, ou en cas d'erreur manifeste de prix. En cas d'annulation par PNV, le client est rembourse integralement dans un delai de 14 jours.",
          },
          {
            title: "Article 5 — Paiement",
            content: "Le paiement s'effectue en ligne par carte bancaire (Visa, Mastercard, American Express) via Stripe, ou par PayPal. Les transactions sont securisees par chiffrement SSL. PNV ne stocke aucune donnee bancaire — celles-ci sont traitees exclusivement par Stripe (certifie PCI DSS niveau 1). Le debit est effectue au moment de la validation de la commande. En cas d'echec du paiement, la commande est automatiquement annulee.",
          },
          {
            title: "Article 6 — Livraison — France et Europe",
            content: "Les commandes sont expediees sous 2 a 3 jours ouvres vers la France metropolitaine via Colissimo avec numero de suivi. La livraison est offerte pour toute commande en France. Pour les autres pays europeens (Belgique, Suisse, Luxembourg, etc.), le delai est de 4 a 7 jours ouvres. Des frais de port peuvent s'appliquer. PNV ne peut etre tenu responsable des retards dus aux transporteurs ou a des evenements de force majeure.",
          },
          {
            title: "Article 7 — Livraison — Afrique (Gabon, Maroc)",
            content: "PNV livre au Gabon et au Maroc. Les delais estimes sont de 7 a 14 jours ouvres selon la destination et les conditions douanieres. Des frais de port internationaux s'appliquent et sont communiques avant la validation de la commande. L'acheteur est responsable des formalites douanieres et des eventuels droits et taxes d'importation applicables dans son pays. En cas de blocage douanier, PNV ne peut etre tenu responsable mais s'engage a assister le client dans ses demarches.",
          },
          {
            title: "Article 8 — Droit de retractation (Union Europeenne)",
            content: "Conformement a l'article L221-18 du Code de la Consommation francais et a la Directive europeenne 2011/83/UE, tout consommateur residant dans l'Union Europeenne dispose d'un delai de 14 jours calendaires a compter de la reception de sa commande pour exercer son droit de retractation, sans avoir a justifier de motifs. Ce droit ne s'applique pas aux produits ouverts ou utilises pour des raisons d'hygiene. Le produit doit etre retourne non ouvert, dans son emballage d'origine, en parfait etat.",
          },
          {
            title: "Article 9 — Retractation hors UE (Gabon, Maroc)",
            content: "Pour les clients situes hors de l'Union Europeenne, le droit de retractation legal europeen ne s'applique pas automatiquement. Cependant, PNV s'engage, par engagement commercial volontaire, a accepter les retours de produits non ouverts dans un delai de 7 jours suivant la reception, sous reserve que le produit soit retourne en parfait etat et dans son emballage d'origine. Les frais de retour international sont a la charge du client.",
          },
          {
            title: "Article 10 — Procedure de retour et remboursement",
            content: "Pour initier un retour, le client doit contacter PNV a contact@maison-du-parfum.fr dans le delai applicable, en precisant son numero de commande et le motif du retour. PNV fournira les instructions de retour. Le remboursement sera effectue dans un delai de 14 jours a compter de la reception du produit retourne, via le meme moyen de paiement utilise lors de la commande. Les frais de livraison initiaux ne sont pas rembourses sauf en cas de produit defectueux.",
          },
          {
            title: "Article 11 — Garanties legales",
            content: "Tous les produits PNV beneficient de la garantie legale de conformite (articles L217-4 a L217-14 du Code de la Consommation) et de la garantie des vices caches (articles 1641 a 1649 du Code Civil). En cas de produit defectueux ou non conforme, le client dispose de 2 ans a compter de la livraison pour agir. PNV prendra en charge les frais de retour et procedera au remplacement ou au remboursement.",
          },
          {
            title: "Article 12 — Responsabilite",
            content: "PNV ne saurait etre tenu responsable des dommages resultant d'une mauvaise utilisation des produits. Les parfums sont destines a un usage externe uniquement. En cas d'allergie, de reaction cutanee ou d'irritation, cesser immediatement l'utilisation et consulter un medecin. La liste des ingredients est disponible sur chaque fiche produit. PNV decline toute responsabilite en cas de retard de livraison du aux transporteurs, aux services douaniers ou a des evenements de force majeure.",
          },
          {
            title: "Article 13 — Protection des donnees personnelles",
            content: "Les donnees personnelles collectees lors de la commande (nom, email, adresse) sont utilisees uniquement pour le traitement et le suivi de la commande. Conformement au RGPD (Reglement UE 2016/679), vous disposez d'un droit d'acces, de rectification et de suppression de vos donnees. Pour exercer ces droits : contact@maison-du-parfum.fr. Les donnees ne sont jamais vendues a des tiers.",
          },
          {
            title: "Article 14 — Propriete intellectuelle",
            content: "L'ensemble du contenu du site (textes, images, logos, noms de parfums, design) est la propriete exclusive de PNV — La Maison du Parfum et est protege par le droit de la propriete intellectuelle francais et international. Toute reproduction ou utilisation sans autorisation ecrite prealable est strictement interdite.",
          },
          {
            title: "Article 15 — Droit applicable et juridiction",
            content: "Les presentes CGV sont soumises au droit francais. En cas de litige, une solution amiable sera recherchee en priorite. A defaut, les tribunaux competents de Lyon (France) seront saisis. Pour les consommateurs europeens, la plateforme europeenne de reglement des litiges en ligne est accessible a : https://ec.europa.eu/consumers/odr. Pour tout litige, vous pouvez egalement contacter le mediateur de la consommation competent.",
          },
        ].map((article) => (
          <section
            key={article.title}
            className="p-6"
            style={{ border: "1px solid rgba(201,169,110,0.15)" }}
          >
            <h2
              className="text-xs tracking-[0.4em] uppercase mb-4"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              {article.title}
            </h2>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(245,239,230,0.5)", fontFamily: "Georgia, serif" }}
            >
              {article.content}
            </p>
          </section>
        ))}
      </div>

      <Footer />
    </div>
  );
}