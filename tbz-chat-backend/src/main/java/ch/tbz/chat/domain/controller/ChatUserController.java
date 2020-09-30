package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.UserInChat;
import ch.tbz.chat.domain.service.UserInChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/chats/{chatId}/users")
public class ChatUserController {

    private final UserInChatService userInChatService;
    private final MappingStrategy<UserDTO, UserInChat> userMappingStrategy;

    public ChatUserController(UserInChatService userInChatService, MappingStrategy<UserDTO, UserInChat> userMappingStrategy) {
        this.userInChatService = userInChatService;
        this.userMappingStrategy = userMappingStrategy;
    }

    @PostMapping
    @PreAuthorize("@userInChatService.isAdministrator(#chatId, authentication.principal.user)")
    public ResponseEntity<Collection<? extends UserDTO>> addUsersToChat(@PathVariable String chatId, @RequestBody Collection<String> userIds) {
        Collection<UserInChat> userInChats = userInChatService.addUsersToChat(chatId, userIds);

        return new ResponseEntity<>(userMappingStrategy.map(userInChats), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    @PreAuthorize("@userInChatService.isAdministrator(#chatId, authentication.principal.user)")
    public ResponseEntity<Void> removeUserFromChat(@PathVariable String chatId, @PathVariable String userId) {
        userInChatService.removeUserFromChat(chatId, userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{userId}/grant-admin-role")
    @PreAuthorize("@userInChatService.isAdministrator(#chatId, authentication.principal.user)")
    public ResponseEntity<UserDTO> grandAdminRole(@PathVariable String chatId, @PathVariable String userId) {
        UserInChat userInChat = userInChatService.grantAdministratorRole(chatId, userId);

        return new ResponseEntity<>(userMappingStrategy.map(userInChat), HttpStatus.OK);
    }
}
