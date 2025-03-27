import FeaturedComics from "@/components/home/FeaturedComics";
import UpdatedComics from "@/components/home/UpdatedComics";
import { getFeaturedComics, getUpdatedComics } from "@/services/comic";

// Thêm cấu hình cho Static Generation với revalidation
export const revalidate = 3600; // revalidate mỗi giờ

export default async function Home() {
  let featuredComics = [];
  let updatedComics = [];

  try {
    // Lấy dữ liệu song song để tăng tốc
    [featuredComics, updatedComics] = await Promise.all([
      getFeaturedComics(8, false),
      getUpdatedComics(12, false),
    ]);
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu từ API:", error);
    // Nếu có lỗi, sử dụng dữ liệu mock
    [featuredComics, updatedComics] = await Promise.all([
      getFeaturedComics(8, true),
      getUpdatedComics(12, true),
    ]);
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-0">
      <FeaturedComics comics={featuredComics} />
      <UpdatedComics comics={updatedComics} />
    </div>
  );
}
