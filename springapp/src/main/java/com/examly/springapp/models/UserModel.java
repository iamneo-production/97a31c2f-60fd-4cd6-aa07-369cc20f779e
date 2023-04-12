package com.examly.springapp.models;
import java.lang.annotation.Inherited;
import java.sql.Date;
import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;


@Entity
@Table(name="user")
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String username;
    private String password;
    private String mobileNumber;
    private String userRole;
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getMobileNumber() {
        return mobileNumber;
    }
    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }
    public String getUserRole() {
        return userRole;
    }
 
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public UserModel(Long id, String email, String username, String password, String mobileNumber, String userRole) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.userRole = userRole;
    }
    public UserModel() {
    }

    
}

