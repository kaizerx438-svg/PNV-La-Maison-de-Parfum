import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";
import { Truck, Clock, MapPin } from "lucide-react";

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

        {/* Livraison Gabon */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Gabon
            </h2>
          </div>
          <div className="space-y-4">
            {[
              { zone: "Libreville Centre", prix: "1 500 FCFA", delai: "Moins de 24h" },
              { zone: "Akanda / Charbonnages", prix: "2 000 FCFA", delai: "Moins de 24h" },
              { zone: "Autres zones Gabon", prix: "2 500 FCFA", delai: "Moins de 24h" },
            ].map((item) => (
              <div
                key={item.zone}
                className="flex items-center justify-between p-4"
                style={{ border: "1px solid rgba(201,169,110,0.15)" }}
              >
                <div>
                  <p className="text-sm font-light" style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}>
                    {item.zone}
                  </p>
                  <p className="text-[10px] mt-1" style={{ color: "rgba(245,239,230,0.4)" }}>
                    {item.delai}
                  </p>
                </div>
                <p className="text-sm" style={{ color: "#C9A96E", fontFamily: "Georgia, serif" }}>
                  {item.prix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Livraison Maroc */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Maroc
            </h2>
          </div>
          <div
            className="flex items-center justify-between p-4"
            style={{ border: "1px solid rgba(201,169,110,0.15)" }}
          >
            <div>
              <p className="text-sm font-light" style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}>
                Maroc (Rabat / Casablanca et environs)
              </p>
              <p className="text-[10px] mt-1" style={{ color: "rgba(245,239,230,0.4)" }}>
                2 a 3 jours
              </p>
            </div>
            <p className="text-sm" style={{ color: "#C9A96E", fontFamily: "Georgia, serif" }}>
              30 MAD
            </p>
          </div>
        </section>

        {/* Livraison Europe */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Europe & Diaspora
            </h2>
          </div>
          <div
            className="flex items-center justify-between p-4"
            style={{ border: "1px solid rgba(201,169,110,0.15)" }}
          >
            <div>
              <p className="text-sm font-light" style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}>
                France & Europe
              </p>
              <p className="text-[10px] mt-1" style={{ color: "rgba(245,239,230,0.4)" }}>
                2 a 3 jours
              </p>
            </div>
            <p className="text-sm" style={{ color: "#C9A96E", fontFamily: "Georgia, serif" }}>
              150 MAD
            </p>
          </div>
        </section>

        {/* Offre lots */}
        <section
          className="p-6 text-center"
          style={{ border: "1px solid rgba(201,169,110,0.3)", background: "rgba(201,169,110,0.05)" }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-2"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Offre speciale
          </p>
          <p
            className="text-sm"
            style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}
          >
            Livraison offerte des l&apos;achat en lot (Duo, Trio ou Coffret)
          </p>
        </section>

        {/* Délais */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Traitement des commandes
            </h2>
          </div>
          <div className="p-6" style={{ border: "1px solid rgba(201,169,110,0.15)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.5)" }}>
              Les commandes sont traitees le jour meme si passees avant 12h00. Les commandes passees apres 12h00 sont traitees le lendemain. Chaque parfum est soigneusement emballe avant expedition.
            </p>
          </div>
        </section>

        {/* Retours */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <MapPin className="w-5 h-5" style={{ color: "#C9A96E" }} />
            <h2 className="text-xs tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
              Retours & Remboursements
            </h2>
          </div>
          <div className="space-y-4">
            {[
              {
                title: "Produit endommage ou defectueux",
                content: "Si vous recevez un produit endommage, contactez-nous dans les 48h suivant la reception avec des photos. Nous procederons au remplacement ou au remboursement integral.",
              },
              {
                title: "Droit de retractation (Europe)",
                content: "Conformement a la legislation europeenne, vous disposez de 14 jours a compter de la reception pour retourner un produit non ouvert dans son emballage d'origine.",
              },
              {
                title: "Contact",
                content: "Pour tout retour : contact.nvparfums@gmail.com ou +212 665 715 023",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="p-4"
                style={{ border: "1px solid rgba(201,169,110,0.15)" }}
              >
                <p className="text-sm font-light mb-2" style={{ color: "#F5EFE6", fontFamily: "Georgia, serif" }}>
                  {item.title}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(245,239,230,0.5)" }}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}