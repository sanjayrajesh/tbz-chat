package ch.tbz.chat.domain.model;

import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Table(name = "chat")
@Entity
public class Chat extends DomainEntity {

    private String name;

    @OneToMany(mappedBy = "chat")
    private List<UserInChat> userInChats = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "chat_id")
    private List<Message> messages = new ArrayList<>();

    public Chat() {}

    @PersistenceConstructor
    public Chat(String id, String name, List<UserInChat> userInChats, List<Message> messages) {
        super(id);
        this.name = name;
        this.userInChats = userInChats;
        this.messages = messages;
    }

    public String getName() {
        return name;
    }

    public Chat setName(String name) {
        this.name = name;
        return this;
    }

    public List<UserInChat> getUserInChats() {
        return userInChats;
    }

    public Chat setUserInChats(List<UserInChat> userInChats) {
        this.userInChats = userInChats;
        return this;
    }

    public List<Message> getMessages() {
        return messages;
    }

    public Chat setMessages(List<Message> messages) {
        this.messages = messages;
        return this;
    }
}
