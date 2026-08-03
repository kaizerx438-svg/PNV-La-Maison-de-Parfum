import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

const collections = [
  { label: "Parfums Femme", href: "/catalogue?category=PARFUMS_FEMME" },
  { label: "Parfums Homme", href: "/catalogue?category=PARFUMS_HOMME" },
];

const maison = [
  { label: "Notre histoire", href: "/notre-histoire" },
  { label: "Livraison & Retours", href: "/livraison" },
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "CGV", href: "" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#0D0D0D" }}>
      {/* Top gold line */}
      <div
        style={{
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #C9A96E, transparent)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Logo */}
        <div className="text-center mb-16">
          <p
            className="text-[10px] tracking-[0.6em] uppercase mb-2"
            style={{
              color: "#C9A96E",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            Maison
          </p>
          <h3
            className="text-3xl font-light tracking-[0.3em] uppercase mb-4"
            style={{
              color: "#F5EFE6",
              fontFamily: "Georgia, Times New Roman, serif",
            }}
          >
            du Parfum
          </h3>
          <div
            style={{
              width: "1px",
              height: "40px",
              background: "linear-gradient(to bottom, #C9A96E, transparent)",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-16">

          {/* Quote */}
          <div>
            <p
              className="text-sm leading-relaxed italic"
              style={{
                color: "rgba(245,239,230,0.45)",
                fontFamily: "Georgia, serif",
              }}
            >
              &ldquo;La vraie élégance est partout, surtout dans les choses qui
              ne se remarquent pas.&rdquo;
            </p>
            <p
              className="text-[10px] tracking-wider mt-3"
              style={{ color: "#C9A96E" }}
            >
              — Coco Chanel
            </p>
          </div>

          {/* Collections */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{
                color: "#C9A96E",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Collection
            </h4>
            <ul className="space-y-3">
              {collections.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs transition-colors duration-300 hover:text-[#D4A5A5]"
                    style={{
                      color: "rgba(245,239,230,0.45)",
                      fontFamily: "Helvetica Neue, Arial, sans-serif",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* La Maison */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{
                color: "#C9A96E",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              La Maison
            </h4>
            <ul className="space-y-3">
              {maison.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-xs transition-colors duration-300 hover:text-[#D4A5A5]"
                    style={{
                      color: "rgba(245,239,230,0.45)",
                      fontFamily: "Helvetica Neue, Arial, sans-serif",
                    }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-[10px] tracking-[0.3em] uppercase mb-5"
              style={{
                color: "#C9A96E",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: "#C9A96E" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "rgba(245,239,230,0.45)" }}
                >
                  contact@maison-du-parfum.fr
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: "#C9A96E" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "rgba(245,239,230,0.45)" }}
                >
                  +33 1 23 45 67 89
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin
                  className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                  style={{ color: "#C9A96E" }}
                />
                <span
                  className="text-xs"
                  style={{ color: "rgba(245,239,230,0.45)" }}
                >
                  Lyon, France
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4"
          style={{
            borderTop: "1px solid rgba(201,169,110,0.15)",
            paddingTop: "32px",
          }}
        >
          <p
            className="text-[10px] tracking-[0.2em]"
            style={{
              color: "rgba(245,239,230,0.25)",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            © {new Date().getFullYear()} La Maison du Parfum. Tous droits
            réservés.
          </p>
          <div className="flex items-center gap-2">
            <div style={{ width: "20px", height: "1px", background: "#C9A96E" }} />
            <p
              className="text-[9px] tracking-[0.4em] uppercase"
              style={{ color: "#C9A96E" }}
            >
              Lyon · Parfums · Luxe
            </p>
            <div style={{ width: "20px", height: "1px", background: "#C9A96E" }} />
          </div>
        </div>
      </div>
    </footer>
  );
}