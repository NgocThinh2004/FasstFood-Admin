import { useNavigate } from 'react-router-dom';


const DashboardPage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div>
      <p className="text-muted mb-3">
        Xin chào, <span className="text-accent font-bold">{user.name}</span>! Chào mừng bạn đến với hệ thống quản lý.
      </p>

      <div className="dashboard-grid">
        <div
          className="stat-card"
          onClick={() => navigate('/products')}
        >
          <div className="stat-card-icon">🍕</div>
          <div className="stat-card-label">Quản lý sản phẩm</div>
          <p className="text-muted mt-1" style={{ fontSize: '0.8125rem' }}>
            Thêm và quản lý các mặt hàng
          </p>
        </div>

        <div
          className="stat-card"
          onClick={() => navigate('/orders')}
        >
          <div className="stat-card-icon">📦</div>
          <div className="stat-card-label">Quản lý đơn hàng</div>
          <p className="text-muted mt-1" style={{ fontSize: '0.8125rem' }}>
            Xử lý và phân công giao hàng
          </p>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon">🚚</div>
          <div className="stat-card-label">Nhân viên giao hàng</div>
          <p className="text-muted mt-1" style={{ fontSize: '0.8125rem' }}>
            Quản lý shipper
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
