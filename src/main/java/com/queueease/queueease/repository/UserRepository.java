package com.queueease.queueease.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.queueease.queueease.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByEmail(String email);
}