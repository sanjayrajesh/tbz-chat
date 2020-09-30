package ch.tbz.chat.domain.datatransfer;

import ch.tbz.chat.domain.model.DomainEntity;

import java.util.Collection;

public interface DTOMapper<DT extends DTO, DE extends DomainEntity> {

    DT dto(DE domainEntity);

    Collection<DT> dto(Collection<DE> domainEntities);

}
