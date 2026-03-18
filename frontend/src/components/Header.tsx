"use client";
import { Search, ShoppingCart, MapPin } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function Header() {
  const { searchTerm, setSearchTerm, cartCount } = useStore();

  return (
    <header className="flex flex-col w-full z-10 sticky top-0 shadow-sm relative">
      {/* Top Nav (Dark Blue) */}
      <div className="bg-[#131921] text-white flex flex-col sm:flex-row items-center px-4 py-2 gap-2 sm:gap-4 h-auto sm:h-[60px]">
        <div className="flex w-full sm:w-auto items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 border border-transparent hover:border-white p-1 rounded cursor-pointer shrink-0">
            <span className="font-extrabold text-2xl tracking-tighter">Amazon Clone</span>
          </Link>

          {/* Address Placeholder */}
          <div className="hidden sm:flex items-center border border-transparent mr-4 hover:border-white p-1 rounded cursor-pointer shrink-0">
            <MapPin className="h-5 w-5 text-white/70" />
            <div className="flex flex-col ml-1">
              <span className="text-[11px] text-gray-300 leading-tight">Deliver to</span>
              <span className="text-[13px] font-bold leading-tight">Select your address</span>
            </div>
          </div>

          {/* Mobile Cart */}
          <Link href="/cart" className="flex sm:hidden items-end border border-transparent hover:border-white p-1 rounded cursor-pointer shrink-0 relative">
            <ShoppingCart className="h-8 w-8 text-white" strokeWidth={1.5} />
            <span className="absolute top-[2px] left-1/2 -translate-x-1/2 text-[#F3A847] font-bold text-sm">{cartCount}</span>
          </Link>
        </div>

        {/* Search Bar inside Nav */}
        <div className="flex-grow flex items-center bg-white rounded-md overflow-hidden h-10 w-full focus-within:ring-2 focus-within:ring-[#F3A847] mb-2 sm:mb-0">
          <select className="bg-gray-100 border-r border-gray-300 text-gray-700 text-xs px-2 h-full outline-none hover:bg-gray-200 cursor-pointer hidden md:block">
            <option>All</option>
          </select>
          <input
            type="text"
            className="flex-grow px-3 text-black text-sm h-full outline-none placeholder-gray-500"
            placeholder="Search Amazon Clone"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Link href="/" className="bg-[#FEBD69] hover:bg-[#F3A847] px-4 h-full flex items-center justify-center transition-colors">
            <Search className="h-5 w-5 text-gray-800" />
          </Link>
        </div>

        {/* Account & Lists */}
        <div className="hidden md:flex flex-col border border-transparent hover:border-white p-1 rounded cursor-pointer shrink-0 sm:ml-auto">
          <span className="text-[11px] text-gray-300 leading-tight">Hello, sign in</span>
          <span className="text-[13px] font-bold leading-tight flex items-center">Account & Lists</span>
        </div>

        {/* Returns & Orders */}
        <div className="hidden lg:flex flex-col border border-transparent hover:border-white p-1 rounded cursor-pointer shrink-0">
          <span className="text-[11px] text-gray-300 leading-tight">Returns</span>
          <span className="text-[13px] font-bold leading-tight">& Orders</span>
        </div>

        {/* Cart */}
        <Link href="/cart" className="hidden sm:flex items-end border border-transparent hover:border-white p-1 rounded cursor-pointer shrink-0 relative">
          <ShoppingCart className="h-8 w-8 text-white" strokeWidth={1.5} />
          <span className="absolute top-[2px] left-1/2 -translate-x-1/2 text-[#F3A847] font-bold text-[14px]">{cartCount}</span>
          <span className="text-sm font-bold pb-1 ml-1 translate-y-[2px]">Cart</span>
        </Link>
      </div>
    </header>
  );
}
