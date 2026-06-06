package com.fastfood.productservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private Double price;
    private String description;
    private String type;

    // Dynamic fields based on type
    private Integer cookingTime;    // FOOD
    private String size;            // DRINK
    private Boolean hasIce;         // DRINK
    private Double discountPercent; // COMBO
}
