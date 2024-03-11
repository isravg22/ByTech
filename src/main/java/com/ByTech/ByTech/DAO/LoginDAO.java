package com.ByTech.ByTech.DAO;

import com.ByTech.ByTech.LoginAndRegister.Login;
import org.springframework.data.repository.CrudRepository;

public interface LoginDAO extends CrudRepository<Login,Long> {
}
