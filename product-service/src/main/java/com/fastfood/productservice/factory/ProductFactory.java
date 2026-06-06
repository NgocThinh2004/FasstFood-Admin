package com.fastfood.productservice.factory;

import com.fastfood.productservice.dto.ProductRequest;
import com.fastfood.productservice.entity.Combo;
import com.fastfood.productservice.entity.Drink;
import com.fastfood.productservice.entity.Food;
import com.fastfood.productservice.entity.Product;
import com.fastfood.productservice.enums.ProductType;
import org.springframework.stereotype.Component;


@Component
public class ProductFactory {


    public Product createProduct(ProductRequest request) {
        ProductType type = ProductType.valueOf(request.getType().toUpperCase());

        return switch (type) {
            case FOOD -> Food.builder()
                    .name(request.getName())
                    .price(request.getPrice())
                    .description(request.getDescription())
                    .cookingTime(request.getCookingTime())
                    .build();

            case DRINK -> Drink.builder()
                    .name(request.getName())
                    .price(request.getPrice())
                    .description(request.getDescription())
                    .size(request.getSize())
                    .hasIce(request.getHasIce())
                    .build();

            case COMBO -> Combo.builder()
                    .name(request.getName())
                    .price(request.getPrice())
                    .description(request.getDescription())
                    .discountPercent(request.getDiscountPercent())
                    .build();
        };
    }
}
