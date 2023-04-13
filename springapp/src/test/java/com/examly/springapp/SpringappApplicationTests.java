package com.examly.springapp;


import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

//import org.junit.Test;
import org.junit.jupiter.api.Test; 
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;

@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
@RunWith(SpringRunner.class)
class SpringappApplicationTests {

	@Autowired
    private MockMvc mockMvc;
	
	@Test
	@Transactional
    public void BE_spring_add_user() throws Exception {
        String newUser = "{\"email\":\"test@gmail.com\",\"password\":\"Test@123\",\"username\":\"test123\",\"mobileNumber\":\"9876543210\",\"userRole\":\"user\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/user/signup")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newUser)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }

	@Test
	@Transactional
    public void BE_spring_add_institute() throws Exception {
        String newInstitute = "{\"instituteId\":\"01\",\"instituteName\":\"Panuser\",\"instituteDescription\":\"ABC\",\"instituteAddress\":\"XYZ\",\"mobile\":\"9876543210\",\"email\":\"abc@gmail.com\"}";
        mockMvc.perform(MockMvcRequestBuilders.post("/admin/addInstitute")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newInstitute)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
	
	@Test
	@Transactional
    public void BE_spring_get_institute() throws Exception {
	 	mockMvc.perform(MockMvcRequestBuilders.get("/admin/viewInstitutes")
		.contentType(MediaType.APPLICATION_JSON)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andExpect(MockMvcResultMatchers.jsonPath("$").isNotEmpty())
		.andReturn();
    }

	@Test
	@Transactional
    public void BE_spring_update_institute() throws Exception {
        String newInstitute = "{\"instituteId\":\"01\",\"instituteName\":\"Panuser\",\"instituteDescription\":\"ABC\",\"instituteAddress\":\"XYZ\",\"mobile\":\"9876543210\",\"email\":\"abc@gmail.com\"}";
        mockMvc.perform(MockMvcRequestBuilders.put("/admin/editInstitute")
		.param("instituteId","01")
		.contentType(MediaType.APPLICATION_JSON)
		.content(newInstitute)
		.accept(MediaType.APPLICATION_JSON))
		.andExpect(status().isOk())
		.andReturn();
    }
}
