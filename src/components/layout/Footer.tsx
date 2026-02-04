import Link from "next/link";
import { Film } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Film className="w-5 h-5 text-purple-400" />
            <span className="font-semibold text-white">MovieSearch</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition">About</Link>
            <Link href="#" className="hover:text-white transition">API</Link>
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} MovieSearch. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

