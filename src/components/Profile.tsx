"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Trash } from "lucide-react";
import { PortfolioData, Product, User } from "@/types/types";


export default function ProfilePage() {
  const [user, setUser] = useState<User>();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [watchlist, setWatchlist] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const userRes = await api.get("/auth/profile");
      setUser(userRes.data);

      const portfolioRes = await api.get("/transactions/portfolio");
      setPortfolio(portfolioRes.data);

      const watchlistRes = await api.get("/transactions/watchlist");
      setWatchlist(watchlistRes.data);
    } catch  {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  
  const removeFromWatchlist = async (productId: string) => {
    try {
      await api.post("/transactions/watchlist/remove", { productId });
      setWatchlist((prev) => prev.filter((p) => p._id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>{error}</p>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Please log in</p>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-black">
      <div className="max-w-6xl mx-auto space-y-6">
        
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Wallet</p>
            <p className="text-xl font-semibold">₹{user.wallet}</p>
          </div>
        </div>

        
        {portfolio && (
          <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Portfolio Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Invested</p>
                <p className="text-xl font-semibold">₹{portfolio.invested}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-gray-600">Current Value</p>
                <p className="text-xl font-semibold">₹{portfolio.currentValue}</p>
              </div>
              <div className={`p-4 rounded-lg text-center ${portfolio.returns >= 0 ? "bg-green-100" : "bg-red-100"}`}>
                <p className="text-gray-600">Returns</p>
                <p className="text-xl font-semibold">
                  ₹{portfolio.returns} {portfolio.returns >= 0 ? "↑" : "↓"}
                </p>
              </div>
            </div>
          </div>
        )}

        
        {portfolio && portfolio.transactions.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Transactions</h2>
            <div className="space-y-2">
              {portfolio.transactions.map((txn) => (
                <div key={txn._id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold">{txn.productId.name}</p>
                    <p className="text-gray-500 text-sm">{txn.productId.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-700">{txn.units} units @ ₹{txn.priceAtTxn}</p>
                    <p className="text-gray-500 text-sm">{new Date(txn.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        
        {watchlist.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between">

            <h2 className="text-xl font-bold text-gray-800 mb-4">Watchlist</h2>
            <Link href={"/products"} className="bg-teal-600 hover:bg-teal-700 px-2 py-1 rounded-lg text-md  text-white mb-4">Add Products</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {watchlist.map((p) => (
                <div key={p._id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-gray-500 text-sm">{p.category}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-700 font-medium">₹{p.price}</p>
                    <button
                      onClick={() => removeFromWatchlist(p._id)}
                      className=" text-white bg-red-500 hover:bg-red-700 rounded-lg p-2  cursor-pointer ml-5"
                    >
                      <Trash size={15}/>
                      
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
