"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AadhaarPage() {
  const router = useRouter();

  const [aadhaar, setAadhaar] = useState("");
  const [document, setDocument] = useState<File | null>(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!aadhaar || !/^[0-9]{12}$/.test(aadhaar))
      return "Invalid Aadhaar number";
    if (!document) return "Please upload Aadhaar card image";
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
      formData.append("aadharNumber", aadhaar);
      formData.append("aadhaarImage", document!); // must match backend upload.single("aadhaarImage")

      await api.post("/auth/kyc/aadhaar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setMsg("Aadhaar verified successfully!");
      router.push("/profile"); // final redirect
    } catch (err) {
      if (err instanceof Error) setMsg(err.message || "Error verifying Aadhaar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Aadhaar Verification</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Aadhaar Number</label>
            <input
              type="text"
              value={aadhaar}
              onChange={(e) => setAadhaar(e.target.value)}
              className="w-full border p-2 rounded"
              maxLength={12}
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Upload Aadhaar Card</label>
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
            {loading ? "Verifying..." : "Verify Aadhaar"}
          </button>
        </form>

        {msg && <p className="text-center text-sm mt-2 text-red-500">{msg}</p>}
      </div>
    </div>
  );
}
