// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   console.log("middleware");

//   const token = req.cookies.get("token")?.value;
//   console.log("Token from cookie:", token);
//   if (pathname.startsWith("/admin")) {

//     if (!token) {
//       console.log("no token");
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
    
//     try {
//       const decoded = verify(token, JWT_SECRET) as { id: string; role: string };
//       console.log("Decoded:", decoded);
      
//       if (decoded.role !== "ADMIN") {
//         return NextResponse.redirect(new URL("/login", req.url));
//       }
      
//       return NextResponse.next();
//     } catch (err) {
//       console.error("JWT verify error:", err);
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }
//   if (pathname.startsWith("/kyc")) {
//     if (!token) {
//       console.log("no token");
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
    
//     try {
//       verify(token, JWT_SECRET); // we don’t care about role, just valid
//     } catch (err) {
//       console.error("JWT verify error:", err);
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//    runtime: "nodejs",
//   matcher: ["/admin/:path*"],
// };


// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";

// const JWT_SECRET = process.env.JWT_SECRET || "";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const token = req.cookies.get("token")?.value;

//   // Protect both admin and kyc routes
//   if (pathname.startsWith("/admin") || pathname.startsWith("/kyc")) {
//     if (!token) {
//       const loginUrl = new URL("/login", req.url);
//       loginUrl.searchParams.set("reason", "unauthorized");
//       loginUrl.searchParams.set("next", pathname); // redirect back after login
//       return NextResponse.redirect(loginUrl);
//     }

//     try {
//       const decoded = verify(token, JWT_SECRET) as { id: string; role: string };

//       if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
//         const loginUrl = new URL("/login", req.url);
//         loginUrl.searchParams.set("reason", "forbidden");
//         return NextResponse.redirect(loginUrl);
//       }

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
//   matcher: ["/admin/:path*", "/kyc/:path*"], // protect both
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // Protect admin + kyc routes
  if (pathname.startsWith("/admin") || pathname.startsWith("/kyc")) {
    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("reason", "unauthorized");
      loginUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(loginUrl);
    }

    try {
      const decoded = verify(token, JWT_SECRET) as {
        id: string;
        role: string;
        kyc?: {
          pan?: { status: string };
          aadhaar?: { status: string };
        };
      };

      // ✅ Admin routes must have role=ADMIN
      if (pathname.startsWith("/admin") && decoded.role !== "ADMIN") {
        const loginUrl = new URL("/login", req.url);
        loginUrl.searchParams.set("reason", "forbidden");
        return NextResponse.redirect(loginUrl);
      }

      // ✅ KYC routes: block if already submitted/approved
      if (pathname.startsWith("/kyc")) {
        const isPanPage = pathname.includes("pan");
        const isAadhaarPage = pathname.includes("aadhaar");

        if (isPanPage && decoded.kyc?.pan?.status && decoded.kyc.pan.status !== "Rejected") {
          return NextResponse.redirect(new URL("/profile", req.url));
        }

        if (isAadhaarPage && decoded.kyc?.aadhaar?.status && decoded.kyc.aadhaar.status !== "Rejected") {
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
  matcher: ["/admin/:path*", "/kyc/:path*"],
};
