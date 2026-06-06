import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axiosInstance';


const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetail();
  }, [id]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get(`/orders/${id}`);
      setOrder(res.data);
    } catch (err) {
      setError('Không thể tải thông tin đơn hàng');
      console.error('Error fetching order:', err);
    } finally {
      setLoading(false);
    }
  };

  /** Format price to VNĐ */
  const formatPrice = (price) => {
    if (price == null) return '0 ₫';
    return price.toLocaleString('vi-VN') + ' ₫';
  };

  /** Format datetime */
  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const d = new Date(dateStr);
    return d.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  /** Status badge */
  const getStatusBadge = (status) => {
    const map = {
      PENDING: { label: 'Chờ xử lý', className: 'status-pending' },
      DELIVERING: { label: 'Đang giao', className: 'status-delivering' },
      COMPLETED: { label: 'Hoàn thành', className: 'status-completed' },
    };
    const info = map[status] || { label: status, className: '' };
    return <span className={`status-badge ${info.className}`}>{info.label}</span>;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-lg"></div>
        <span className="loading-text">Đang tải chi tiết đơn hàng...</span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div>
        <button className="back-link" onClick={() => navigate('/orders')}>
          ← Quay lại Quản lý đơn hàng
        </button>
        <div className="data-table-container">
          <div className="empty-state">
            <div className="empty-state-icon">❌</div>
            <h3>{error || 'Không tìm thấy đơn hàng'}</h3>
            <p>Vui lòng kiểm tra lại mã đơn hàng</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back Link */}
      <button className="back-link" onClick={() => navigate('/orders')}>
        ← Quay lại Quản lý đơn hàng
      </button>

      {/* Order ID title */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>
          Đơn hàng <span className="text-accent">#{order.id}</span>
        </h2>
      </div>

      {/* Info Cards Grid */}
      <div className="order-detail-grid">
        {/* Customer Info */}
        <div className="detail-card">
          <div className="detail-card-header">
            <span className="icon">👤</span>
            <h3>Thông tin khách hàng</h3>
          </div>
          <div className="detail-info-row">
            <span className="detail-info-label">Tên khách hàng</span>
            <span className="detail-info-value">{order.customerName}</span>
          </div>
          <div className="detail-info-row">
            <span className="detail-info-label">Số điện thoại</span>
            <span className="detail-info-value">{order.customerPhone}</span>
          </div>
          <div className="detail-info-row">
            <span className="detail-info-label">Địa chỉ giao hàng</span>
            <span className="detail-info-value">{order.deliveryAddress}</span>
          </div>
        </div>

        {/* Order Info */}
        <div className="detail-card">
          <div className="detail-card-header">
            <span className="icon">📋</span>
            <h3>Thông tin đơn hàng</h3>
          </div>
          <div className="detail-info-row">
            <span className="detail-info-label">Trạng thái</span>
            <span className="detail-info-value">{getStatusBadge(order.status)}</span>
          </div>
          <div className="detail-info-row">
            <span className="detail-info-label">Ngày tạo</span>
            <span className="detail-info-value">{formatDate(order.createdAt)}</span>
          </div>
          <div className="detail-info-row">
            <span className="detail-info-label">Shipper</span>
            <span className="detail-info-value">
              {order.shipperName || <span className="text-muted">Chưa phân công</span>}
            </span>
          </div>
          <div className="detail-info-row">
            <span className="detail-info-label">Xác nhận bởi</span>
            <span className="detail-info-value">
              {order.confirmedBy || <span className="text-muted">—</span>}
            </span>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="order-items-card">
        <div className="order-items-header">
          <span style={{ fontSize: '1.25rem' }}>🛒</span>
          <h3>Chi tiết sản phẩm</h3>
        </div>

        {order.orderDetails && order.orderDetails.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Sản phẩm</th>
                <th style={{ textAlign: 'right' }}>Đơn giá</th>
                <th style={{ textAlign: 'center' }}>Số lượng</th>
                <th style={{ textAlign: 'right' }}>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <strong>{item.productName}</strong>
                  </td>
                  <td style={{ textAlign: 'right' }}>{formatPrice(item.price)}</td>
                  <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ textAlign: 'right' }}>
                    <span className="price-text">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state" style={{ padding: '40px 20px' }}>
            <div className="empty-state-icon">📦</div>
            <h3>Không có sản phẩm</h3>
            <p>Đơn hàng này chưa có chi tiết sản phẩm</p>
          </div>
        )}

        {/* Total */}
        <div style={{ padding: '0 24px 24px' }}>
          <div className="detail-total-row">
            <span className="detail-total-label">Tổng cộng</span>
            <span className="detail-total-value">{formatPrice(order.totalPrice)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
