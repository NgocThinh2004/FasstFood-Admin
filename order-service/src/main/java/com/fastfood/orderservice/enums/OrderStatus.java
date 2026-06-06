package com.fastfood.orderservice.enums;


public enum OrderStatus {
    PENDING,
    DELIVERING,
    COMPLETED;


    public boolean canTransitionTo(OrderStatus newStatus) {
        return switch (this) {
            case PENDING -> newStatus == DELIVERING;
            case DELIVERING -> newStatus == COMPLETED;
            case COMPLETED -> false;
        };
    }
}
