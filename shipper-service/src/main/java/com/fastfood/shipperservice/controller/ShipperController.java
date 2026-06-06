package com.fastfood.shipperservice.controller;

import com.fastfood.shipperservice.dto.ShipperResponse;
import com.fastfood.shipperservice.dto.UpdateStatusRequest;
import com.fastfood.shipperservice.enums.ShipperStatus;
import com.fastfood.shipperservice.service.ShipperService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/shippers")
@RequiredArgsConstructor
public class ShipperController {

    private final ShipperService shipperService;

    @GetMapping
    public ResponseEntity<List<ShipperResponse>> getShippers(
            @RequestParam(required = false) String status) {
        System.out.println(">>> GET /api/shippers");
        try {
            ShipperStatus shipperStatus = (status != null)
                    ? ShipperStatus.valueOf(status.toUpperCase())
                    : null;
            List<ShipperResponse> shippers = shipperService.getShippers(shipperStatus);
            return ResponseEntity.ok(shippers);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getShipperById(@PathVariable Long id) {
        System.out.println(">>> GET /api/shippers/" + id);
        try {
            ShipperResponse response = shipperService.getShipperById(id);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }


    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateStatusRequest request) {
        System.out.println(">>> PUT /api/shippers/" + id + "/status");
        try {
            ShipperStatus newStatus = ShipperStatus.valueOf(request.getStatus().toUpperCase());
            ShipperResponse response = shipperService.updateShipperStatus(id, newStatus);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
