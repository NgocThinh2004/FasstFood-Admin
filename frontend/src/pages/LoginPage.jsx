import { useState } from 'react';
import { useNavigate, Navigate, Link, useLocation } from 'react-router-dom';
import api from '../api/axiosInstance';


const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      JSON.parse(userStr);
      return <Navigate to="/" replace />;
    } catch {
      localStorage.removeItem('user');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tài khoản và mật khẩu');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post('/users/login', {
        username: username.trim(),
        password: password,
      });


      const user = response.data;
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/', { replace: true });
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data.message || 'Sai tài khoản hoặc mật khẩu');
      } else {
        setError('Lỗi kết nối máy chủ. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        {/* Brand */}
        <div className="login-brand">
          <span className="login-brand-icon">🍔</span>
          <h1>FastFood Admin</h1>
          <p>Đăng nhập hệ thống quản lý</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="login-success" style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            padding: '0.75rem', 
            borderRadius: '4px', 
            marginBottom: '1rem',
            textAlign: 'center',
            fontSize: '0.9rem'
          }}>
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="login-error">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Tài khoản</label>
            <input
              id="username"
              type="text"
              className="form-input"
              placeholder="Nhập tên tài khoản"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              id="password"
              type="password"
              className="form-input"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <span>Chưa có tài khoản? </span>
          <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '500' }}>
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
