package com.examly.springapp.configuration;

import org.aspectj.lang.ProceedingJoinPoint;  
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Around;  
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.databind.ObjectMapper;

@Aspect
@Component
public class AspectConfig {

    Logger logger = LoggerFactory.getLogger(AspectConfig.class);
    
    @Pointcut(value = "execution(* com.examly.springapp.*.*.*(..)) && !execution(* com.examly.springapp.controller.AuthController.*(..))")
    private void loggingController()   
    {
    }
    
    @Around("loggingController()")
    public Object logController(ProceedingJoinPoint pjp) throws Throwable {

        ObjectMapper mapper = new ObjectMapper();
        String methodName = pjp.getSignature().getName();
        String className = pjp.getTarget().getClass().toString();
        Object[] args = pjp.getArgs();

        logger.info("Method invoked " + className + " : " + methodName + "()" + "arguments : "
                + mapper.writeValueAsString(args));

        Object object = pjp.proceed();
        logger.info(className + " : " + methodName + "()" + "Response : "
                + mapper.writeValueAsString(object));

        return object;
    }

}