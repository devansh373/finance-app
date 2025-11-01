// "use client";
// import { useState } from "react";
// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isValidEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMsg("");

//     if (!email || !isValidEmail(email)) {
//       setMsg("Please enter a valid email");
//       return;
//     }

//     if (!password) {
//       setMsg("Please enter your password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", { email, password });

//       const user = res.data.user;

//       setMsg("Login successful");

//       if (user.role === "ADMIN") {
//         router.push("/admin/dashboard");
//       } else {
//         router.push("/");
//       }
//     } catch (err) {
//       if (err instanceof Error) setMsg(err.message || "Error logging in");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
//       <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md min-h-100">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
//           Login
//         </h1>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               required
//               className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               required
//               className="text-black w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-teal-600 hover:bg-teal-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition-colors disabled:opacity-50"
//           >
//             {loading ? "Logging in..." : "Login"}
//           </button>
//         </form>

//         {msg && (
//           <p
//             className={`mt-4 text-center ${
//               msg.includes("successful") ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {msg}
//           </p>
//         )}
//         <Link
//           href={"/signup"}
//           className=" text-teal-500 underline hover:no-underline ml-38 block mt-5 p-2 rounded-lg "
//         >
//           Sign Up
//         </Link>
//       </div>
//     </div>
//   );
// }




"use client";
import { useState } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");

    if (!email || !isValidEmail(email)) {
      setMsg("Please enter a valid email");
      return;
    }

    if (!password) {
      setMsg("Please enter your password");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      const user = res.data.user;

      setMsg("Login successful");

      if (user.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (err) {
      if (err instanceof Error) setMsg(err.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  // Helper to determine message type for styling
  const isSuccess = msg.includes("successful");

  return (
    // Updated background to a dark gray
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      {/* Updated card background, border, and shadow for the dark theme */}
      <div className="bg-gray-800 border border-gray-700 shadow-2xl rounded-xl p-8 w-full max-w-md">
        
        {/* Title color changed to white/accent */}
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          
          {/* Email Input */}
          <div>
            {/* Label text color changed */}
            <label className="block text-gray-400 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              // Input styling changed for dark mode
              className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password Input */}
          <div>
            {/* Label text color changed */}
            <label className="block text-gray-400 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              // Input styling changed for dark mode
              className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            // Button colors updated: Teal-500/Indigo for contrast, text-gray-900 for high-contrast text
            className="w-full bg-teal-500 hover:bg-teal-400 cursor-pointer text-gray-900 font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Message Area - Updated colors for dark theme feedback */}
        {msg && (
          <p
            className={`mt-4 p-3 rounded-lg text-center font-medium ${
              isSuccess 
                ? "text-emerald-300 bg-emerald-900/50" 
                : "text-rose-300 bg-rose-900/50"
            }`}
          >
            {msg}
          </p>
        )}
        
        {/* Sign Up Link - Updated color for link contrast */}
        <Link
          href={"/signup"}
          className="text-indigo-400 hover:text-indigo-300 underline hover:no-underline text-center block mt-5 p-2 rounded-lg"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}


// "use client";
// import { useState } from "react";
// import api from "@/lib/api";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Loader2, Mail, Lock } from "lucide-react"; // Import icons for better UX

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");
//   const [loading, setLoading] = useState(false);

//   const isValidEmail = (email: string) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMsg("");

//     if (!email || !isValidEmail(email)) {
//       setMsg("Please enter a valid email");
//       return;
//     }

//     if (!password) {
//       setMsg("Please enter your password");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", { email, password });

//       const user = res.data.user;

//       setMsg("Login successful");

//       if (user.role === "ADMIN") {
//         router.push("/admin/dashboard");
//       } else {
//         router.push("/");
//       }
//     } catch (err) {
//       if (err instanceof Error) setMsg(err.message || "Error logging in");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper to determine message type for styling
//   const isSuccess = msg.includes("successful");

//   return (
//     // Updated background to match the overall dark theme
//     <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
//       {/* Login Card */}
//       <div className="bg-gray-800 border border-gray-700 shadow-2xl rounded-xl p-8 md:p-10 w-full max-w-md">
//         <h1 className="text-3xl font-extrabold mb-8 text-white text-center">
//           <span className="text-indigo-400">Mini Finance</span> Login 🔑
//         </h1>

//         <form onSubmit={handleLogin} className="space-y-6">
//           {/* Email Input */}
//           <div>
//             <div className="relative">
//             <label htmlFor="email" className="block text-gray-400 font-medium mb-2 text-sm">
//               Email Address
//               <Mail size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             </label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="you@example.com"
//                 required
//                 className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//               />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div>
//             <label htmlFor="password" className="block text-gray-400 font-medium mb-2 text-sm">
//               Password
//               <Lock size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             </label>
//             <div className="relative">
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 required
//                 className="w-full pl-10 pr-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
//               />
//             </div>
//           </div>

//           {/* Login Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
//               loading
//                 ? "bg-gray-600 cursor-not-allowed"
//                 : "bg-teal-500 text-gray-900 hover:bg-teal-400 shadow-lg shadow-teal-500/30"
//             }`}
//           >
//             {loading ? (
//               <>
//                 <Loader2 size={20} className="animate-spin" />
//                 <span>Logging in...</span>
//               </>
//             ) : (
//               <span>Login</span>
//             )}
//           </button>
//         </form>

//         {/* Message Area */}
//         {msg && (
//           <p
//             className={`mt-6 p-3 rounded-lg text-center font-medium ${
//               isSuccess
//                 ? "text-emerald-300 bg-emerald-900/50 border border-emerald-700"
//                 : "text-rose-300 bg-rose-900/50 border border-rose-700"
//             }`}
//           >
//             {msg}
//           </p>
//         )}

//         {/* Sign Up Link */}
//         <p className="mt-6 text-center text-gray-400 text-sm">
//           Don't have an account?{" "}
//           <Link
//             href={"/signup"}
//             className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors underline hover:no-underline"
//           >
//             Sign Up Now
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

