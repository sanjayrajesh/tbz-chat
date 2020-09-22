package ch.tbz.chat.domain.model;

import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.HashSet;
import java.util.Set;

@Table(name = "users")
@Entity
public class User extends DomainEntity {

    private String email;

    private String username;

    private String password;

    private boolean enabled;

    @ManyToMany(mappedBy = "users")
    private Set<Chat> chats;

    public User() {
        chats = new HashSet<>();
    }

    @PersistenceConstructor
    public User(String id, String email, String username, String password, boolean enabled, Set<Chat> chats) {
        super(id);
        this.email = email;
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.chats = chats;
    }

    public String getEmail() {
        return email;
    }

    public User setEmail(String email) {
        this.email = email;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
        return this;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public User setEnabled(boolean enabled) {
        this.enabled = enabled;
        return this;
    }

    public Set<Chat> getChats() {
        return chats;
    }

    public User setChats(Set<Chat> chats) {
        this.chats = chats;
        return this;
    }
}
