package com.oh4.demo.configurations;

import jakarta.servlet.MultipartConfigElement;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableWebMvc
public class FileConfigurer {
  @Value("${spring.servlet.multipart.max-file-size}")
  private String maxFileSize;

  @Value("${spring.servlet.multipart.max-request-size}")
  private String maxRequestSize;

  @Bean
  public MultipartConfigElement multipartConfigElement() {
    return new MultipartConfigElement("", Long.parseLong(maxFileSize), Long.parseLong(maxRequestSize), 0);
  }
}
