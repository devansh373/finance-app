

import Link from "next/link";

export default function HomePage() {
  return (
    
    <main className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 text-center">
      
      <div className="space-y-6">
        
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Welcome to <span className="text-teal-600">Mini Finance
            
          </span>
        </h1>

        
        <p className="max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
          Your simple and intuitive partner for tracking expenses and managing your financial future.
        </p>

        
        <div className="pt-6">
          <Link
            href="/products"
            className="
              inline-block px-8 py-3 
              bg-teal-600 text-white text-lg font-semibold 
              rounded-md shadow-lg 
              transform transition-all duration-300 
              hover:scale-105 hover:bg-teal-700 hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
            "
          >
            See Products
          </Link>
        </div>
      </div>

    </main>
  );
}