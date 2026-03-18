"use client";

import { Star, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "@/context/StoreContext";

type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  inventory: number;
  tags: string;
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { searchTerm, addToCart } = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
              query GetProducts($search: String) {
                products(search: $search) {
                  id
                  title
                  description
                  price
                  inventory
                  tags
                }
              }
            `,
            variables: { search: searchTerm || null },
          }),
        });

        const { data, errors } = await res.json();
        if (errors) throw new Error(errors[0].message);
        setProducts(data.products || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="flex flex-col w-full min-h-screen">
      {/* Main Content Area */}
      <main className="flex-grow flex flex-col items-center w-full max-w-[1500px] mx-auto pb-16">

        {/* Banner Carousel Placeholder */}
        <div className="w-full relative h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] bg-gradient-to-b from-[#e3e6e6] to-[#f3f4f6]">
          {/* Subtle gradient overlay to match Amazon's shadow blend down */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#f3f4f6]" />

          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Deals"
            className="object-cover w-full h-full mix-blend-multiply opacity-70 mask-image:linear-gradient(to_bottom,black_40%,transparent_100%)] object-top"
          />
        </div>

        {/* Product Grid Area overlapping the banner */}
        <div className="relative -mt-20 sm:-mt-32 md:-mt-48 lg:-mt-64 z-10 w-full px-4 sm:px-6 lg:px-8">

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 animate-pulse">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-96 bg-white rounded-md border border-gray-200 shadow-sm p-4 flex flex-col gap-4">
                  <div className="w-full h-48 bg-gray-200" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                  <div className="h-6 bg-gray-200 rounded w-1/4 mt-auto" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm shadow">
              Error loading products: {error}
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-gray-500 text-center bg-white rounded-md border border-gray-200 shadow">
              <Search className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <p className="text-lg font-medium">No results for "{searchTerm}"</p>
              <p className="text-sm">Try checking your spelling or use more general terms</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
              {products.map((product) => {
                // Point directly to a local /public/images folder based on ID. 
                // Because you haven't uploaded images yet, we will trigger the onError
                // fallback to render a dynamic placeholder, ensuring UI isn't broken.
                const localImageUrl = `/images/product_${product.id}.jpg`;
                const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(product.title)}&background=random&size=400`;
                
                return (
                  <div 
                    key={product.id} 
                    className="bg-white rounded p-4 border shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                  >
                    <div className="aspect-[4/3] w-full relative group mb-4 flex items-center justify-center bg-white overflow-hidden">
                      {/* Fixed aspect ratio container forces images to line up perfectly */}
                      <img
                        src={localImageUrl}
                        alt={product.title}
                        onError={(e) => { e.currentTarget.src = fallbackUrl; }}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>

                    <div className="flex flex-col flex-grow">
                      <h3 className="text-[15px] font-medium text-gray-900 line-clamp-2 hover:text-[#C7511F] cursor-pointer">
                        {product.title}
                      </h3>

                      {/* Fake Amazon Stars */}
                      <div className="flex items-center mt-1 mb-2">
                        <div className="flex text-[#FFA41C]">
                          <Star fill="currentColor" strokeWidth={0} className="w-[18px] h-[18px]" />
                          <Star fill="currentColor" strokeWidth={0} className="w-[18px] h-[18px]" />
                          <Star fill="currentColor" strokeWidth={0} className="w-[18px] h-[18px]" />
                          <Star fill="currentColor" strokeWidth={0} className="w-[18px] h-[18px]" />
                          <Star fill="currentColor" strokeWidth={0} className="w-[18px] h-[18px] opacity-40" />
                        </div>
                        <span className="text-xs text-[#007185] hover:underline hover:text-[#C7511F] cursor-pointer ml-1 pt-[1px]">
                          {Math.floor(Math.random() * 5000) + 120}
                        </span>
                      </div>

                      {/* Fake Pricing Line */}
                      <div className="flex items-start mb-1">
                        <span className="text-[13px] relative top-[4px]">$</span>
                        <span className="text-[28px] font-medium">{Math.floor(product.price)}</span>
                        <span className="text-[13px] relative top-[4px]">
                          {(product.price % 1).toFixed(2).substring(2)}
                        </span>
                      </div>

                      {/* Prime Logo Mock */}
                      <div className="text-[14px] font-bold text-[#00A8E1] italic tracking-tighter mb-1">
                        prime
                      </div>

                      <div className="text-[12px] text-gray-500 mb-1">
                        FREE delivery <span className="font-bold text-gray-900">Tomorrow</span>
                      </div>

                      <div className="text-[12px] text-[#007185] font-medium mt-auto mb-4 hover:underline cursor-pointer">
                        More Buying Choices
                      </div>

                      <button 
                        onClick={() => addToCart(product)}
                        className="w-full py-2 bg-[#FFD814] hover:bg-[#F7CA00] rounded-full text-[13px] font-medium font-sans shadow-sm transition-colors mt-auto"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
