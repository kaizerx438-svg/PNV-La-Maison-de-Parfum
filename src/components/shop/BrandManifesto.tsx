export default function BrandManifesto() {
  const values = [
    { word: "Luxe", desc: "Des matières d'exception" },
    { word: "Profondeur", desc: "Des créations qui durent" },
    { word: "Identité", desc: "Un style singulier" },
  ];

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "#6B1A2A", padding: "120px 24px" }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=60)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          mixBlendMode: "multiply",
        }}
      />

      {/* Decorative lines */}
      <div
        className="absolute left-0 top-0 bottom-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(201,169,110,0.4), transparent)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center">

        {/* Top divider */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, transparent, #C9A96E)",
            }}
          />
          <div
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              border: "1px solid #C9A96E",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(90deg, #C9A96E, transparent)",
            }}
          />
        </div>

        {/* Quote */}
        <h2
          className="text-3xl md:text-5xl font-light leading-relaxed mb-8"
          style={{
            color: "#F5EFE6",
            fontFamily: "Georgia, Times New Roman, serif",
            fontStyle: "italic",
          }}
        >
          &ldquo;Porter un parfum Maison du Parfum,
          <br />
          c&apos;est choisir{" "}
          <span style={{ color: "#C9A96E" }}>l&apos;identité</span> sur
          l&apos;éphémère&rdquo;
        </h2>

        {/* Bottom divider */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <div
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(90deg, transparent, rgba(201,169,110,0.5))",
            }}
          />
          <div
            style={{
              width: "4px",
              height: "4px",
              borderRadius: "50%",
              background: "rgba(201,169,110,0.5)",
            }}
          />
          <div
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(90deg, rgba(201,169,110,0.5), transparent)",
            }}
          />
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-3 gap-8 mt-16">
          {values.map((item) => (
            <div key={item.word} className="text-center">
              <p
                className="text-xl font-light mb-2"
                style={{
                  color: "#C9A96E",
                  fontFamily: "Georgia, serif",
                  fontStyle: "italic",
                }}
              >
                {item.word}
              </p>
              <p
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{
                  color: "rgba(245,239,230,0.5)",
                  fontFamily: "Helvetica Neue, Arial, sans-serif",
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}