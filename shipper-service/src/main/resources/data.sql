-- Seed data for Shipper Service
-- Sample shippers for testing delivery assignment flow
INSERT IGNORE INTO shippers (id, name, phone, status)
VALUES
(1, 'Nguyễn Minh Tuấn', '0901111111', 'AVAILABLE'),
(2, 'Trần Đức Huy', '0902222222', 'AVAILABLE'),
(3, 'Lê Thanh Phong', '0903333333', 'BUSY'),
(4, 'Phạm Quốc Bảo', '0904444444', 'AVAILABLE'),
(5, 'Hoàng Anh Kiệt', '0905555555', 'BUSY');
