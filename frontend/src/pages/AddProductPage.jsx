import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../api/axiosInstance';


const AddProductPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    type: '',
    // FOOD
    cookingTime: '',
    // DRINK
    size: 'M',
    hasIce: true,
    // COMBO
    discountPercent: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTypeSelect = (type) => {
    setFormData((prev) => ({ ...prev, type }));
    setError('');
  };

  const validate = () => {
    if (!formData.name.trim()) return false;
    if (!formData.price || parseFloat(formData.price) < 0) return false;
    if (!formData.type) return false;
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validate()) {
      setError('Vui lòng nhập đúng/đủ thông tin');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        description: formData.description.trim(),
        type: formData.type,
      };


      if (formData.type === 'FOOD') {
        payload.cookingTime = formData.cookingTime
          ? parseInt(formData.cookingTime, 10)
          : null;
      } else if (formData.type === 'DRINK') {
        payload.size = formData.size;
        payload.hasIce = formData.hasIce;
      } else if (formData.type === 'COMBO') {
        payload.discountPercent = formData.discountPercent
          ? parseFloat(formData.discountPercent)
          : null;
      }

      await api.post('/products', payload);


      navigate('/products');
      toast.success('Thêm sản phẩm thành công');
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Lỗi hệ thống. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page-wrapper">
      {/* Back Link */}
      <button className="back-link" onClick={() => navigate('/products')}>
        ← Quay lại Quản lý sản phẩm
      </button>

      <div className="form-card">
        {/* Header */}
        <div className="form-card-header">
          <h2>🆕 Thêm sản phẩm mới</h2>
          <p>Điền đầy đủ thông tin bên dưới để thêm mặt hàng mới vào hệ thống</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="form-alert form-alert-error">
            <span>⚠️</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Product Type Selector */}
          <div className="form-group">
            <label>Loại sản phẩm *</label>
            <div className="type-selector">
              <div
                className={`type-card ${formData.type === 'FOOD' ? 'selected' : ''}`}
                onClick={() => handleTypeSelect('FOOD')}
                id="type-food"
              >
                <span className="type-card-icon">🍕</span>
                <span className="type-card-name">Food</span>
                <span className="type-card-desc">Đồ ăn</span>
              </div>
              <div
                className={`type-card ${formData.type === 'DRINK' ? 'selected' : ''}`}
                onClick={() => handleTypeSelect('DRINK')}
                id="type-drink"
              >
                <span className="type-card-icon">🥤</span>
                <span className="type-card-name">Drink</span>
                <span className="type-card-desc">Thức uống</span>
              </div>
              <div
                className={`type-card ${formData.type === 'COMBO' ? 'selected' : ''}`}
                onClick={() => handleTypeSelect('COMBO')}
                id="type-combo"
              >
                <span className="type-card-icon">🎁</span>
                <span className="type-card-name">Combo</span>
                <span className="type-card-desc">Gói ưu đãi</span>
              </div>
            </div>
          </div>

          {/* Common Fields */}
          <div className="form-row" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label htmlFor="name">Tên sản phẩm *</label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="Nhập tên sản phẩm"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Giá (VNĐ) *</label>
              <input
                id="price"
                name="price"
                type="number"
                className="form-input"
                placeholder="Nhập giá sản phẩm"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="1000"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              className="form-textarea"
              placeholder="Nhập mô tả sản phẩm (tùy chọn)"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          {/* ========== DYNAMIC FIELDS ========== */}

          {/* FOOD Fields */}
          {formData.type === 'FOOD' && (
            <div className="dynamic-fields" key="food-fields">
              <div className="dynamic-fields-label">
                🍕 Thông tin đồ ăn
              </div>
              <div className="form-group">
                <label htmlFor="cookingTime">Thời gian nấu (phút)</label>
                <input
                  id="cookingTime"
                  name="cookingTime"
                  type="number"
                  className="form-input"
                  placeholder="VD: 15"
                  value={formData.cookingTime}
                  onChange={handleChange}
                  min="0"
                />
              </div>
            </div>
          )}

          {/* DRINK Fields */}
          {formData.type === 'DRINK' && (
            <div className="dynamic-fields" key="drink-fields">
              <div className="dynamic-fields-label">
                🥤 Thông tin thức uống
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="size">Kích cỡ</label>
                  <select
                    id="size"
                    name="size"
                    className="form-select"
                    value={formData.size}
                    onChange={handleChange}
                  >
                    <option value="S">S - Nhỏ</option>
                    <option value="M">M - Vừa</option>
                    <option value="L">L - Lớn</option>
                    <option value="XL">XL - Rất lớn</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Có đá không?</label>
                  <label className="form-checkbox-wrapper" htmlFor="hasIce">
                    <input
                      id="hasIce"
                      name="hasIce"
                      type="checkbox"
                      className="form-checkbox"
                      checked={formData.hasIce}
                      onChange={handleChange}
                    />
                    <span className="form-checkbox-label">
                      {formData.hasIce ? '🧊 Có đá' : '☕ Không đá'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* COMBO Fields */}
          {formData.type === 'COMBO' && (
            <div className="dynamic-fields" key="combo-fields">
              <div className="dynamic-fields-label">
                🎁 Thông tin combo
              </div>
              <div className="form-group">
                <label htmlFor="discountPercent">Phần trăm giảm giá (%)</label>
                <input
                  id="discountPercent"
                  name="discountPercent"
                  type="number"
                  className="form-input"
                  placeholder="VD: 15"
                  value={formData.discountPercent}
                  onChange={handleChange}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate('/products')}
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="btn btn-accent"
              disabled={loading}
              id="btn-save-product"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Đang lưu...
                </>
              ) : (
                '💾 Lưu thông tin'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductPage;
