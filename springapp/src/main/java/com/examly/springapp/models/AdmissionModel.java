package com.examly.springapp.models;
import javax.persistence.Table;
import javax.persistence.*;
import java.util.*;
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
    private String studentName;
    private Date studentDOB;
    private String address;
    private String mobile;
    private Integer SSLC;
    private Integer HSC;
    private Integer Diploma;
    private String eligibility;
    private Integer courseId;
    private Integer instituteId;
    
}