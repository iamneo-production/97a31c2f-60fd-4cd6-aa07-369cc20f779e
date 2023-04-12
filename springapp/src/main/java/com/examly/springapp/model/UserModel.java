package com.examly.springapp.model;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserModel {

    @Id
	private String email;
	private String username;
	private String mobileNumber;
	private String password;
	@Enumerated(EnumType.STRING)
    private ERole userRole;
    
    
}
