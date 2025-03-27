import FeaturedComics from "@/components/home/FeaturedComics";
import UpdatedComics from "@/components/home/UpdatedComics";
import { getFeaturedComics, getUpdatedComics } from "@/services/comic";
import { mockComics } from "@/constants/mock-data";

// Thêm cấu hình cho Static Generation với revalidation
export const revalidate = 3600; // revalidate mỗi giờ

export default async function Home({ searchParams }) {
  // Đảm bảo searchParams được xử lý đúng cách theo Next.js 15
  const resolvedSearchParams = await searchParams;

  let featuredComics = [];
  let updatedComics = [];

  try {
    // Sử dụng dữ liệu mock mặc định để đảm bảo có dữ liệu hiển thị
    featuredComics = mockComics.featured.slice(0, 8);
    updatedComics = mockComics.updated.slice(0, 12);

    // Thử lấy dữ liệu thật
    try {
      const [featuredFromApi, updatedFromApi] = await Promise.all([
        getFeaturedComics(8, false),
        getUpdatedComics(12, false),
      ]);

      // Chỉ cập nhật khi có dữ liệu thật
      if (featuredFromApi && featuredFromApi.length > 0) {
        featuredComics = featuredFromApi;
      }

      if (updatedFromApi && updatedFromApi.length > 0) {
        updatedComics = updatedFromApi;
      }
    } catch (apiError) {
      console.error("Lỗi khi tải dữ liệu từ API:", apiError);
      // Giữ nguyên dữ liệu mock
    }
  } catch (error) {
    console.error("Lỗi không xác định khi tải dữ liệu:", error);
    // Đảm bảo có dữ liệu hiển thị ngay cả khi có lỗi
    featuredComics = mockComics.featured.slice(0, 8);
    updatedComics = mockComics.updated.slice(0, 12);
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-0">
      <FeaturedComics comics={featuredComics} />
      <UpdatedComics comics={updatedComics} />
    </div>
  );
}
