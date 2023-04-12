package com.examly.springapp.service;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Service
public class LoginService {   
    private LoginRepository loginRepository;
    private UserRepository userRepository;
    private AdminRepository adminRepository;

    public LoginService(LoginRepository loginRepository, UserRepository userRepository,AdminRepository adminRepository){
        this.loginRepository = loginRepository;
        this.userRepository = userRepository;
        this.adminRepository = adminRepository;
    }

    public List<LoginModel> getAllUsers(){
       return loginRepository.findAll();
    }

    public boolean verifyLogin(LoginModel loginModel){
        Optional<UserModel> userModel = userRepository.findByEmail(loginModel.getEmail());
        if(userModel.isPresent()){
            if(userModel.get().getEmail().equals(loginModel.getEmail())){
                if(userModel.get().getPassword().equals(loginModel.getPassword())){
                    return true;
                }  else {
                    return false;
                }
            } else {
                return false; 
            }
        }
        return false;
    }
    public boolean verifyAdminLogin(LoginModel loginModel){
        AdminModel adminModel = adminRepository.findByEmail(loginModel.getEmail());
        if(adminModel!=null){
            if(adminModel.getEmail().equals(loginModel.getEmail())){
                if(adminModel.getPassword().equals(loginModel.getPassword())){
                    return true;
                }  else {
                    return false;
                }
            } else {
                return false; 
            }
        }
        return false;
    }
}