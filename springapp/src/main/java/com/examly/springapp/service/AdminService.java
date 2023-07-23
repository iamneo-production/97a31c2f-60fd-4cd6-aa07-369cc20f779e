package com.examly.springapp.service;

import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;

import java.util.*;

@Service
public class AdminService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstituteRepository instituteRepository;

    @Autowired
    private AdmissionRepo admissionRepo;

    public void addStudent(StudentModel studentModel) {
        studentRepository.save(studentModel);
    }

    public String editStudent(int studentId, StudentModel updatedStudent) {
        Optional<StudentModel> stu = studentRepository.findByStudentId(studentId);
        if (stu.isPresent()) {
            StudentModel student = stu.get();

            student.setFirstName(updatedStudent.getFirstName());
            student.setLastName(updatedStudent.getLastName());
            student.setFatherName(updatedStudent.getFatherName());
            student.setPhoneNumber1(updatedStudent.getPhoneNumber1());
            student.setMotherName(updatedStudent.getMotherName());
            student.setPhoneNumber2(updatedStudent.getPhoneNumber2());
            student.setEmailId(updatedStudent.getEmailId());
            student.setStudentDOB(updatedStudent.getStudentDOB());
            student.setHouseNumber(updatedStudent.getHouseNumber());
            student.setStreetName(updatedStudent.getStreetName());
            student.setAreaName(updatedStudent.getAreaName());
            student.setState(updatedStudent.getState());
            student.setPincode(updatedStudent.getPincode());
            student.setNationality(updatedStudent.getNationality());
            student.setSslc(updatedStudent.getSslc());
            student.setHsc(updatedStudent.getHsc());
            student.setDiploma(updatedStudent.getDiploma());
            student.setEligibility(updatedStudent.getEligibility());
            student.setCourseId(updatedStudent.getCourseId());
            student.setInstituteId(updatedStudent.getInstituteId());
            studentRepository.save(student);
            return "Student details edited";
        }
        return "Student not found";
    }

    public String deleteStudent(Integer id) {
        Optional<StudentModel> studentmodel = studentRepository.findById(id);
        if (studentmodel.isPresent()) {
            studentRepository.deleteById(id);
            return "Student details deleted";
        }
        return "Student not Found";
    }

    public StudentModel getStudent(Integer id) {
        Optional<StudentModel> studentmodel = studentRepository.findById(id);
        if (studentmodel.isPresent()) {
            return studentmodel.get();
        }
        return null;
    }

    public List<StudentModel> getStudent() {
        return studentRepository.findAll();
    }

    public void addCourse(CourseModel courseModel) {
        courseRepository.save(courseModel);
    }

    public String editCourse(Integer courseId, CourseModel courseModelFromRequest) {
        Optional<CourseModel> coursemodel = courseRepository.findBycourseId(courseId);
        if (coursemodel.isPresent()) {
            CourseModel course = coursemodel.get();
            course.setCourseId(courseModelFromRequest.getCourseId());
            course.setCourseName(courseModelFromRequest.getCourseName());
            course.setCourseDescription(courseModelFromRequest.getCourseDescription());
            course.setCourseDuration(courseModelFromRequest.getCourseDuration());
            course.setCourseTiming(courseModelFromRequest.getCourseTiming());
            course.setCourseEnrolled(courseModelFromRequest.getCourseEnrolled());
            courseRepository.save(course);
            return "Course edited";
        }
        return "Course not found";
    }

    public String deleteCourse(Integer id) {
        Optional<CourseModel> coursemodel = courseRepository.findById(id);
        if (coursemodel.isPresent()) {
            courseRepository.deleteById(id);
            return "Course deleted";
        }
        return "Course not Found";
    }

    public CourseModel getCourse(Integer id) {
        Optional<CourseModel> coursemodel = courseRepository.findById(id);
        if (coursemodel.isPresent()) {
            return coursemodel.get();
        }
        return null;
    }

    public List<CourseModel> getCourse() {
        return courseRepository.findAll();
    }

    public void addInstitute(InstituteModel instituteModel) {
        instituteRepository.save(instituteModel);
    }

    public String editInstitute(Integer instituteId, InstituteModel updatedInstitute) {
        Optional<InstituteModel> institutemodel = instituteRepository.findByInstituteId(instituteId);
        if (institutemodel.isPresent()) {
            InstituteModel institute = institutemodel.get();
            institute.setInstituteId(updatedInstitute.getInstituteId());
            institute.setInstituteName(updatedInstitute.getInstituteName());
            institute.setInstituteDescription(updatedInstitute.getInstituteDescription());
            institute.setInstituteAddress(updatedInstitute.getInstituteAddress());
            institute.setMobile(updatedInstitute.getMobile());
            institute.setEmail(updatedInstitute.getEmail());
            institute.setImageUrl(updatedInstitute.getImageUrl());
            instituteRepository.save(institute);
            return "Institute edited";
        }
        return "Institute not found";
    }

    public String deleteInstitute(Integer id) {
        Optional<InstituteModel> institutemodel = instituteRepository.findByInstituteId(id);
        if (institutemodel.isPresent()) {
            instituteRepository.deleteById(id);
            return "Institute deleted";
        }
        return "Institute not Found";
    }

    public InstituteModel getInstitute(Integer id) {
        Optional<InstituteModel> institutemodel = instituteRepository.findByInstituteId(id);
        if (institutemodel.isPresent()) {
            return institutemodel.get();
        }
        return null;
    }

    public List<InstituteModel> getInstitutes() {
        return instituteRepository.findAll();
    }

    public String addReason(AdmissionModel admissionModel) {
        Optional<AdmissionModel> admissionModel1 = admissionRepo
                .findByStudentIdNumberAndCourseId(admissionModel.getStudentIdNumber(), admissionModel.getCourseId());
        if (admissionModel1.isPresent()) {
            admissionModel1.get().setReason(admissionModel.getReason());
            admissionRepo.save(admissionModel1.get());
            return "ReasonAdded";
        }
        return "Course not Found";
    }

    public ResponseEntity<?> getAdmission(int page, int pageSize) {
        return ResponseEntity.ok(admissionRepo.findAll(PageRequest.of(page, pageSize)));
    }

    public ResponseEntity<?> filterByStatus(String status) {
        List<AdmissionModel> admission = admissionRepo.findByStatus(status);
        if (admission.isEmpty()) {
            return ResponseEntity.ok("No admission found");
        }
        return ResponseEntity.ok(admission);
    }

}