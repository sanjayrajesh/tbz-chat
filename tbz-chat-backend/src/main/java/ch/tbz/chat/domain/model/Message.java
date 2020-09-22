package ch.tbz.chat.domain.model;

import org.hibernate.annotations.CreationTimestamp;
import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Table(name = "message")
@Entity
public class Message extends DomainEntity {

    private String body;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime timestamp;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    public Message() {
    }

    @PersistenceConstructor
    public Message(String id, String body, LocalDateTime timestamp, User author) {
        super(id);
        this.body = body;
        this.timestamp = timestamp;
        this.author = author;
    }

    public String getBody() {
        return body;
    }

    public Message setBody(String body) {
        this.body = body;
        return this;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public Message setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
        return this;
    }

    public User getAuthor() {
        return author;
    }

    public Message setAuthor(User author) {
        this.author = author;
        return this;
    }
}
