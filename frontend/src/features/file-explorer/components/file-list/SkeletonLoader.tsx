export default function SkeletonLoader() {
  return (
    <div className="flex-1 p-6 space-y-4 bg-[#09090b]">
      <div className="h-4 bg-zinc-800 rounded w-1/4 mb-8" />
      {[...Array(8)].map((_, i) => (
        <div key={i} className="flex gap-4">
          <div className="h-10 bg-zinc-900 rounded-lg flex-1" />
          <div className="h-10 bg-zinc-900 rounded-lg w-24" />
          <div className="h-10 bg-zinc-900 rounded-lg w-32" />
        </div>
      ))}
    </div>
  );
}