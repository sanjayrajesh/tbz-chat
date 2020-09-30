package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.service.UserInChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users/own/chats")
public class UserChatController {

    private final UserInChatService userInChatService;

    public UserChatController(UserInChatService userInChatService) {
        this.userInChatService = userInChatService;
    }

    @DeleteMapping("/{chatId}")
    @PreAuthorize("@userInChatService.isMember(#chatId, authentication.principal.user) or @userInChatService.isAdministrator(#chatId, authentication.principal.user)")
    public ResponseEntity<Void> leaveChat(@PathVariable String chatId, @AuthenticationPrincipal(expression = "user") User user) {
        userInChatService.removeUserFromChat(chatId, user);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
