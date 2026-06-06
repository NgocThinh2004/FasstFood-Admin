package com.fastfood.productservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductRequest {

    private String name;
    private Double price;
    private String description;
    private String type; // FOOD, DRINK, COMBO

    // Food specific
    private Integer cookingTime;

    // Drink specific
    private String size;
    private Boolean hasIce;

    // Combo specific
    private Double discountPercent;
}
