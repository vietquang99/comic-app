# Mẫu thiết kế hệ thống

## Cấu trúc thư mục

- `src/app`: Chứa các trang và route của ứng dụng
- `src/components`: Chứa các thành phần UI tái sử dụng
- `src/constants`: Chứa các hằng số và dữ liệu mẫu
- `src/hooks`: Chứa các custom hooks
- `src/lib`: Chứa các utility functions và helpers
- `src/services`: Chứa các service cho API và xử lý dữ liệu
- `src/styles`: Chứa các styles chung của ứng dụng

## Quy ước đặt tên

- Các component: PascalCase (VD: ComicCard.js)
- Các hooks: camelCase với tiền tố "use" (VD: useComicData.js)
- Các utility: camelCase (VD: formatDate.js)
- Các tệp CSS: kebab-case (VD: card-styles.css)

## UI Components

- Sử dụng shadcn/ui cho các thành phần UI cơ bản
- Mỗi thành phần lớn được tách thành file riêng
- Sử dụng Tailwind CSS cho styling

## State Management

- Sử dụng React hooks (useState, useContext) cho state management
- Sử dụng custom hooks để tách logic ra khỏi UI

## Routing

- Sử dụng Next.js App Router
- Cấu trúc route:
  - `/`: Trang chủ
  - `/comics/[id]`: Trang chi tiết truyện
  - `/comics/[id]/chapters/[chapter]`: Trang đọc chapter
  - `/dashboard`: Trang quản lý người dùng
  - `/auth/*`: Các trang xác thực
