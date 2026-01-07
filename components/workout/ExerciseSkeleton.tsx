'use client';

export default function ExerciseSkeleton() {
  return (
    <div className="card bg-base-100 shadow-md animate-pulse">
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          {/* Checkbox skeleton */}
          <div className="w-5 h-5 bg-base-300 rounded"></div>
          
          {/* Badge skeleton */}
          <div className="w-8 h-6 bg-base-300 rounded-full"></div>
          
          {/* Exercise info skeleton */}
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-base-300 rounded w-3/4"></div>
            <div className="h-3 bg-base-300 rounded w-1/2"></div>
          </div>
          
          {/* Button skeleton */}
          <div className="w-20 h-8 bg-base-300 rounded"></div>
        </div>
      </div>
    </div>
  );
}
