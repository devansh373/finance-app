"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  peRatio: number;
}

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-teal-500"></div>
  </div>
);

const ErrorDisplay = ({ message }: { message: string }) => (
  <div className="flex justify-center items-center h-64">
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-center"
      role="alert"
    >
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch(() =>
        setError("Failed to fetch products. Please try again later.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Our <span className="text-teal-600">Products</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Explore our curated list of financial products designed to help you
            grow.
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((p) => (
              <Link
                key={p._id}
                href={`/products/${p._id}`}
                className="group block bg-white rounded-xl shadow-md border border-transparent 
                           transform transition-all duration-300 
                           hover:shadow-xl hover:border-teal-500 hover:-translate-y-1"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="mb-2">
                    <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-2.5 py-1 rounded-full">
                      {p.category}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {p.name}
                  </h2>

                  <p className="text-xl font-bold text-gray-800 mt-4">
                    ₹{p.price.toLocaleString("en-IN")}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    P/E Ratio: {p.peRatio}
                  </p>

                  <div className="mt-auto pt-4">
                    <span className="font-semibold text-teal-600 group-hover:underline">
                      View Details →
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
