package ch.tbz.chat.domain.model;

import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "user_in_chat")
public class UserInChat extends DomainEntity {

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "chat_id")
    private Chat chat;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public UserInChat() {
    }

    public UserInChat(User user, Chat chat, Role role) {
        this.user = user;
        this.chat = chat;
        this.role = role;
    }

    @PersistenceConstructor
    public UserInChat(String id, User user, Chat chat, Role role) {
        super(id);
        this.user = user;
        this.chat = chat;
        this.role = role;
    }

    public User getUser() {
        return user;
    }

    public UserInChat setUser(User user) {
        this.user = user;
        return this;
    }

    public Chat getChat() {
        return chat;
    }

    public UserInChat setChat(Chat chat) {
        this.chat = chat;
        return this;
    }

    public Role getRole() {
        return role;
    }

    public UserInChat setRole(Role role) {
        this.role = role;
        return this;
    }
}
