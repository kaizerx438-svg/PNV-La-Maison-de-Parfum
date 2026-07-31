"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [created, setCreated] = useState(false);

  useEffect(() => {
  if (sessionId && !created) {
    console.log("Appel confirm avec sessionId:", sessionId);
    fetch("/api/checkout/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId }),
    })
    .then(res => {
      console.log("Status confirm:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("Reponse confirm:", data);
      setCreated(true);
    })
    .catch(err => console.error("Erreur:", err));
  }
}, [sessionId, created]);

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#F5EFE6" }}
    >
      <div className="text-center space-y-6 p-12">
        <CheckCircle className="w-16 h-16 mx-auto" style={{ color: "#C9A96E" }} />
        <div>
          <h1
            className="text-3xl font-light mb-2"
            style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}
          >
            Commande confirmee
          </h1>
          <p
            className="text-sm"
            style={{ color: "rgba(13,13,13,0.5)", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
          >
            Merci pour votre achat. Vous recevrez un email de confirmation.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Link href="/account/orders">
            <button
              className="px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer"
              style={{
                background: "#0D0D0D",
                color: "#C9A96E",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Mes commandes
            </button>
          </Link>
          <Link href="/catalogue">
            <button
              className="px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 cursor-pointer"
              style={{
                border: "1px solid rgba(13,13,13,0.15)",
                color: "#0D0D0D",
                fontFamily: "Helvetica Neue, Arial, sans-serif",
              }}
            >
              Continuer mes achats
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}