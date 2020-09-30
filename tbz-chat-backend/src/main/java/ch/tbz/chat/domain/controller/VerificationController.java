package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.user.UserMapper;
import ch.tbz.chat.domain.datatransfer.user.UserMappingStrategyFactory;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/verification")
public class VerificationController {

    private final UserService userService;
    private final UserMappingStrategyFactory userMappingStrategyFactory;
    private final UserMapper userMapper;

    public VerificationController(UserService userService, UserMappingStrategyFactory userMappingStrategyFactory, UserMapper userMapper) {
        this.userService = userService;
        this.userMappingStrategyFactory = userMappingStrategyFactory;
        this.userMapper = userMapper;
    }

    @PostMapping("/activate-account/{token}")
    public ResponseEntity<UserDTO> activateAccount(@PathVariable String token, @RequestBody @Valid UserDTO.WithPassword userDTO) {
        User user = userService.activateAccount(token, userMapper.user(userDTO));

        return new ResponseEntity<>(userMappingStrategyFactory.getStrategy().map(user), HttpStatus.OK);
    }

}
