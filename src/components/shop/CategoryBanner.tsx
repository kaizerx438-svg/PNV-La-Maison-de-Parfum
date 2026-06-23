import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Pour Elle",
    sub: "Fragrances féminines",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=900&q=90",
    filter: "PARFUMS_FEMME",
    accent: "#D4A5A5",
    ratio: "3/4",
  },
  {
    title: "Pour Lui",
    sub: "Fragrances masculines",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=900&q=90",
    filter: "PARFUMS_HOMME",
    accent: "#C9A96E",
    ratio: "3/5",
  },
  {
    title: "Mixte",
    sub: "Fragrances universelles",
    image: "https://images.unsplash.com/photo-1590156206657-aec5e5fa5f53?w=900&q=90",
    filter: "PARFUMS_MIXTE",
    accent: "#8B2035",
    ratio: "3/4",
  },
];

export default function CategoryBanner() {
  return (
    <section style={{ background: "#0D0D0D", padding: "100px 0" }}>

      {/* Header */}
      <div className="text-center mb-16 px-6">
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
            Nos Univers
          </p>
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, #C9A96E, transparent)",
            }}
          />
        </div>
        <h2
          className="text-4xl md:text-5xl font-light"
          style={{
            color: "#F5EFE6",
            fontFamily: "Georgia, Times New Roman, serif",
          }}
        >
          Collections
        </h2>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-1">
        {categories.map((cat) => (
          <Link
            key={cat.filter}
            href={`/catalogue?category=${cat.filter}`}
            className="group relative overflow-hidden block"
            style={{ aspectRatio: cat.ratio }}
          >
            {/* Image */}
            <Image
              src={cat.image}
              alt={cat.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              style={{ filter: "brightness(0.55) saturate(0.8)" }}
            />

            {/* Gradient overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background:
                  "linear-gradient(to top, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.3) 50%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `linear-gradient(to top, ${cat.accent}55 0%, transparent 60%)`,
              }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div
                className="w-8 h-px mb-4 transition-all duration-500 group-hover:w-16"
                style={{ background: cat.accent }}
              />
              <h3
                className="text-2xl font-light mb-2"
                style={{
                  color: "#F5EFE6",
                  fontFamily: "Georgia, Times New Roman, serif",
                }}
              >
                {cat.title}
              </h3>
              <p
                className="text-[10px] tracking-[0.3em] uppercase mb-4"
                style={{
                  color: "rgba(245,239,230,0.5)",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              >
                {cat.sub}
              </p>
              <p
                className="text-[10px] tracking-[0.25em] uppercase opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ color: cat.accent }}
              >
                Explorer →
              </p>
            </div>

            {/* Corner decoration */}
            <div
              className="absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ border: "1px solid rgba(201,169,110,0.4)" }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}