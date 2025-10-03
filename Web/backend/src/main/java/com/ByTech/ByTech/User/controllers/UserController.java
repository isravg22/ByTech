package com.ByTech.ByTech.User.controllers;

import com.ByTech.ByTech.User.services.UserService;
import com.ByTech.ByTech.User.models.UserModel;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.Optional;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ArrayList<UserModel> getUsers() {
        return this.userService.getUsers();
    }

    @PostMapping(path = "/insertUser")
    public ResponseEntity<?> saveUser(@RequestBody UserModel user) {
        try {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            user.setPassword(encoder.encode(user.getPassword()));
            return ResponseEntity.ok(this.userService.saveUser(user));
        } catch (Exception e) {
            if (e.getMessage().equals("Username already exists")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
            } else if (e.getMessage().equals("Email already exists")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
            }
        }
    }

    @GetMapping(path = "/{id}")
    public Optional<UserModel> getUserById(@PathVariable("id") Long id) {
        return this.userService.getById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<UserModel> login(@RequestBody UserModel userModel) {
        Optional<UserModel> userOptional = userService.getUserByCredential(userModel.getUserName(), userModel.getPassword());
        if (userOptional.isPresent()) {
            return ResponseEntity.ok(userOptional.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping(path = "{id}")
    public ResponseEntity<?> updateUserById(@RequestBody UserModel request, @PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(this.userService.updateByID(request, id));
        } catch (Exception e) {
            if (e.getMessage().equals("Username already exists")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
            } else if (e.getMessage().equals("Email already exists")) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
            }
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> deleteUserById(@PathVariable("id") Long id) {
        boolean ok = this.userService.deleteUser(id);
        if (ok) {
            return ResponseEntity.ok("User with id " + id + " deleted!");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error, we have a problem and can't delete user with id " + id);
        }
    }

    @GetMapping(path = "/enterprise/{id}")
    public ArrayList<UserModel> findByEnterpriseID(@PathVariable("id") Long id){
        return this.userService.findByEnterprise(id);
    }
}
