package com.examly.springapp.service;
import org.springframework.web.bind.annotation.*;
// import main.java.com.examly.springapp.models.StudentformModel;
// Pimport main.java.com.examly.springapp.repository.StudentformRepository;
import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;
import javax.lang.model.type.NullType;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdmissionRepo admissionR;

    @Autowired
    private StudentformRepository studentformRepository;

    @Autowired
    private CourseRepository courseRepository;

    // public UserService(UserRepository userRepository,AdminRepository adminRepository
    // ,AdmissionRepo admissionR
    // ){
    //     this.userRepository = userRepository;
    //     this.adminRepository = adminRepository;
    //     this.admissionR = admissionR;
    // }

    public String saveUser(UserModel userModel){
        if (userRepository.existsByEmail(userModel.getEmail())) {
			return "Email is already exists";
		}
        if(userModel.getUserRole().equals(ERole.user)){
            userRepository.save(userModel);
            return "User added"; 
        } else {
            return "User Role is incorrect";
        }
      
     }
 
    public String saveAdmin(AdminModel adminModel){
        adminRepository.save(adminModel);
        return "Admin added";
    }
    
    public void addAdmission(AdmissionModel admissionModel){
        admissionR.save(admissionModel);
    }

    public AdmissionModel getAdmission(Integer admissionid){
        Optional<AdmissionModel> admissionModel = admissionR.findById(admissionid);
        if(admissionModel.isPresent()){
            return  admissionModel.get();
        }
        return null;
    }
    public String deleteAdmission(Integer id){
        Optional<AdmissionModel> admissionmodel=admissionR.findById(id);
        if(admissionmodel.isPresent()){
            admissionR.deleteById(id);
            return "Admission details deleted";
        }
        return "Admission not Found";
    }

    public String editAdmission(Integer id){
        Optional<AdmissionModel> admissionmodel=admissionR.findById(id);
        if(admissionmodel.isPresent()){
            return "Admission details edited";
        }
        return "Admission not Found";
    }

    public void addStudentform(StudentformModel studentformModel ){
        StudentformModel studentformModel1 = studentformRepository.findByStudentIdNumber(studentformModel.getStudentIdNumber());
        if(studentformModel1 != null){
            studentformModel1.setCourseId(studentformModel.getCourseId());
            studentformRepository.save(studentformModel1);
        } else {
            studentformRepository.save(studentformModel);
        }
    }

    public CourseModel viewEnrolledCourse(Integer studentId){
        StudentformModel studentformModel = studentformRepository.findByStudentIdNumber(studentId);
        System.out.println("student found "+ studentformModel.getCourseId() );
        if(courseRepository.existsByCourseId(studentformModel.getCourseId())){
            System.out.println("student found and couese also");
            Optional<CourseModel> course =  courseRepository.findBycourseId(studentformModel.getCourseId());
            if(course.isPresent()){
                System.out.println("course found ");
                return course.get();
            } else {
                System.out.println("course not found ");
                return null;
            }
        }
        else{
            System.out.println("student not found ");
            return null;
        }

    }
}




