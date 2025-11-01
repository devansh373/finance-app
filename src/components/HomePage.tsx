

// import Link from "next/link";

// export default function HomePage() {
//   return (
    
//     <main className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-gray-200 p-4 text-center">
      
//       <div className="space-y-6">
        
//         <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
//           Welcome to <span className="text-teal-600">Mini Finance
            
//           </span>
//         </h1>

        
//         <p className="max-w-2xl mx-auto text-lg text-gray-600 sm:text-xl">
//           Your simple and intuitive partner for tracking expenses and managing your financial future.
//         </p>

        
//         <div className="pt-6">
//           <Link
//             href="/products"
//             className="
//               inline-block px-8 py-3 
//               bg-teal-600 text-white text-lg font-semibold 
//               rounded-md shadow-lg 
//               transform transition-all duration-300 
//               hover:scale-105 hover:bg-teal-700 hover:shadow-xl
//               focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500
//             "
//           >
//             See Products
//           </Link>
//         </div>
//       </div>

//     </main>
//   );
// }

// import Link from "next/link";

// export default function HomePage() {
//   return (
//     // Updated background to a dark, sophisticated theme
//     <main className="w-full min-h-screen flex flex-col justify-center items-center bg-gray-900 p-4 text-center">

//       {/* Hero Content Container */}
//       <div className="space-y-8 max-w-4xl">
        
//         {/* Main Heading */}
//         <h1 className="text-5xl font-normal tracking-tight text-white sm:text-6xl md:text-8xl leading-tight">
//           Manage Your <span className="text-indigo-400">Wealth</span>
//           <br className="hidden md:block" /> with <span className="text-teal-400">Confidence</span>
//         </h1>

//         {/* Subtitle/Description */}
//         <p className="max-w-3xl mx-auto text-xl text-gray-400 sm:text-2xl">
//           Your simple, intuitive platform for tracking investments, analyzing market sentiment, and securing your financial future.
//         </p>

//         {/* CTA Button */}
//         <div className="pt-8">
//           <Link
//             href="/products"
//             className="
//               inline-block px-10 py-4 
//               bg-teal-500 text-gray-900 text-xl font-bold 
//               rounded-xl shadow-2xl shadow-teal-500/50
//               transform transition-all duration-300 
//               hover:scale-[1.02] hover:bg-teal-400 
//               focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-teal-500 focus:ring-offset-gray-900
//             "
//           >
//             Start Investing Now →
//           </Link>
//         </div>
        
//         {/* Subtle Feature Highlight */}
//         <div className="pt-4 text-gray-500 text-sm">
//             <p>Access real-time quotes, news, and sentiment analysis.</p>
//         </div>

//       </div>

//     </main>
//   );
// }


// import Link from "next/link";
// import { Zap, TrendingUp, Shield, MessageSquare } from "lucide-react";

// export default function HomePage() {
//   return (
//     // Updated background to a dark, sophisticated theme
//     <main className="w-full min-h-screen flex flex-col items-center bg-gray-900 p-4 pt-20 pb-20 text-center">

//       {/* ===== 1. Hero Section ===== */}
//       <div className="space-y-8 max-w-5xl mb-24">
        
//         {/* Main Heading (Added font-extrabold for stronger impact) */}
//         <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-8xl leading-tight">
//           Master Your <span className="text-indigo-400">Wealth</span>
//           <br className="hidden md:block" /> with <span className="text-teal-400">Intelligent Tools</span>
//         </h1>

//         {/* Subtitle/Description */}
//         <p className1="max-w-3xl mx-auto text-xl text-gray-400 sm:text-2xl">
//           Your simple, intuitive platform for tracking investments, analyzing **real-time market sentiment**, and securing your financial future.
//         </p>

//         {/* CTA Button */}
//         <div className="pt-8">
//           <Link
//             href="/products"
//             className="
//               inline-block px-10 py-4 
//               bg-teal-500 text-gray-900 text-xl font-bold 
//               rounded-xl shadow-2xl shadow-teal-500/50
//               transform transition-all duration-300 
//               hover:scale-[1.05] hover:bg-teal-400 
//               focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-teal-500 focus:ring-offset-gray-900
//             "
//           >
//             Start Investing Now →
//           </Link>
//         </div>
        
//         {/* Subtle Feature Highlight */}
//         <div className="pt-4 text-gray-500 text-sm">
//             <p className="flex items-center justify-center space-x-2">
//                 <Zap size={18} className="text-indigo-400" />
//                 <span>Real-time data | Zero commission fees | Instant setup</span>
//             </p>
//         </div>
//       </div>

//       {/* --- */}

//       {/* ===== 2. Features/Value Proposition Section ===== */}
//       <div className="max-w-6xl mx-auto space-y-16">
//         <h2 className="text-4xl font-bold text-white mb-12">Why Choose Mini Finance?</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
//           {/* Feature Card 1: Real-time Data */}
//           <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition duration-300 hover:border-teal-500 hover:shadow-teal-500/10">
//             <Zap size={32} className="text-teal-400 mb-4" />
//             <h3 className="text-xl font-bold text-white mb-2">Real-Time Insights</h3>
//             <p className="text-gray-400">Access live stock quotes and market updates. Base your decisions on the fastest, most accurate information available.</p>
//           </div>

//           {/* Feature Card 2: Portfolio Tracking */}
//           <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition duration-300 hover:border-indigo-500 hover:shadow-indigo-500/10">
//             <TrendingUp size={32} className="text-indigo-400 mb-4" />
//             <h3 className="text-xl font-bold text-white mb-2">Intelligent Portfolio</h3>
//             <p className="text-gray-400">Track your invested capital, current value, and returns with clear visualizations. Understand your performance instantly.</p>
//           </div>

//           {/* Feature Card 3: AI Assistant */}
//           <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition duration-300 hover:border-emerald-500 hover:shadow-emerald-500/10">
//             <MessageSquare size={32} className="text-emerald-400 mb-4" />
//             <h3 className="text-xl font-bold text-white mb-2">AI-Powered Guidance</h3>
//             <p className="text-gray-400">Get instant answers and market explanations from our integrated chatbot, making complex finance accessible.</p>
//           </div>
//         </div>
//       </div>

//       {/* --- */}

//       {/* ===== 3. Credibility/Testimonial Section (Placeholder) ===== */}
//       <div className="max-w-4xl mx-auto mt-24">
//           <p className="text-2xl font-medium italic text-gray-300">
//               "Mini Finance gave me the confidence to start investing. The **sentiment analysis** feature is a game-changer for timely decisions."
//           </p>
//           <p className="mt-4 text-lg font-semibold text-teal-400">- Satisfied Investor</p>
//       </div>

//     </main>
//   );
// }



import Link from "next/link";
import { Zap, TrendingUp, Shield, MessageSquare, UserCheck, Lock, BarChart2 } from "lucide-react";

export default function HomePage() {
  return (
    // Updated background and padding for a longer page
    <main className="w-full min-h-screen flex flex-col items-center bg-gray-900 p-4 pt-20 pb-40 text-center">

      {/* ===== 1. Hero Section ===== */}
      <div className="space-y-8 max-w-5xl mb-32"> {/* Added more bottom margin */}
        
        {/* Main Heading */}
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl md:text-8xl leading-tight">
          Master Your <span className="text-indigo-400">Wealth</span>
          <br className="hidden md:block" /> with <span className="text-teal-400">Intelligent Tools</span>
        </h1>

        {/* Subtitle/Description */}
        <p className="max-w-3xl mx-auto text-xl text-gray-400 sm:text-2xl">
          Your simple, intuitive platform for tracking investments, analyzing **real-time market sentiment**, and securing your financial future.
        </p>

        {/* CTA Button */}
        <div className="pt-8">
          <Link
            href="/products"
            className="
              inline-block px-10 py-4 
              bg-teal-500 text-gray-900 text-xl font-bold 
              rounded-xl shadow-2xl shadow-teal-500/50
              transform transition-all duration-300 
              hover:scale-[1.05] hover:bg-teal-400 
              focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-teal-500 focus:ring-offset-gray-900
            "
          >
            Start Investing Now →
          </Link>
        </div>
        
        {/* Subtle Feature Highlight */}
        <div className="pt-4 text-gray-500 text-sm">
            <p className="flex items-center justify-center space-x-2">
                <Zap size={18} className="text-indigo-400" />
                <span>Real-time data | Zero commission fees | Instant setup</span>
            </p>
        </div>
      </div>

      {/* --- */}

      {/* ===== 2. "How It Works" Section ===== */}
      <div className="max-w-6xl mx-auto space-y-16 mb-32">
        <h2 className="text-4xl font-bold text-white mb-12">Get Started in Minutes</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-400 text-2xl font-bold mb-4">
                    1
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Create Account</h3>
                <p className="text-gray-400">Sign up securely with just your email and password.</p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-400 text-2xl font-bold mb-4">
                    2
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Explore Products</h3>
                <p className="text-gray-400">Browse real-time data for stocks and other assets.</p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-900/50 border-2 border-indigo-500 text-indigo-400 text-2xl font-bold mb-4">
                    3
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Invest & Track</h3>
                <p className="text-gray-400">Buy assets and monitor your portfolio's performance live.</p>
            </div>
        </div>
      </div>

      {/* --- */}

      {/* ===== 3. Feature Spotlight: Sentiment Analysis ===== */}
      <div className="max-w-6xl mx-auto mb-32 w-full">
        <div className="bg-gray-800 rounded-xl border border-gray-700 shadow-2xl grid grid-cols-1 md:grid-cols-2 items-center overflow-hidden">
            <div className="p-8 md:p-12 text-left">
                <span className="inline-block bg-teal-900/50 text-teal-300 text-sm font-semibold px-3 py-1 rounded-full border border-teal-700 mb-4">
                    Key Feature
                </span>
                <h2 className="text-4xl font-extrabold text-white mb-4">Go Beyond the Numbers</h2>
                <p className="text-lg text-gray-400 mb-6">
                    Our system analyzes **thousands of news articles** and social media posts in real-time to give you a simple **Positive, Negative, or Neutral** sentiment score for every stock. Stop guessing what the market thinks.
                </p>
                <Link href="/products" className="font-bold text-teal-400 hover:text-teal-300 transition-colors text-lg">
                    See It in Action →
                </Link>
            </div>
            <div className="hidden md:flex items-center justify-center p-12 bg-gray-900 h-full">
                {/* Placeholder for an image or graphic */}
                <BarChart2 size={150} className="text-indigo-400 opacity-50" />
            </div>
        </div>
      </div>

      {/* --- */}
      
      {/* ===== 4. Features/Value Proposition Section ===== */}
      <div className="max-w-6xl mx-auto space-y-16 mb-32">
        <h2 className="text-4xl font-bold text-white mb-12">An All-in-One Platform</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          
          {/* Feature Card 1: Real-time Data */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition duration-300 hover:border-teal-500 hover:shadow-teal-500/10">
            <Zap size={32} className="text-teal-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Real-Time Insights</h3>
            <p className="text-gray-400">Access live stock quotes and market updates. Base your decisions on the fastest, most accurate information available.</p>
          </div>

          {/* Feature Card 2: Portfolio Tracking */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition duration-300 hover:border-indigo-500 hover:shadow-indigo-500/10">
            <TrendingUp size={32} className="text-indigo-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Intelligent Portfolio</h3>
            <p className="text-gray-400">Track your invested capital, current value, and returns with clear visualizations. Understand your performance instantly.</p>
          </div>

          {/* Feature Card 3: AI Assistant */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 shadow-xl transition duration-300 hover:border-emerald-500 hover:shadow-emerald-500/10">
            <MessageSquare size={32} className="text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">AI-Powered Guidance</h3>
            <p className="text-gray-400">Get instant answers and market explanations from our integrated chatbot, making complex finance accessible.</p>
          </div>
        </div>
      </div>

      {/* --- */}

      {/* ===== 5. Security & Trust Section ===== */}
      <div className="max-w-6xl mx-auto space-y-16 mb-32">
        <h2 className="text-4xl font-bold text-white mb-12">Your Security is Our Priority</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center space-x-4">
                <Lock size={32} className="text-indigo-400 flex-shrink-0" />
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Data Encryption</h3>
                    <p className="text-gray-400">All your personal information and transactions are secured with end-to-end encryption.</p>
                </div>
            </div>
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 flex items-center space-x-4">
                <UserCheck size={32} className="text-indigo-400 flex-shrink-0" />
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">Secure KYC</h3>
                    <p className="text-gray-400">We follow strict KYC protocols to verify all users, ensuring a safe and compliant platform.</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- */}

      {/* ===== 6. Final Call-to-Action (CTA) ===== */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-white mb-6">Ready to Take Control?</h2>
        <p className="text-xl text-gray-400 mb-10">
            Join thousands of users building their wealth with smarter tools. Get started today.
        </p>
        <Link
            href="/signup"
            className="
              inline-block px-10 py-4 
              bg-teal-500 text-gray-900 text-xl font-bold 
              rounded-xl shadow-2xl shadow-teal-500/50
              transform transition-all duration-300 
              hover:scale-[1.05] hover:bg-teal-400 
              focus:outline-none focus:ring-4 focus:ring-offset-4 focus:ring-teal-500 focus:ring-offset-gray-900
            "
        >
            Sign Up for Free
        </Link>
      </div>
    </main>
  );
}