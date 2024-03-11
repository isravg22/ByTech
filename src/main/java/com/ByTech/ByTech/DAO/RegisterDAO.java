package com.ByTech.ByTech.DAO;

import com.ByTech.ByTech.LoginAndRegister.Register;
import org.springframework.data.repository.CrudRepository;

public interface RegisterDAO extends CrudRepository<Register,Long> {
}
