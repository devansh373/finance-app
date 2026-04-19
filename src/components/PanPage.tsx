"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function PanPage() {
  const router = useRouter();

  const [pan, setPan] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan))
      return "Invalid PAN number";
    if (!document) return "Please upload PAN card image";
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(document.type))
      return "Only JPG, PNG or PDF allowed";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validate();
    if (error) {
      setMsg(error);
      return;
    }

    setLoading(true);
    setMsg("");

    try {
      const formData = new FormData();
      formData.append("panNumber", pan);
      formData.append("panImage", document!); 

      await api.post("/auth/kyc/pan", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true, 
      });

      setMsg("PAN verified successfully!");
      
      router.push("/"); 
    } catch (err) {
      if (err instanceof Error) setMsg(err.message || "Error verifying PAN");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">PAN Verification</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">PAN Number</label>
            <input
              type="text"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase())}
              className="w-full border p-2 rounded"
              maxLength={10}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload PAN Card</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={(e) => setDocument(e.target.files?.[0] || null)}
              className="w-fit border rounded-lg p-1 cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded-lg cursor-pointer hover:bg-teal-700 transition"
          >
            {loading ? "Verifying..." : "Verify PAN"}
          </button>
        </form>

        {msg && <p className="text-center text-sm mt-2 text-red-500">{msg}</p>}
      </div>
    </div>
  );
}
