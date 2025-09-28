
"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pan, setPan] = useState("");
  const [document, setDocument] = useState<File | null>(null);

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name || name.length < 2) return "Name must be at least 2 characters";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) return "Invalid email";
    if (!password || password.length < 6) return "Password must be at least 6 characters";
    if (!pan || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pan)) return "Invalid PAN number";
    if (!document) return "Please upload a document";
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(document.type)) return "Only JPG, PNG or PDF allowed";
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
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("panNumber", pan);
      formData.append("document", document!);

      await api.post("/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg(" Signup successful! Redirecting...");
      router.push("/")
    } catch (err) {
        if(err instanceof Error)
      setMsg(err.message || "Error signing up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-black">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

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
            <label className="block font-medium mb-1">Upload Document</label>
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
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {msg && <p className="text-center text-sm mt-2 text-red-500">{msg}</p>}
      </div>
    </div>
  );
}
