import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export default async function WishlistPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const wishlist = await prisma.wishlist.findMany({
    where: { userId: session!.user.id },
    include: { product: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <div className="flex items-center gap-4 mb-3">
          <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #C9A96E, transparent)" }} />
          <p className="text-[10px] tracking-[0.4em] uppercase" style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}>
            Mes favoris
          </p>
        </div>
        <h1 className="text-3xl font-light" style={{ color: "#0D0D0D", fontFamily: "Georgia, Times New Roman, serif" }}>
          Ma wishlist
        </h1>
      </div>

      {/* Liste vide */}
      {wishlist.length === 0 ? (
        <div className="text-center py-20 space-y-4" style={{ border: "1px solid rgba(13,13,13,0.08)" }}>
          <Heart className="w-10 h-10 mx-auto" style={{ color: "rgba(13,13,13,0.2)" }} />
          <p className="text-lg font-light" style={{ color: "rgba(13,13,13,0.4)", fontFamily: "Georgia, serif" }}>
            Votre wishlist est vide
          </p>
          <p className="text-sm" style={{ color: "rgba(13,13,13,0.3)" }}>
            Ajoutez des parfums en cliquant sur le coeur
          </p>
          <Link href="/catalogue">
            <button
              className="px-8 py-3 text-[11px] tracking-[0.3em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer mt-4"
              style={{ background: "#0D0D0D", color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Decouvrir nos parfums
            </button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishlist.map(({ product }) => (
            <div
              key={product.id}
              className="flex gap-4 p-4"
              style={{ border: "1px solid rgba(13,13,13,0.08)", background: "rgba(13,13,13,0.02)" }}
            >
              {/* Image */}
              <Link href={`/product/${product.id}`}>
                <div className="w-20 h-28 flex-shrink-0 relative overflow-hidden" style={{ background: "#EDE3D5" }}>
                  {product.imageUrl && (
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  )}
                </div>
              </Link>

              {/* Infos */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase mb-1" style={{ color: "#C9A96E" }}>
                    {product.category.name}
                  </p>
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-light hover:opacity-70 transition-opacity" style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}>
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm mt-1" style={{ color: "#0D0D0D", fontFamily: "Georgia, serif" }}>
                    {product.price.toFixed(2)} FCFA
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <Link href={`/product/${product.id}`}>
                    <button
                      className="flex-1 px-4 py-2 text-[10px] tracking-[0.25em] uppercase transition-all duration-300 hover:bg-[#6B1A2A] hover:text-[#F5EFE6] cursor-pointer"
                      style={{ background: "#0D0D0D", color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
                    >
                      Voir le produit
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}