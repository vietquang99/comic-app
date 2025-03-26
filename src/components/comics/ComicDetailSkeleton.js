import { Skeleton } from "@/components/ui/skeleton";

export default function ComicDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6 space-y-8">
      {/* Hero Section Skeleton */}
      <div className="relative w-full h-[40vh] md:h-[50vh] rounded-xl overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <Skeleton className="h-8 w-2/3 mb-3" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <div className="flex gap-2 mt-4">
            <Skeleton className="h-10 w-28" />
            <Skeleton className="h-10 w-28" />
          </div>
        </div>
      </div>

      {/* Comic Info Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-8 w-20" />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
      </div>

      {/* Chapters List Skeleton */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-full" />
          ))}
        </div>
      </div>

      {/* Comments Skeleton */}
      <div className="mt-8 space-y-4">
        <Skeleton className="h-6 w-1/4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
