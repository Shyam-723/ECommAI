"use client";
import React from 'react';
import { useStore } from "@/context/StoreContext";
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, cartCount, cartTotal } = useStore();

  return (
    <div className="max-w-[1500px] mx-auto p-4 sm:p-8 flex flex-col lg:flex-row gap-6">
      
      {/* Left Column: Cart Items */}
      <div className="flex-grow bg-white p-6 rounded shadow-sm border border-gray-200">
        <h1 className="text-2xl sm:text-3xl font-normal mb-1">Shopping Cart</h1>
        <p className="text-sm text-[#007185] hover:underline cursor-pointer mb-4 inline-block">Deselect all items</p>
        <div className="text-right text-sm text-gray-500 mb-2 border-b pb-2">Price</div>

        {cart.length === 0 ? (
          <div className="py-10 text-center">
            <h2 className="text-xl font-medium mb-4">Your Amazon Clone Cart is empty.</h2>
            <Link href="/" className="text-[#007185] hover:underline hover:text-[#C7511F]">
              Shop today's deals
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {cart.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b pb-6">
                {/* Image */}
                <div className="w-full sm:w-48 aspect-[4/3] flex-shrink-0 bg-gray-50 flex items-center justify-center p-2">
                  <img
                    src={`/images/product_${item.id}.jpg`}
                    alt={item.title}
                    onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(item.title)}&background=random&size=400`; }}
                    className="max-w-full max-h-full object-contain mix-blend-multiply"
                  />
                </div>
                
                {/* Details */}
                <div className="flex-grow flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-[#007185] line-clamp-2 pr-4">{item.title}</h3>
                    <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
                  </div>
                  
                  <div className="text-xs text-green-700 mt-1 mb-1">In Stock</div>
                  <div className="text-xs text-gray-500 mb-2">Eligible for FREE Shipping</div>
                  
                  <div className="flex items-center gap-4 mt-auto">
                    <div className="bg-[#F0F2F2] border border-[#D5D9D9] rounded-xl flex items-center px-3 py-1 text-sm shadow-sm w-fit">
                      Qty: <span className="font-bold ml-1">{item.quantity}</span>
                    </div>
                    <div className="w-[1px] h-4 bg-gray-300"></div>
                    <button onClick={() => removeFromCart(item.id)} className="text-sm text-[#007185] hover:underline flex items-center gap-1">
                      Delete
                    </button>
                    <div className="w-[1px] h-4 bg-gray-300 hidden sm:block"></div>
                    <button className="text-sm text-[#007185] hover:underline hidden sm:block">Save for later</button>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-right pt-2 text-lg">
              Subtotal ({cartCount} item{cartCount === 1 ? '' : 's'}): <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Right Column: Checkout Sidebar */}
      <div className="w-full lg:w-[300px] flex-shrink-0">
        <div className="bg-white p-6 rounded shadow-sm border border-gray-200">
          <div className="text-lg mb-4">
            Subtotal ({cartCount} item{cartCount === 1 ? '' : 's'}): <span className="font-bold">${cartTotal.toFixed(2)}</span>
          </div>
          <button 
            disabled={cart.length === 0}
            className="w-full py-2 bg-[#FFD814] hover:bg-[#F7CA00] disabled:bg-gray-200 disabled:text-gray-500 disabled:border-transparent border border-[#FCD200] rounded-full text-sm font-medium shadow-sm transition-colors"
          >
            Proceed to checkout
          </button>
        </div>
      </div>

    </div>
  );
}
