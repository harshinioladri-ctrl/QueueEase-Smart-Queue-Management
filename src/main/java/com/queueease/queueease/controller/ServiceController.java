package com.queueease.queueease.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.queueease.queueease.entity.Service;
import com.queueease.queueease.service.ServiceService;

@RestController
@RequestMapping("/services")
public class ServiceController {

    private final ServiceService serviceService;

    public ServiceController(
            ServiceService serviceService) {

        this.serviceService = serviceService;
    }

    // GET ALL SERVICES
    @GetMapping
    public ResponseEntity<List<Service>> getAllServices() {

        return ResponseEntity.ok(
                serviceService.getAllServices()
        );
    }

    // GET SERVICE BY ID
    @GetMapping("/{id}")
    public ResponseEntity<Service> getServiceById(
            @PathVariable Long id) {

        Service service =
                serviceService.getServiceById(id);

        if (service == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(service);
    }

    // CREATE SERVICE
    @PostMapping
    public ResponseEntity<Service> createService(
            @RequestBody Service service) {

        return ResponseEntity.ok(
                serviceService.createService(service)
        );
    }

    // UPDATE SERVICE
    @PutMapping("/{id}")
    public ResponseEntity<Service> updateService(
            @PathVariable Long id,
            @RequestBody Service service) {

        Service updatedService =
                serviceService.updateService(
                        id,
                        service
                );

        if (updatedService == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                updatedService
        );
    }

    // DELETE SERVICE
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteService(
            @PathVariable Long id) {

        boolean deleted =
                serviceService.deleteService(id);

        if (!deleted) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                "Service deleted successfully"
        );
    }
}