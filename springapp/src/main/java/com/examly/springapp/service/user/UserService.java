package com.examly.springapp.service.user;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.examly.springapp.models.AdminModel;
import com.examly.springapp.models.AdmissionModel;
import com.examly.springapp.models.CourseModel;
import com.examly.springapp.models.UserModel;


public interface UserService {

    public String saveUser(UserModel userModel);

    public String saveAdmin(AdminModel adminModel);

    public void addAdmission(AdmissionModel admissionModel);

    public List<AdmissionModel> getAdmission();

    public String deleteAdmission(Integer id);

    public ResponseEntity<?> editAdmission(Integer id, AdmissionModel updatedAdmission);

    public CourseModel viewEnrolledCourse(Integer studentId);

}