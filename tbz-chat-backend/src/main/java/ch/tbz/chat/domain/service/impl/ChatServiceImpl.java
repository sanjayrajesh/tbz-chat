package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.Chat;
import ch.tbz.chat.domain.repository.ChatRepository;
import ch.tbz.chat.domain.service.ChatService;
import org.springframework.stereotype.Service;

@Service
public class ChatServiceImpl extends CrudServiceImpl<Chat, ChatRepository> implements ChatService {

    public ChatServiceImpl(ChatRepository repository) {
        super(repository);
    }
}
