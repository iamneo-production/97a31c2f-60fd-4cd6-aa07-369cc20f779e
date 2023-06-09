package com.examly.springapp.models;

import java.lang.annotation.Inherited;

import javax.annotation.processing.Generated;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Course")

public class CourseModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer courseId;
    private String courseName ;
    private String courseDescription ;
    private  Integer courseDuration ;
    private String courseTiming;
    private Integer courseEnrolled;



}
