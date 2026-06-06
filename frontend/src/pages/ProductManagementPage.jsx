import { useNavigate } from 'react-router-dom';


const ProductManagementPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <button
          className="btn btn-accent"
          onClick={() => navigate('/products/add')}
        >
          ➕ Thêm sản phẩm
        </button>
      </div>

      <div className="page-placeholder">
        <div className="page-placeholder-icon">🍕</div>
        <h2>Quản Lý Sản Phẩm</h2>
        <p>Chọn "Thêm sản phẩm" để bắt đầu thêm mặt hàng mới</p>
      </div>
    </div>
  );
};

export default ProductManagementPage;
