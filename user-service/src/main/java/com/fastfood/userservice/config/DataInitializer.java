package com.fastfood.userservice.config;

import com.fastfood.userservice.entity.User;
import com.fastfood.userservice.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

/**
 * Initializes default admin user on application startup.
 * Uses BCryptPasswordEncoder to properly hash the password.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = User.builder()
                    .username("admin")
                    .password(passwordEncoder.encode("123456"))
                    .name("Quản Lý")
                    .build();
            userRepository.save(admin);
            log.info("Default admin user created: admin / 123456");
        } else {
            log.info("Admin user already exists, skipping initialization.");
        }
    }
}
