package com.examly.springapp.models;
import java.lang.annotation.Inherited;
import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name = "Login")
public class LoginModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;

    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public String getPassword(){
        return password;
    }
    public void setPassword(String password){
        this.password = password;
    }
    public LoginModel(String email,String password){
        this.email = email;
        this.password = password;
    }
    public LoginModel() {
    }

    
}
