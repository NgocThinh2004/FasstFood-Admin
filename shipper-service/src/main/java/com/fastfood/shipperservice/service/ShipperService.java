package com.fastfood.shipperservice.service;

import com.fastfood.shipperservice.dto.ShipperResponse;
import com.fastfood.shipperservice.entity.Shipper;
import com.fastfood.shipperservice.enums.ShipperStatus;
import com.fastfood.shipperservice.repository.ShipperRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShipperService {

    private final ShipperRepository shipperRepository;


    public List<ShipperResponse> getShippers(ShipperStatus status) {
        List<Shipper> shippers;
        if (status != null) {
            shippers = shipperRepository.findByStatus(status);
        } else {
            shippers = shipperRepository.findAll();
        }
        return shippers.stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }


    public ShipperResponse getShipperById(Long id) {
        Shipper shipper = shipperRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy shipper với ID: " + id));
        return toResponse(shipper);
    }


    public ShipperResponse updateShipperStatus(Long id, ShipperStatus newStatus) {
        Shipper shipper = shipperRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy shipper với ID: " + id));

        if (!shipper.getStatus().canTransitionTo(newStatus)) {
            throw new RuntimeException("Không thể chuyển trạng thái từ "
                    + shipper.getStatus() + " sang " + newStatus);
        }

        shipper.setStatus(newStatus);
        Shipper saved = shipperRepository.save(shipper);
        return toResponse(saved);
    }

    private ShipperResponse toResponse(Shipper shipper) {
        return ShipperResponse.builder()
                .id(shipper.getId())
                .name(shipper.getName())
                .phone(shipper.getPhone())
                .status(shipper.getStatus().name())
                .build();
    }
}
