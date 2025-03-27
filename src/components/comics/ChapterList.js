"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  Eye,
  ScrollText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ChapterList({ chapters = [], comicId }) {
  const [sortOrder, setSortOrder] = useState("desc"); // "asc" hoặc "desc"
  const [searchTerm, setSearchTerm] = useState("");

  if (!chapters || chapters.length === 0) {
    return (
      <Card className="w-full mt-6 ">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ScrollText className="w-5 h-5" />
            Danh sách Chapter
          </CardTitle>
          <CardDescription>Chưa có chapter nào được đăng.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedChapters = [...chapters]
    .filter((chapter) => {
      if (!searchTerm.trim()) return true;
      return (
        chapter.number?.toString().includes(searchTerm) ||
        (chapter.title &&
          chapter.title.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    })
    .sort((a, b) => {
      const aNumber = a.number || 0;
      const bNumber = b.number || 0;
      if (sortOrder === "asc") {
        return aNumber - bNumber;
      } else {
        return bNumber - aNumber;
      }
    });

  return (
    <Card className="w-full mt-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <ScrollText className="w-5 h-5" />
          Danh sách Chapter
        </CardTitle>
        <CardDescription>
          {chapters.length} chapter{chapters.length > 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {/* Tools */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <Input
            placeholder="Tìm theo số hoặc tên chapter"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 shrink-0"
            onClick={toggleSortOrder}
            title={`Sắp xếp ${sortOrder === "asc" ? "tăng dần" : "giảm dần"}`}
          >
            {sortOrder === "asc" ? (
              <ArrowUpAZ className="h-4 w-4" />
            ) : (
              <ArrowDownAZ className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Chapters */}
        <div className="space-y-1">
          {filteredAndSortedChapters.length > 0 ? (
            filteredAndSortedChapters.map((chapter) => (
              <Link
                key={chapter.id || `chapter-${chapter.number}`}
                href={`/comics/${comicId}/chapters/${chapter.id}`}
                className="flex flex-col sm:flex-row sm:items-center gap-2 py-3 hover:bg-muted/50 px-3 rounded-md transition-colors"
              >
                <div className="font-medium">
                  Chapter {chapter.number || "?"}
                  {chapter.title && `: ${chapter.title}`}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {chapter.releaseDate
                        ? new Date(chapter.releaseDate).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>
                      {chapter.views ? chapter.views.toLocaleString() : "0"}
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="py-8 text-center text-muted-foreground">
              Không tìm thấy chapter phù hợp.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
