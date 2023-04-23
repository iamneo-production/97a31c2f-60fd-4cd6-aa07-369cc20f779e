package com.examly.springapp.controller;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;

import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;


@RestController
@RequestMapping("/")

@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {
    @Autowired
    private AdminService  adminService;

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
         return adminService.getStudent(studentid);
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
    public List<CourseModel> viewCourse(){         
         return adminService.getCourse();
    }

    @PostMapping("admin/addInstitute")
    public String saveNewUser(@RequestBody InstituteModel instituteModel){
        adminService.addInstitute(instituteModel);
        return "Institute added";
    }

    @DeleteMapping("admin/deleteInstitutes")
    private String deleteInstitute(@PathVariable("id") Integer instituteid ){
        return adminService.deleteInstitute(instituteid);
    }


    @PutMapping("admin/editInstitute")
    private String editInstitute(@RequestParam("instituteId") Integer instituteid ){
        return adminService.editInstitute(instituteid);
    }


    @GetMapping("admin/viewInstitutes")
    public List<InstituteModel> viewInstitutes(){         
         return adminService.getInstitutes();
    }

       
}