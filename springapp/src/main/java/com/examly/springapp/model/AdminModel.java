package com.examly.springapp.model;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

import lombok.Data;

@Data
public class AdminModel {

    private String email;
	private String mobileNumber;
	private String password;
	@Enumerated(EnumType.STRING)
	private ERole userRole;
    
}
