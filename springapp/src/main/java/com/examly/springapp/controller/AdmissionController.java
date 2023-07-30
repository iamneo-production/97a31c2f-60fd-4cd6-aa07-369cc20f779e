package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import com.examly.springapp.models.*;
import java.util.*;
import com.examly.springapp.service.admin.AdminService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdmissionController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/admin/admission")
    public List<StudentModel> viewAdmission() {
        return adminService.getStudent();
    }

    @PostMapping("/admin/addreason")
    public String addReason(@RequestBody AdmissionModel admissionModel) {
        return adminService.addReason(admissionModel);

    }
}