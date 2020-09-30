package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.model.Message;
import ch.tbz.chat.domain.model.User;
import ch.tbz.chat.domain.repository.MessageRepository;
import ch.tbz.chat.domain.service.ChatMessageService;
import ch.tbz.chat.domain.service.ChatService;
import org.springframework.stereotype.Service;

@Service
public class ChatMessageServiceImpl extends CrudServiceImpl<Message, MessageRepository> implements ChatMessageService {

    private final ChatService chatService;

    public ChatMessageServiceImpl(MessageRepository repository, ChatService chatService) {
        super(repository);
        this.chatService = chatService;
    }

    @Override
    public Message addMessageToChat(String chatId, Message message, User author) {
        Chat chat = chatService.findById(chatId);

        message = save(message.setChat(chat).setAuthor(author));

        chat.getMessages().add(message);
        chatService.save(chat);

        return message;
    }
}
