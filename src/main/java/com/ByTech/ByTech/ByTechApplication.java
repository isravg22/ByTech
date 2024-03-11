package com.ByTech.ByTech;

import com.ByTech.ByTech.DAO.LoginDAO;
import com.ByTech.ByTech.DAO.RegisterDAO;
import com.ByTech.ByTech.LoginAndRegister.Register;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class ByTechApplication {

	@Autowired
	LoginDAO loginDAO;

	@Autowired
	RegisterDAO registerDAO;

	public static void main(String[] args) {



		SpringApplication.run(ByTechApplication.class, args);
	}

	@Bean
	CommandLineRunner runner(){
		return args->{
			Register register= new Register("Israel","Valderrama","García","isvalgar@gmail.com","Isravg22","123456");

			registerDAO.save(register);
		};
	}

}
