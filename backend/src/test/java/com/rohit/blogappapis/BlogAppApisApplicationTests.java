package com.rohit.blogappapis;

import com.rohit.blogappapis.repositories.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BlogAppApisApplicationTests {
	@Autowired
	private UserRepository userRepository;
	@Test
	void contextLoads() {
	}
	@Test
	public void repoTest(){
		String name=this.userRepository.getClass().getName();
		String packName=this.userRepository.getClass().getPackageName();
		System.out.println(name);
		System.out.println(packName);

	}

}
