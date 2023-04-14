package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;

import javax.security.auth.spi.LoginModule;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {
    private UserService  userService;
    public UserController(UserService userService){
        this.userService =  userService;
    }
  
    @PostMapping("user/addAdmission")
    public String saveNewUser(@RequestBody AdmissionModel admissionModel){
        userService.addAdmission(admissionModel);
        return "Course enrolled";
    }
    @GetMapping("user/viewAdmission")
    public AdmissionModel viewAdmission(@RequestParam("id") Integer admissionid){         
         return userService.getAdmission(admissionid);
    }

    @DeleteMapping("user/deleteAdmission/{id}")
    private String deleteAdmission(@PathVariable("id") Integer admissionid ){
        return userService.deleteAdmission(admissionid);
    }

    @PutMapping("user/editAdmission/{id}")
    private String editAdmission(@PathVariable("id") Integer admissionid ){
        return userService.editAdmission(admissionid);
    }

    @GetMapping("user/viewStatus")
    public AdmissionModel viewStatus(@RequestParam("id") Integer admissionid){         
         return userService.getAdmission(admissionid);
    }


}