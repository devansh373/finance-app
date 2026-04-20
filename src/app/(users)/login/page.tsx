import LoginPage from "@/components/Login";
import { Suspense } from "react";

export default function page() {
    return(
        <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Loading...</div>}>
            <LoginPage/>
        </Suspense>
    )
}
