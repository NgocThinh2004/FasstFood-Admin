import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';



const pageTitles = {
  '/': 'Dashboard',
  '/products': 'Quản Lý Sản Phẩm',
  '/products/add': 'Thêm Mới Sản Phẩm',
  '/orders': 'Quản Lý Đơn Hàng',
};

const Layout = () => {
  const location = useLocation();

  const getPageTitle = () => {
    // Check for dynamic routes like /orders/:id
    if (location.pathname.startsWith('/orders/') && location.pathname !== '/orders') {
      return 'Chi Tiết Đơn Hàng';
    }
    return pageTitles[location.pathname] || 'FastFood Admin';
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <header className="main-header">
          <h1>{getPageTitle()}</h1>
        </header>
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
