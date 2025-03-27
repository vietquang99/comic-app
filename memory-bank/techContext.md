# Ngữ cảnh kỹ thuật

## Stack công nghệ

- **Frontend Framework**: Next.js 15.2.2
- **UI Library**: React 19.0.0
- **Styling**: Tailwind CSS 4.0
- **UI Components**: shadcn/ui
- **Authentication**: NextAuth.js 4.24.11
- **Forms**: React Hook Form 7.54.2 + Zod 3.24.2

## Môi trường phát triển

- **Hệ điều hành**: Windows
- **Node.js**: 18+
- **Package Manager**: npm
- **Dev Server**: Next.js dev server với Turbopack

## Cấu trúc dự án

```
comic-app/
├── public/
│   └── comics/           # Hình ảnh truyện
├── src/
│   ├── app/              # Các trang và route
│   │   ├── dashboard/    # Phần quản lý người dùng
│   │   ├── api/          # API routes
│   │   ├── (auth)/       # Các trang xác thực
│   │   └── layout.js     # Layout chung
│   ├── components/       # Các thành phần UI
│   │   ├── comics/       # Components liên quan đến truyện
│   │   ├── home/         # Components trang chủ
│   │   └── ui/           # UI components cơ bản
│   ├── constants/        # Dữ liệu hằng số
│   ├── hooks/            # Custom hooks
│   ├── lib/              # Utilities và helpers
│   ├── middleware/       # Middleware
│   ├── services/         # Services
│   └── styles/           # CSS styles
└── ...các tệp cấu hình
```

## Quy trình làm việc

1. Phát triển trên nhánh tính năng
2. Thử nghiệm với dữ liệu mẫu trước
3. Tích hợp API khi UI đã hoàn thiện
4. Tối ưu UI và UX
5. Kiểm thử trên cả desktop và mobile

## Công cụ và tiện ích

- **Linting**: ESLint
- **Formatting**: Prettier (thông qua ESLint)
- **UI Components**: shadcn/ui (dựa trên Radix UI)
- **Icons**: Lucide React
- **Theming**: next-themes (hỗ trợ dark mode)

## Caching và Quản lý dữ liệu

### Next.js Cache

- **unstable_cache**: Sử dụng để cache các API calls và giảm tải cho server
  - Cấu hình với tags và thời gian revalidate
  - Yêu cầu các tag phải là chuỗi tĩnh, không hỗ trợ callback function
  - Ví dụ: `{ tags: ["comics", "comic-details"], revalidate: 3600 }`

### Xử lý lỗi và dự phòng

- **Cơ chế Fallback với Mock Data**:

  - Mọi service function đều có tham số `useMockData` để chuyển đổi nguồn dữ liệu
  - Mock data được lưu tại `src/constants/mock-data.js`
  - Khi API gặp lỗi, hệ thống tự động sử dụng dữ liệu mock
  - Đảm bảo ứng dụng vẫn hoạt động khi API không khả dụng

- **Mô hình Try-Catch**:
  - Mọi API call được bọc trong try-catch blocks
  - Lỗi được log và xử lý gracefully
  - Người dùng không thấy lỗi kỹ thuật, chỉ thấy dữ liệu (dù là mock)
