package com.ByTech.ByTech.User.controllers;

import com.ByTech.ByTech.User.services.UserService;
import com.ByTech.ByTech.User.models.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = {"http://localhost:3000","http://localhost:3001"})
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ArrayList<UserModel> getUsers(){
        return this.userService.getUsers();
    }

    @PostMapping(path = "/insertUser")
    public UserModel saveUser(@RequestBody UserModel user){
        return this.userService.saveUser(user);
    }

    @GetMapping(path = "/{id}")
    public Optional<UserModel> getUserById(@PathVariable("id") Long id){
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
    public UserModel updateUserById(@RequestBody UserModel request ,@PathVariable("id") Long id){
        return this.userService.updateByID(request, id);
    }
    @DeleteMapping (path = "/{id}")
    public String deleteUserById (@PathVariable("id") Long id){
        boolean ok = this.userService.deleteUser(id);
        if(ok){
            return "User with id "+id+" delete!";
        }else{
            return "Error, we have a problem and can´t delete user with id "+id;
        }
    }




}
