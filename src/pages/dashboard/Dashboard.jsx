// src/pages/dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useAuth } from "../../context/AuthContext";

import api from "../../api/axios";

export default function OrganizationDashboard() {
  const { user, brand } = useAuth();
  const [stats, setStats] = useState([]);
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    if (user?.organization_id) {
      fetchDashboard();
    }
  }, [user]);

  const fetchDashboard = async () => {
    try {
      const res = await api.get(`/orginazation-dashboard/`);

      const response = res.data.data; // IMPORTANT (your API structure)

      // KPI Cards
      setStats([
        {
          title: "Total Cards",
          value: response.stats.total_cards,
          color: "from-indigo-500 to-indigo-600",
        },
        {
          title: "Active Cards",
          value: response.stats.active_cards,
          color: "from-emerald-500 to-emerald-600",
        },
        {
          title: "Allocated Cards",
          value: response.stats.allocated,
          color: "from-purple-500 to-purple-600",
        },
        {
          title: "Not Allocated",
          value: response.stats.NotAllocated,
          color: "from-pink-500 to-pink-600",
        },
      ]);

      // Chart
      setChartData(response.chart);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  const orgName = brand?.brand_name || "OneDesk Technologies";
  const orgEmail = user?.email || "admin@onedesk.com";
  const orgPhone = user?.phone || "+91 98765 43210";

  const logo = brand?.logo_url || "/assets/logo.jpeg";
  const cover = brand?.cover_url || "/assets/coverPic.jpg";

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto px-6">
        {/* ================= FACEBOOK STYLE HEADER ================= */}
        <div className="relative mb-16">
          {/* Cover */}
          <div className="w-full h-[320px] rounded-2xl overflow-hidden shadow">
            <img
              src={cover}
              alt="cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile Section */}
          <div className="relative -mt-16 flex flex-col md:flex-row md:items-end md:justify-between">
            {/* Left */}
            <div className="flex items-center gap-6">
              {/* Logo */}
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                <img
                  src={logo}
                  alt="Organization Logo"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://via.placeholder.com/150?text=Logo";
                  }}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="pb-4">
                <h1 className="text-3xl font-bold text-slate-900">{orgName}</h1>
                <p className="text-slate-600 mt-1">{orgEmail}</p>
                <p className="text-slate-600">{orgPhone}</p>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 md:mt-0 pb-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium shadow transition">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b mt-10"></div>
        </div>

        {/* ================= DASHBOARD HEADER ================= */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Organization Dashboard
            </h2>
            <p className="text-slate-600 mt-1">
              Overview of your employees and activity
            </p>
          </div>
        </div>

        {/* ================= KPI CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((item) => (
            <div
              key={item.title}
              className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-white shadow-lg hover:scale-[1.02] transition`}
            >
              <p className="text-sm opacity-90">{item.title}</p>
              <h3 className="text-4xl font-extrabold mt-2">{item.value}</h3>
            </div>
          ))}
        </div>

        {/* ================= CHART ================= */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 mb-20">
          <div className="flex justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-800">
              Card Growth Trend
            </h3>
            <span className="text-sm text-slate-500">Last 8 months</span>
          </div>

          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                stroke="#64748b"
                tick={{ fill: "#64748b" }}
              />
              <YAxis stroke="#64748b" tick={{ fill: "#64748b" }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="cards"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}
