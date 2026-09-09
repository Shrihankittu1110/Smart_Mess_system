import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Menu, Store } from "lucide-react";
import CanteenSidebar from "./components/CanteenSidebar";
import CanteenProfile from './Canteenprofile';
import OperatingHours from './Operatinghours';
import MealsPage from './Mealspage';
import OrdersPage from './OrdersPage';
import RevenuePage from './RevenuePage';
import ReviewsPage from './ReviewsPage';
import ReportIssuePage from './ReportIssuePage';
import CanteenDashboard from './CanteenDashboard';
import QueueStaffPage from './QueueStaffPage';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Navigate } from 'react-router-dom';

export default function CanteenLayout() {
  const { token, user } = useAuth();
  const { theme } = useTheme();
  const dark = theme === "dark";
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  if (!token) return <Navigate to="/login/canteen" replace />;

  const canteenName = user?.canteenName || user?.name || "My Canteen";

  return (
    <div className="flex h-screen overflow-hidden">
      <CanteenSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      
      <div className="flex-1 min-w-0 overflow-hidden flex flex-col">
        {/* Mobile Topbar */}
        <header
          className={`md:hidden px-4 py-3 flex items-center justify-between border-b flex-shrink-0 z-20 ${
            dark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-100"
          }`}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className={`p-1.5 rounded-xl border transition-all ${
                dark
                  ? "border-gray-800 text-gray-300 hover:bg-gray-800"
                  : "border-gray-200 text-gray-600 hover:bg-gray-100"
              }`}
              aria-label="Open Canteen Menu"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center text-white">
                <Store size={14} />
              </div>
              <span className={`text-sm font-bold truncate max-w-[160px] ${dark ? "text-white" : "text-gray-900"}`}>
                {canteenName}
              </span>
            </div>
          </div>

          <button
            onClick={() => navigate("/canteen/profile")}
            className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1.5 rounded-xl"
          >
            Profile
          </button>
        </header>

        <div className="flex-1 overflow-hidden">
          <Routes>
            <Route index element={<CanteenDashboard />} />
            <Route path="profile" element={<CanteenProfile />} />
            <Route path="hours"   element={<OperatingHours />} />
            <Route path="meals" element={<MealsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="queue" element={<QueueStaffPage />} />
            <Route path="revenue" element={<RevenuePage />} />
            <Route path="feedback" element={<ReviewsPage />} />
            <Route path="report" element={<ReportIssuePage />} />
            <Route path="dashboard" element={<CanteenDashboard />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
