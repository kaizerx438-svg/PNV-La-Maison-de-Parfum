export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0D0D0D" }}
    >
      <div
        className="w-px h-12 animate-pulse"
        style={{
          background:
            "linear-gradient(to bottom, rgba(201,169,110,0.8), transparent)",
        }}
      />
    </div>
  );
}