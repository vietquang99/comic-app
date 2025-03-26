"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComicCardSkeleton({ className = "" }) {
  return (
    <Card
      className={`overflow-hidden border-0 bg-transparent h-full ${className}`}
    >
      <CardContent className="p-0 h-full">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted h-full">
          {/* Skeleton image */}
          <div className="relative w-full h-full">
            <Skeleton className="h-full w-full" />
            <div
              className="absolute inset-0 animate-shimmer"
              style={{ backgroundSize: "200% 100%" }}
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            {/* Title skeleton */}
            <div className="relative w-3/4 h-5 mb-2 overflow-hidden bg-white/20 rounded-md">
              <Skeleton className="h-full w-full" />
              <div
                className="absolute inset-0 animate-shimmer"
                style={{ backgroundSize: "200% 100%" }}
              />
            </div>

            {/* Chapter skeleton */}
            <div className="relative w-1/2 h-4 overflow-hidden bg-white/20 rounded-md">
              <Skeleton className="h-full w-full" />
              <div
                className="absolute inset-0 animate-shimmer"
                style={{ backgroundSize: "200% 100%" }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
