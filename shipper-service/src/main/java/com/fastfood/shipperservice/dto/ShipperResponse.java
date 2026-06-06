package com.fastfood.shipperservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ShipperResponse {

    private Long id;
    private String name;
    private String phone;
    private String status;
}
