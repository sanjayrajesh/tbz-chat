package ch.tbz.chat.domain.controller;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.message.MessageDTO;
import ch.tbz.chat.domain.datatransfer.message.MessageMapper;
import ch.tbz.chat.domain.model.Message;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.service.ChatMessageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/chats/{chatId}/messages")
public class ChatMessageController {

    private final ChatMessageService chatMessageService;
    private final MappingStrategy<MessageDTO, Message> messageMappingStrategy;
    private final MessageMapper messageMapper;

    public ChatMessageController(ChatMessageService chatMessageService, MappingStrategy<MessageDTO, Message> messageMappingStrategy, MessageMapper messageMapper) {
        this.chatMessageService = chatMessageService;
        this.messageMappingStrategy = messageMappingStrategy;
        this.messageMapper = messageMapper;
    }

    @PostMapping
    public ResponseEntity<MessageDTO> addMessageToChat(@PathVariable String chatId, @RequestBody @Valid MessageDTO messageDTO, @AuthenticationPrincipal(expression = "user") User user) {
        Message message = chatMessageService.addMessageToChat(chatId, messageMapper.message(messageDTO), user);

        return new ResponseEntity<>(messageMappingStrategy.map(message), HttpStatus.CREATED);
    }
}
