import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, Store, Search, ShoppingCart, ClipboardList, Ticket
} from "lucide-react";
import StudentSidebar from "../components/StudentSidebar";
import NotificationBell from "../components/NotificationBell";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const PAGE_TITLES = {
  "/student/canteens": "Canteens",
  "/student/search":   "Search Meals",
  "/student/cart":     "Cart",
  "/student/checkout": "Checkout",
  "/student/orders":   "My Orders",
  "/student/queue":    "Queue Tokens",
  "/student/expenses": "Expenses",
  "/student/rating":   "Rate Order",
  "/student/inquiry":  "Inquiry",
};

const BOTTOM_NAV_ITEMS = [
  { icon: Store,         label: "Canteens", path: "/student/canteens" },
  { icon: Search,        label: "Search",   path: "/student/search" },
  { icon: ShoppingCart,  label: "Cart",     path: "/student/cart" },
  { icon: ClipboardList, label: "Orders",   path: "/student/orders" },
  { icon: Ticket,        label: "Queue",    path: "/student/queue" },
];

export default function StudentLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate  = useNavigate();
  const { theme } = useTheme();
  const { user } = useAuth();
  const dark = theme === "dark";

  // Auto-close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const title = Object.entries(PAGE_TITLES).find(([path]) =>
    location.pathname.startsWith(path)
  )?.[1] || "SmartMess";

  const userName    = user?.name || "Student";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className={`flex min-h-screen ${dark ? "bg-gray-900" : "bg-gray-50"}`}>
      <StudentSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      
      <div className="flex-1 flex flex-col min-h-screen min-w-0 overflow-hidden">
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3"
          style={{
            background: dark ? "rgb(3, 7, 18)" : "#ffffff",
            borderBottom: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)",
          }}
        >
          {/* Left: Hamburger (mobile) + Breadcrumb */}
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => setMobileOpen(true)}
              className={`md:hidden p-1.5 rounded-xl border transition-all ${
                dark
                  ? "border-gray-800 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Open navigation menu"
            >
              <Menu size={19} />
            </button>

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-xs truncate">
              <span className={`font-medium ${dark ? "text-gray-600" : "text-gray-400"}`}>SmartMess</span>
              <span className={`${dark ? "text-gray-700" : "text-gray-300"}`}>/</span>
              <span className="text-green-500 font-semibold truncate">{title}</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <NotificationBell />
            <div
              className="flex items-center gap-2 pl-2 sm:pl-3 cursor-pointer"
              style={{ borderLeft: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)" }}
              onClick={() => navigate("/profile")}
              title="My Profile"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}
              >
                {userInitial}
              </div>
              <div className="hidden sm:block">
                <p className={`text-xs font-semibold leading-none truncate max-w-[120px] ${dark ? "text-white" : "text-gray-900"}`}>
                  {userName}
                </p>
                <p className={`text-[10px] mt-0.5 ${dark ? "text-gray-500" : "text-gray-400"}`}>Student</p>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto pb-16 md:pb-0">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav
          className="md:hidden fixed bottom-0 left-0 right-0 z-30 border-t flex items-center justify-around py-1.5 px-2 backdrop-blur-md"
          style={{
            background: dark ? "rgba(3, 7, 18, 0.92)" : "rgba(255, 255, 255, 0.92)",
            borderColor: dark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.08)",
          }}
        >
          {BOTTOM_NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            const Icon = item.icon;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                  isActive
                    ? dark
                      ? "text-primary-400 font-semibold"
                      : "text-primary-600 font-semibold"
                    : dark
                      ? "text-gray-500 hover:text-gray-300"
                      : "text-gray-400 hover:text-gray-700"
                }`}
              >
                <Icon size={18} strokeWidth={isActive ? 2.5 : 1.8} />
                <span className="text-[10px] mt-0.5 leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
