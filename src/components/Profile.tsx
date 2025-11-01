// "use client";
// import { useEffect, useState } from "react";
// import api from "@/lib/api";
// import Link from "next/link";
// import { Trash } from "lucide-react";
// import { PortfolioData, Product, User } from "@/types/types";


// export default function ProfilePage() {
//   const [user, setUser] = useState<User>();
//   const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
//   const [watchlist, setWatchlist] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const userRes = await api.get("/auth/profile");
//       setUser(userRes.data);

//       const portfolioRes = await api.get("/transactions/portfolio");
//       setPortfolio(portfolioRes.data);

//       const watchlistRes = await api.get("/transactions/watchlist");
//       setWatchlist(watchlistRes.data);
//     } catch  {
//       setError("Error fetching data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

  
//   const removeFromWatchlist = async (productId: string) => {
//     try {
//       await api.post("/transactions/watchlist/remove", { productId });
//       setWatchlist((prev) => prev.filter((p) => p._id !== productId));
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Loading...</p>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="flex justify-center items-center min-h-screen text-red-500">
//         <p>{error}</p>
//       </div>
//     );

//   if (!user)
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <p>Please log in</p>
//       </div>
//     );

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 text-black">
//       <div className="max-w-6xl mx-auto space-y-6">
        
//         <div className="bg-white p-6 rounded-xl shadow-md flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">Welcome, {user.name}</h1>
//             <p className="text-gray-600">{user.email}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-gray-600">Wallet</p>
//             <p className="text-xl font-semibold">₹{user.wallet?.balance}</p>
//           </div>
//         </div>

        
//         {portfolio && (
//           <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
//             <h2 className="text-xl font-bold text-gray-800">Portfolio Summary</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="bg-blue-50 p-4 rounded-lg text-center">
//                 <p className="text-gray-600">Invested</p>
//                 <p className="text-xl font-semibold">₹{portfolio.invested}</p>
//               </div>
//               <div className="bg-green-50 p-4 rounded-lg text-center">
//                 <p className="text-gray-600">Current Value</p>
//                 <p className="text-xl font-semibold">₹{portfolio.currentValue}</p>
//               </div>
//               <div className={`p-4 rounded-lg text-center ${portfolio.returns >= 0 ? "bg-green-100" : "bg-red-100"}`}>
//                 <p className="text-gray-600">Returns</p>
//                 <p className="text-xl font-semibold">
//                   ₹{portfolio.returns} {portfolio.returns >= 0 ? "↑" : "↓"}
//                 </p>
//               </div>
//             </div>
//           </div>
//         )}

        
//         {portfolio && portfolio.transactions.length > 0 && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Transactions</h2>
//             <div className="space-y-2">
//               {portfolio.transactions.map((txn) => (
//                 <div key={txn._id} className="flex justify-between p-3 bg-gray-50 rounded-lg">
//                   <div>
//                     <p className="font-semibold">{txn.product.name}</p>
//                     <p className="text-gray-500 text-sm">{txn.product.category}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className="text-gray-700">{txn.meta.units} units @ ₹{txn.meta.priceAtTxn}</p>
//                     <p className="text-gray-500 text-sm">{new Date(txn.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

        
//         {watchlist.length > 0 && (
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <div className="flex justify-between">

//             <h2 className="text-xl font-bold text-gray-800 mb-4">Watchlist</h2>
//             <Link href={"/products"} className="bg-teal-600 hover:bg-teal-700 px-2 py-1 rounded-lg text-md  text-white mb-4">Add Products</Link>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               {watchlist.map((p) => (
//                 <div key={p._id} className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
//                   <div>
//                     <p className="font-semibold">{p.name}</p>
//                     <p className="text-gray-500 text-sm">{p.category}</p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <p className="text-gray-700 font-medium">₹{p.price}</p>
//                     <button
//                       onClick={() => removeFromWatchlist(p._id)}
//                       className=" text-white bg-red-500 hover:bg-red-700 rounded-lg p-2  cursor-pointer ml-5"
//                     >
//                       <Trash size={15}/>
                      
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



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

  // Formatting for currency display
  const formatCurrency = (amount: number) => `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const returnColor = portfolio && portfolio.returns >= 0 ? "text-emerald-400" : "text-rose-500";
  const returnBg = portfolio && portfolio.returns >= 0 ? "bg-emerald-900/40" : "bg-rose-900/40";


  return (
    // Main container with dark background
    <div className="min-h-screen p-6 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* ===== Header & Wallet ===== */}
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

        
        {/* ===== Portfolio Summary (Metrics) ===== */}
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

        
        {/* ===== Transactions History ===== */}
        {portfolio && portfolio.transactions.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">Recent Transactions</h2>
            <div className="space-y-3">
              {portfolio.transactions.map((txn) => (
                <div key={txn._id} className="flex justify-between p-4 bg-gray-900 rounded-lg border border-gray-700 transition-shadow hover:shadow-md">
                  <div>
                    <p className="font-semibold text-white">{txn.product.name}</p>
                    <p className="text-gray-500 text-sm">{txn.product.category}</p>
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

        
        {/* ===== Watchlist ===== */}
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
      </div>
    </div>
  );
}