package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.DeleteMapping; 
import org.springframework.web.bind.annotation.GetMapping; 
import org.springframework.web.bind.annotation.PathVariable; 
import org.springframework.web.bind.annotation.PostMapping; 
import org.springframework.web.bind.annotation.PutMapping; 
import org.springframework.web.bind.annotation.RequestBody; 
import org.springframework.web.bind.annotation.*;
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
// @ResponseBody
public class AdminController {
    private AdminService  adminService;
    public AdminController(AdminService adminService){
        this.adminService =  adminService;
    }

    @PostMapping("admin/addStudent")
    public String saveNewUser(@RequestBody StudentModel studentModel){
        adminService.addStudent(studentModel);
        return "Student added";
    }

    @DeleteMapping("admin/deleteStudent/{id}")
    private String deleteStudent(@PathVariable("id") Integer studentid ){
        return adminService.deleteStudent(studentid);
    }

    @PutMapping("admin/editStudent/{id}")
    private String editStudent(@PathVariable("id") Integer studentid ){
        return adminService.editStudent(studentid);
    }

    @GetMapping("admin/viewStudent")
    public StudentModel viewStudent(@RequestParam("id") Integer studentid){         
         StudentModel studentmodel = adminService.getStudent(studentid);
    return studentmodel;
    }

    @PostMapping("admin/addCourse")
    public String saveNewUser(@RequestBody CourseModel courseModel){
        adminService.addCourse(courseModel);
        return "Course added";
    }

    @DeleteMapping("admin/deleteCourse")
    private String deleteCourse(@PathVariable("id") Integer courseid ){
        return adminService.deleteCourse(courseid);
    }

    @PutMapping("admin/editCourse/{id}")
    private String editCourse(@PathVariable("id") Integer courseid ){
        return adminService.editCourse(courseid);
    }

    @GetMapping("admin/viewCourse")
    public CourseModel viewCourse(@RequestParam("id") Integer courseid){         
         return adminService.getCourse(courseid);
    }

    @CrossOrigin
    @PostMapping("admin/addInstitute")
    public String saveNewUser(@RequestBody InstituteModel instituteModel){
        adminService.addInstitute(instituteModel);
        return "Institute added";
    }

    @DeleteMapping("admin/deleteInstitutes")
    private String deleteInstitute(@PathVariable("id") Integer instituteid ){
        return adminService.deleteInstitute(instituteid);
    }

    @CrossOrigin
    @PutMapping("admin/editInstitute")
    private String editInstitute(@RequestParam("instituteId") Integer instituteid ){
        return adminService.editInstitute(instituteid);
    }

    @CrossOrigin
    @GetMapping("admin/viewInstitutes")
    public List<InstituteModel> viewInstitutes(){         
         return adminService.getInstitutes();
    }

       
}