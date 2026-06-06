import { useState, useEffect } from 'react';
import api from '../api/axiosInstance';


const ShipperModal = ({ isOpen, onClose, onConfirm, selectedOrderCount }) => {
  const [shippers, setShippers] = useState([]);
  const [selectedShipperId, setSelectedShipperId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAvailableShippers();
      setSelectedShipperId(null);
    }
  }, [isOpen]);

  const fetchAvailableShippers = async () => {
    setLoading(true);
    try {
      const res = await api.get('/shippers', { params: { status: 'AVAILABLE' } });
      setShippers(res.data);
    } catch (err) {
      console.error('Error fetching shippers:', err);
      setShippers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = async () => {
    if (!selectedShipperId) return;
    setConfirming(true);
    try {
      await onConfirm(selectedShipperId);
    } finally {
      setConfirming(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="modal-header">
          <h3>
            🚚 Chọn Shipper
          </h3>
          <button className="modal-close" onClick={onClose} id="btn-close-modal">
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          <p className="text-muted" style={{ fontSize: '0.8125rem', marginBottom: '16px' }}>
            Phân công <strong className="text-accent">{selectedOrderCount} đơn hàng</strong> cho shipper bên dưới
          </p>

          {loading ? (
            <div className="loading-container" style={{ padding: '40px 20px' }}>
              <div className="loading-spinner-lg"></div>
              <span className="loading-text">Đang tải danh sách shipper...</span>
            </div>
          ) : shippers.length === 0 ? (
            <div className="empty-state" style={{ padding: '40px 20px' }}>
              <div className="empty-state-icon">🚫</div>
              <h3>Không có shipper rảnh</h3>
              <p>Tất cả shipper hiện đang bận. Vui lòng thử lại sau.</p>
            </div>
          ) : (
            <div className="shipper-list">
              {shippers.map((shipper) => (
                <label
                  key={shipper.id}
                  className={`shipper-radio-item ${selectedShipperId === shipper.id ? 'selected' : ''}`}
                  htmlFor={`shipper-${shipper.id}`}
                >
                  <input
                    type="radio"
                    id={`shipper-${shipper.id}`}
                    name="shipper"
                    className="shipper-radio"
                    checked={selectedShipperId === shipper.id}
                    onChange={() => setSelectedShipperId(shipper.id)}
                  />
                  <div className="shipper-info">
                    <div className="shipper-name">{shipper.name}</div>
                    <div className="shipper-phone">📱 {shipper.phone}</div>
                  </div>
                  <div className="shipper-status-dot" title="Đang rảnh"></div>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="modal-footer">
          <button
            className="btn btn-secondary"
            onClick={onClose}
            disabled={confirming}
          >
            Hủy
          </button>
          <button
            className="btn btn-accent"
            onClick={handleConfirm}
            disabled={!selectedShipperId || confirming}
            id="btn-confirm-assign"
          >
            {confirming ? (
              <>
                <span className="spinner"></span>
                Đang xử lý...
              </>
            ) : (
              '✅ Xác nhận phân công'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShipperModal;
