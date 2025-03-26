"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComicCard({
  comic,
  className = "",
  showBadge = false,
  priority = false,
  skipSkeleton = false,
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link href={`/comics/${comic.id}`} className={`group block ${className}`}>
      <Card className="overflow-hidden border-0 bg-transparent card-hover h-full">
        <CardContent className="p-0 h-full">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-muted h-full">
            <Image
              src={comic.cover || "/images/default-cover.jpg"}
              alt={comic.title}
              fill
              sizes="(max-width: 640px) 160px, (max-width: 768px) 180px, 180px"
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${
                isLoading && !skipSkeleton ? "opacity-0" : "opacity-100"
              }`}
              priority={priority}
              quality={80}
              onLoad={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />

            {isLoading && !skipSkeleton && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Skeleton className="h-full w-full absolute" />
              </div>
            )}

            {/* Overlay thông tin luôn hiển thị */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold line-clamp-2">
                  {comic.title}
                </h3>
                <p className="text-white/90 text-sm mt-1 opacity-90">
                  {comic.chapter}
                </p>
              </div>
            </div>

            {/* Overlay khi hover - đơn giản hóa để tăng hiệu suất */}
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {showBadge && (
              <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
                Mới
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
