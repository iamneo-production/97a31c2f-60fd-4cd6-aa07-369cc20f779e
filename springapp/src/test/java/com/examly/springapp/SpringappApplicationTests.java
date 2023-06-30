package com.examly.springapp;

import static org.junit.Assert.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.io.File;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@RunWith(SpringJUnit4ClassRunner.class) 
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {
	
	 @Autowired
	    private MockMvc mockMvc;

	@Test
    public void testGetCoursesAll() throws Exception {
    	
        mockMvc.perform(get("/admin/courses"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    
    @Test
    public void testGetCoursesById() throws Exception {
    	Long Id=1L;
    	
        mockMvc.perform(get("/admin/courses").param("id", "1"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    
    @Test
    public void testGetStudentAll() throws Exception {
    	
        mockMvc.perform(get("/admin/student"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    
    @Test
    public void testGetStudentById() throws Exception {
    	Long Id=1L;
    	
        mockMvc.perform(get("/admin/student").param("id", "1"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    
    @Test
    public void testGetInstituteById() throws Exception {
    	Long Id=1L;
    	
        mockMvc.perform(get("/admin/institute").param("id", "1"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    
    @Test
    public void testGetAdmissionAll() throws Exception {
    	
        mockMvc.perform(get("/admin/admission"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    @Test
    public void testGetInstituteAll() throws Exception {
    	
        mockMvc.perform(get("/admin/institute"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
 
    
    @Test
    public void testGetAdmissionById() throws Exception {
    	Long Id=1L;
    	
        mockMvc.perform(get("/admin/admission").param("id", "1"))
        .andExpect(MockMvcResultMatchers.status().isOk())
        .andDo(print())
        .andExpect(content().contentType("application/json"))
			.andExpect(jsonPath("$").isArray())
			.andReturn();
    }
    
    @Test
    public void test_case1() {
    String directoryPath = "src/main/java/com/examly/springapp/controller";
     File directory = new File(directoryPath);
     assertTrue(directory.exists() && directory.isDirectory());;
     }


   @Test
   public void test_case2() {
   String filePath = "src/main/java/com/examly/springapp/controller/AdmissionController.java";
   File file = new File(filePath);
   assertTrue(file.exists() && file.isFile());;

    }

}
