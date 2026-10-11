package com.queueease.queueease.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.queueease.queueease.entity.User;
import com.queueease.queueease.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Get user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    // Register user
    public User registerUser(User user) {

        if (user.getRole() == null ||
                user.getRole().isBlank()) {
            user.setRole("CUSTOMER");
        }

        return userRepository.save(user);
    }

    // Create user
    public User createUser(User user) {

        if (user.getRole() == null ||
                user.getRole().isBlank()) {
            user.setRole("CUSTOMER");
        }

        return userRepository.save(user);
    }

    // LOGIN
    public User login(String email, String password) {

        User user = userRepository.findByEmail(email);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(password)) {
            return null;
        }

        return user;
    }

    // Update user
    public User updateUser(
            Long id,
            User updatedUser) {

        User existingUser =
                userRepository.findById(id).orElse(null);

        if (existingUser == null) {
            return null;
        }

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhone(updatedUser.getPhone());
        existingUser.setPassword(updatedUser.getPassword());

        if (updatedUser.getRole() != null &&
                !updatedUser.getRole().isBlank()) {

            existingUser.setRole(updatedUser.getRole());
        }

        return userRepository.save(existingUser);
    }

    // Delete user
    public boolean deleteUser(Long id) {

        if (!userRepository.existsById(id)) {
            return false;
        }

        userRepository.deleteById(id);

        return true;
    }
}