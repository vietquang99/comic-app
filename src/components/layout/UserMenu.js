"use client";

import { useState, useRef, useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { data: session } = useSession();

  // Đóng menu khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!session?.user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none cursor-pointer"
      >
        <div className="w-8 h-8 rounded-full overflow-hidden bg-primary text-primary-foreground flex items-center justify-center cursor-pointer">
          <span className="text-sm font-medium">
            {/* Hiển thị chữ cái đầu của tên người dùng */}
            {session.user.name?.charAt(0) || "U"}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {session.user.name}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {session.user.email}
            </p>
          </div>
          
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      )}
    </div>
  );
} 