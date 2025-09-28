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

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [chartData, setChartData] = useState<ChartPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [units, setUnits] = useState<number>(1);
  const [msg, setMsg] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [wallet, setWallet] = useState<number>(0);

  useEffect(() => {
    if (!id) return;

    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setChartData(res.data.chartData);
      })
      .catch(() => setError("Failed to fetch product"))
      .finally(() => setLoading(false));

    api
      .get("/auth/profile")
      .then((res) => {
        setWallet(res.data.wallet);
        setInWatchlist(res.data.watchlist?.includes(id));
      })
      .catch(() => {});
  }, [id]);

  const handleBuy = async (e: React.FormEvent) => {
    e.preventDefault();
    if (units <= 0) {
      setMsg({ type: "error", text: " Units must be greater than 0" });
      return;
    }
    const totalCost = product!.price * units;
    if (totalCost > wallet) {
      setMsg({ type: "error", text: " Insufficient wallet balance" });
      return;
    }
    try {
      const res = await api.post("/transactions/buy", {
        productId: id,
        units,
      });
      setMsg({ type: "success", text: " Purchase successful" });
      setWallet((prev) => prev - totalCost);
      console.log("Txn:", res.data.txn);
    } catch (err) {
      if (err instanceof Error)
        setMsg({ type: "error", text: err.message || "Error buying product" });
    }
  };

  const toggleWatchlist = async () => {
    try {
      if (inWatchlist) {
        await api.post("/transactions/watchlist/remove", { productId: id });
        setMsg({ type: "success", text: "Removed from watchlist" });
        setInWatchlist(false);
      } else {
        await api.post("/transactions/watchlist/add", { productId: id });
        setMsg({ type: "success", text: " Added to watchlist" });
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
  if (!product) return <p className="p-6">Product not found</p>;

  const totalCost = product.price * units;
  const insufficient = totalCost > wallet;

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

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-black">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-gray-500">{product.category}</p>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Wallet</p>
            <p className="text-xl font-semibold">₹{wallet}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">Price</p>
            <p className="text-xl font-semibold">₹{product.price}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600">P/E Ratio</p>
            <p className="text-xl font-semibold">{product.peRatio}</p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Price Chart</h2>
          {chartData.length > 0 ? (
            <Line data={data} />
          ) : (
            <p>No chart data available</p>
          )}
        </div>

        <form onSubmit={handleBuy} className="space-y-3">
          <label className="block font-medium">Units to Buy:</label>
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(Number(e.target.value))}
            min={1}
            className="border p-2 rounded w-32"
          />
          <p
            className={`font-medium ${
              insufficient ? "text-red-600" : "text-gray-600"
            }`}
          >
            Total Cost: ₹{totalCost}
          </p>
          {insufficient && (
            <p className="text-red-500 text-sm"> Insufficient balance</p>
          )}
          <button
            type="submit"
            disabled={units <= 0 || insufficient}
            className={`px-4 py-2 rounded text-white transition cursor-pointer ${
              units > 0 && !insufficient
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Buy
          </button>
        </form>

        <button
          onClick={toggleWatchlist}
          className={`px-4 py-2 rounded transition w-full cursor-pointer ${
            inWatchlist
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
        </button>

        {msg && (
          <p
            className={`p-2 rounded text-sm ${
              msg.type === "success"
                ? "text-green-700 bg-green-50"
                : "text-red-700 bg-red-50"
            }`}
          >
            {msg.text}
          </p>
        )}
      </div>
    </div>
  );
}
