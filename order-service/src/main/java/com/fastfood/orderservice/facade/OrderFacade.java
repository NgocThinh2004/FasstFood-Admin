package com.fastfood.orderservice.facade;

import com.fastfood.orderservice.dto.AssignDeliveryRequest;
import com.fastfood.orderservice.dto.ShipperDto;
import com.fastfood.orderservice.service.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;


@Component
@RequiredArgsConstructor
@Slf4j
public class OrderFacade {

    private final OrderService orderService;
    private final RestTemplate restTemplate;

    @Value("${shipper-service.url}")
    private String shipperServiceUrl;


    public void assignDelivery(AssignDeliveryRequest request, String confirmedBy) {
        log.info("Assigning delivery: orders={}, shipper={}, confirmedBy={}",
                request.getOrderIds(), request.getShipperId(), confirmedBy);

        ShipperDto shipper = restTemplate.getForObject(
                shipperServiceUrl + "/api/shippers/{id}",
                ShipperDto.class,
                request.getShipperId()
        );

        if (shipper == null) {
            throw new RuntimeException("Không tìm thấy shipper với ID: " + request.getShipperId());
        }

        if (!"AVAILABLE".equals(shipper.getStatus())) {
            throw new RuntimeException("Shipper " + shipper.getName() + " hiện không rảnh");
        }


        orderService.assignShipperToOrders(
                request.getOrderIds(),
                shipper.getId(),
                shipper.getName(),
                confirmedBy
        );


        try {
            restTemplate.put(
                    shipperServiceUrl + "/api/shippers/{id}/status",
                    Map.of("status", "BUSY"),
                    request.getShipperId()
            );
            log.info("Shipper {} status updated to BUSY", shipper.getName());
        } catch (Exception e) {
            log.error("Failed to update shipper status: {}", e.getMessage());

            throw new RuntimeException("Không thể cập nhật trạng thái shipper: " + e.getMessage());
        }

        log.info("Delivery assignment completed successfully");
    }
}
