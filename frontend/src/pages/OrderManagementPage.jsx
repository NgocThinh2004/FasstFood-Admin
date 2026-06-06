import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';
import ShipperModal from '../components/ShipperModal';


const OrderManagementPage = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('PENDING');
  const [selectedIds, setSelectedIds] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter !== 'ALL' ? { status: filter } : {};
      const res = await api.get('/orders', { params });
      setOrders(res.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
      toast.error('Không thể tải danh sách đơn hàng');
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchOrders();
    setSelectedIds([]);
  }, [fetchOrders]);


  const formatPrice = (price) => {
    if (price == null) return '0 ₫';
    return price.toLocaleString('vi-VN') + ' ₫';
  };


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


  const getStatusBadge = (status) => {
    const map = {
      PENDING: { label: 'Chờ xử lý', className: 'status-pending' },
      DELIVERING: { label: 'Đang giao', className: 'status-delivering' },
      COMPLETED: { label: 'Hoàn thành', className: 'status-completed' },
    };
    const info = map[status] || { label: status, className: '' };
    return <span className={`status-badge ${info.className}`}>{info.label}</span>;
  };


  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };


  const toggleSelectAll = () => {
    const pendingOrders = orders.filter((o) => o.status === 'PENDING');
    if (selectedIds.length === pendingOrders.length && pendingOrders.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(pendingOrders.map((o) => o.id));
    }
  };


  const handleAssign = async (shipperId) => {
    try {
      await api.post('/orders/assign', {
        orderIds: selectedIds,
        shipperId,
      });
      toast.success('Phân công giao hàng cho shipper thành công');
      setShowModal(false);
      setSelectedIds([]);
      fetchOrders(); // Auto-reload
    } catch (err) {
      const msg = err.response?.data?.message || 'Lỗi khi phân công giao hàng';
      toast.error(msg);
    }
  };

  const pendingOrders = orders.filter((o) => o.status === 'PENDING');
  const allPendingSelected =
    pendingOrders.length > 0 && selectedIds.length === pendingOrders.length;

  const filters = [
    { key: 'PENDING', label: '⏳ Chờ xử lý' },
    { key: 'DELIVERING', label: '🚚 Đang giao' },
    { key: 'COMPLETED', label: '✅ Hoàn thành' },
    { key: 'ALL', label: '📋 Tất cả' },
  ];

  return (
    <div>
      {/* Toolbar */}
      <div className="table-toolbar">
        <div className="table-toolbar-left">
          <div className="filter-tabs">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-tab ${filter === f.key ? 'active' : ''}`}
                onClick={() => setFilter(f.key)}
                id={`filter-${f.key.toLowerCase()}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner-lg"></div>
          <span className="loading-text">Đang tải đơn hàng...</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="data-table-container">
          <div className="empty-state">
            <div className="empty-state-icon">📭</div>
            <h3>Không có đơn hàng</h3>
            <p>
              {filter === 'PENDING'
                ? 'Không có đơn hàng nào đang chờ xử lý'
                : 'Không tìm thấy đơn hàng nào'}
            </p>
          </div>
        </div>
      ) : (
        <div className="data-table-container">
          <table className="data-table">
            <thead>
              <tr>
                {/* Show checkbox column only when viewing PENDING or ALL */}
                {(filter === 'PENDING' || filter === 'ALL') && (
                  <th style={{ width: '40px' }}>
                    <input
                      type="checkbox"
                      className="table-checkbox"
                      checked={allPendingSelected}
                      onChange={toggleSelectAll}
                      title="Chọn tất cả đơn hàng chờ xử lý"
                      id="checkbox-select-all"
                    />
                  </th>
                )}
                <th>Mã ĐH</th>
                <th>Khách hàng</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                {filter !== 'PENDING' && <th>Shipper</th>}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className={`${selectedIds.includes(order.id) ? 'selected-row' : ''} row-clickable`}
                >
                  {(filter === 'PENDING' || filter === 'ALL') && (
                    <td onClick={(e) => e.stopPropagation()}>
                      {order.status === 'PENDING' ? (
                        <input
                          type="checkbox"
                          className="table-checkbox"
                          checked={selectedIds.includes(order.id)}
                          onChange={() => toggleSelect(order.id)}
                          id={`checkbox-order-${order.id}`}
                        />
                      ) : (
                        <span style={{ width: '18px', display: 'inline-block' }}></span>
                      )}
                    </td>
                  )}
                  <td onClick={() => navigate(`/orders/${order.id}`)}>
                    <span className="order-id-badge">#{order.id}</span>
                  </td>
                  <td onClick={() => navigate(`/orders/${order.id}`)}>
                    {order.customerName}
                  </td>
                  <td onClick={() => navigate(`/orders/${order.id}`)}>
                    {order.customerPhone}
                  </td>
                  <td onClick={() => navigate(`/orders/${order.id}`)}>
                    <span className="text-truncate" style={{ display: 'block' }}>
                      {order.deliveryAddress}
                    </span>
                  </td>
                  <td onClick={() => navigate(`/orders/${order.id}`)}>
                    <span className="price-text">{formatPrice(order.totalPrice)}</span>
                  </td>
                  <td onClick={() => navigate(`/orders/${order.id}`)}>
                    {getStatusBadge(order.status)}
                  </td>
                  <td onClick={() => navigate(`/orders/${order.id}`)}>
                    {formatDate(order.createdAt)}
                  </td>
                  {filter !== 'PENDING' && (
                    <td onClick={() => navigate(`/orders/${order.id}`)}>
                      {order.shipperName || '—'}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Action Bar — appears when orders are selected */}
      {selectedIds.length > 0 && (
        <div className="action-bar">
          <div className="action-bar-info">
            <span className="action-bar-count">{selectedIds.length}</span>
            <span>đơn hàng được chọn</span>
          </div>
          <button
            className="btn btn-accent"
            onClick={() => setShowModal(true)}
            id="btn-assign-shipper"
          >
            🚚 Phân công Shipper
          </button>
        </div>
      )}

      {/* Shipper Assignment Modal */}
      <ShipperModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleAssign}
        selectedOrderCount={selectedIds.length}
      />
    </div>
  );
};

export default OrderManagementPage;
