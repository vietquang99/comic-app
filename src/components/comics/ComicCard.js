"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function ComicCard({ comic, className = "", showBadge = false }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Link href={`/comics/${comic.id}`} className={`group block ${className}`}>
      <Card className="overflow-hidden border-0 bg-transparent card-hover h-full">
        <CardContent className="p-0 h-full">
          <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 h-full">
            {isLoading && (
              <Skeleton className="absolute inset-0" />
            )}
            <Image
              src={comic.cover}
              alt={comic.title}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-110 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setIsLoading(false)}
              onError={(e) => {
                e.target.src = '/comics/default.jpg';
                setIsLoading(false);
              }}
            />
            
            {/* Overlay thông tin luôn hiển thị */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold line-clamp-2">{comic.title}</h3>
                <p className="text-white/90 text-sm mt-1 opacity-90">{comic.chapter}</p>
              </div>
            </div>
            
            {/* Overlay khi hover hiệu ứng khác */}
            <div className="absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold line-clamp-2 transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">{comic.title}</h3>
                <p className="text-white text-sm mt-1 transform translate-y-0 opacity-100 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">{comic.chapter}</p>
              </div>
            </div>
            
            {showBadge && (
              <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">Mới</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
} 