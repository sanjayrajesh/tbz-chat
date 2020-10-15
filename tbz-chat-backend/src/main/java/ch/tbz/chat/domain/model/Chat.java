package ch.tbz.chat.domain.model;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;
import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Table(name = "chat")
@Entity
public class Chat extends DomainEntity {

    private String name;

    @OneToMany(mappedBy = "chat")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<UserInChat> userInChats = new ArrayList<>();

    @OneToMany(mappedBy = "chat")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Message> messages = new ArrayList<>();

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    public Chat() {}

    @PersistenceConstructor
    public Chat(String id, String name, List<UserInChat> userInChats, List<Message> messages, LocalDateTime createdAt) {
        super(id);
        this.name = name;
        this.userInChats = userInChats;
        this.messages = messages;
        this.createdAt = createdAt;
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

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public Chat setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }
}
