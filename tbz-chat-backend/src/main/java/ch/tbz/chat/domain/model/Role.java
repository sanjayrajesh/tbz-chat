package ch.tbz.chat.domain.model;

import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "role")
public class Role extends DomainEntity {

    public static final String MEMBER = "MEMBER";
    public static final String ADMINISTRATOR = "ADMINISTRATOR";

    private String name;

    public Role() {
    }

    @PersistenceConstructor
    public Role(String id, String name) {
        super(id);
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Role setName(String name) {
        this.name = name;
        return this;
    }
}
