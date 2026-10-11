package com.queueease.queueease.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.queueease.queueease.entity.User;
import com.queueease.queueease.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ==========================================
    // GET ALL USERS
    // GET http://localhost:8080/users
    // ==========================================
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {

        return ResponseEntity.ok(
                userService.getAllUsers()
        );
    }

    // ==========================================
    // GET USER BY ID
    // GET http://localhost:8080/users/{id}
    // ==========================================
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(
            @PathVariable Long id) {

        User user = userService.getUserById(id);

        if (user == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(user);
    }

    // ==========================================
    // REGISTER USER
    // POST http://localhost:8080/users/register
    // ==========================================
    @PostMapping("/register")
    public ResponseEntity<User> registerUser(
            @RequestBody User user) {

        User registeredUser =
                userService.registerUser(user);

        return ResponseEntity.ok(
                registeredUser
        );
    }

    // ==========================================
    // CREATE USER
    // POST http://localhost:8080/users
    // ==========================================
    @PostMapping
    public ResponseEntity<User> createUser(
            @RequestBody User user) {

        User createdUser =
                userService.createUser(user);

        return ResponseEntity.ok(
                createdUser
        );
    }

    // ==========================================
    // LOGIN
    // POST http://localhost:8080/users/login
    // ==========================================
    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody User loginUser) {

        User user = userService.login(
                loginUser.getEmail(),
                loginUser.getPassword()
        );

        if (user == null) {

            return ResponseEntity
                    .status(401)
                    .body("Invalid email or password");
        }

        return ResponseEntity.ok(user);
    }

    // ==========================================
    // UPDATE USER
    // PUT http://localhost:8080/users/{id}
    // ==========================================
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(
            @PathVariable Long id,
            @RequestBody User user) {

        User updatedUser =
                userService.updateUser(
                        id,
                        user
                );

        if (updatedUser == null) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                updatedUser
        );
    }

    // ==========================================
    // DELETE USER
    // DELETE http://localhost:8080/users/{id}
    // ==========================================
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id) {

        boolean deleted =
                userService.deleteUser(id);

        if (!deleted) {

            return ResponseEntity
                    .notFound()
                    .build();
        }

        return ResponseEntity.ok(
                "User deleted successfully"
        );
    }
}