"use client";

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  const footerLinks = {
    comic: [
      { name: 'Tất cả truyện', href: '/comics' },
      { name: 'Truyện Hot', href: '/hot' },
      { name: 'Truyện Mới', href: '/updated' },
      { name: 'Truyện Đã Hoàn Thành', href: '/completed' },
    ],
    genres: [
      { name: 'Hành Động', href: '/genres/action' },
      { name: 'Tình Cảm', href: '/genres/romance' },
      { name: 'Phiêu Lưu', href: '/genres/adventure' },
      { name: 'Giả Tưởng', href: '/genres/fantasy' },
      { name: 'Kinh Dị', href: '/genres/horror' },
    ],
    support: [
      { name: 'Hướng dẫn', href: '/guide' },
      { name: 'Điều khoản sử dụng', href: '/terms' },
      { name: 'Chính sách bảo mật', href: '/privacy' },
      { name: 'Liên hệ', href: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, href: 'https://facebook.com' },
    { icon: <Twitter className="h-5 w-5" />, href: 'https://twitter.com' },
    { icon: <Instagram className="h-5 w-5" />, href: 'https://instagram.com' },
    { icon: <Youtube className="h-5 w-5" />, href: 'https://youtube.com' },
  ];

  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-gradient">ComicApp</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Đọc truyện tranh online miễn phí, cập nhật nhanh nhất các bộ truyện hay và hot nhất.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((link, index) => (
                <Button 
                  key={index}
                  variant="ghost" 
                  size="icon"
                  asChild
                >
                  <Link href={link.href} target="_blank" rel="noopener noreferrer">
                    {link.icon}
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h3 className="font-medium">Truyện Tranh</h3>
            <ul className="space-y-2">
              {footerLinks.comic.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-medium">Thể Loại</h3>
            <ul className="space-y-2">
              {footerLinks.genres.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-medium">Nhận Thông Báo</h3>
            <p className="text-sm text-muted-foreground">
              Đăng ký nhận thông báo về truyện mới cập nhật.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="max-w-[220px]"
              />
              <Button>Đăng ký</Button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Comic App. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}