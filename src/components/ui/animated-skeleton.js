"use client";

import { cn } from "@/lib/utils";

export function AnimatedSkeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gray-300 dark:bg-gray-700",
        className
      )}
      {...props}
    >
      <div 
        className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/20"
        style={{
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.5s infinite',
        }}
      />
    </div>
  );
} 