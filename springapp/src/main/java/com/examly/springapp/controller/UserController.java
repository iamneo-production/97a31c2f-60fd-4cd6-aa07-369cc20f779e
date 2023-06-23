package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.spi.LoginModule;


@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

    @Autowired
    private UserService  userService;

    @Autowired
    private AdminService  adminService;
    
    public UserController(UserService userService){
        this.userService =  userService;
    }

    @PostMapping("user/addAdmission")
    public String saveNewUser(@RequestBody AdmissionModel admissionModel){
        userService.addAdmission(admissionModel);
        return "Course enrolled";
    }
    @GetMapping("user/viewAdmission")
    public List<AdmissionModel> viewAdmission(){         
         return userService.getAdmission();
    }

    @DeleteMapping("user/deleteAdmission/{id}")
    public String deleteAdmission(@PathVariable("id") Integer admissionid ){
        return userService.deleteAdmission(admissionid);
    }

    @PutMapping("user/editAdmission/{id}")
    public String editAdmission(@PathVariable("id") Integer admissionid, @RequestBody AdmissionModel updatedAdmission){
        return userService.editAdmission(admissionid,updatedAdmission);
    }

    
    @GetMapping("user/viewEnrolledCourse")
    public CourseModel viewEnrolledCourses(@RequestParam("studentid") Integer studentid){
        return userService.viewEnrolledCourse(studentid);
    }

    @GetMapping("user/viewCourse")
    public List<CourseModel> viewCourse(){      
        return adminService.getCourse();
    }
}