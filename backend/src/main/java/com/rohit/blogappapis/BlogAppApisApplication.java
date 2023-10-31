package com.rohit.blogappapis;

import com.rohit.blogappapis.config.AppConstants;
import com.rohit.blogappapis.entities.Role;
import com.rohit.blogappapis.repositories.RoleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class BlogAppApisApplication implements CommandLineRunner {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private RoleRepository roleRepository;



	public static void main(String[] args) {
		SpringApplication.run(BlogAppApisApplication.class, args);
	}
	@Bean
	public ModelMapper modelMapper(){
	return new ModelMapper();
	}



	@Override
	public void run(String... args) throws Exception {
		System.out.println(this.passwordEncoder.encode("123"));
		try{
			Role role=new Role();
			role.setRole_id(AppConstants.ADMIN_USER);
			role.setRole("ROLE_ADMIN");

			Role role2=new Role();
			role2.setRole_id(AppConstants.NORMAL_USER);
			role2.setRole("ROLE_NORMAL");
			List<Role> roles=List.of(role,role2);
			//will add role if not exists already because
			//id we have specified
			List<Role> result=this.roleRepository.saveAll(roles);

			result.forEach(r-> System.out.println(r.getRole()));

		}catch(Exception e){


		}
	}
}
