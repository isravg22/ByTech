package com.ByTech.ByTech.User.services;

import com.ByTech.ByTech.User.repositories.IUserRepository;
import com.ByTech.ByTech.User.models.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    IUserRepository userRepository;

    public ArrayList<UserModel> getUsers() {
        return (ArrayList<UserModel>) userRepository.findAll();
    }

    public UserModel saveUser(UserModel user) throws Exception {
        if (existsByUserName(user.getUserName())) {
            throw new Exception("Username already exists");
        }
        if (existsByEmail(user.getEmail())) {
            throw new Exception("Email already exists");
        }
        return userRepository.save(user);
    }

    public Optional<UserModel> getById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<UserModel> getUserByCredential(String userName, String password) {
        return userRepository.findByUserNameAndPassword(userName, password);
    }

    public UserModel updateByID(UserModel request, Long id) throws Exception {
        UserModel userModel = userRepository.findById(id).orElseThrow(() -> new Exception("User not found"));

        if (!userModel.getUserName().equals(request.getUserName()) && existsByUserName(request.getUserName())) {
            throw new Exception("Username already exists");
        }
        if (!userModel.getEmail().equals(request.getEmail()) && existsByEmail(request.getEmail())) {
            throw new Exception("Email already exists");
        }

        userModel.setFirstName(request.getFirstName());
        userModel.setLastName(request.getLastName());
        userModel.setEmail(request.getEmail());
        userModel.setPassword(request.getPassword());
        userModel.setRol(request.getRol());
        userModel.setActivated(request.getActivated());
        userModel.setUserName(request.getUserName());
        userModel.setEnterprise(request.getEnterprise());

        userRepository.save(userModel);

        return userModel;
    }

    public Boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean existsByUserName(String userName) {
        return userRepository.existsByUserName(userName);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    public Optional<UserModel> getByUserName(String userName) {
        return userRepository.findByUserName(userName);
    }

    public ArrayList<UserModel> findByEnterprise(Long id){
        return userRepository.findByEnterprise(id);
    }
}
