package ch.tbz.chat.domain.model;

import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.PersistenceConstructor;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class DomainEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid2")
    protected String id;

    public DomainEntity() {
    }

    @PersistenceConstructor
    public DomainEntity(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public DomainEntity setId(String id) {
        this.id = id;
        return this;
    }
}
