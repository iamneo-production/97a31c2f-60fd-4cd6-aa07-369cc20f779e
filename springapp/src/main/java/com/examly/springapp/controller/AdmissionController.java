package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import java.util.*;
import com.examly.springapp.service.*;


@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdmissionController{

    @Autowired
    private AdminService  adminService;

    @GetMapping("/admin/admission")
    public List<StudentModel> viewAdmission(){   
        return adminService.getStudent();
    }

}