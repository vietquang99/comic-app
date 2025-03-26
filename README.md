# Comic App - Ứng dụng đọc truyện tranh

Ứng dụng web đọc truyện tranh được xây dựng bằng Next.js, React và Tailwind CSS, với backend sử dụng Supabase.

## Tính năng

- 🎨 Giao diện đẹp, thân thiện với người dùng
- 📱 Responsive trên mọi thiết bị
- 📚 Duyệt và tìm kiếm truyện
- 📖 Đọc truyện theo chương
- 📝 Bình luận và đánh giá truyện
- 🔖 Đánh dấu truyện yêu thích
- 🚀 Tải nhanh với Next.js App Router
- 🌙 Hỗ trợ chế độ tối

## Cài đặt

### Yêu cầu

- Node.js 16.8.0 trở lên
- npm hoặc yarn
- Tài khoản Supabase (miễn phí)

### Bước 1: Clone dự án

```bash
git clone https://github.com/yourusername/comic-app.git
cd comic-app
```

### Bước 2: Cài đặt dependencies

```bash
npm install
# hoặc
yarn install
```

### Bước 3: Thiết lập Supabase

1. Đăng ký tài khoản tại [Supabase](https://supabase.com)
2. Tạo project mới
3. Thiết lập cơ sở dữ liệu bằng cách:
   - Vào SQL Editor trong Dashboard
   - Dán nội dung từ file `scripts/setup-supabase.sql` và chạy
4. Tạo file `.env.local` và thêm thông tin kết nối Supabase:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Chi tiết hướng dẫn cài đặt Supabase có thể được tìm thấy trong tài liệu [`docs/supabase-setup.md`](docs/supabase-setup.md).

### Bước 4: Chạy ứng dụng

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ khởi chạy tại `http://localhost:3000`.

## Cấu trúc dự án

```
comic-app/
├── public/           # Tệp tĩnh và hình ảnh
├── src/
│   ├── app/          # Routing và pages
│   ├── components/   # UI components
│   ├── constants/    # Dữ liệu hằng số
│   ├── lib/          # Thư viện và utilities
│   └── services/     # API và services
├── scripts/          # Scripts hỗ trợ
└── docs/             # Tài liệu
```

## Chuyển đổi từ Mock Data sang Supabase

Ứng dụng ban đầu sử dụng mock data để phát triển. Để chuyển sang dữ liệu thực từ Supabase:

1. Đảm bảo bạn đã thiết lập Supabase như hướng dẫn ở trên
2. Các service trong `src/services/` đã được cấu hình để sử dụng Supabase theo mặc định
3. Nếu bạn muốn quay lại dữ liệu mock, hãy thêm tham số `useMockData: true` trong các hàm service

Ví dụ:

```javascript
// Sử dụng Supabase
const comics = await getUpdatedComics();

// Sử dụng mock data
const comics = await getUpdatedComics(8, true);
```

## Tài liệu

- [Cấu trúc cơ sở dữ liệu](docs/database-schema.md)
- [Thiết lập Supabase](docs/supabase-setup.md)

## Đóng góp

Vui lòng tham khảo [CONTRIBUTING.md](CONTRIBUTING.md) để biết cách đóng góp vào dự án.
