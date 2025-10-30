"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Transaction } from "@/types/types";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await api.get("/admin/transactions");
        setTransactions(res.data);
      } catch (err) {
        setError("Failed to fetch transactions.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  if (loading) return <p>Loading transactions...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  if (transactions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <p className="text-gray-500">No transactions found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md text-black">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-6 py-3">User</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Amount</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">{t.userId?.name || "Unknown"}</td>
                <td className="px-6 py-4">{t.type}</td>
                <td className="px-6 py-4">₹ {t.amount}</td>
                <td className="px-6 py-4">
                  {new Date(t.createdAt).toLocaleDateString()}
                </td>
                <td
                  className={`px-6 py-4 font-medium ${
                    t.status === "Completed"
                      ? "text-green-600"
                      : t.status === "Failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {t.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
