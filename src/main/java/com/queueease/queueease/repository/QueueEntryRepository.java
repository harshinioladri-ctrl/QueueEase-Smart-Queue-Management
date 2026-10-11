package com.queueease.queueease.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.queueease.queueease.entity.QueueEntry;

public interface QueueEntryRepository
        extends JpaRepository<QueueEntry, Long> {

    List<QueueEntry> findByStatus(String status);

    List<QueueEntry> findByCustomerName(String customerName);

    List<QueueEntry> findByUserId(Long userId);
}