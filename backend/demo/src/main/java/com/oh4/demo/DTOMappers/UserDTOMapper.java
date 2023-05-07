package com.oh4.demo.DTOMappers;

import com.oh4.demo.DTOs.UserDTO;
import com.oh4.demo.entities.User;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getUsername(),
                user.getPhonenumber()
        );
    }
}
