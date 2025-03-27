import { getComic } from "@/services/comic";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  let comic = null;

  try {
    // Thử lấy dữ liệu từ API trước
    comic = await getComic(id, false);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu cho metadata từ API:", error);
    // Nếu lỗi, thử lấy từ dữ liệu mock
    try {
      comic = await getComic(id, true);
    } catch (mockError) {
      console.error("Lỗi khi lấy dữ liệu mock cho metadata:", mockError);
    }
  }

  if (!comic) {
    return {
      title: "Không tìm thấy truyện",
      description: "Truyện không tồn tại hoặc đã bị xóa",
    };
  }

  return {
    title: `${comic.title} - Comic App`,
    description:
      comic.summary ||
      comic.description ||
      `Đọc truyện ${comic.title} miễn phí`,
    openGraph: {
      images: comic.cover ? [comic.cover] : [],
    },
  };
}

export default function ComicLayout({ children }) {
  return children;
}
