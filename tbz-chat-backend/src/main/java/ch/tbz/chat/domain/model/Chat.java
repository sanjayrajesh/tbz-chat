package ch.tbz.chat.domain.model;

import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table(name = "chat")
@Entity
public class Chat extends DomainEntity {

    private String name;

    @ManyToMany
    @JoinTable(
            name = "user_in_chat",
            joinColumns = @JoinColumn(name = "chat_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> users;

    @OneToMany
    @JoinColumn(name = "chat_id")
    private List<Message> messages;

    public Chat() {
        users = new HashSet<>();
        messages = new ArrayList<>();
    }

    @PersistenceConstructor
    public Chat(String id, String name, Set<User> users, List<Message> messages) {
        super(id);
        this.name = name;
        this.users = users;
        this.messages = messages;
    }

    public String getName() {
        return name;
    }

    public Chat setName(String name) {
        this.name = name;
        return this;
    }

    public Set<User> getUsers() {
        return users;
    }

    public Chat setUsers(Set<User> users) {
        this.users = users;
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
