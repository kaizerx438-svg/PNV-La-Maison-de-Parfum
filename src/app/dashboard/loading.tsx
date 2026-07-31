export default function DashboardLoading() {
  return (
    <div className="p-6 flex items-center justify-center min-h-[400px]">
      <div
        className="w-8 h-8 rounded-full border-2 animate-spin"
        style={{
          borderColor: "rgba(201,169,110,0.2)",
          borderTopColor: "#C9A96E",
        }}
      />
    </div>
  );
}