package com.queueease.queueease.service;

import java.util.List;

import com.queueease.queueease.entity.Service;
import com.queueease.queueease.repository.ServiceRepository;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    public Service createService(Service service) {

        if (service.getActive() == null) {
            service.setActive(true);
        }

        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service updatedService) {

        Service existingService =
                serviceRepository.findById(id).orElse(null);

        if (existingService == null) {
            return null;
        }

        existingService.setName(updatedService.getName());
        existingService.setDescription(updatedService.getDescription());
        existingService.setActive(updatedService.getActive());
        existingService.setAverageServiceTime(
                updatedService.getAverageServiceTime()
        );
        existingService.setAverageTime(
                updatedService.getAverageTime()
        );

        return serviceRepository.save(existingService);
    }

    public boolean deleteService(Long id) {

        if (!serviceRepository.existsById(id)) {
            return false;
        }

        serviceRepository.deleteById(id);
        return true;
    }
}