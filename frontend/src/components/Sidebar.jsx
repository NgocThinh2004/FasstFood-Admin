import { NavLink, useNavigate } from 'react-router-dom';


const Sidebar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const getInitials = (name) => {
    if (!name) return 'QL';
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <span className="sidebar-brand-icon">🍔</span>
          <div className="sidebar-brand-text">
            <h2>FastFood</h2>
            <span>Admin Panel</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-nav-label">Tổng quan</div>
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `sidebar-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </NavLink>

        <div className="sidebar-nav-label">Quản lý</div>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `sidebar-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">🍕</span>
          Quản lý sản phẩm
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `sidebar-nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">📦</span>
          Quản lý đơn hàng
        </NavLink>
      </nav>

      {/* User Info & Logout */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">
            {getInitials(user.name)}
          </div>
          <div className="sidebar-user-info">
            <div className="name">{user.name || 'Quản Lý'}</div>
            <div className="role">Quản lý</div>
          </div>
        </div>
        <button className="btn-logout" onClick={handleLogout}>
          🚪 Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
