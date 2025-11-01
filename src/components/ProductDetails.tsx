// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import api from "@/lib/api";
// import ChatBot from "./Chatbot";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// interface Product {
//   _id: string;
//   name: string;
//   category: string;
//   price: number;
//   peRatio: number;
// }

// interface ChartPoint {
//   date: string;
//   value: number;
// }

// interface NewsItem {
//   headline: string;
//   summary: string;
//   url: string;
//   source: string;
//   datetime: number;
//   sentimentScore: number;
//   sentimentLabel: "positive" | "neutral" | "negative";
// }

// export default function ProductDetailPage() {
//   const { id } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [chartData, setChartData] = useState<ChartPoint[]>([]);
//   const [quote, setQuote] = useState<any>(null);
//   const [news, setNews] = useState<NewsItem[]>([]);
//   const [overallSentiment, setOverallSentiment] = useState<string>("neutral");
//   const [averageScore, setAverageScore] = useState<string>("0");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [units, setUnits] = useState<number>(1);
//   const [msg, setMsg] = useState<{
//     type: "success" | "error";
//     text: string;
//   } | null>(null);
//   const [inWatchlist, setInWatchlist] = useState(false);
//   const [wallet, setWallet] = useState<number>();

//   useEffect(() => {
//     if (!id) return;

//     // Fetch product details
//     // api
//     //   .get(`/products/${id}`)
//     //   .then((res) => {
//     //     setProduct(res.data.product);
//     //     setChartData(res.data.chartData);
//     //   })
//     //   .catch(() => setError("Failed to fetch product"))
//     //   .finally(() => setLoading(false));

//     // Fetch wallet + watchlist
//     api
//       .get("/auth/profile")
//       .then((res) => {
//         if (!res.data.wallet)
//           setMsg({
//             type: "error",
//             text: "Please log in",
//           });
//         setWallet(res.data.wallet.balance);
//         setInWatchlist(res.data.watchlist?.includes(id));
//       })
//       .catch(() => {});
//   }, [id]);

//   // Fetch real-time quote and news + sentiment
//   useEffect(() => {
//     // if (!product?.name) return;
//     // const symbol = product.name.toUpperCase();
//     const symbol = id;

//     const fetchQuoteAndNews = async () => {
//       try {
//         const [quoteRes, newsRes] = await Promise.all([
//           api.get(`/products/quote/${symbol}`),
//           api.get(`/news/company/${symbol}`),
//           // api.get(`/products/quote/TSLA`),
//           // api.get(`/news/company/TSLA`),
//         ]);
//         setQuote(quoteRes.data.quote);
//         setNews(newsRes.data.news || []);
//         setOverallSentiment(newsRes.data.overallSentiment);
//         setAverageScore(newsRes.data.averageScore);
//       } catch (err) {
//         console.error("Error fetching quote/news", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuoteAndNews();

//     // const interval = setInterval(() => fetchQuoteAndNews(), 10000);
//     // return () => clearInterval(interval);
//   }, [product?.name]);

//   const handleBuy = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (units <= 0) {
//       setMsg({ type: "error", text: "Units must be greater than 0" });
//       return;
//     }
//     const totalCost = product
//       ? product.price * units
//       : quote?.c?.toFixed(2) * units;
//     if (wallet && totalCost > wallet) {
//       setMsg({ type: "error", text: "Insufficient wallet balance" });
//       return;
//     }
//     try {
//       if (!wallet) {
//         setMsg({ type: "error", text: "Error buying product, Please Login" });
//         return;
//       }
//       const res = await api.post("/transactions/buy", { productId: id, units });
//       setMsg({ type: "success", text: "Purchase successful" });
//       setWallet((prev) => prev - totalCost);
//       console.log("Txn:", res.data.txn);
//     } catch (err) {
//       if (err instanceof Error)
//         setMsg({ type: "error", text: err.message || "Error buying product" });
//     }
//   };

//   const toggleWatchlist = async () => {
//     try {
//       if (!wallet) {
//         setMsg({ type: "error", text: "Error adding product, Please Login" });
//         return;
//       }
//       if (inWatchlist) {
//         await api.post("/transactions/watchlist/remove", { productId: id });
//         setMsg({ type: "success", text: "Removed from watchlist" });
//         setInWatchlist(false);
//       } else {
//         await api.post("/transactions/watchlist/add", { productId: id });
//         setMsg({ type: "success", text: "Added to watchlist" });
//         setInWatchlist(true);
//       }
//     } catch (err) {
//       if (err instanceof Error)
//         setMsg({
//           type: "error",
//           text: err.message || "Error updating watchlist",
//         });
//     }
//   };

//   if (loading) return <p className="p-6">Loading product...</p>;
//   if (error) return <p className="p-6 text-red-500">{error}</p>;
//   // if (!product) return <p className="p-6">Product not found</p>;

//   const totalCost = product
//     ? product.price * units
//     : quote?.c?.toFixed(2) * units;
//   const insufficient = wallet && totalCost > wallet;

//   const data = {
//     labels: chartData.map((c) => c.date),
//     datasets: [
//       {
//         label: "Price",
//         data: chartData.map((c) => c.value),
//         borderColor: "rgb(34,197,94)",
//         backgroundColor: "rgba(34,197,94,0.2)",
//         tension: 0.3,
//       },
//     ],
//   };

//   // 🎨 Helper for sentiment color
//   const sentimentColor =
//     overallSentiment === "positive"
//       ? "text-green-600"
//       : overallSentiment === "negative"
//       ? "text-red-600"
//       : "text-gray-600";

//   return (
//     <div className="min-h-screen p-4 md:p-6 bg-gray-50 text-black">
//       <div className="max-w-5xl mx-auto space-y-6">
//         {/* ===== Header (Unchanged) ===== */}
//         <div className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl font-bold">{product?.name}</h1>
//             <p className="text-gray-500">{product?.category}</p>
//           </div>
//           <div className="text-right">
//             <p className="text-gray-600">Wallet</p>
//             <p className="text-xl font-semibold">
//               {wallet ? `₹${wallet}` : "Please Login"}
//             </p>
//           </div>
//         </div>

//         {/* ===== Metrics (Unchanged) ===== */}
//         <div className="grid md:grid-cols-4 gap-4">
//           <div className="bg-white p-4 rounded-xl shadow">
//             <p className="text-gray-500">Current Price</p>
//             <p className="text-2xl font-bold text-green-600">
//               ₹{quote?.c?.toFixed(2) || product.price}
//             </p>
//             <p className="text-sm text-gray-400">
//               Change: {quote?.d?.toFixed(2)} ({quote?.dp?.toFixed(2)}%)
//             </p>
//           </div>
//           <div className="bg-white p-4 rounded-xl shadow">
//             <p className="text-gray-500">P/E Ratio</p>
//             <p className="text-2xl font-bold">{product?.peRatio}</p>
//           </div>
//           <div className="bg-white p-4 rounded-xl shadow">
//             <p className="text-gray-500">Day Range</p>
//             <p className="text-sm">
//               <span className="font-semibold">Low:</span> {quote?.l || "--"} |{" "}
//               <span className="font-semibold">High:</span> {quote?.h || "--"}
//             </p>
//           </div>
//           <div className="bg-white p-4 rounded-xl shadow">
//             <p className="text-gray-500">Overall Sentiment</p>
//             <p className={`text-2xl font-bold capitalize ${sentimentColor}`}>
//               {overallSentiment}
//             </p>
//             <p className="text-sm text-gray-400">Avg Score: {averageScore}</p>
//           </div>
//         </div>

//         {/* ===== New Two-Column Layout for Main Content and News (Starts Here) ===== */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column: Chart and Buy Section (Takes 2/3 width on large screens) */}
//           <div className="lg:col-span-2 space-y-6">
//             {/* ===== Chart (Unchanged) ===== */}
//             <div className="bg-white p-6 rounded-xl shadow">
//               <h2 className="text-xl font-bold mb-3">Price Chart</h2>
//               {chartData.length > 0 ? (
//                 <Line data={data} />
//               ) : (
//                 <p>No chart data</p>
//               )}
//             </div>

//             {/* ===== Buy Section (Unchanged) ===== */}
//             {wallet ? (
//               <div className="bg-white p-6 rounded-xl shadow space-y-3">
//                 <h2 className="text-xl font-bold mb-2">Buy Stock</h2>
//                 <form onSubmit={handleBuy} className="space-y-3">
//                   <label className="block font-medium">Units to Buy:</label>
//                   <input
//                     type="number"
//                     value={units}
//                     onChange={(e) => setUnits(Number(e.target.value))}
//                     min={1}
//                     className="border p-2 rounded w-32"
//                   />
//                   <p
//                     className={`font-medium ${
//                       insufficient ? "text-red-600" : "text-gray-600"
//                     }`}
//                   >
//                     Total Cost: ₹{totalCost}
//                   </p>
//                   {insufficient && (
//                     <p className="text-red-500 text-sm">Insufficient balance</p>
//                   )}
//                   <button
//                     type="submit"
//                     disabled={units <= 0 || insufficient}
//                     className={`px-4 py-2 rounded text-white transition cursor-pointer ${
//                       units > 0 && !insufficient
//                         ? "bg-green-600 hover:bg-green-700"
//                         : "bg-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     Buy
//                   </button>
//                 </form>

//                 <button
//                   onClick={toggleWatchlist}
//                   className={`px-4 py-2 rounded transition w-full cursor-pointer ${
//                     inWatchlist
//                       ? "bg-red-500 text-white hover:bg-red-600"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//                 >
//                   {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
//                 </button>

//                 {msg && (
//                   <p
//                     className={`p-2 rounded text-sm ${
//                       msg.type === "success"
//                         ? "text-green-700 bg-green-50"
//                         : "text-red-700 bg-red-50"
//                     }`}
//                   >
//                     {msg.text}
//                   </p>
//                 )}
//               </div>
//             ) : (
//               <div>Please Login to start buying</div>
//             )}
//           </div>

//           {/* Right Column: Related News + Sentiment (Takes 1/3 width on large screens) */}
//           <div className="lg:col-span-1">
//             {/* ===== Related News + Sentiment (Moved and adapted) ===== */}
//             <div className="bg-white p-6 rounded-xl shadow h-full">
//               <h2 className="text-xl font-bold mb-4">
//                 Related News & Sentiment
//               </h2>
//               {news.length === 0 ? (
//                 <p className="text-gray-500">No recent news available.</p>
//               ) : (
//                 <div className="space-y-4 divide-y">
//                   {news.slice(0, 5).map((item, idx) => (
//                     <a
//                       key={idx}
//                       href={item.url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block pt-3 hover:bg-gray-50 transition rounded-md p-2 -mx-2" // Added -mx-2 to make hover effect look better
//                     >
//                       <h3 className="font-semibold text-base">
//                         {item.headline}
//                       </h3>
//                       <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                         {item.summary || "No summary available"}
//                       </p>
//                       <div className="flex justify-between items-center text-xs mt-2">
//                         <span className="text-gray-400">{item.source}</span>
//                         <span
//                           className={`capitalize font-semibold ${
//                             item.sentimentLabel === "positive"
//                               ? "text-green-600"
//                               : item.sentimentLabel === "negative"
//                               ? "text-red-600"
//                               : "text-gray-500"
//                           }`}
//                         >
//                           {item.sentimentLabel}
//                         </span>
//                       </div>
//                     </a>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//         {/* ===== New Two-Column Layout for Main Content and News (Ends Here) ===== */}
//       </div>
//       <ChatBot />
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import api from "@/lib/api";
import ChatBot from "./Chatbot";
import { useAtom } from "jotai";
import { selectedProductAtom } from "@/store/ProductAtom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  peRatio: number;
}

interface ChartPoint {
  date: string;
  value: number;
}

interface NewsItem {
  headline: string;
  summary: string;
  url: string;
  source: string;
  datetime: number;
  sentimentScore: number;
  sentimentLabel: "positive" | "neutral" | "negative";
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [quote, setQuote] = useState<any>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [overallSentiment, setOverallSentiment] = useState<string>("neutral");
  const [averageScore, setAverageScore] = useState<string>("0");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [units, setUnits] = useState<number>(1);
  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [wallet, setWallet] = useState<number>();
  const [selectedProduct,] = useAtom(selectedProductAtom)

  useEffect(() => {
    if (!id) return;
    

    // Fetch product details
    // api
    // 	.get(`/products/${id}`)
    // 	.then((res) => {
    // 		setProduct(res.data.product);
    // 		setChartData(res.data.chartData);
    // 	})
    // 	.catch(() => setError("Failed to fetch product"))
    // 	.finally(() => setLoading(false));

    // Fetch wallet + watchlist
    api
      .get("/auth/profile")
      .then((res) => {
        if (!res.data.wallet)
          setMsg({
            type: "error",
            text: "Please log in",
          });
        setWallet(res.data.wallet.balance);
        setInWatchlist(res.data.watchlist?.includes(id));
      })
      .catch(() => {});
  }, [id]);

  // Fetch real-time quote and news + sentiment
  useEffect(() => {
    // if (!product?.name) return;
    // const symbol = product.name.toUpperCase();
    const symbol = id;

    const fetchQuoteAndNews = async () => {
      try {
        const [quoteRes, newsRes] = await Promise.all([
          api.get(`/products/quote/${symbol}`),
          api.get(`/news/company/${symbol}`),
          // api.get(`/products/quote/TSLA`),
          // api.get(`/news/company/TSLA`),
        ]);
        setQuote(quoteRes.data.quote);
        setNews(newsRes.data.news || []);
        setOverallSentiment(newsRes.data.overallSentiment);
        setAverageScore(newsRes.data.averageScore);
      } catch (err) {
        console.error("Error fetching quote/news", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuoteAndNews();

    // const interval = setInterval(() => fetchQuoteAndNews(), 10000);
    // return () => clearInterval(interval);
  }, [product?.name]);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (units <= 0) {
      setMsg({ type: "error", text: "Units must be greater than 0" });
      return;
    }
    const totalCost = product
      ? product.price * units
      : quote?.c?.toFixed(2) * units;
    if (wallet && totalCost > wallet) {
      setMsg({ type: "error", text: "Insufficient wallet balance" });
      return;
    }
    try {
      if (!wallet) {
        setMsg({ type: "error", text: "Error buying product, Please Login" });
        return;
      }
      const res = await api.post("/transactions/buy", { productId: id, units });
      setMsg({ type: "success", text: "Purchase successful" });
      setWallet((prev) => prev - totalCost);
      console.log("Txn:", res.data.txn);
    } catch (err) {
      if (err instanceof Error)
        setMsg({ type: "error", text: err.message || "Error buying product" });
    }
  };

  const toggleWatchlist = async () => {
    try {
      if (!wallet) {
        setMsg({ type: "error", text: "Error adding product, Please Login" });
        return;
      }
      if (inWatchlist) {
        await api.post("/transactions/watchlist/remove", { productId: id });
        setMsg({ type: "success", text: "Removed from watchlist" });
        setInWatchlist(false);
      } else {
        await api.post("/transactions/watchlist/add", { productId: id });
        setMsg({ type: "success", text: "Added to watchlist" });
        setInWatchlist(true);
      }
    } catch (err) {
      if (err instanceof Error)
        setMsg({
          type: "error",
          text: err.message || "Error updating watchlist",
        });
    }
  };

  if (loading) return <p className="p-6">Loading product...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  // if (!product) return <p className="p-6">Product not found</p>;

  const totalCost = product
    ? product.price * units
    : quote?.c?.toFixed(2) * units;
  const insufficient = wallet && totalCost > wallet;

  const data = {
    labels: chartData.map((c) => c.date),
    datasets: [
      {
        label: "Price",
        data: chartData.map((c) => c.value),
        borderColor: "rgb(34,197,94)",
        backgroundColor: "rgba(34,197,94,0.2)",
        tension: 0.3,
      },
    ],
  };

  // 🎨 Helper for sentiment color
  const sentimentColor =
    overallSentiment === "positive"
      ? "text-emerald-400" // Brighter green for contrast
      : overallSentiment === "negative"
      ? "text-rose-500" // Brighter red for contrast
      : "text-gray-400"; // Lighter gray for neutral

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-900 text-white">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* ===== Header ===== */}
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-normal text-white">
              {product?product.name:selectedProduct?.description || "Product Name"}
            </h1>
            <p className="text-gray-400 mt-1 text-lg">
              {product?product.category:selectedProduct?.type || "Category"}
            </p>
          </div>
          <div className="text-right border-l pl-4 border-gray-700">
            <p className="text-gray-500 text-sm">Wallet Balance</p>
            <p className="text-2xl font-bold text-indigo-400">
              {wallet ? `₹${wallet.toFixed(2)}` : "Please Login"}
            </p>
          </div>
        </div>

        {/* --- */}
        
        {/* ===== Metrics ===== */}
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm font-medium">Current Price</p>
            <p className="text-3xl  text-emerald-400 mt-1">
              ₹{quote?.c?.toFixed(2) || product?.price?.toFixed(2) || "--"}
            </p>
            <p
              className={`text-sm mt-1 ${
                (quote?.d > 0) ? 'text-emerald-400' : (quote?.d < 0) ? 'text-rose-500' : 'text-gray-400'
              }`}
            >
              Change: {quote?.d?.toFixed(2) || "0.00"} (
              {quote?.dp?.toFixed(2) || "0.00"}%)
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm font-medium">P/E Ratio</p>
            <p className="text-3xl  text-white mt-1">
              {product?.peRatio || "--"}
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm font-medium">Day Range</p>
            <p className="text-lg mt-1 space-y-1">
              <span className="font-semibold text-gray-300 block">
                Low: {quote?.l || "--"}
              </span>
              <span className="font-semibold text-gray-300 block">
                High: {quote?.h || "--"}
              </span>
            </p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm font-medium">Overall Sentiment</p>
            <p className={`text-3xl text-white capitalize mt-1 ${sentimentColor}`}>
              {overallSentiment}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Avg Score: <span className="text-white">{averageScore}</span>
            </p>
          </div>
        </div>
        
        {/* --- */}

        {/* ===== New Two-Column Layout for Main Content and News ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Chart and Buy Section (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* ===== Chart ===== */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
              <h2 className="text-xl font-bold mb-3 text-white">Price Chart</h2>
              {chartData.length > 0 ? (
                <Line data={data} />
              ) : (
                <p className="text-gray-400">No chart data available for this period.</p>
              )}
            </div>

            {/* ===== Buy Section ===== */}
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 space-y-4">
              <h2 className="text-xl font-bold text-white">Trade Stock</h2>
              {wallet ? (
                <>
                  <form onSubmit={handleBuy} className="space-y-4">
                    <label className="block font-medium text-gray-300">
                      Units to Buy:
                    </label>
                    <input
                      type="number"
                      value={units}
                      onChange={(e) => setUnits(Number(e.target.value))}
                      min={1}
                      className="border border-gray-600 bg-gray-900 p-3 rounded-lg w-full max-w-xs text-white focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <p
                      className={`font-semibold text-lg ${
                        insufficient ? "text-rose-500" : "text-gray-300"
                      }`}
                    >
                      Total Cost: ₹{totalCost.toFixed(2)}
                    </p>
                    {insufficient && (
                      <p className="text-rose-500 text-sm font-medium">
                        Insufficient wallet balance.
                      </p>
                    )}
                    <button
                      type="submit"
                      disabled={units <= 0 || insufficient}
                      className={`px-6 py-3 rounded-lg font-bold text-white transition duration-200 w-full sm:w-auto ${
                        units > 0 && !insufficient
                          ? "bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-600/30"
                          : "bg-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Buy {units} Unit(s)
                    </button>
                  </form>

                  <button
                    onClick={toggleWatchlist}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 w-full ${
                      inWatchlist
                        ? "bg-rose-500 text-white hover:bg-rose-600 border border-rose-500"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 border border-indigo-600"
                    }`}
                  >
                    {inWatchlist ? "★ Remove from Watchlist" : "☆ Add to Watchlist"}
                  </button>

                  {msg && (
                    <p
                      className={`p-3 rounded-lg text-sm font-medium ${
                        msg.type === "success"
                          ? "text-emerald-300 bg-emerald-900/50 border border-emerald-700"
                          : "text-rose-300 bg-rose-900/50 border border-rose-700"
                      }`}
                    >
                      {msg.text}
                    </p>
                  )}
                </>
              ) : (
                <p className="text-rose-400">
                  **Please Login** to view your wallet and start trading.
                </p>
              )}
            </div>
          </div>

          {/* Right Column: Related News + Sentiment (1/3 width) */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 h-full">
              <h2 className="text-xl font-bold mb-4 text-white border-b border-gray-700 pb-3">
                Related News & Analysis
              </h2>
              {news.length === 0 ? (
                <p className="text-gray-500">No recent news available.</p>
              ) : (
                <div className="space-y-3">
                  {news.slice(0, 5).map((item, idx) => (
                    <a
                      key={idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-3 -mx-3 rounded-lg hover:bg-gray-700 transition duration-150 border-b border-gray-700 last:border-b-0"
                    >
                      <h3 className="font-semibold text-gray-200 text-base leading-snug">
                        {item.headline}
                      </h3>
                      <div className="flex justify-between items-center text-xs mt-2">
                        <span
                          className={`uppercase font-bold text-xs px-2 py-0.5 rounded ${
                            item.sentimentLabel === "positive"
                              ? "bg-emerald-900/50 text-emerald-400"
                              : item.sentimentLabel === "negative"
                              ? "bg-rose-900/50 text-rose-400"
                              : "bg-gray-700 text-gray-400"
                          }`}
                        >
                          {item.sentimentLabel}
                        </span>
                        <span className="text-gray-500">
                          {item.source} ·{" "}
                          {new Date(item.datetime * 1000).toLocaleDateString()}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ChatBot />
    </div>
  );
}