"use client";

import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ComicCard from '@/components/comics/ComicCard';
import ComicCardSkeleton from '@/components/comics/ComicCardSkeleton';

export default function FeaturedComics({ comics }) {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftButton(container.scrollLeft > 0);
    setShowRightButton(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScrollButtons);
    checkScrollButtons();

    return () => {
      container.removeEventListener('scroll', checkScrollButtons);
    };
  }, []);

  useEffect(() => {
    // Giả lập thời gian loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.8;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <section className="py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Truyện Nổi Bật</h2>
          </div>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Xem tất cả
          </Button>
        </div>
        
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          >
            {isLoading ? (
              // Hiển thị skeleton khi đang loading
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex-none w-[160px] md:w-[180px]">
                  <ComicCardSkeleton />
                </div>
              ))
            ) : (
              // Hiển thị nội dung thật
              comics.map((comic, index) => (
                <div key={comic.id} className="flex-none w-[160px] md:w-[180px]">
                  <ComicCard 
                    comic={comic} 
                    showBadge={index < 3} 
                  />
                </div>
              ))
            )}
          </div>
          
          {!isLoading && showLeftButton && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-md hover:bg-background hidden md:flex"
              onClick={() => scroll(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          {!isLoading && showRightButton && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm shadow-md hover:bg-background hidden md:flex"
              onClick={() => scroll(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="mt-6 flex justify-center md:hidden">
          <Button variant="outline" size="sm">
            Xem tất cả
          </Button>
        </div>
      </div>
    </section>
  );
} 