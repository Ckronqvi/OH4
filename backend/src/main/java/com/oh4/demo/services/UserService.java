package com.oh4.demo.services;

import com.oh4.demo.DTOMappers.UserDTOMapper;
import com.oh4.demo.DTOs.UserDTO;
import com.oh4.demo.entities.User;
import com.oh4.demo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserDTOMapper userDTOMapper;

    @Autowired
    public UserService(UserRepository userRepository,
                       UserDTOMapper userDTOMapper){
        this.userRepository = userRepository;
        this.userDTOMapper = userDTOMapper;
    }

    public List<UserDTO> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public List<UserDTO> getUserByID(Long id){
        return userRepository.findById(id)
                .stream()
                .map(userDTOMapper)
                .collect(Collectors.toList());
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow();
    }
    public void addNewUser(User user) {
        userRepository.save(user);
    }
}

