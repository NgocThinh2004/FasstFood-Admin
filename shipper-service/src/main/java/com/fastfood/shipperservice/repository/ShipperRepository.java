package com.fastfood.shipperservice.repository;

import com.fastfood.shipperservice.entity.Shipper;
import com.fastfood.shipperservice.enums.ShipperStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShipperRepository extends JpaRepository<Shipper, Long> {

    List<Shipper> findByStatus(ShipperStatus status);
}
