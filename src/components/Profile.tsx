


"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import Link from "next/link";
import { Trash, Loader2, DollarSign, TrendingUp, TrendingDown } from "lucide-react";
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
    } catch {
      setError("Error fetching data. Please log in again.");
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
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <Loader2 size={32} className="animate-spin text-indigo-400 mr-2" />
        <p>Loading portfolio data...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="bg-rose-900/50 border border-rose-700 text-rose-300 px-6 py-4 rounded-lg text-center font-medium">
          <p>{error}</p>
        </div>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <p>Please log in to view your profile.</p>
      </div>
    );

  
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const returnColor = portfolio && portfolio.returns >= 0 ? "text-emerald-400" : "text-rose-500";
  const returnBg = portfolio && portfolio.returns >= 0 ? "bg-emerald-900/40" : "bg-rose-900/40";


  return (
    
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div>
            <h1 className="text-3xl  text-white">Welcome, {user.name}</h1>
            <p className="text-gray-400 mt-1">{user.email}</p>
          </div>
          <div className="text-right border-l pl-4 border-gray-700">
            <p className="text-gray-500 text-sm">Wallet Balance</p>
            <p className="text-3xl font-bold text-indigo-400">
              {formatCurrency(user.wallet?.balance || 0)}
            </p>
          </div>
        </div>

        {/* KYC Status Banner */}
        {user.kyc?.pan?.status === "Approval_Pending" && (
          <div className="bg-amber-900/40 border border-amber-700 p-4 rounded-xl flex items-center space-x-3 text-amber-200">
            <Loader2 className="animate-spin text-amber-400" size={20} />
            <p className="font-medium">
              Your PAN verification is currently <span className="font-bold underline">Pending Approval</span> from our compliance team. Some features may be restricted until verified.
            </p>
          </div>
        )}

        
        
        {/* Restricted View if PAN is not approved */}
        {user.kyc?.pan?.status !== "Approved" ? (
          <div className="bg-gray-800 p-12 rounded-xl border border-gray-700 shadow-xl text-center space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-amber-900/30 rounded-full">
                <Loader2 className="animate-spin text-amber-500" size={48} />
              </div>
            </div>
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-white">Verification in Progress</h2>
              <p className="text-gray-400 max-w-md mx-auto text-lg">
                Your PAN document is currently under review by our compliance team. 
              </p>
              <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700 max-w-sm mx-auto">
                <p className="text-amber-200 text-sm font-medium">
                  Your profile, portfolio, and watchlist will be fully accessible as soon as your PAN is approved.
                </p>
              </div>
            </div>
            <div className="pt-4">
              <Link 
                href="/" 
                className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-lg shadow-indigo-600/20"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* 1. WELCOME HEADER (Already rendered above if we want, or keep within this block) */}
            {/* 2. INVESTMENT PERFORMANCE */}
            {portfolio && (
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Investment Performance</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg border border-gray-700 bg-gray-900 text-center">
                    <p className="text-gray-400 flex items-center justify-center">
                      <DollarSign size={20} className="mr-1 text-indigo-400" /> Invested Capital
                    </p>
                    <p className="text-2xl font-semibold text-white mt-2">{formatCurrency(portfolio.invested)}</p>
                  </div>
                  <div className="p-4 rounded-lg border border-gray-700 bg-gray-900 text-center">
                    <p className="text-gray-400 flex items-center justify-center">
                      <TrendingUp size={20} className="mr-1 text-teal-400" /> Current Value
                    </p>
                    <p className="text-2xl font-semibold text-white mt-2">{formatCurrency(portfolio.currentValue)}</p>
                  </div>
                  <div className={`p-4 rounded-lg border border-gray-700 text-center ${returnBg}`}>
                    <p className="text-gray-400 flex items-center justify-center">
                      {portfolio.returns >= 0 ? 
                        <TrendingUp size={20} className="mr-1 text-emerald-400" /> : 
                        <TrendingDown size={20} className="mr-1 text-rose-500" />
                      } Total Returns
                    </p>
                    <p className={`text-2xl font-bold mt-2 ${returnColor}`}>
                      {formatCurrency(portfolio.returns)}{" "}
                      {portfolio.returns >= 0 ? "↑" : "↓"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. RECENT TRANSACTIONS */}
            {portfolio && portfolio.transactions.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Recent Transactions</h2>
                <div className="space-y-3">
                  {portfolio.transactions.map((txn) => (
                    <div key={txn._id} className="flex justify-between p-4 bg-gray-900 rounded-lg border border-gray-700 transition-shadow hover:shadow-md">
                      <div>
                        <p className="font-semibold text-white">{txn.product?.name}</p>
                        <p className="text-gray-500 text-sm">{txn.product?.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-gray-300">
                          {txn.meta.units} units @ {formatCurrency(txn.meta.priceAtTxn)}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {new Date(txn.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. WATCHLIST */}
            {watchlist.length > 0 && (
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                  <h2 className="text-2xl font-bold text-white">Watchlist</h2>
                  <Link 
                    href={"/products"} 
                    className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg text-sm text-white font-medium transition"
                  >
                    + Add More Products
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {watchlist.map((p) => (
                    <div key={p._id} className="bg-gray-900 p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                      <div>
                        <Link href={`/products/${p._id}`} className="font-semibold text-teal-400 hover:underline">
                          {p.name}
                        </Link>
                        <p className="text-gray-500 text-sm">{p.category}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <p className="text-gray-300 font-medium">{formatCurrency(p.price)}</p>
                        <button
                          onClick={() => removeFromWatchlist(p._id)}
                          className="text-rose-400 hover:text-white bg-rose-900/50 hover:bg-rose-600 rounded-full p-2 transition"
                          aria-label={`Remove ${p.name} from watchlist`}
                        >
                          <Trash size={15}/>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}