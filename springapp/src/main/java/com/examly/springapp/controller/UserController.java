package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;
import org.springframework.beans.factory.annotation.*;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
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