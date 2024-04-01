package com.ByTech.ByTech.repositories;

import com.ByTech.ByTech.models.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface IUserRepository extends JpaRepository<UserModel,Long> {
    Optional<UserModel> findByUserNameAndPassword(String userName, String password);

}
