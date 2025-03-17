import Image from "next/image";
import { Geist } from "next/font/google";

const geistFont = Geist({
  subsets: ["latin"],
});

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {/* Left side - decorative/branding */}
        <div className="hidden sm:flex sm:w-1/2 bg-primary relative">
          <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
            <div className="flex items-center gap-2">
              <Image 
                src="/next.svg" 
                alt="Logo" 
                width={80} 
                height={20} 
                className="dark:invert"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-4">Comic App Platform</h2>
              <p className="text-white/80">Access your favorite comics and manage your collection with our modern platform.</p>
            </div>
            <div className="text-sm text-white/60">
              &copy; {new Date().getFullYear()} Comic App. All rights reserved.
            </div>
          </div>
        </div>
        
        {/* Right side - auth form */}
        <div className="w-full sm:w-1/2 p-6 sm:p-12 flex flex-col justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}