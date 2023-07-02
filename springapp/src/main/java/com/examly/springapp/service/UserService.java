package com.examly.springapp.service;
import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private AdmissionRepo admissionR;

    @Autowired
    private CourseRepository courseRepository;


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

     public List<AdmissionModel> getAdmission(){
        return admissionR.findAll();
    }
    public String deleteAdmission(Integer id){
        Optional<AdmissionModel> admissionmodel=admissionR.findById(id);
        if(admissionmodel.isPresent()){
            admissionR.deleteById(id);
            return "Admission details deleted";
        }
        return "Admission not Found";
    }

    public ResponseEntity<?>  editAdmission(Integer id, AdmissionModel updatedAdmission){
        Optional<AdmissionModel> admissionmodel=admissionR.findById(id);
        if(admissionmodel.isPresent()){
        AdmissionModel admission = admissionmodel.get();
        admission.setCourseId(updatedAdmission.getCourseId());
        admission.setStudentIdNumber(updatedAdmission.getStudentIdNumber());
        admission.setFirstName(updatedAdmission.getFirstName());
        admission.setLastName(updatedAdmission.getLastName());
        admission.setFatherName(updatedAdmission.getFatherName());
        admission.setPhoneNumber1(updatedAdmission.getPhoneNumber1());
        admission.setMotherName(updatedAdmission.getMotherName());
        admission.setPhoneNumber2(updatedAdmission.getPhoneNumber2());
        admission.setEmailId(updatedAdmission.getEmailId());
        admission.setStudentDOB(updatedAdmission.getStudentDOB());
        admission.setHouseNumber(updatedAdmission.getHouseNumber());
        admission.setStreetName(updatedAdmission.getStreetName());
        admission.setAreaName(updatedAdmission.getAreaName());
        admission.setState(updatedAdmission.getState());
        admission.setPincode(updatedAdmission.getPincode());
        admission.setNationality(updatedAdmission.getNationality());
        admission.setSslc(updatedAdmission.getSslc());
        admission.setHsc(updatedAdmission.getHsc());
        admission.setDiploma(updatedAdmission.getDiploma());
        admission.setStatus(updatedAdmission.getStatus());
        admissionR.save(admission);
        return  ResponseEntity.ok(admission);
        }
        return ResponseEntity.ok("Admission not Found");
    }


    public CourseModel viewEnrolledCourse(Integer studentId){
        AdmissionModel admissionmodel = admissionR.findByStudentIdNumber(studentId);
        if(courseRepository.existsByCourseId(admissionmodel.getCourseId())){
            Optional<CourseModel> course =  courseRepository.findBycourseId(admissionmodel.getCourseId());
            if(course.isPresent()){
                return course.get();
            } else {
                return null;
            }
        }
        else{
            return null;
        }

    }
}