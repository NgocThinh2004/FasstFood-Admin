package com.fastfood.shipperservice.enums;


public enum ShipperStatus {
    AVAILABLE,
    BUSY;


    public boolean canTransitionTo(ShipperStatus newStatus) {
        return this != newStatus;
    }
}
