# Hướng dẫn cấu hình Supabase cho Comic App

## 1. Tạo tài khoản và dự án Supabase

1. Truy cập [Supabase](https://supabase.com/) và đăng ký tài khoản.
2. Sau khi đăng nhập, nhấn nút "New Project" để tạo dự án mới.
3. Đặt tên cho dự án của bạn, chọn mật khẩu cho cơ sở dữ liệu và vùng lưu trữ gần vị trí người dùng của bạn.
4. Nhấn "Create new project" và đợi quá trình khởi tạo hoàn tất (khoảng 2-4 phút).

## 2. Lấy thông tin kết nối

Khi dự án được tạo, bạn cần lấy thông tin kết nối:

1. Trong trang Dashboard của dự án, chọn mục "Settings" ở thanh bên trái.
2. Chọn "API" từ danh sách bên dưới.
3. Sao chép `URL` và `anon key` (khóa ẩn danh).

## 3. Cấu hình biến môi trường

1. Tạo hoặc chỉnh sửa file `.env.local` ở thư mục gốc của dự án với nội dung sau:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

2. Thay thế các giá trị với thông tin bạn đã sao chép ở bước 2.

## 4. Tạo cấu trúc bảng

1. Trong Dashboard của Supabase, chọn mục "Table Editor" từ thanh bên trái.
2. Bạn có thể tạo bảng thủ công hoặc sử dụng SQL Editor để tạo nhanh:
   - Chọn "SQL Editor" từ thanh bên trái
   - Nhấn nút "+" để tạo một truy vấn mới
   - Dán các lệnh SQL từ file [`database-schema.md`](./database-schema.md) và chạy từng đoạn

## 5. Cấu hình Storage

1. Trong Dashboard của Supabase, chọn "Storage" từ thanh bên trái.
2. Nhấn "New Bucket" để tạo 2 buckets:

   - `comic-covers` - lưu trữ ảnh bìa truyện
   - `comic-pages` - lưu trữ các trang truyện

3. Cấu hình RLS (Row Level Security) cho mỗi bucket:
   - Chọn bucket bạn vừa tạo
   - Chọn tab "Policies"
   - Thêm policies phù hợp, ví dụ:

```sql
-- Cho phép đọc công khai
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public USING (bucket_id = 'comic-covers' OR bucket_id = 'comic-pages');

-- Chỉ admin mới được thêm/sửa/xóa file
CREATE POLICY "Admin Access"
ON storage.objects FOR INSERT
TO authenticated USING (auth.role() = 'admin');

CREATE POLICY "Admin Access"
ON storage.objects FOR UPDATE
TO authenticated USING (auth.role() = 'admin');

CREATE POLICY "Admin Access"
ON storage.objects FOR DELETE
TO authenticated USING (auth.role() = 'admin');
```

## 6. Thêm dữ liệu mẫu

Bạn có thể thêm dữ liệu mẫu bằng cách:

1. Vào "SQL Editor" và tạo một truy vấn mới
2. Dán đoạn mã SQL tạo dữ liệu mẫu từ file [`database-schema.md`](./database-schema.md) và chạy

## 7. Cấu hình Authentication (Tùy chọn)

Nếu muốn có hệ thống đăng nhập:

1. Trong Dashboard chọn "Authentication"
2. Vào "Settings" và kích hoạt các phương thức xác thực (Email, Google, Facebook,...)
3. Cấu hình URL callback trong tab "URL Configuration":
   - Site URL: `http://localhost:3000` (môi trường phát triển)
   - Redirect URLs: `http://localhost:3000/auth/callback`

## 8. Kiểm tra kết nối

1. Khởi động ứng dụng Next.js:

```bash
npm run dev
```

2. Ứng dụng sẽ kết nối tới Supabase và hiển thị dữ liệu nếu cấu hình đúng.

## Xử lý lỗi phổ biến

1. **Lỗi CORS**: Đảm bảo đã thêm origin của ứng dụng trong phần Authentication > URL Configuration.

2. **Lỗi kết nối**: Kiểm tra lại URL và Anon Key đã được cấu hình đúng.

3. **Lỗi quyền truy cập**: Đảm bảo đã thiết lập đúng Row Level Security (RLS) cho các bảng và buckets.

## Tài liệu tham khảo

- [Tài liệu chính thức của Supabase](https://supabase.io/docs)
- [Tích hợp Supabase với Next.js](https://supabase.io/docs/guides/with-nextjs)
- [Quản lý RLS trong Supabase](https://supabase.io/docs/guides/auth/row-level-security)
