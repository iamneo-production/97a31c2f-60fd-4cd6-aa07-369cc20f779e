package com.examly.springapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;


@SpringBootApplication
@EnableAspectJAutoProxy(proxyTargetClass=true)  // This is required for AOP to work
public class SpringappApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringappApplication.class, args);
	}

}
