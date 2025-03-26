import FeaturedComics from "@/components/home/FeaturedComics";
import UpdatedComics from "@/components/home/UpdatedComics";
import { getFeaturedComics, getUpdatedComics } from "@/services/comic";

// Thêm cấu hình cho Static Generation với revalidation
export const revalidate = 3600; // revalidate mỗi giờ

export default async function Home() {
  // Lấy dữ liệu song song để tăng tốc
  const [featuredComics, updatedComics] = await Promise.all([
    getFeaturedComics(8),
    getUpdatedComics(12),
  ]);

  return (
    <div className="container mx-auto px-4 py-8 pt-0 space-y-8">
      <FeaturedComics comics={featuredComics} />
      <UpdatedComics comics={updatedComics} />
    </div>
  );
}
