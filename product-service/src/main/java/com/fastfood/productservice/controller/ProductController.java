package com.fastfood.productservice.controller;

import com.fastfood.productservice.dto.ProductRequest;
import com.fastfood.productservice.dto.ProductResponse;
import com.fastfood.productservice.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @PostMapping
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest request) {
        System.out.println(">>> POST /api/products");
        try {
            // Validate required fields
            if (request.getName() == null || request.getName().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Vui lòng nhập đúng/đủ thông tin"));
            }
            if (request.getPrice() == null || request.getPrice() < 0) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Vui lòng nhập đúng/đủ thông tin"));
            }
            if (request.getType() == null || request.getType().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Vui lòng nhập đúng/đủ thông tin"));
            }

            ProductResponse response = productService.createProduct(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", "Vui lòng nhập đúng/đủ thông tin"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("message", "Lỗi hệ thống: " + e.getMessage()));
        }
    }
}
