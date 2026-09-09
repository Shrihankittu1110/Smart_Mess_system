import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Store, ShoppingCart, ClipboardList, BarChart2,
  Home, LogOut, ChevronLeft, ChevronRight, UtensilsCrossed, Search,
  Sun, Moon, MessageSquare, Ticket, X
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { icon: Store,         label: "Canteens",  path: "/student/canteens" },
  { icon: Search,        label: "Search",    path: "/student/search" },
  { icon: ShoppingCart,  label: "Cart",      path: "/student/cart" },
  { icon: ClipboardList, label: "My Orders", path: "/student/orders" },
  { icon: Ticket,        label: "Queue",     path: "/student/queue" },
  { icon: BarChart2,     label: "Expenses",  path: "/student/expenses" },
  { icon: MessageSquare, label: "Inquiry",   path: "/student/inquiry" },
];

export default function StudentSidebar({ mobileOpen = false, onClose }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  const { user, logout } = useAuth();
  const displayName = user?.name || 'Student';
  const displayEmail = user?.email || '';
  const initials = displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  const handleLogout = () => {
    onClose?.();
    logout();
    navigate('/');
  };

  const handleNav = (path) => {
    onClose?.();
    navigate(path);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden animate-fade-in"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`h-screen flex flex-col transition-all duration-300 ease-in-out
          fixed inset-y-0 left-0 z-50 md:sticky md:top-0 md:z-20
          ${mobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-[70px]" : "w-[260px] md:w-[220px]"}
          ${dark ? "bg-gray-950 border-r border-gray-800" : "bg-white border-r border-gray-100"}`}
      >
      {/* Logo */}
      <div className={`flex items-center justify-between px-4 py-5 border-b ${dark ? "border-gray-800" : "border-gray-100"}`}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 animate-fade-in">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
              <UtensilsCrossed size={16} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <p className={`font-bold text-sm leading-none ${dark ? "text-white" : "text-gray-900"}`}>SmartMess</p>
              <p className="text-green-500 text-[10px] font-medium tracking-widest uppercase mt-0.5">Student</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mx-auto"
            style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
            <UtensilsCrossed size={16} color="white" strokeWidth={2.5} />
          </div>
        )}
        <div className="flex items-center gap-1">
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className={`md:hidden w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
              dark ? "text-gray-400 hover:text-white hover:bg-white/10" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"
            }`}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>

          {/* Desktop collapse toggle */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className={`hidden md:flex w-7 h-7 rounded-lg items-center justify-center transition-all duration-200 ${
                dark ? "text-gray-500 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <ChevronLeft size={15} />
            </button>
          )}
        </div>
      </div>

      {collapsed && (
        <button onClick={() => setCollapsed(false)}
          className={`hidden md:flex mx-auto mt-3 w-7 h-7 rounded-lg items-center justify-center transition-all duration-200 ${
            dark ? "text-gray-500 hover:text-white hover:bg-white/10" : "text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          }`}>
          <ChevronRight size={15} />
        </button>
      )}

      {/* Profile */}
      <div className={`px-3 py-4 border-b ${dark ? "border-gray-800" : "border-gray-100"}`}>
        {!collapsed ? (
          <div className={`flex items-center gap-3 px-2 py-2.5 rounded-xl ${dark ? "bg-white/5" : "bg-gray-50"}`}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
              {initials}
            </div>
            <div className="min-w-0">
              <p className={`text-xs font-semibold truncate ${dark ? "text-white" : "text-gray-900"}`}>
                {displayName}
              </p>
              <p className={`text-[10px] truncate ${dark ? "text-gray-500" : "text-gray-400"}`}>
                {displayEmail}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ background: "linear-gradient(135deg, #16a34a, #4ade80)" }}>
              {initials}
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p className={`text-[10px] font-semibold uppercase tracking-widest px-3 mb-2 ${dark ? "text-gray-600" : "text-gray-400"}`}>
            Menu
          </p>
        )}
        {NAV_ITEMS.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <button key={item.path} onClick={() => handleNav(item.path)}
              title={collapsed ? item.label : ""}
              className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 group
                ${collapsed ? "px-0 py-3 justify-center" : "px-3 py-2.5"}
                ${isActive
                  ? dark
                    ? "bg-primary-500/10 text-primary-400"
                    : "bg-primary-500/10 text-primary-600"
                  : dark
                    ? "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200"
                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                }`}
              style={isActive && !collapsed ? { borderLeft: "2px solid #16a34a" } : {}}>
              <Icon size={17} strokeWidth={isActive ? 2.5 : 2} className="flex-shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
              {!collapsed && isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom (unchanged) */}
      <div className={`px-2 py-3 space-y-0.5 border-t ${dark ? "border-gray-800" : "border-gray-100"}`}>
        {!collapsed && (
          <button onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
              dark ? "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            }`}>
            {dark ? <Sun size={17} /> : <Moon size={17} />}
            <span className="text-sm font-medium">{dark ? "Light Mode" : "Dark Mode"}</span>
          </button>
        )}

        <button onClick={() => handleNav("/")}
          className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200
            ${collapsed ? "px-0 py-3 justify-center" : "px-3 py-2.5"}
            ${dark ? "text-gray-400 hover:bg-gray-800/50 hover:text-gray-200" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}>
          <Home size={17} />
          {!collapsed && <span className="text-sm font-medium">Home</span>}
        </button>

        <button onClick={handleLogout}
          className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200
            ${collapsed ? "px-0 py-3 justify-center" : "px-3 py-2.5"}
            ${dark ? "text-gray-600 hover:bg-red-500/10 hover:text-red-400" : "text-gray-400 hover:bg-red-500/10 hover:text-red-600"}`}>
          <LogOut size={17} />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
    </>
  );
}
