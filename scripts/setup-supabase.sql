-- THIẾT LẬP CƠ SỞ DỮ LIỆU CHO COMIC APP
-- Script này chứa tất cả các lệnh cần thiết để thiết lập cơ sở dữ liệu Supabase

-- BẢNG COMICS (TRUYỆN)
CREATE TABLE comics (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  thumbnail TEXT,
  cover TEXT,
  author TEXT,
  artist TEXT,
  status TEXT CHECK (status IN ('ongoing', 'completed', 'dropped')) DEFAULT 'ongoing',
  rating NUMERIC(3, 1) DEFAULT 0,
  views BIGINT DEFAULT 0,
  bookmarks BIGINT DEFAULT 0,
  release_year INTEGER,
  is_featured BOOLEAN DEFAULT false,
  genres TEXT[],
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index để tăng tốc truy vấn
CREATE INDEX comics_title_idx ON comics USING GIN (title gin_trin_ops);
CREATE INDEX comics_slug_idx ON comics (slug);
CREATE INDEX comics_is_featured_idx ON comics (is_featured);
CREATE INDEX comics_updated_at_idx ON comics (updated_at);

-- BẢNG CHAPTERS (CHƯƠNG)
CREATE TABLE chapters (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  comic_id BIGINT REFERENCES comics(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  number INTEGER NOT NULL,
  views BIGINT DEFAULT 0,
  images TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Ràng buộc để số chương không trùng lặp trong cùng một truyện
  UNIQUE(comic_id, number)
);

-- Tạo index cho chapters
CREATE INDEX chapters_comic_id_idx ON chapters (comic_id);
CREATE INDEX chapters_comic_id_number_idx ON chapters (comic_id, number);

-- BẢNG COMMENTS (BÌNH LUẬN)
CREATE TABLE comments (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  comic_id BIGINT REFERENCES comics(id) ON DELETE CASCADE,
  user_id TEXT, -- Có thể được sử dụng khi tích hợp auth
  user_name TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tạo index cho comments
CREATE INDEX comments_comic_id_idx ON comments (comic_id);
CREATE INDEX comments_user_id_idx ON comments (user_id);

-- BẢNG BOOKMARKS (ĐÁNH DẤU)
CREATE TABLE bookmarks (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  comic_id BIGINT REFERENCES comics(id) ON DELETE CASCADE,
  user_id TEXT NOT NULL, -- ID người dùng từ hệ thống auth
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Mỗi người dùng chỉ có thể đánh dấu một truyện một lần
  UNIQUE(user_id, comic_id)
);

-- Tạo index cho bookmarks
CREATE INDEX bookmarks_user_id_idx ON bookmarks (user_id);
CREATE INDEX bookmarks_comic_id_idx ON bookmarks (comic_id);

-- BẢNG READING HISTORY (LỊCH SỬ ĐỌC)
CREATE TABLE reading_history (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  user_id TEXT NOT NULL, -- ID người dùng từ hệ thống auth
  comic_id BIGINT REFERENCES comics(id) ON DELETE CASCADE,
  chapter_id BIGINT REFERENCES chapters(id) ON DELETE CASCADE,
  last_read_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Mỗi người dùng chỉ có một lịch sử đọc cho mỗi truyện
  UNIQUE(user_id, comic_id)
);

-- Tạo index cho reading_history
CREATE INDEX reading_history_user_id_idx ON reading_history (user_id);
CREATE INDEX reading_history_comic_id_idx ON reading_history (comic_id);
CREATE INDEX reading_history_last_read_at_idx ON reading_history (last_read_at);

-- TẠO CÁC FUNCTIONS VÀ TRIGGERS

-- Function cập nhật updated_at
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger cập nhật thời gian cho comics
CREATE TRIGGER update_comics_updated_at
BEFORE UPDATE ON comics
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Trigger cập nhật thời gian cho chapters
CREATE TRIGGER update_chapters_updated_at
BEFORE UPDATE ON chapters
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Function cập nhật thời gian cho comic khi thêm chapter mới
CREATE OR REPLACE FUNCTION update_comic_updated_at()
RETURNS TRIGGER AS $$
BEGIN
   UPDATE comics SET updated_at = NOW() WHERE id = NEW.comic_id;
   RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger cập nhật thời gian comic khi thêm chapter
CREATE TRIGGER update_comic_when_chapter_added
AFTER INSERT ON chapters
FOR EACH ROW
EXECUTE FUNCTION update_comic_updated_at();

-- Function cập nhật rating trung bình cho comic
CREATE OR REPLACE FUNCTION update_comic_rating()
RETURNS TRIGGER AS $$
DECLARE
  avg_rating NUMERIC;
BEGIN
  SELECT AVG(rating) INTO avg_rating FROM comments WHERE comic_id = NEW.comic_id AND rating IS NOT NULL;
  UPDATE comics SET rating = avg_rating WHERE id = NEW.comic_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger cập nhật rating khi có comment mới
CREATE TRIGGER update_rating_on_comment
AFTER INSERT OR UPDATE ON comments
FOR EACH ROW
WHEN (NEW.rating IS NOT NULL)
EXECUTE FUNCTION update_comic_rating();

-- Function cập nhật số lượng bookmark
CREATE OR REPLACE FUNCTION update_comic_bookmarks()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE comics SET bookmarks = bookmarks + 1 WHERE id = NEW.comic_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE comics SET bookmarks = bookmarks - 1 WHERE id = OLD.comic_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger cập nhật số lượng bookmark khi thêm
CREATE TRIGGER update_bookmarks_count_insert
AFTER INSERT ON bookmarks
FOR EACH ROW
EXECUTE FUNCTION update_comic_bookmarks();

-- Trigger cập nhật số lượng bookmark khi xóa
CREATE TRIGGER update_bookmarks_count_delete
AFTER DELETE ON bookmarks
FOR EACH ROW
EXECUTE FUNCTION update_comic_bookmarks();

-- THIẾT LẬP RLS (ROW LEVEL SECURITY)

-- Bật RLS cho tất cả các bảng
ALTER TABLE comics ENABLE ROW LEVEL SECURITY;
ALTER TABLE chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE reading_history ENABLE ROW LEVEL SECURITY;

-- Tạo policy cho phép đọc công khai
CREATE POLICY "Allow public read access" ON comics
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON chapters
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access" ON comments
  FOR SELECT USING (true);

-- Policy cho phép thêm bình luận
CREATE POLICY "Allow anonymous users to comment" ON comments
  FOR INSERT WITH CHECK (true);

-- Policy cho phép quản trị thêm/sửa/xóa truyện và chương
CREATE POLICY "Allow admins full access" ON comics
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

CREATE POLICY "Allow admins full access" ON chapters
  USING (auth.role() = 'admin')
  WITH CHECK (auth.role() = 'admin');

-- THÊM DỮ LIỆU MẪU

-- Thêm một số truyện mẫu
INSERT INTO comics (title, slug, description, thumbnail, cover_image, author, artist, status, genres, tags, is_featured)
VALUES
  ('One Piece', 'one-piece', 'Câu chuyện về hải tặc Luffy và hành trình tìm kiếm kho báu One Piece', 'https://example.com/one-piece.jpg', 'https://example.com/one-piece-cover.jpg', 'Eiichiro Oda', 'Eiichiro Oda', 'ongoing', ARRAY['Action', 'Adventure', 'Fantasy'], ARRAY['Pirates', 'Superpowers'], true),
  ('Naruto', 'naruto', 'Câu chuyện về cậu bé ninja Naruto và hành trình trở thành Hokage', 'https://example.com/naruto.jpg', 'https://example.com/naruto-cover.jpg', 'Masashi Kishimoto', 'Masashi Kishimoto', 'completed', ARRAY['Action', 'Adventure', 'Fantasy'], ARRAY['Ninja', 'Superpowers'], true),
  ('Demon Slayer', 'demon-slayer', 'Câu chuyện về Tanjiro và hành trình tiêu diệt quỷ', 'https://example.com/demon-slayer.jpg', 'https://example.com/demon-slayer-cover.jpg', 'Koyoharu Gotouge', 'Koyoharu Gotouge', 'completed', ARRAY['Action', 'Drama', 'Fantasy'], ARRAY['Demons', 'Historical'], true);

-- Thêm chapters cho One Piece
INSERT INTO chapters (comic_id, title, number, images)
VALUES
  (1, 'Romance Dawn: Bình Minh Của Cuộc Phiêu Lưu', 1, ARRAY['https://example.com/op-ch1-1.jpg', 'https://example.com/op-ch1-2.jpg']),
  (1, 'Người Đàn Ông Đội Mũ Rơm', 2, ARRAY['https://example.com/op-ch2-1.jpg', 'https://example.com/op-ch2-2.jpg']),
  (1, 'Morgan VS Luffy', 3, ARRAY['https://example.com/op-ch3-1.jpg', 'https://example.com/op-ch3-2.jpg']);

-- Thêm chapters cho Naruto
INSERT INTO chapters (comic_id, title, number, images)
VALUES
  (2, 'Uzumaki Naruto', 1, ARRAY['https://example.com/naruto-ch1-1.jpg', 'https://example.com/naruto-ch1-2.jpg']),
  (2, 'Konohamaru', 2, ARRAY['https://example.com/naruto-ch2-1.jpg', 'https://example.com/naruto-ch2-2.jpg']);

-- Thêm bình luận
INSERT INTO comments (comic_id, user_name, content, rating)
VALUES
  (1, 'OnePieceFan', 'Truyện hay nhất mọi thời đại!', 5),
  (1, 'MangaReader', 'Cốt truyện rất hấp dẫn', 4),
  (2, 'NarutoLover', 'Naruto là tuổi thơ của tôi', 5); 