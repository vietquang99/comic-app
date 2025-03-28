"use client";

import Image from "next/image";
import { BookOpen, Eye, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ComicHero({ comic }) {
  if (!comic) return null;

  return (
    <div className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden rounded-b-xl mb-6">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={comic.cover}
          alt={comic.title}
          fill
          priority
          className="object-cover"
          onError={(e) => {
            e.target.src = "/comics/default.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="container mx-auto flex flex-col md:flex-row items-end md:items-center gap-4">
          {/* Cover Image */}
          <div className="relative h-32 w-24 md:h-48 md:w-36 rounded-lg overflow-hidden shadow-lg border-2 border-white/20 shrink-0">
            <Image
              src={comic.cover}
              alt={comic.title}
              fill
              sizes="(max-width: 768px) 96px, 144px"
              className="object-cover"
              onError={(e) => {
                e.target.src = "/comics/default.jpg";
              }}
            />
          </div>

          {/* Info */}
          <div className="flex-1 text-white">
            <h1 className="text-2xl md:text-4xl font-bold mb-1 text-shadow-sm">
              {comic.title}
            </h1>

            {comic.alternativeTitles?.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {comic.alternativeTitles.map((title, index) => (
                  <span key={index} className="text-sm text-white/70">
                    {index > 0 && "• "}
                    {title}
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>{comic.rating || "?"} / 5</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-blue-400" />
                <span>
                  {comic.views ? comic.views.toLocaleString() : "0"} lượt xem
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-green-400" />
                <span>
                  {comic.followers ? comic.followers.toLocaleString() : "0"}{" "}
                  người theo dõi
                </span>
              </div>
              <Badge
                variant="secondary"
                className="bg-primary/20 text-primary-foreground border border-primary/30"
              >
                {comic.status}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button className="gap-2" size="sm">
                <BookOpen className="w-4 h-4" />
                Đọc từ đầu
              </Button>
              <Button className="gap-2" variant="secondary" size="sm">
                <BookOpen className="w-4 h-4" />
                Đọc mới nhất
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                Theo dõi
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Thêm style cho text-shadow */}
      <style jsx>{`
        .text-shadow-sm {
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
}
