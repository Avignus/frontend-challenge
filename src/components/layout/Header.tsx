import Link from "next/link";
import { Film, Menu } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-md bg-black/30">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Film className="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold text-white">MovieSearch</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-6">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/popular">Popular</NavLink>
          <NavLink href="/top-rated">Top Rated</NavLink>
        </nav>
        <button className="sm:hidden text-white p-2">
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-gray-300 hover:text-white transition-colors relative group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all" />
    </Link>
  );
}

