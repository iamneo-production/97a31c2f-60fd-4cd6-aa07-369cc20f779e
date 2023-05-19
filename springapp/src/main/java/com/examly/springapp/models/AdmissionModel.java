package com.examly.springapp.models;
import javax.persistence.Table;
import javax.persistence.*;
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
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Admission")
public class AdmissionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer courseId;
    private Integer studentIdNumber;
    private String firstName;
    private String lastName;
    private String fatherName;
    private String motherName;
    private String phoneNumber1;
    private String phoneNumber2;
    private String emailId;
    private Date  studentDOB;
    private String houseNumber;
    private String streetName;
    private String areaName;
    private String state;
    private Integer pincode;
    private String nationality;
    private Integer sslc;
    private Integer hsc;
    private Integer diploma;
    
}