"use client";

import { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import ComicCard from "@/components/comics/ComicCard";
import ComicCardSkeleton from "@/components/comics/ComicCardSkeleton";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

export default function UpdatedComics({ comics }) {
  const [isLoading, setIsLoading] = useState(true);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "200px", // Tiền tải trước khi cuộn tới vùng này
  });

  // Hiệu ứng skeleton loading ngắn
  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 600); // Giảm xuống 600ms để tăng hiệu suất

      return () => clearTimeout(timer);
    }
  }, [inView]);

  return (
    <section className="py-8 bg-muted/30" ref={inViewRef}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Truyện Mới Cập Nhật</h2>
          </div>
          <Link href="/comics">
            <Button variant="outline" size="sm">
              Xem tất cả
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {isLoading
            ? // Hiển thị skeleton khi đang loading
              Array.from({ length: 12 }).map((_, index) => (
                <ComicCardSkeleton key={index} />
              ))
            : // Hiển thị nội dung thật
              comics.map((comic, index) => (
                <ComicCard
                  key={comic.id}
                  comic={comic}
                  showBadge={index < 3}
                  priority={index < 6} // Ưu tiên tải 6 ảnh đầu tiên
                  skipSkeleton={true} // Bỏ qua skeleton trong ComicCard vì đã có skeleton ở đây
                />
              ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link href="/comics">
            <Button>Xem thêm</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
