import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen overflow-hidden" style={{ background: "#0D0D0D" }}>
      
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?w=1800&q=90"
          alt="Collection La Maison du Parfum"
          fill
          className="object-cover"
          style={{ opacity: 0.35 }}
          priority
        />
        {}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(107,26,42,0.7) 0%, rgba(13,13,13,0.85) 60%, rgba(13,13,13,0.95) 100%)",
          }}
        />
        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(13,13,13,0.8) 100%)",
          }}
        />
      </div>

      {}
      <div
        className="absolute left-8 top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />
      <div
        className="absolute right-8 top-0 bottom-0 w-px hidden lg:block"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 w-full">
          <div className="max-w-2xl">

            {/* Eyebrow */}
            <div className="flex items-center gap-4 mb-8">
              <span
                style={{
                  width: "40px",
                  display: "block",
                  height: "1px",
                  background: "linear-gradient(90deg, #C9A96E, transparent)",
                }}
              />
              <p
                className="text-[10px] tracking-[0.5em] uppercase"
                style={{
                  color: "#C9A96E",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              >
                Nouvelle Collection 2025
              </p>
            </div>

            {/* Main title */}
            <h1
              className="text-5xl md:text-7xl lg:text-8xl leading-[0.95] mb-8"
              style={{
                color: "#F5EFE6",
                fontFamily: "Georgia, Times New Roman, serif",
                fontWeight: 300,
              }}
            >
              L&apos;art de
              <br />
              <span style={{ color: "#D4A5A5", fontStyle: "italic" }}>
                l&apos;élégance
              </span>
              <br />
              <span style={{ color: "#C9A96E" }}>intemporelle</span>
            </h1>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: "linear-gradient(90deg, #C9A96E, transparent)",
                }}
              />
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  background: "#C9A96E",
                }}
              />
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, #C9A96E)",
                }}
              />
            </div>

            <p
              className="text-base leading-relaxed mb-12 max-w-md"
              style={{
                color: "rgba(245,239,230,0.65)",
                fontFamily: "Georgia, serif",
                fontStyle: "italic",
              }}
            >
              Parfums d&apos;exception, pour ceux qui choisissent la profondeur
              plutôt que l&apos;éphémère.
            </p>

            {/* CTA */}
            <Link href="/catalogue">
              <button
                className="group flex items-center gap-4 px-10 py-4 text-[11px] tracking-[0.4em] uppercase transition-all duration-500 hover:bg-[#6B1A2A] hover:border-[#6B1A2A] hover:text-[#F5EFE6]"
                style={{
                  background: "transparent",
                  border: "1px solid rgba(201,169,110,0.6)",
                  color: "#C9A96E",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              >
                Découvrir la collection
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div
          className="w-px h-12 animate-pulse"
          style={{
            background:
              "linear-gradient(to bottom, rgba(201,169,110,0.8), transparent)",
          }}
        />
        <p
          className="text-[9px] tracking-[0.4em] uppercase"
          style={{ color: "rgba(201,169,110,0.5)" }}
        >
          Défiler
        </p>
      </div>
    </section>
  );
}