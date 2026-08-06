import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";
import { Truck, RotateCcw, Clock, MapPin } from "lucide-react";

export default function LivraisonPage() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0D0D" }}>
      <ShopHeader />

      {/* Hero */}
      <div className="py-20 text-center">
        <p className="text-[10px] tracking-[0.6em] uppercase mb-4" style={{ color: "#C9A96E" }}>
          Informations
        </p>
        <h1
          className="text-4xl font-light"
          style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          Livraison & Retours
        </h1>
        <div
          className="mx-auto mt-6"
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
        />
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-20 space-y-12">

        {/* Livraison */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Livraison
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "France metropolitaine",
                content: "Livraison offerte pour toute commande. Vos parfums sont expedies sous 2 a 3 jours ouvres via Colissimo avec suivi. Vous recevrez un email de confirmation avec le numero de suivi des l'expedition.",
              },
              {
                title: "Maroc",
                content: "Livraison disponible au Maroc. Delai estime : 5 a 10 jours ouvres. Contactez-nous pour connaitre les frais de port applicables selon votre ville.",
              },
              {
                title: "Gabon",
                content: "Livraison disponible au Gabon, notamment a Libreville et dans les principales villes. Delai estime : 7 a 14 jours ouvres. Contactez-nous pour les frais et conditions de livraison.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6"
                style={{ border: "1px solid rgba(201,169,110,0.15)" }}
              >
                <h3
                  className="text-sm font-light mb-3"
                  style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.5)" }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Délais */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Delais de traitement
            </h2>
          </div>
          <div className="p-6" style={{ border: "1px solid rgba(201,169,110,0.15)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.5)" }}>
              Les commandes passees avant 12h00 sont traitees le jour meme. Les commandes passees apres 12h00 ou le week-end sont traitees le prochain jour ouvre. Chaque parfum est soigneusement emballe avant expedition pour garantir son integrite.
            </p>
          </div>
        </section>

        {/* Retours */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <RotateCcw className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Retours & Remboursements
            </h2>
          </div>

          <div className="space-y-6">
            {[
              {
                title: "Produit endommage ou defectueux",
                content: "Si vous recevez un produit endommage, contactez-nous dans les 48h suivant la reception avec des photos. Nous procederons au remplacement ou au remboursement integral sans frais.",
              },
              {
                title: "Droit de retractation",
                content: "Conformement a la legislation europeenne, vous disposez de 14 jours a compter de la reception de votre commande pour exercer votre droit de retractation, a condition que le produit soit non ouvert et dans son emballage d'origine.",
              },
              {
                title: "Procedure de retour",
                content: "Pour initier un retour, contactez-nous a contact@maison-du-parfum.fr en precisant votre numero de commande et le motif du retour. Nous vous fournirons les instructions detaillees.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-6"
                style={{ border: "1px solid rgba(201,169,110,0.15)" }}
              >
                <h3
                  className="text-sm font-light mb-3"
                  style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.5)" }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Contact
            </h2>
          </div>
          <div className="p-6" style={{ border: "1px solid rgba(201,169,110,0.15)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.5)" }}>
              Pour toute question relative a votre livraison, contactez notre service client a{" "}
              <a href="mailto:contact@maison-du-parfum.fr" style={{ color: "#C9A96E" }}>
                contact@maison-du-parfum.fr
              </a>
              . Nous vous repondons sous 24h ouvrees.
            </p>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}