import Sidebar from "@/components/admin/SideBar";
import "@/app/globals.css";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen bg-gray-100 relative">
          {/* <Navbar/> */}
          <Sidebar />
          
          {/* <Footer/> */}
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
