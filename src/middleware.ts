// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "";

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;
//   // console.log(pathname.startsWith("/profile"))

//   // Protect admin + kyc routes
//   if (pathname.startsWith("/admin") || pathname.startsWith("/kyc") ||pathname.startsWith("/profile")) {
//     if (!token) {
//       const loginUrl = new URL("/login", req.url);
//       loginUrl.searchParams.set("reason", "unauthorized");
//       loginUrl.searchParams.set("next", pathname);
//       return NextResponse.redirect(loginUrl);
//     }

//     try {
//       const decoded = verify(token, JWT_SECRET) as {
//         id: string;
//         role: string;
//         kyc?: {
//           pan?: { status: string };
//           aadhaar?: { status: string };
//         };
//       };

//       // ✅ Admin routes must have role=ADMIN
//       if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
//         const loginUrl = new URL("/login", req.url);
//         loginUrl.searchParams.set("reason", "forbidden");
//         return NextResponse.redirect(loginUrl);
//       }

//       // ✅ KYC routes: block if already submitted/approved
//       if (pathname.startsWith("/kyc")) {
//         const isPanPage = pathname.includes("pan");
//         const isAadhaarPage = pathname.includes("aadhaar");

//         if (isPanPage && decoded.kyc?.pan?.status && decoded.kyc.pan.status !== "Rejected") {
//           return NextResponse.redirect(new URL("/profile", req.url));
//         }

//         if (isAadhaarPage && decoded.kyc?.aadhaar?.status && decoded.kyc.aadhaar.status !== "Rejected") {
//           return NextResponse.redirect(new URL("/profile", req.url));
//         }
//       }

//       // add profile protection if kyc not done

//       return NextResponse.next();
//     } catch (err) {
//       console.error("JWT verify error:", err);
//       const loginUrl = new URL("/login", req.url);
//       loginUrl.searchParams.set("reason", "invalid-token");
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   runtime: "nodejs",
//   matcher: ["/admin/:path*", "/kyc/:path*","/profile/:path*"],
// };

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";
import api from "./lib/api";

const JWT_SECRET = process.env.JWT_SECRET || "";

// ⚙️ A small helper to fetch user info from your API
async function getUserKyc(token: string) {
  try {
    const res = await api.get(`/auth/profile`, { headers: { Cookie: `token=${token}` } });
    console.log(res.data);
    return res.data?.kyc;
  } catch (err) {
    console.error("Error fetching user from API:", err);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/kyc") ||
    pathname.startsWith("/profile")
  ) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("reason", "unauthorized");
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = verify(token, JWT_SECRET) as { id: string; role: string };

      // ✅ Block /admin for non-admin users
      if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("reason", "forbidden");
        return NextResponse.redirect(loginUrl);
      }

      // ✅ Fetch user KYC from API or DB
      const kyc = await getUserKyc(token);

      const kycStatus = kyc?.pan?.status;

      // ✅ Protect profile route
      if (pathname.startsWith("/profile")) {
        // Allow access if Approved OR Approval_Pending (so they can see the "In Progress" screen)
        if (!kycStatus || (kycStatus !== "Approved" && kycStatus !== "Approval_Pending")) {
          return NextResponse.redirect(new URL("/kyc/pan", req.url));
        }
      }

      // ✅ Prevent accessing KYC form if already submitted/approved
      if (pathname.startsWith("/kyc/pan")) {
        if (kycStatus === "Approved" || kycStatus === "Approval_Pending") {
          return NextResponse.redirect(new URL("/profile", req.url));
        }
      }

      return NextResponse.next();
    } catch (err) {
      console.error("JWT verify error:", err);
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("reason", "invalid-token");
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/admin/:path*", "/kyc/:path*", "/profile/:path*"],
};
