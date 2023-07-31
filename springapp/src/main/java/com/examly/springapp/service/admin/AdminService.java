package com.examly.springapp.service.admin;

import java.util.List;

import org.springframework.http.ResponseEntity;
import com.examly.springapp.models.AdmissionModel;
import com.examly.springapp.models.CourseModel;
import com.examly.springapp.models.InstituteModel;
import com.examly.springapp.models.StudentModel;


public interface AdminService {

    public void addStudent(StudentModel studentModel);

    public String editStudent(int studentId, StudentModel updatedStudent);

    public String deleteStudent(Integer id);

    public StudentModel getStudent(Integer id);

    public List<StudentModel> getStudent();

    public void addCourse(CourseModel courseModel);

    public String editCourse(Integer courseId, CourseModel courseModelFromRequest);

    public String deleteCourse(Integer id);

    public CourseModel getCourse(Integer id);

    public List<CourseModel> getCourse();

    public void addInstitute(InstituteModel instituteModel);

    public String editInstitute(Integer instituteId, InstituteModel updatedInstitute);

    public String deleteInstitute(Integer id);

    public InstituteModel getInstitute(Integer id);

    public List<InstituteModel> getInstitutes();

    public String addReason(AdmissionModel admissionModel);

    public ResponseEntity<?> getAdmission(int page, int pageSize);

    public ResponseEntity<?> filterByStatus(String status);

}