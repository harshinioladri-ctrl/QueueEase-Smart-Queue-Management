package com.queueease.queueease.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.queueease.queueease.entity.QueueEntry;
import com.queueease.queueease.repository.QueueEntryRepository;

@Service
public class QueueService {

    private final QueueEntryRepository queueRepository;

    public QueueService(QueueEntryRepository queueRepository) {
        this.queueRepository = queueRepository;
    }

    // Get all queue entries
    public List<QueueEntry> getAllQueueEntries() {
        return queueRepository.findAll();
    }

    // Get queue entry by ID
    public QueueEntry getQueueEntryById(Long id) {
        return queueRepository.findById(id).orElse(null);
    }

    // Add customer to queue and generate token
    public QueueEntry addToQueue(QueueEntry queueEntry) {

        if (queueEntry.getStatus() == null ||
                queueEntry.getStatus().isBlank()) {
            queueEntry.setStatus("WAITING");
        }

        if (queueEntry.getPriority() == null) {
            queueEntry.setPriority(0);
        }

        if (queueEntry.getJoinedAt() == null) {
            queueEntry.setJoinedAt(LocalDateTime.now());
        }

        if (queueEntry.getTokenNumber() == null ||
                queueEntry.getTokenNumber().isBlank()) {

            List<QueueEntry> allEntries =
                    queueRepository.findAll();

            int highestToken = 0;

            for (QueueEntry entry : allEntries) {

                String token = entry.getTokenNumber();

                if (token != null &&
                        token.startsWith("Q")) {

                    try {
                        int number = Integer.parseInt(
                                token.substring(1)
                        );

                        if (number > highestToken) {
                            highestToken = number;
                        }

                    } catch (NumberFormatException ignored) {
                    }
                }
            }

            queueEntry.setTokenNumber(
                    String.format(
                            "Q%03d",
                            highestToken + 1
                    )
            );
        }

        return queueRepository.save(queueEntry);
    }

    // Update queue entry
    public QueueEntry updateQueue(
            Long id,
            QueueEntry updatedEntry) {

        QueueEntry existingEntry =
                queueRepository.findById(id).orElse(null);

        if (existingEntry == null) {
            return null;
        }

        existingEntry.setCustomerName(
                updatedEntry.getCustomerName()
        );

        existingEntry.setStatus(
                updatedEntry.getStatus()
        );

        existingEntry.setTokenNumber(
                updatedEntry.getTokenNumber()
        );

        existingEntry.setPriority(
                updatedEntry.getPriority()
        );

        existingEntry.setJoinedAt(
                updatedEntry.getJoinedAt()
        );

        existingEntry.setServedAt(
                updatedEntry.getServedAt()
        );

        existingEntry.setService(
                updatedEntry.getService()
        );

        existingEntry.setUser(
                updatedEntry.getUser()
        );

        return queueRepository.save(existingEntry);
    }

    // Get next waiting customer
    public QueueEntry getNextWaitingCustomer() {

        List<QueueEntry> waiting =
                queueRepository.findByStatus("WAITING");

        if (waiting.isEmpty()) {
            return null;
        }

        return waiting.get(0);
    }

    // Complete queue entry
    public QueueEntry completeQueue(Long id) {

        QueueEntry entry =
                queueRepository.findById(id).orElse(null);

        if (entry == null) {
            return null;
        }

        entry.setStatus("COMPLETED");
        entry.setServedAt(LocalDateTime.now());

        return queueRepository.save(entry);
    }

    // Cancel queue entry
    public QueueEntry cancelQueue(Long id) {

        QueueEntry entry =
                queueRepository.findById(id).orElse(null);

        if (entry == null) {
            return null;
        }

        entry.setStatus("CANCELLED");

        return queueRepository.save(entry);
    }

    // Delete queue entry
    public boolean deleteQueue(Long id) {

        if (!queueRepository.existsById(id)) {
            return false;
        }

        queueRepository.deleteById(id);

        return true;
    }

    // Get waiting customers
    public List<QueueEntry> getWaitingCustomers() {
        return queueRepository.findByStatus("WAITING");
    }

    // Get by customer name
    public List<QueueEntry> getQueueByCustomerName(
            String customerName) {

        return queueRepository.findByCustomerName(
                customerName
        );
    }

    // Get by user ID
    public List<QueueEntry> getQueueByUserId(
            Long userId) {

        return queueRepository.findByUserId(userId);
    }
}