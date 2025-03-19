"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSkeleton } from "@/components/ui/animated-skeleton";

export default function ComicCardSkeleton({ className = "" }) {
  return (
    <Card className={`overflow-hidden border-0 bg-transparent animate-pulse h-full ${className}`}>
      <CardContent className="p-0 h-full">
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-900 h-full">
          <AnimatedSkeleton className="h-full w-full" />
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
            <AnimatedSkeleton className="h-5 w-3/4 bg-white/20 dark:bg-white/10 mb-2" />
            <AnimatedSkeleton className="h-4 w-1/2 bg-white/20 dark:bg-white/10" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 