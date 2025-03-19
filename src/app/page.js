import FeaturedComics from '@/components/home/FeaturedComics';
import UpdatedComics from '@/components/home/UpdatedComics';
import { mockComics } from '@/constants/mock-data';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 pt-0 space-y-8">
      {/* Truyện được đề cử */}
      <FeaturedComics comics={mockComics.featured} />

      {/* Truyện mới cập nhật */}
      <UpdatedComics comics={mockComics.updated} />
    </div>
  );
} 