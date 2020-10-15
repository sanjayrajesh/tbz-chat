package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.UpdatePasswordDTO;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.datatransfer.user.UserMapper;
import ch.tbz.chat.domain.datatransfer.user.UserMappingStrategyFactory;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;

@RestController
@RequestMapping("/users")
public class UserController {

  private final UserService userService;
  private final MappingStrategy<UserDTO, User> userMappingStrategy;
  private final UserMappingStrategyFactory userMappingStrategyFactory;
  private final UserMapper userMapper;

  public UserController(
      UserService userService,
      MappingStrategy<UserDTO, User> userMappingStrategy,
      UserMappingStrategyFactory userMappingStrategyFactory,
      UserMapper userMapper) {
    this.userService = userService;
    this.userMappingStrategy = userMappingStrategy;
    this.userMappingStrategyFactory = userMappingStrategyFactory;
    this.userMapper = userMapper;
  }

  @PostMapping
  public ResponseEntity<UserDTO> register(@RequestBody @Valid UserDTO.Registration userDTO) {
    User user = userService.create(userMapper.user(userDTO));

    return new ResponseEntity<>(userMappingStrategy.map(user), HttpStatus.CREATED);
  }

  @GetMapping("/own")
  public ResponseEntity<UserDTO> getAuthenticated(
      @AuthenticationPrincipal(expression = "user") User user) {
    return new ResponseEntity<>(userMappingStrategy.map(user), HttpStatus.OK);
  }

  @GetMapping("/search")
  public ResponseEntity<Collection<? extends UserDTO>> search(
      @RequestParam("q") String query,
      @RequestParam(required = false) boolean excludeAuthenticated,
      @RequestParam(required = false) String excludeChatId,
      @AuthenticationPrincipal(expression = "user") User authenticated) {
    Collection<User> users =
        userService.search(query, excludeAuthenticated, authenticated, excludeChatId);

    MappingStrategy<UserDTO, User> mappingStrategy = userMappingStrategyFactory.getStrategy();

    return new ResponseEntity<>(mappingStrategy.map(users), HttpStatus.OK);
  }

  @PutMapping("/own/password")
  public ResponseEntity<Void> changePassword(
      @RequestBody @Valid UpdatePasswordDTO updatePassword,
      @AuthenticationPrincipal(expression = "user") User user) {
    userService.changePassword(
        user, updatePassword.getOldPassword(), updatePassword.getNewPassword());

    return new ResponseEntity<>(HttpStatus.OK);
  }
}
