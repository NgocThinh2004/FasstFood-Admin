package com.fastfood.orderservice.controller;

import com.fastfood.orderservice.dto.AssignDeliveryRequest;
import com.fastfood.orderservice.dto.OrderResponse;
import com.fastfood.orderservice.enums.OrderStatus;
import com.fastfood.orderservice.facade.OrderFacade;
import com.fastfood.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final OrderFacade orderFacade;


    @GetMapping
    public ResponseEntity<List<OrderResponse>> getOrders(
            @RequestParam(required = false) String status) {
        System.out.println(">>> GET /api/orders");
        if (status != null) {
            OrderStatus orderStatus = OrderStatus.valueOf(status.toUpperCase());
            return ResponseEntity.ok(orderService.getOrdersByStatus(orderStatus));
        }
        return ResponseEntity.ok(orderService.getAllOrders());
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getOrderById(@PathVariable Long id) {
        System.out.println(">>> GET /api/orders/" + id);
        try {
            OrderResponse response = orderService.getOrderById(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping("/assign")
    public ResponseEntity<?> assignDelivery(
            @RequestBody AssignDeliveryRequest request,
            @RequestHeader(value = "X-Admin-Name", defaultValue = "Unknown") String adminName) {
        System.out.println(">>> POST /api/orders/assign");
        try {
            String decodedAdminName = URLDecoder.decode(adminName, StandardCharsets.UTF_8);
            orderFacade.assignDelivery(request, decodedAdminName);
            return ResponseEntity.ok(
                    Map.of("message", "Phân công giao hàng cho shipper thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
