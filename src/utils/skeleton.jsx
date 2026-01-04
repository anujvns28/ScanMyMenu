
export const ItemSkeleton = () => (
    <div className="rounded-2xl  bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
);

export const HeaderSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-1.5 w-32 bg-gray-200 rounded" />
          <div className="h-2 w-32 bg-gray-200 rounded" />
        </div>

        <div className="space-y-2 flex flex-col items-end">
          <div className="h-6 w-24 bg-gray-200 rounded-lg" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );

  export const CategorySkeleton = () => (
    <div className="flex gap-5 overflow-x-auto no-scrollbar px-2 py-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex flex-col items-center min-w-20 animate-pulse"
        >
          {/* Circle */}
          <div className="w-22 h-22 rounded-full bg-linear-to-br from-gray-200 to-gray-300 shadow-sm" />

          {/* Text lines */}
          <div className="w-16 h-5 bg-gray-200 mt-3 rounded" />
        </div>
      ))}
    </div>
  );