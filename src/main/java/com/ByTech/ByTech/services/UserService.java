package com.ByTech.ByTech.services;

import com.ByTech.ByTech.models.UserModel;
import com.ByTech.ByTech.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {

    @Autowired
    IUserRepository userRepository;

    public ArrayList<UserModel> getUsers(){
        return (ArrayList<UserModel>) userRepository.findAll();
    }

    public UserModel saveUser(UserModel user){
        return userRepository.save(user);
    }

    public Optional<UserModel> getById(Long id){
        return userRepository.findById(id);
    }

    public Optional<UserModel> getUserByCredential(String userName,String password){
        return userRepository.findByUserNameAndPassword(userName,password);
    }

    public UserModel updateByID(UserModel request, Long id ){
        UserModel userModel = userRepository.findById(id).get();
        userModel.setFirstName(request.getFirstName());
        userModel.setLastName(request.getLastName());
        userModel.setEmail(request.getEmail());
        userModel.setPassword(request.getPassword());
        userModel.setRol(request.getRol());
        userModel.setActivated(request.getActivated());
        userModel.setUserName(request.getUserName());
        userRepository.save(userModel);

        return userModel;
    }

    public Boolean deleteUser(Long id){
        try{
            userRepository.deleteById(id);
            return true;
        }catch (Exception e){
            return false;
        }
    }
}