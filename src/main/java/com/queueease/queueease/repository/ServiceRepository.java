package com.queueease.queueease.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.queueease.queueease.entity.Service;

public interface ServiceRepository
        extends JpaRepository<Service, Long> {
}