package com.fastfood.orderservice.service;

import com.fastfood.orderservice.dto.OrderDetailResponse;
import com.fastfood.orderservice.dto.OrderResponse;
import com.fastfood.orderservice.entity.Order;
import com.fastfood.orderservice.entity.OrderDetail;
import com.fastfood.orderservice.enums.OrderStatus;
import com.fastfood.orderservice.repository.OrderDetailRepository;
import com.fastfood.orderservice.repository.OrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;

    public List<OrderResponse> getOrdersByStatus(OrderStatus status) {
        List<Order> orders = orderRepository.findByStatusOrderByCreatedAtDesc(status);
        return orders.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<OrderResponse> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }


    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy đơn hàng với ID: " + id));
        return toResponseWithDetails(order);
    }


    @Transactional
    public void assignShipperToOrders(List<Long> orderIds, Long shipperId,
                                       String shipperName, String confirmedBy) {
        List<Order> orders = orderRepository.findAllById(orderIds);

        if (orders.size() != orderIds.size()) {
            throw new RuntimeException("Một số đơn hàng không tồn tại");
        }

        for (Order order : orders) {
            if (!order.getStatus().canTransitionTo(OrderStatus.DELIVERING)) {
                throw new RuntimeException(
                        "Đơn hàng #" + order.getId() + " không thể chuyển sang trạng thái DELIVERING"
                                + " (trạng thái hiện tại: " + order.getStatus() + ")");
            }

            order.setStatus(OrderStatus.DELIVERING);
            order.setShipperId(shipperId);
            order.setShipperName(shipperName);
            order.setConfirmedBy(confirmedBy);
        }

        orderRepository.saveAll(orders);
    }


    private OrderResponse toResponse(Order order) {
        return OrderResponse.builder()
                .id(order.getId())
                .customerName(order.getCustomerName())
                .customerPhone(order.getCustomerPhone())
                .deliveryAddress(order.getDeliveryAddress())
                .status(order.getStatus().name())
                .totalPrice(order.getTotalPrice())
                .createdAt(order.getCreatedAt())
                .shipperId(order.getShipperId())
                .shipperName(order.getShipperName())
                .confirmedBy(order.getConfirmedBy())
                .build();
    }

    private OrderResponse toResponseWithDetails(Order order) {
        List<OrderDetail> details = orderDetailRepository.findByOrderId(order.getId());

        List<OrderDetailResponse> detailResponses = details.stream()
                .map(detail -> OrderDetailResponse.builder()
                        .id(detail.getId())
                        .productId(detail.getProductId())
                        .productName(detail.getProductName())
                        .quantity(detail.getQuantity())
                        .price(detail.getPrice())
                        .build())
                .collect(Collectors.toList());

        return OrderResponse.builder()
                .id(order.getId())
                .customerName(order.getCustomerName())
                .customerPhone(order.getCustomerPhone())
                .deliveryAddress(order.getDeliveryAddress())
                .status(order.getStatus().name())
                .totalPrice(order.getTotalPrice())
                .createdAt(order.getCreatedAt())
                .shipperId(order.getShipperId())
                .shipperName(order.getShipperName())
                .confirmedBy(order.getConfirmedBy())
                .orderDetails(detailResponses)
                .build();
    }
}
