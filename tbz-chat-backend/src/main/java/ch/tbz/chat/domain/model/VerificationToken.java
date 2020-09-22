package ch.tbz.chat.domain.model;

import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Table(name = "verification_token")
@Entity
public class VerificationToken extends DomainEntity {

    private String token;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public VerificationToken() {
    }

    @PersistenceConstructor
    public VerificationToken(String id, String token, User user) {
        super(id);
        this.token = token;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public VerificationToken setToken(String token) {
        this.token = token;
        return this;
    }

    public User getUser() {
        return user;
    }

    public VerificationToken setUser(User user) {
        this.user = user;
        return this;
    }
}
