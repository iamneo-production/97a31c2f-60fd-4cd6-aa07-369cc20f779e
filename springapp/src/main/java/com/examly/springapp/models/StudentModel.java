
package com.examly.springapp.models;
import java.lang.annotation.Inherited;
import java.sql.Date;
import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Student")

public class StudentModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studentId;
    private String studentName;
    private Date studentDOB;
    private String address;
    private String mobile;
    private Integer SSLC;
    private Integer HSC;
    private Integer Diploma;
    private String eligibility;    
}
