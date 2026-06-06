package com.fastfood.orderservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderResponse {

    private Long id;
    private String customerName;
    private String customerPhone;
    private String deliveryAddress;
    private String status;
    private Double totalPrice;
    private LocalDateTime createdAt;
    private Long shipperId;
    private String shipperName;
    private String confirmedBy;
    private List<OrderDetailResponse> orderDetails;
}
