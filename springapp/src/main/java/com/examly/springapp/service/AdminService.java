package com.examly.springapp.service;
import org.springframework.web.bind.annotation.*;
import com.examly.springapp.repository.*;
import com.examly.springapp.models.*;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.*;
import java.util.*;
import javax.lang.model.type.NullType;

@Service

public class AdminService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private InstituteRepository instituteRepository;

    public AdminService(StudentRepository studentRepository,CourseRepository courseRepository,InstituteRepository instituteRepository){
        this.studentRepository = studentRepository;
        this.courseRepository = courseRepository;
        this.instituteRepository = instituteRepository; 
    }

    public void addStudent(StudentModel studentModel){
        studentRepository.save(studentModel);
    }  
    
    public String editStudent(int studentId){
        Optional<StudentModel> stu = studentRepository.findByStudentId(studentId);
        if(stu.isPresent()){
            studentRepository.save(stu.get());
            return "Student details edited";
        }
        return "Student not found";
    } 

    public String deleteStudent(Integer id){
        Optional<StudentModel> studentmodel=studentRepository.findById(id);
        if(studentmodel.isPresent()){
            studentRepository.deleteById(id);
            return "Student details deleted";
        }
        return "Student not Found";
    }

    public StudentModel getStudent(Integer id){
        Optional<StudentModel> studentmodel=studentRepository.findById(id);
        if(studentmodel.isPresent()){
            return studentmodel.get();
        }
        return null;
    }
    
    public void addCourse(CourseModel courseModel){
        courseRepository.save(courseModel);
    }  

    public String editCourse(Integer courseId){
        Optional<CourseModel> coursemodel = courseRepository.findBycourseId(courseId);
        if(coursemodel.isPresent()){
            courseRepository.save(coursemodel.get());
            return "Course edited";
        }
        return "Course not found";
    } 

    public String deleteCourse(Integer id){
        Optional<CourseModel> coursemodel=courseRepository.findById(id);
        if(coursemodel.isPresent()){
            courseRepository.deleteById(id);
            return "Course deleted";
        }
        return "Course not Found";
    }

    public CourseModel getCourse(Integer id){
        Optional<CourseModel> coursemodel=courseRepository.findById(id);
        if(coursemodel.isPresent()){
            return coursemodel.get();
        }
        return null;
    }

    public void addInstitute(InstituteModel instituteModel){
        instituteRepository.save(instituteModel);
    }  

    public String editInstitute(Integer instituteId){
        Optional<InstituteModel> institutemodel = instituteRepository.findByInstituteId(instituteId);
        if(institutemodel.isPresent()){
            instituteRepository.save(institutemodel.get());
            return "Institute edited";
        }
        return "Institute not found";
    } 

    public String deleteInstitute(Integer id){
        Optional<InstituteModel> institutemodel= instituteRepository.findByInstituteId(id);
        if(institutemodel.isPresent()){
            instituteRepository.deleteById(id);
            return "Institute deleted";
        }
        return "Institute not Found";
    }

    public InstituteModel getInstitute(Integer id){
        Optional<InstituteModel> institutemodel=instituteRepository.findByInstituteId(id);
        if(institutemodel.isPresent()){
            return institutemodel.get();
        }
        return null;
    }

    public List<InstituteModel> getInstitutes(){
      return instituteRepository.findAll();
    }


}
