-- Seed data for Order Service
-- Sample pending orders for testing the order management flow

INSERT IGNORE INTO orders (id, customer_name, customer_phone, delivery_address, status, total_price, created_at)
VALUES
(1, 'Nguyễn Văn A', '0901234567', '123 Lê Lợi, Q.1, TP.HCM', 'PENDING', 150000, NOW()),
(2, 'Trần Thị B', '0912345678', '456 Nguyễn Huệ, Q.1, TP.HCM', 'PENDING', 220000, NOW()),
(3, 'Lê Văn C', '0923456789', '789 Trần Hưng Đạo, Q.5, TP.HCM', 'PENDING', 95000, NOW()),
(4, 'Phạm Thị D', '0934567890', '321 Võ Văn Tần, Q.3, TP.HCM', 'PENDING', 180000, NOW()),
(5, 'Hoàng Văn E', '0945678901', '654 Điện Biên Phủ, Q.Bình Thạnh, TP.HCM', 'PENDING', 310000, NOW());

INSERT IGNORE INTO order_details (id, order_id, product_id, product_name, quantity, price)
VALUES
(1, 1, 1, 'Hamburger Bò', 2, 45000),
(2, 1, 3, 'Coca Cola', 1, 20000),
(3, 1, 5, 'Khoai tây chiên', 1, 40000),
(4, 2, 2, 'Gà rán', 3, 55000),
(5, 2, 4, 'Trà sữa', 1, 35000),
(6, 2, 6, 'Combo gia đình', 1, 20000),
(7, 3, 1, 'Hamburger Bò', 1, 45000),
(8, 3, 3, 'Coca Cola', 2, 20000),
(9, 3, 7, 'Bánh mì gà', 1, 10000),
(10, 4, 2, 'Gà rán', 2, 55000),
(11, 4, 5, 'Khoai tây chiên', 2, 40000),
(12, 4, 4, 'Trà sữa', 1, 35000),
(13, 5, 6, 'Combo gia đình', 2, 120000),
(14, 5, 3, 'Coca Cola', 3, 20000),
(15, 5, 7, 'Bánh mì gà', 1, 10000);
