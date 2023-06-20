package com.examly.springapp.controller;

import org.springframework.web.bind.annotation.*;
import com.examly.springapp.service.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.*;
import java.util.*;
import java.security.Principal;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AdminController {

    @Autowired
    private AdminService  adminService;

    private void checkAdminAuthority(Principal principal) {
        if (!(principal instanceof Authentication)) {
            throw new UnauthorizedException();
        }
    
        Authentication authentication = (Authentication) principal;
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
    
        if (authorities.isEmpty()) {
            throw new UnauthorizedException();
        }
    
        GrantedAuthority firstAuthority = authorities.iterator().next();
        String authorityName = firstAuthority.getAuthority();
    
        if (!authorityName.equals("admin")) {
            throw new UnauthorizedException();
        }
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public class UnauthorizedException extends RuntimeException {
        public UnauthorizedException() {
            super("Unauthorized access");
        }
    }
    

    @PostMapping("admin/addStudent")
    public String saveNewUser(Principal principal,@RequestBody StudentModel studentModel){
        checkAdminAuthority(principal); 
        adminService.addStudent(studentModel);
        return "Student added";
    }

    @DeleteMapping("admin/deleteStudent/{id}")
    private String deleteStudent(Principal principal, @PathVariable("id") Integer studentid ){
        checkAdminAuthority(principal); 
        return adminService.deleteStudent(studentid);
    }

    @PutMapping("admin/editStudent/{id}")
    private String editStudent(Principal principal, @PathVariable("id") Integer studentid, @RequestBody StudentModel updatedStudent ){
        checkAdminAuthority(principal); 
        return adminService.editStudent(studentid, updatedStudent);
    }

    @GetMapping("admin/viewStudent")
    public List<StudentModel> viewStudent(Principal principal){   
        checkAdminAuthority(principal); 
        return adminService.getStudent();
    }

    @PostMapping("admin/addCourse")
    public String saveNewUser(Principal principal, @RequestBody CourseModel courseModel){
        checkAdminAuthority(principal); 
        adminService.addCourse(courseModel);
        return "Course added";
    }

    @DeleteMapping("admin/deleteCourse/{id}")
    private String deleteCourse(Principal principal, @PathVariable("id") Integer courseId ){
        checkAdminAuthority(principal); 
        return adminService.deleteCourse(courseId);
    }

    @PutMapping("admin/editCourse/{id}")
    private String editCourse(Principal principal, @PathVariable("id") Integer courseId, @RequestBody CourseModel courseModel ){
        checkAdminAuthority(principal); 
        return adminService.editCourse(courseId, courseModel);
    }

    @GetMapping("admin/viewCourse")
    public List<CourseModel> viewCourse(Principal principal){      
        checkAdminAuthority(principal);    
         return adminService.getCourse();
    }

    @PostMapping("admin/addInstitute")
    public String saveNewUser(@RequestBody InstituteModel instituteModel){
        adminService.addInstitute(instituteModel);
        return "Institute added";
    }

    @DeleteMapping("admin/deleteInstitutes")
    private String deleteInstitute(@RequestParam("id") Integer instituteId) {
        return adminService.deleteInstitute(instituteId);
    }

    @PutMapping("admin/editInstitute")
    private String editInstitute(@RequestParam("instituteId") Integer instituteId, @RequestBody InstituteModel updatedInstitute){
        return adminService.editInstitute(instituteId, updatedInstitute);
    }

    @GetMapping("admin/viewInstitutes")
    public List<InstituteModel> viewInstitutes(){         
         return adminService.getInstitutes();
    }

    
       
}