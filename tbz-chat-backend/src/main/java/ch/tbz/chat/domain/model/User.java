package ch.tbz.chat.domain.model;

import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Table(name = "users")
@Entity
public class User extends DomainEntity {

    private String email;

    private String username;

    private String password;

    private boolean enabled;

    @OneToMany(mappedBy = "user")
    private List<UserInChat> userInChats = new ArrayList<>();

    public User() {}

    @PersistenceConstructor
    public User(String id, String email, String username, String password, boolean enabled, List<UserInChat> userInChats) {
        super(id);
        this.email = email;
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.userInChats = userInChats;
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

    public List<UserInChat> getUserInChats() {
        return userInChats;
    }

    public User setUserInChats(List<UserInChat> userInChats) {
        this.userInChats = userInChats;
        return this;
    }
}
