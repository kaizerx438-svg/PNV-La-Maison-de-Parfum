import ShopHeader from "@/components/shop/ShopHeader";
import Footer from "@/components/shop/Footer";
import Image from "next/image";
import { Globe, MapPin, RefreshCw } from "lucide-react";

export default function NotreHistoirePage() {
  return (
    <div className="min-h-screen" style={{ background: "#0D0D0D" }}>
      <ShopHeader />

      {/* Hero */}
      <div
        className="relative py-24 flex flex-col items-center justify-center text-center"
        style={{ background: "linear-gradient(180deg, #1a0a0a 0%, #0D0D0D 100%)" }}
      >
        <p className="text-[10px] tracking-[0.6em] uppercase mb-4" style={{ color: "#C9A96E" }}>
          Parfums by N.V
        </p>
        <h1
          className="text-5xl md:text-7xl font-light mb-2"
          style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          Behind the Brand
        </h1>
        <div
          className="mt-6 mb-8"
          style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
        />
        <p
          className="text-2xl tracking-[0.3em] uppercase font-light"
          style={{ color: "#C9A96E", fontFamily: "Georgia, Times New Roman, serif" }}
        >
          PNV
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-16">

        {/* Fondatrice */}
        <div className="flex flex-col items-center mb-16">
          <div
            className="w-64 h-80 relative overflow-hidden mb-8"
            style={{ border: "1px solid rgba(201,169,110,0.2)" }}
          >
            <Image
              src="https://zdxbevleazcwgzqkeggs.supabase.co/storage/v1/object/public/Produits/fondatrice.jpeg"
              alt="Naomie Vanina Moussonda Ndombi — Fondatrice de PNV"
              fill
              sizes="256px"
              className="object-cover object-top"
            />
          </div>
          <h2
            className="text-2xl font-light mb-2"
            style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            Naomie Vanina Moussonda Ndombi
          </h2>
          <p className="text-sm italic mb-1" style={{ color: "#C9A96E" }}>
            Fondatrice de PNV
          </p>
          <p className="text-xs tracking-[0.2em]" style={{ color: "rgba(245,239,230,0.4)" }}>
            21 ans · Libreville, Gabon
          </p>
        </div>

        {/* Histoire */}
        <div className="max-w-2xl mx-auto space-y-8">
          <h3
            className="text-xs tracking-[0.5em] uppercase text-center mb-12"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Mon histoire
          </h3>

          {[
            "Tout a commencé dans le dressing de ma maman. J'étais cette petite fille de Libreville qui s'y glissait en cachette pour essayer ses parfums, ses foulards, ses lunettes. Je me regardais dans le miroir, je tournais, je dansais. Je me sentais élégante, douce, fatale à la fois. Comme une petite princesse. Ce mélange-là, cette dualité, ne m'a jamais quittée.",
            "Mais avant d'en arriver là, j'ai fait un détour. J'étudiais le droit. Loin de ma famille, loin de moi-même, loin de mes idéaux. Cette distance m'a forcée à me poser les vraies questions sur ce que j'aspirais à devenir.",
            "La réponse était là depuis le début, depuis ce dressing. J'ai quitté le droit pour le marketing, pour le commerce, pour le luxe. Beaucoup auraient appelé ça un échec. Moi j'appelle ça une vocation.",
            "C'est là que PNV est née. Dans une maison pleine de vie, entourée de mes frères, mes sœurs et mes cousins. Dans ces moments simples où on regardait Miss France, Miss Gabon ensemble, où on rêvait grand sans vraiment s'en rendre compte.",
            "La gamme femme est née de cette petite fille que j'étais : douce mais déterminée, élégante mais pas froide, fatale sans être inaccessible. Je ne voulais pas créer des parfums intimidants. Je voulais créer des parfums qui racontent des personnalités entières, complexes, vraies.",
            "La gamme homme, elle, est née d'un amour. Celui que j'ai pour mon père, pour mes frères, pour les hommes qui m'entourent et qui m'ont appris ce que la présence masculine peut dégager de plus beau. Ce sillage discret mais inoubliable.",
            "PNV n'est pas une marque gabonaise dans le sens de ses ingrédients. Elle est gabonaise dans son âme, dans son intention, dans la personne qui l'a créée. Une jeune fille de Libreville qui a grandi, qui a douté, qui a recommencé, et qui a décidé de mettre toute sa personnalité dans des flacons.",
          ].map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed"
              style={{
                color: "rgba(245,239,230,0.8)",
                fontFamily: "Georgia, Times New Roman, serif",
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Citation finale */}
        <div
          className="text-center mt-20 py-16 px-8"
          style={{
            borderTop: "1px solid rgba(201,169,110,0.2)",
            borderBottom: "1px solid rgba(201,169,110,0.2)",
          }}
        >
          <p
            className="text-sm mb-2"
            style={{ color: "rgba(245,239,230,0.5)", fontFamily: "Georgia, serif" }}
          >
            Ce n&apos;est pas seulement ma marque.
          </p>
          <p
            className="text-2xl md:text-3xl tracking-[0.2em] uppercase font-light mb-10"
            style={{ color: "#C9A96E", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            C&apos;est la nôtre.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Globe, text: "Pour ceux qui veulent s'exprimer autrement." },
              { icon: MapPin, text: "Pour ceux qui croient en l'Afrique." },
              { icon: RefreshCw, text: "Pour ceux qui croient au recommencement." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <item.icon className="w-6 h-6 mx-auto mb-3" style={{ color: "#C9A96E" }} />
                <p
                  className="text-xs"
                  style={{
                    color: "rgba(245,239,230,0.5)",
                    fontFamily: "Helvetica Neue, Arial, sans-serif",
                  }}
                >
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <p
            className="text-sm italic mb-2"
            style={{ color: "rgba(245,239,230,0.4)", fontFamily: "Georgia, serif" }}
          >
            On a tous un talent quelque part.
          </p>
          <p
            className="text-sm italic mb-8"
            style={{ color: "rgba(245,239,230,0.4)", fontFamily: "Georgia, serif" }}
          >
            Avec du travail, on peut en faire quelque chose d&apos;immense.
          </p>

          <div className="flex items-center justify-center gap-4">
            <div style={{ width: "40px", height: "1px", background: "rgba(201,169,110,0.4)" }} />
            <p
              className="text-[10px] tracking-[0.5em] uppercase"
              style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              PNV · Rare · Pure · Intense
            </p>
            <div style={{ width: "40px", height: "1px", background: "rgba(201,169,110,0.4)" }} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}