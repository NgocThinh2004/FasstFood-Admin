package com.fastfood.productservice.service;

import com.fastfood.productservice.dto.ProductRequest;
import com.fastfood.productservice.dto.ProductResponse;
import com.fastfood.productservice.entity.Combo;
import com.fastfood.productservice.entity.Drink;
import com.fastfood.productservice.entity.Food;
import com.fastfood.productservice.entity.Product;
import com.fastfood.productservice.factory.ProductFactory;
import com.fastfood.productservice.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final ProductFactory productFactory;


    public ProductResponse createProduct(ProductRequest request) {
        Product product = productFactory.createProduct(request);
        Product saved = productRepository.save(product);
        return toResponse(saved);
    }

    private ProductResponse toResponse(Product product) {
        ProductResponse.ProductResponseBuilder builder = ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .description(product.getDescription())
                .type(getProductType(product));

        if (product instanceof Food food) {
            builder.cookingTime(food.getCookingTime());
        } else if (product instanceof Drink drink) {
            builder.size(drink.getSize());
            builder.hasIce(drink.getHasIce());
        } else if (product instanceof Combo combo) {
            builder.discountPercent(combo.getDiscountPercent());
        }

        return builder.build();
    }

    private String getProductType(Product product) {
        if (product instanceof Food)
            return "FOOD";
        if (product instanceof Drink)
            return "DRINK";
        if (product instanceof Combo)
            return "COMBO";
        return "UNKNOWN";
    }
}
