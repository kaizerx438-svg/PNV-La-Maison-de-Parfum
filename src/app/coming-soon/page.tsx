"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";

const OPENING_DATE = new Date("2026-08-15T00:00:00Z");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = OPENING_DATE.getTime() - new Date().getTime();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  if (!mounted) return null;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: "#0D0D0D" }}
    >
      {/* Decorative lines */}
      <div
        className="absolute left-8 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent)" }}
      />
      <div
        className="absolute right-8 top-0 bottom-0 w-px"
        style={{ background: "linear-gradient(to bottom, transparent, rgba(201,169,110,0.3), transparent)" }}
      />

      <div className="text-center px-6 max-w-2xl w-full space-y-12">

        {/* Logo */}
        <div>
          <p
            className="text-[10px] tracking-[0.8em] uppercase mb-2"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            PNV
          </p>
          <h1
            className="text-4xl md:text-6xl font-light mb-4"
            style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            La Maison du Parfum
          </h1>
          <div
            className="mx-auto"
            style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)" }}
          />
        </div>

        {/* Tagline */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: "rgba(245,239,230,0.5)", fontFamily: "Georgia, serif" }}
        >
          Quelque chose d&apos;exceptionnel arrive.
          <br />
          Rare · Pure · Intense
        </p>

        {/* Compteur */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { value: timeLeft.days, label: "Jours" },
            { value: timeLeft.hours, label: "Heures" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Secondes" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center py-6 px-2"
              style={{ border: "1px solid rgba(201,169,110,0.2)" }}
            >
              <span
                className="text-3xl md:text-5xl font-light tabular-nums"
                style={{ color: "#F5EFE6", fontFamily: "Georgia, Times New Roman, serif" }}
              >
                {String(item.value).padStart(2, "0")}
              </span>
              <span
                className="text-[9px] tracking-[0.3em] uppercase mt-2"
                style={{ color: "rgba(245,239,230,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Précommande */}
        <div
          className="p-6"
          style={{ border: "1px solid rgba(201,169,110,0.2)", background: "rgba(201,169,110,0.03)" }}
        >
          <p
            className="text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Disponible des maintenant
          </p>
          <p
            className="text-sm mb-6"
            style={{ color: "rgba(245,239,230,0.6)", fontFamily: "Georgia, serif" }}
          >
            Reservez votre parfum en exclusivite avant l&apos;ouverture officielle.
            Livraison prioritaire garantie.
          </p>
          <Link href="/precommande">
            <button
              className="flex items-center gap-2 mx-auto px-8 py-4 text-[11px] tracking-[0.4em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] cursor-pointer"
              style={{
                background: "#C9A96E",
                color: "#0D0D0D",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              <ShoppingBag className="w-4 h-4" />
              Precommander maintenant
            </button>
          </Link>
        </div>

        {/* Newsletter */}
        <div>
          <p
            className="text-xs tracking-[0.3em] uppercase mb-4"
            style={{ color: "rgba(245,239,230,0.4)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Soyez notifie a l&apos;ouverture
          </p>
          {submitted ? (
            <p
              className="text-sm"
              style={{ color: "#C9A96E", fontFamily: "Georgia, serif" }}
            >
              Merci — vous serez parmi les premiers informes.
            </p>
          ) : (
            <form
              onSubmit={handleNewsletter}
              className="flex gap-0 max-w-md mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.fr"
                className="flex-1 px-4 py-3 text-sm bg-transparent focus:outline-none"
                style={{
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRight: "none",
                  color: "#F5EFE6",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              />
              <button
                type="submit"
                className="px-6 py-3 text-[10px] tracking-[0.3em] uppercase transition-all hover:bg-[#6B1A2A] cursor-pointer"
                style={{
                  background: "#C9A96E",
                  color: "#0D0D0D",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              >
                Notifier
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(245,239,230,0.2)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
        >
          PNV · Rare · Pure · Intense
        </p>
      </div>
    </div>
  );
}