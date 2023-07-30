package com.examly.springapp.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.*;

@Entity
@Table(name = "Review")
public class ReviewModel {

	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column
	private long id;
	@Column
	private String name;
	@Column
	private String number;
	@Column
	private String email;
	@Column
	private String comments;

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}

	@Override
	public String toString() {
		return "ReviewModel [comments=" + comments + ", email=" + email + ", id=" + id + ", name=" + name + ", number="
				+ number + "]";
	}


	public ReviewModel(long id, String name, String number, String email, String comments) {
		this.id = id;
		this.name = name;
		this.number = number;
		this.email = email;
		this.comments = comments;
	}
  
  
	public ReviewModel() {
	}


}
