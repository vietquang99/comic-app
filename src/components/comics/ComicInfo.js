"use client";

import { Badge } from "@/components/ui/badge";
import { PenLine, CalendarDays } from "lucide-react";

export default function ComicInfo({ comic }) {
  if (!comic) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Main Info */}
      <div className="md:col-span-2 space-y-6">
        {/* Summary */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold flex items-center gap-2">Tóm tắt</h2>
          <p className="text-muted-foreground leading-relaxed">
            {comic.summary}
          </p>
        </div>

        {/* Author and Artist */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Tác giả & Họa sĩ</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-4 text-blue-500" />
              <span className="font-medium">Tác giả:</span>
              <span className="text-muted-foreground">{comic.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <PenLine className="w-4 h-4 text-purple-500" />
              <span className="font-medium">Họa sĩ:</span>
              <span className="text-muted-foreground">{comic.artist}</span>
            </div>
          </div>
        </div>

        {/* Genres */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Thể loại</h2>
          <div className="flex flex-wrap gap-2">
            {comic.genres?.map((genre) => (
              <Badge key={genre} variant="outline" className="px-3 py-1">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        {/* Other Details */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Thông tin khác</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-green-500" />
              <span className="font-medium">Năm phát hành:</span>
              <span className="text-muted-foreground">{comic.releaseYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Trạng thái:</span>
              <Badge variant="outline" className="px-3 py-1">
                {comic.status}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Side Info */}
      <div className="space-y-6">
        {/* Alternative Titles */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Tên khác</h2>
          <ul className="space-y-2">
            {comic.alternativeTitles?.map((title, index) => (
              <li key={index} className="text-muted-foreground">
                {title}
              </li>
            ))}
          </ul>
        </div>

        {/* Statistics */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold">Thống kê</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Lượt xem</div>
              <div className="text-lg font-bold">
                {comic.views?.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Theo dõi</div>
              <div className="text-lg font-bold">
                {comic.followers?.toLocaleString()}
              </div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Đánh giá</div>
              <div className="text-lg font-bold">{comic.rating} / 5</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-sm text-muted-foreground">Chapters</div>
              <div className="text-lg font-bold">{comic.chapters?.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
