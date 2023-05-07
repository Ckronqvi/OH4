package com.oh4.demo.configurations;

import com.oh4.demo.security.JwtAuthenticationFilter;
import jakarta.servlet.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

  private final JwtAuthenticationFilter jwrAuthFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
//     COULD POSSIBLY BE MADE SIMPLER BY IMPLEMENTING OTHER SECURITY CONFIGURATIONS, BUT FOR THIS PROJECT
//     WE WILL NOT BE DOING THAT :-)
    httpSecurity
        .csrf()
        .disable()
        .authorizeHttpRequests()
        .requestMatchers("/api/v1/auth/**", "/api/v1/listing/getListing**/**") //ALL THE ENDPOINTS THAT WE WANT TO WHITELIST, LIKE GET_LISTINGS...
        .permitAll()
        .anyRequest()
        .authenticated()
        .and()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwrAuthFilter, UsernamePasswordAuthenticationFilter.class);
    return httpSecurity.build();
  }
}
