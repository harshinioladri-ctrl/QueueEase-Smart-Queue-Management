package com.queueease.queueease.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.queueease.queueease.entity.QueueEntry;
import com.queueease.queueease.service.QueueService;

@RestController
@RequestMapping("/queue")
public class QueueController {

    private final QueueService queueService;

    public QueueController(QueueService queueService) {
        this.queueService = queueService;
    }

    // Get all queue entries
    @GetMapping
    public ResponseEntity<List<QueueEntry>> getAllQueueEntries() {

        return ResponseEntity.ok(
                queueService.getAllQueueEntries()
        );
    }

    // Get queue entry by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getQueueEntryById(
            @PathVariable Long id) {

        QueueEntry queueEntry =
                queueService.getQueueEntryById(id);

        if (queueEntry == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Queue entry not found");
        }

        return ResponseEntity.ok(queueEntry);
    }

    // Get queue by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<QueueEntry>> getQueueByUserId(
            @PathVariable Long userId) {

        return ResponseEntity.ok(
                queueService.getQueueByUserId(userId)
        );
    }

    // Get queue by customer name
    @GetMapping("/customer/{customerName}")
    public ResponseEntity<List<QueueEntry>>
    getQueueByCustomerName(
            @PathVariable String customerName) {

        return ResponseEntity.ok(
                queueService.getQueueByCustomerName(
                        customerName
                )
        );
    }

    // Get all waiting customers
    @GetMapping("/waiting")
    public ResponseEntity<List<QueueEntry>>
    getWaitingCustomers() {

        return ResponseEntity.ok(
                queueService.getWaitingCustomers()
        );
    }

    // Get next waiting customer
    @GetMapping("/next")
    public ResponseEntity<?> getNextWaitingCustomer() {

        QueueEntry next =
                queueService.getNextWaitingCustomer();

        if (next == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No waiting customers");
        }

        return ResponseEntity.ok(next);
    }

    // Generate token
    @PostMapping("/token")
    public ResponseEntity<QueueEntry> generateToken(
            @RequestBody QueueEntry queueEntry) {

        QueueEntry createdEntry =
                queueService.addToQueue(queueEntry);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdEntry);
    }

    // Add to queue
    @PostMapping
    public ResponseEntity<QueueEntry> addToQueue(
            @RequestBody QueueEntry queueEntry) {

        QueueEntry createdEntry =
                queueService.addToQueue(queueEntry);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(createdEntry);
    }

    // Complete queue
    @PutMapping("/complete/{id}")
    public ResponseEntity<?> completeQueue(
            @PathVariable Long id) {

        QueueEntry updatedEntry =
                queueService.completeQueue(id);

        if (updatedEntry == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Queue entry not found");
        }

        return ResponseEntity.ok(updatedEntry);
    }

    // Cancel queue
    @PutMapping("/cancel/{id}")
    public ResponseEntity<?> cancelQueue(
            @PathVariable Long id) {

        QueueEntry updatedEntry =
                queueService.cancelQueue(id);

        if (updatedEntry == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Queue entry not found");
        }

        return ResponseEntity.ok(updatedEntry);
    }

    // General update
    @PutMapping("/{id}")
    public ResponseEntity<?> updateQueue(
            @PathVariable Long id,
            @RequestBody QueueEntry queueEntry) {

        QueueEntry updatedEntry =
                queueService.updateQueue(
                        id,
                        queueEntry
                );

        if (updatedEntry == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Queue entry not found");
        }

        return ResponseEntity.ok(updatedEntry);
    }

    // Delete queue entry
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteQueue(
            @PathVariable Long id) {

        boolean deleted =
                queueService.deleteQueue(id);

        if (!deleted) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Queue entry not found");
        }

        return ResponseEntity.ok(
                "Queue entry deleted successfully"
        );
    }
}