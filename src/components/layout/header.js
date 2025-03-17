"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Menu, X, LogOut, User, Settings, BookOpen } from "lucide-react";
import UserMenu from "./UserMenu";

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const isAuthenticated = status === "authenticated";
  const loading = status === "loading";
  
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Comics", href: "/comics" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  const userNavigation = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "My Comics", href: "/my-comics", icon: BookOpen },
    { name: "Settings", href: "/settings", icon: Settings },
    { 
      name: "Sign out", 
      href: "#", 
      icon: LogOut,
      onClick: () => signOut({ callbackUrl: "/" })
    },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/next.svg"
                alt="Logo"
                width={120}
                height={30}
                className="dark:invert"
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Authentication buttons or user menu */}
          <div className="hidden md:flex items-center space-x-4">
            {loading ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            ) : isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md border border-input",
                    "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-md bg-primary text-primary-foreground",
                    "hover:bg-primary/90"
                  )}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === item.href
                    ? "bg-gray-100 dark:bg-gray-800 text-primary"
                    : "text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-700"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Authentication links for mobile */}
            {!isAuthenticated ? (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Link
                  href="/login"
                  className="block rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="block rounded-md px-3 py-2 text-base font-medium text-primary hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                {userNavigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={item.onClick}
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-muted-foreground hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}