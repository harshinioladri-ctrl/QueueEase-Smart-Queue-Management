package com.queueease.queueease;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.queueease.queueease.entity.Service;
import com.queueease.queueease.entity.User;
import com.queueease.queueease.repository.ServiceRepository;
import com.queueease.queueease.repository.UserRepository;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    public DataInitializer(UserRepository userRepository, ServiceRepository serviceRepository) {
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
    }

    @Override
    public void run(String... args) {
        // Seed default Admin if not exists
        if (userRepository.findByEmail("admin@queueease.com") == null) {
            User admin = new User();
            admin.setName("Admin User");
            admin.setEmail("admin@queueease.com");
            admin.setPassword("admin123");
            admin.setPhone("1234567890");
            admin.setRole("ADMIN");
            userRepository.save(admin);
            System.out.println(">>> Seeded default Admin user: admin@queueease.com / admin123");
        }

        // Seed default Customer if not exists
        if (userRepository.findByEmail("customer@queueease.com") == null) {
            User customer = new User();
            customer.setName("Demo Customer");
            customer.setEmail("customer@queueease.com");
            customer.setPassword("customer123");
            customer.setPhone("9876543210");
            customer.setRole("CUSTOMER");
            userRepository.save(customer);
            System.out.println(">>> Seeded default Customer user: customer@queueease.com / customer123");
        }

        // Seed sample services if none exist
        if (serviceRepository.count() == 0) {
            Service s1 = new Service();
            s1.setName("Doctor Consultation");
            s1.setDescription("General medical checkup and consultation");
            s1.setActive(true);
            s1.setAverageTime(15);
            s1.setAverageServiceTime(15);
            serviceRepository.save(s1);

            Service s2 = new Service();
            s2.setName("Pharmacy Services");
            s2.setDescription("Prescription collection and medicine purchase");
            s2.setActive(true);
            s2.setAverageTime(10);
            s2.setAverageServiceTime(10);
            serviceRepository.save(s2);

            Service s3 = new Service();
            s3.setName("Lab Tests & Diagnostics");
            s3.setDescription("Blood work, sample collection, and scans");
            s3.setActive(true);
            s3.setAverageTime(20);
            s3.setAverageServiceTime(20);
            serviceRepository.save(s3);

            System.out.println(">>> Seeded default sample services.");
        }
    }
}
