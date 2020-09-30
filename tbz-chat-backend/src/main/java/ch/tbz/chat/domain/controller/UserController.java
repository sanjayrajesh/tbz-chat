package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.MappingStrategyFactory;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.user.UserMapper;
import ch.tbz.chat.domain.datatransfer.user.UserMappingStrategyFactory;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final UserMappingStrategyFactory userMappingStrategyFactory;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMappingStrategyFactory userMappingStrategyFactory, UserMapper userMapper) {
        this.userService = userService;
        this.userMappingStrategyFactory = userMappingStrategyFactory;
        this.userMapper = userMapper;
    }

    @PostMapping
    public ResponseEntity<UserDTO> register(@RequestBody @Valid UserDTO.Registration userDTO) {
        User user = userService.create(userMapper.user(userDTO));

        MappingStrategy<UserDTO, User> userMappingStrategy = userMappingStrategyFactory.getStrategy();

        return new ResponseEntity<>(userMappingStrategy.map(user), HttpStatus.CREATED);
    }

}
