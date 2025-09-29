// export const runtime = "nodejs";

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { verify } from "jsonwebtoken";
// import { cookies } from 'next/headers';

// const JWT_SECRET = process.env.JWT_SECRET || "";

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   console.log("middleware");
//   if (pathname.startsWith("/admin")) {
//     const cookieStore = await cookies();
//   console.log({cookieStore})
//   const token = cookieStore.get('token')?.value;
//     // const token = req.cookies.get("token")?.value;
//     console.log(token);
//     if (!token) {
//       console.log("no token");
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     try {
//       const decoded = verify(token, JWT_SECRET) as unknown;
//       console.log(decoded);

//       if (
//         typeof decoded === "object" &&
//         decoded !== null &&
//         "id" in decoded &&
//         "role" in decoded
//       ) {
//         const user = decoded as { id: string; role: string };
//         console.log("decoded", user);

//         if (user.role !== "ADMIN") {
//           return NextResponse.redirect(new URL("/login", req.url));
//         }
//       }

//       return NextResponse.next();
//     } catch (err) {
//       console.error(err);
//       return NextResponse.redirect(new URL("/login", req.url));
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };


import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  console.log("middleware");

  if (pathname.startsWith("/admin")) {
    const token = req.cookies.get("token")?.value;
    console.log("Token from cookie:", token);

    if (!token) {
      console.log("no token");
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const decoded = verify(token, JWT_SECRET) as { id: string; role: string };
      console.log("Decoded:", decoded);

      if (decoded.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("JWT verify error:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
   runtime: "nodejs",
  matcher: ["/admin/:path*"],
};
