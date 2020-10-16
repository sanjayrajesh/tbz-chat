package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.datatransfer.userinchat.chat.UserInChatToChatMappingStrategy;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserInChat;
import ch.tbz.chat.domain.service.UserInChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@RestController
@RequestMapping("/users/own/chats")
public class UserChatController {

    private final UserInChatService userInChatService;
    private final MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy;

    public UserChatController(UserInChatService userInChatService, MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy) {
        this.userInChatService = userInChatService;
        this.chatMappingStrategy = chatMappingStrategy;
    }

    @GetMapping
    public ResponseEntity<Collection<? extends ChatDTO>> getOwnChats(@AuthenticationPrincipal(expression = "user") User user) {
        Collection<UserInChat> userInChats = user.getUserInChats();

        return new ResponseEntity<>(chatMappingStrategy.map(userInChats), HttpStatus.OK);
    }

    @DeleteMapping("/{chatId}")
    @PreAuthorize("@userInChatService.isMember(#chatId, authentication.principal.user) or @userInChatService.isAdministrator(#chatId, authentication.principal.user)")
    public ResponseEntity<Void> leaveChat(@PathVariable String chatId, @AuthenticationPrincipal(expression = "user") User user) {
        userInChatService.removeUserFromChat(chatId, user);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
