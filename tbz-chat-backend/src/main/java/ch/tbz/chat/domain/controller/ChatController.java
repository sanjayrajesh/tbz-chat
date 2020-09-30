package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.chat.ChatDTO;
import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.model.UserInChat;
import ch.tbz.chat.domain.service.UserInChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/chats")
public class ChatController {

    private final UserInChatService userInChatService;
    private final MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy;

    public ChatController(MappingStrategy<ChatDTO, UserInChat> chatMappingStrategy, UserInChatService userInChatService) {
        this.userInChatService = userInChatService;
        this.chatMappingStrategy = chatMappingStrategy;
    }

    @PostMapping
    public ResponseEntity<ChatDTO> createChat(@RequestBody @Valid ChatDTO.Creation chatDTO, @AuthenticationPrincipal(expression = "user") User authenticated) {
        UserInChat userInChat = userInChatService.createChat(new Chat().setName(chatDTO.getName()), chatDTO.getUserIds(), authenticated);

        return new ResponseEntity<>(chatMappingStrategy.map(userInChat), HttpStatus.CREATED);
    }
}
