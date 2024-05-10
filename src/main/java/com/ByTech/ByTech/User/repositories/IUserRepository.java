package com.ByTech.ByTech.User.repositories;

import com.ByTech.ByTech.User.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IUserRepository extends JpaRepository<UserModel,Long> {
    Optional<UserModel> findByUserNameAndPassword(String userName, String password);
    Optional<UserModel> findByUserName(String userName);


}
