/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";
import { selectedProductAtom } from "@/store/ProductAtom";
import { useAtom } from "jotai";
import {  Zap } from "lucide-react"; 

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  peRatio: number;
  
  displaySymbol?: string;
  description?: string;
  type?: string;
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center h-64">
    
    <div
      className="bg-rose-900/50 border border-rose-700 text-rose-300 px-6 py-4 rounded-lg text-center"
      role="alert"
    >
      <strong className="font-bold flex items-center justify-center mb-1">
        <Zap size={20} className="mr-2" /> Connection Error
      </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [, setSelectedProduct] = useAtom(selectedProductAtom);

  useEffect(() => {
    api
      
      .get("/products/search") 
      .then((res) => {
      
        setProducts(res.data.stocks ? res.data.stocks : res.data);
      })
      .catch(() =>
        setError("Failed to fetch products. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    
    <main className="min-h-screen bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
    
          <h1 className="text-5xl font-normal tracking-tight text-white sm:text-6xl">
            Market <span className="text-indigo-400">Products</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
            Explore real-time data, news, and sentiment for top-traded assets.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((p:any) => (
              <Link
                key={p._id || p.displaySymbol} 
                href={`/products/${p._id ? p._id : p.displaySymbol}`}
                onClick={() => setSelectedProduct(p)}
                className="group block bg-gray-800 rounded-xl border border-gray-700
                           transform transition-all duration-300 shadow-lg
                           hover:shadow-indigo-500/20 hover:border-indigo-500 hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-2">
                    <span className="inline-block bg-indigo-900/50 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full border border-indigo-700">
                      
                      {p.category ? p.category.toUpperCase() : p.type ? p.type.toUpperCase() : "STOCK"}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-white leading-snug">
                 
                    {p.name ? p.name : p.description}
                  </h2>

                 

                  <div className="mt-auto pt-6">
                    <span className="font-semibold text-teal-400 group-hover:text-teal-300 transition-colors flex items-center">
                      View Details 
                      <svg className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}