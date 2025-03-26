"use client";

import { useEffect, useState } from "react";
import { getComic, incrementViewCount } from "@/services/comic";
import Link from "next/link";

import ComicHero from "@/components/comics/ComicHero";
import ComicInfo from "@/components/comics/ComicInfo";
import ChapterList from "@/components/comics/ChapterList";
import CommentSection from "@/components/comics/CommentSection";
import ComicDetailSkeleton from "@/components/comics/ComicDetailSkeleton";

export default async function ComicDetailPage({ params }) {
  const { id } = params;

  try {
    // Lấy thông tin truyện từ API (hoặc mock data)
    const comic = await getComic(id);

    // Nếu không tìm thấy truyện, hiển thị trang lỗi
    if (!comic) {
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold text-red-500">
            Không tìm thấy truyện!
          </h1>
          <p className="mt-4">
            Truyện bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Quay lại trang chủ
          </Link>
        </div>
      );
    }

    // Tăng số lượt xem - chỉ thực hiện khi trong môi trường sản xuất
    if (process.env.NODE_ENV === "production") {
      // Sử dụng Promise.allSettled để không chặn render nếu có lỗi
      Promise.allSettled([incrementViewCount(id)]);
    }

    return (
      <div className="comic-detail-page">
        {/* Hero Section */}
        <ComicHero comic={comic} />

        {/* Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <ComicInfo comic={comic} />
              <ChapterList chapters={comic.chapters} />
            </div>

            {/* Sidebar - 1/3 width on large screens */}
            <div>
              <CommentSection comicId={id} comments={comic.comments} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu truyện:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-500">Đã xảy ra lỗi!</h1>
        <p className="mt-4">
          Không thể tải thông tin truyện. Vui lòng thử lại sau.
        </p>
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Quay lại trang chủ
        </Link>
      </div>
    );
  }
}
