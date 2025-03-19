"use client";

import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ComicCard from '@/components/comics/ComicCard';
import ComicCardSkeleton from '@/components/comics/ComicCardSkeleton';

export default function UpdatedComics({ comics }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Giả lập thời gian loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Truyện Mới Cập Nhật</h2>
          </div>
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading ? (
            // Hiển thị skeleton khi đang loading
            Array.from({ length: 12 }).map((_, index) => (
              <ComicCardSkeleton key={index} />
            ))
          ) : (
            // Hiển thị nội dung thật
            comics.map((comic, index) => (
              <ComicCard 
                key={comic.id} 
                comic={comic} 
                showBadge={index < 3}
              />
            ))
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Button>Xem thêm</Button>
        </div>
      </div>
    </section>
  );
} 