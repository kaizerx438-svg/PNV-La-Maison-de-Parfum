export default function RevenueChart() {
  return (
    <div
      className="p-6"
      style={{
        background: "rgba(245,239,230,0.03)",
        border: "1px solid rgba(201,169,110,0.15)",
      }}
    >
      <h2
        className="text-xs tracking-[0.3em] uppercase mb-4"
        style={{ color: "#C9A96E", fontFamily: "Helvetica Neue, Arial, sans-serif" }}
      >
        Revenus
      </h2>
      <p className="text-sm italic" style={{ color: "rgba(245,239,230,0.3)" }}>
        Graphique disponible apres les premieres commandes
      </p>
    </div>
  );
}