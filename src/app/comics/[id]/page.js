import Link from "next/link";
import { getComic, incrementViewCount } from "@/services/comic";

import ComicHero from "@/components/comics/ComicHero";
import ComicInfo from "@/components/comics/ComicInfo";
import ChapterList from "@/components/comics/ChapterList";
import CommentSection from "@/components/comics/CommentSection";

export default async function ComicDetailPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  let comic = null;

  try {
    // Lấy thông tin truyện từ API
    comic = await getComic(id, false);

    // Nếu không tìm thấy truyện, thử lấy từ mock data
    if (!comic) {
      console.warn(
        `Không tìm thấy truyện với ID ${id} trong API, thử dùng mock data`
      );
      comic = await getComic(id, true);
    }

    // Nếu vẫn không tìm thấy, hiển thị trang lỗi
    if (!comic) {
      return (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
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
        </div>
      );
    }

    // Tăng số lượt xem - vì đây là Server Component, chúng ta có thể sử dụng await
    if (process.env.NODE_ENV === "production") {
      try {
        await incrementViewCount(id);
      } catch (error) {
        console.error("Lỗi khi tăng lượt xem:", error);
        // Tiếp tục xử lý ngay cả khi lỗi tăng lượt xem
      }
    }

    return (
      <div className="comic-detail-page pb-10">
        {/* Hero Section */}
        <ComicHero comic={comic} />

        {/* Content */}
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - 2/3 width on large screens */}
              <div className="lg:col-span-2">
                <ComicInfo comic={comic} />
                <ChapterList chapters={comic.chapters} comicId={id} />
              </div>

              {/* Sidebar - 1/3 width on large screens */}
              <div>
                <CommentSection comicId={id} initialComments={comic.comments} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu truyện từ API:", error);

    try {
      // Thử lấy dữ liệu từ mock nếu API bị lỗi
      comic = await getComic(id, true);

      if (comic) {
        return (
          <div className="comic-detail-page pb-10">
            {/* Hero Section */}
            <ComicHero comic={comic} />

            {/* Content */}
            <div className="container mx-auto px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content - 2/3 width on large screens */}
                  <div className="lg:col-span-2">
                    <ComicInfo comic={comic} />
                    <ChapterList chapters={comic.chapters} comicId={id} />
                  </div>

                  {/* Sidebar - 1/3 width on large screens */}
                  <div>
                    <CommentSection
                      comicId={id}
                      initialComments={comic.comments}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    } catch (mockError) {
      console.error("Lỗi khi tải dữ liệu truyện từ mock data:", mockError);
    }

    // Nếu cả API và mock data đều lỗi
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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
      </div>
    );
  }
}
