const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded shadow p-4 bg-white">
      <div className="h-32 bg-gray-300 rounded mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>

      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
    </div>
  );
};

export default SkeletonCard;
