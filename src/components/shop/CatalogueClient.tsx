"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductCard from "@/components/shop/ProductCard";
import { Product, Category } from "@prisma/client";

type ProductWithCategory = Product & {
  category: Category;
};

interface CatalogueClientProps {
  products: ProductWithCategory[];
}

const categoryLabels: Record<string, string> = {
  all: "Toutes les collections",
  PARFUMS_FEMME: "Parfum Femme",
  PARFUMS_HOMME: "Parfum Homme",
  
};

export default function CatalogueClient({ products }: CatalogueClientProps) {
  const searchParams = useSearchParams();
  const initialCat = searchParams.get("category") || "all";

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(initialCat);
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      const matchCat = category === "all" || p.category.slug.toUpperCase().replace(/-/g, "_") === category;
      const matchSearch =
        !search || p.name.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });

    if (sort === "price_asc") result = [...result].sort((a, b) => a.price - b.price);
    if (sort === "price_desc") result = [...result].sort((a, b) => b.price - a.price);
    if (sort === "newest") result = [...result].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return result;
  }, [products, category, search, sort]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-6 mb-6">
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C9A96E)",
            }}
          />
          <p
            className="text-[10px] tracking-[0.5em] uppercase"
            style={{
              color: "#C9A96E",
              fontFamily: "Helvetica Neue, Arial, sans-serif",
            }}
          >
            Catalogue
          </p>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, #C9A96E, transparent)",
            }}
          />
        </div>
        <h1
          className="text-3xl md:text-5xl font-light"
          style={{
            color: "#0D0D0D",
            fontFamily: "Georgia, Times New Roman, serif",
          }}
        >
          Notre collection
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
        <div className="relative flex-1 w-full">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "#B0A898" }}
          />
          <Input
            placeholder="Rechercher un parfum..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
            style={{ borderColor: "rgba(13,13,13,0.15)", background: "transparent" }}
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-52">
            <SlidersHorizontal className="w-4 h-4 mr-2" style={{ color: "#B0A898" }} />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(categoryLabels).map(([k, v]) => (
              <SelectItem key={k} value={k}>
                {v}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Plus récent</SelectItem>
            <SelectItem value="price_asc">Prix croissant</SelectItem>
            <SelectItem value="price_desc">Prix décroissant</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div
          className="text-center py-20"
          style={{ color: "rgba(13,13,13,0.4)" }}
        >
          <p className="text-lg font-light" style={{ fontFamily: "Georgia, serif" }}>
            Aucun parfum trouvé
          </p>
          <p className="text-sm mt-2">Essayez de modifier vos filtres</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}