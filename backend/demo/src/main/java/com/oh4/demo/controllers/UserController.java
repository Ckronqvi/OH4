package com.oh4.demo.controllers;

import com.oh4.demo.DTOs.UserDTO;
import com.oh4.demo.entities.User;
import com.oh4.demo.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/v1/user")
public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService){
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getUsers(){
        return userService.getUsers();
    }

    @GetMapping("/{id}")
    public List<UserDTO> getUser(@PathVariable("id") long id){
        return userService.getUserByID(id);
    }

}
