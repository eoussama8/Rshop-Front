import { useState } from "react";
import "../styles/AdminDashboard.css";

const stats = [
  { label: "Total Revenue", value: "$84,320", change: "+12.4%", up: true, icon: "💰" },
  { label: "Orders Today", value: "318", change: "+8.1%", up: true, icon: "📦" },
  { label: "Active Customers", value: "5,204", change: "-2.3%", up: false, icon: "👤" },
  { label: "Products Listed", value: "1,482", change: "+5.7%", up: true, icon: "🛒" },
];

const recentOrders = [
  { id: "#ORD-9821", customer: "Sara Alami", product: "Wireless Headphones", status: "Delivered", amount: "$129.99", date: "May 11" },
  { id: "#ORD-9820", customer: "Karim Benjelloun", product: "Smart Watch Pro", status: "Pending", amount: "$249.00", date: "May 11" },
  { id: "#ORD-9819", customer: "Lina Fassi", product: "Running Sneakers", status: "Shipped", amount: "$89.50", date: "May 10" },
  { id: "#ORD-9818", customer: "Omar Chraibi", product: "Leather Backpack", status: "Cancelled", amount: "$74.00", date: "May 10" },
  { id: "#ORD-9817", customer: "Nadia Tahiri", product: "Coffee Maker 3000", status: "Delivered", amount: "$195.00", date: "May 09" },
  { id: "#ORD-9816", customer: "Younes Idrissi", product: "Desk Lamp LED", status: "Pending", amount: "$42.00", date: "May 09" },
];

const topProducts = [
  { name: "Wireless Headphones", sold: 482, revenue: "$62,277", img: "🎧" },
  { name: "Smart Watch Pro", sold: 310, revenue: "$77,190", img: "⌚" },
  { name: "Running Sneakers", sold: 276, revenue: "$24,702", img: "👟" },
  { name: "Leather Backpack", sold: 201, revenue: "$14,874", img: "🎒" },
];

const navItems = [
  { label: "Dashboard", icon: "▦", active: true },
  { label: "Orders", icon: "📋", active: false },
  { label: "Products", icon: "🏷️", active: false },
  { label: "Customers", icon: "👥", active: false },
  { label: "Analytics", icon: "📊", active: false },
  { label: "Settings", icon: "⚙️", active: false },
];

const statusClass = {
  Delivered: "status-delivered",
  Pending: "status-pending",
  Shipped: "status-shipped",
  Cancelled: "status-cancelled",
};

const barData = [42, 68, 55, 80, 63, 91, 74, 88, 60, 95, 72, 84];
const barLabels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={`ad-root ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>
      {/* Sidebar */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar-header">
          <div className="ad-logo">
            <span className="ad-logo-icon">⚡</span>
            {sidebarOpen && <span className="ad-logo-text">ShopAdmin</span>}
          </div>
          <button className="ad-toggle-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? "◀" : "▶"}
          </button>
        </div>

        <nav className="ad-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={`ad-nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="ad-nav-icon">{item.icon}</span>
              {sidebarOpen && <span className="ad-nav-label">{item.label}</span>}
              {activeNav === item.label && <span className="ad-nav-active-bar" />}
            </button>
          ))}
        </nav>

        <div className="ad-sidebar-footer">
          <div className="ad-user-avatar">AM</div>
          {sidebarOpen && (
            <div className="ad-user-info">
              <span className="ad-user-name">Admin Manager</span>
              <span className="ad-user-role">Super Admin</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="ad-main">
        {/* Topbar */}
        <header className="ad-topbar">
          <div className="ad-topbar-left">
            <h1 className="ad-page-title">Dashboard</h1>
            <span className="ad-page-date">Monday, May 11, 2026</span>
          </div>
          <div className="ad-topbar-right">
            <div className="ad-search-wrap">
              <span className="ad-search-icon">🔍</span>
              <input className="ad-search" placeholder="Search orders, products..." />
            </div>
            <button className="ad-notif-btn">
              🔔
              <span className="ad-notif-badge">3</span>
            </button>
            <div className="ad-topbar-avatar">AM</div>
          </div>
        </header>

        {/* Stats */}
        <section className="ad-stats">
          {stats.map((s) => (
            <div className="ad-stat-card" key={s.label}>
              <div className="ad-stat-top">
                <span className="ad-stat-icon">{s.icon}</span>
                <span className={`ad-stat-change ${s.up ? "up" : "down"}`}>
                  {s.up ? "↑" : "↓"} {s.change}
                </span>
              </div>
              <div className="ad-stat-value">{s.value}</div>
              <div className="ad-stat-label">{s.label}</div>
              <div className="ad-stat-bar">
                <div className="ad-stat-bar-fill" style={{ width: s.up ? "72%" : "38%" }} />
              </div>
            </div>
          ))}
        </section>

        {/* Chart + Top Products */}
        <section className="ad-middle">
          {/* Revenue Chart */}
          <div className="ad-chart-card">
            <div className="ad-card-header">
              <span className="ad-card-title">Revenue Overview</span>
              <div className="ad-chart-tabs">
                {["2026", "2025", "2024"].map((y) => (
                  <button key={y} className={`ad-chart-tab ${y === "2026" ? "active" : ""}`}>{y}</button>
                ))}
              </div>
            </div>
            <div className="ad-chart-area">
              <div className="ad-bars">
                {barData.map((v, i) => (
                  <div className="ad-bar-wrap" key={i}>
                    <div
                      className="ad-bar"
                      style={{ height: `${v}%` }}
                      title={`${barLabels[i]}: $${v}k`}
                    >
                      <div className="ad-bar-tooltip">${v}k</div>
                    </div>
                    <span className="ad-bar-label">{barLabels[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="ad-top-products-card">
            <div className="ad-card-header">
              <span className="ad-card-title">Top Products</span>
              <button className="ad-see-all">See All →</button>
            </div>
            <div className="ad-top-products-list">
              {topProducts.map((p, i) => (
                <div className="ad-top-product-row" key={p.name}>
                  <span className="ad-rank">#{i + 1}</span>
                  <span className="ad-product-emoji">{p.img}</span>
                  <div className="ad-product-meta">
                    <span className="ad-product-name">{p.name}</span>
                    <span className="ad-product-sold">{p.sold} sold</span>
                  </div>
                  <span className="ad-product-revenue">{p.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="ad-orders-section">
          <div className="ad-card-header">
            <span className="ad-card-title">Recent Orders</span>
            <button className="ad-see-all">View All →</button>
          </div>
          <div className="ad-table-wrap">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="ad-table-row">
                    <td className="ad-order-id">{o.id}</td>
                    <td className="ad-customer">
                      <div className="ad-customer-avatar">{o.customer[0]}</div>
                      {o.customer}
                    </td>
                    <td>{o.product}</td>
                    <td className="ad-date">{o.date}</td>
                    <td className="ad-amount">{o.amount}</td>
                    <td>
                      <span className={`ad-status ${statusClass[o.status]}`}>{o.status}</span>
                    </td>
                    <td>
                      <button className="ad-action-btn">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}