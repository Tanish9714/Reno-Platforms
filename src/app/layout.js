import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "School Management Portal",
  description: "Comprehensive school management system",
};

const tabs = [
  { name: "Add School", href: "/addSchool" },
  { name: "Show School", href: "/showSchool" },
];

function TabPanel() {
  const pathname =
    typeof window !== "undefined" ? window.location.pathname : "/";
  return (
    <nav className="flex justify-center gap-2 mt-6">
      {tabs.map((tab) => (
        <Link
          key={tab.name}
          href={tab.href}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 text-sm ${
            pathname === tab.href
              ? "bg-white text-slate-900 shadow-md border border-slate-200"
              : "bg-slate-800/50 text-slate-200 hover:bg-slate-700/70 border border-slate-600/30"
          }`}
        >
          {tab.name}
        </Link>
      ))}
    </nav>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen flex flex-col bg-slate-50`}
      >
        <header className="w-full bg-slate-900 text-white shadow-lg border-b border-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <h1 className="text-3xl font-bold text-center text-balance mb-2">
              School Management Portal
            </h1>
            <p className="text-slate-300 text-center text-sm font-medium">
              Streamline your educational administration
            </p>
            <TabPanel />
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-4xl">
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </main>

        <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-6 py-6 text-center">
            <p className="text-sm">
              &copy; 2025 School Management Portal.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
